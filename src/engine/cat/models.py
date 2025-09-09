import numpy as np

# --- Core logistic ---

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))

# Keep simple 2PL helpers for backward compatibility (dichotomous case)

def p_2pl(theta, a, b):
    return sigmoid(a * (theta - b))

def info_2pl(theta, a, b):
    p = p_2pl(theta, a, b)
    q = 1 - p
    return (a ** 2) * p * q

# --- GRM (Samejima) utilities ---
# D is the logistic scaling constant; mirt with IRTpars=TRUE uses ~1.702
D_DEFAULT = 1.702

def grm_cumulative(theta, a, bs, D=D_DEFAULT):
    """
    P*_k(theta) = P(Y >= k | theta), for k=1..M where M=len(bs).
    Returns array shape (len(theta), M).
    """
    theta = np.asarray(theta)
    bs = np.asarray(bs, dtype=float)
    return sigmoid(D * a * (theta[:, None] - bs[None, :]))

def grm_cumulative_derivative(theta, a, bs, D=D_DEFAULT):
    Pstar = grm_cumulative(theta, a, bs, D)
    return D * a * Pstar * (1.0 - Pstar)

def grm_category_probabilities(theta, a, bs, D=D_DEFAULT):
    """
    Compute category probabilities P_k for k=0..M (M=len(bs)).
    P_0 = 1 - P*_1
    P_k = P*_{k} - P*_{k+1} for k=1..M-1
    P_M = P*_{M}
    Returns array shape (len(theta), M+1)
    """
    theta = np.asarray(theta)
    bs = np.asarray(bs, dtype=float)
    Pstar = grm_cumulative(theta, a, bs, D)  # (nθ, M)
    n_theta, M = Pstar.shape
    P = np.zeros((n_theta, M + 1))
    # k = 0
    P[:, 0] = 1.0 - Pstar[:, 0]
    # 1..M-1
    for k in range(1, M):
        P[:, k] = Pstar[:, k - 1] - Pstar[:, k]
    # k = M
    P[:, M] = Pstar[:, M - 1]
    return P

def grm_category_derivatives(theta, a, bs, D=D_DEFAULT):
    Pstar = grm_cumulative(theta, a, bs, D)
    dPstar = grm_cumulative_derivative(theta, a, bs, D)
    n_theta, M = Pstar.shape
    dP = np.zeros((n_theta, M + 1))
    dP[:, 0] = -dPstar[:, 0]
    for k in range(1, M):
        dP[:, k] = dPstar[:, k - 1] - dPstar[:, k]
    dP[:, M] = dPstar[:, M - 1]
    return dP

def grm_item_information(theta, a, bs, D=D_DEFAULT):
    """
    Fisher information for a polytomous item with category probabilities P_k(θ):
    I(θ) = Σ_k ( (dP_k/dθ)^2 / P_k )
    Returns array shape (len(theta),)
    """
    P = grm_category_probabilities(theta, a, bs, D)
    dP = grm_category_derivatives(theta, a, bs, D)
    P_safe = np.clip(P, 1e-12, 1.0)
    return np.sum((dP ** 2) / P_safe, axis=1)

def grm_expected_score(theta, a, bs, D=D_DEFAULT):
    P = grm_category_probabilities(theta, a, bs, D)
    M = P.shape[1] - 1
    scores = np.arange(M + 1, dtype=float)[None, :]
    return (P * scores).sum(axis=1)