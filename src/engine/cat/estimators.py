import numpy as np
from .models import (
    p_2pl,
    grm_category_probabilities,
    grm_expected_score,
    D_DEFAULT,
)

# EAP on a fixed theta grid (polytomous GRM by default, falls back to 2PL if only 'b' is provided)
THETA_MIN = -6.0
THETA_MAX = 6.0
THETA_STEP = 0.05
PRIOR_MEAN = 0.0
PRIOR_SD = 1.0
D_CONST = 1.702

_theta_grid = np.arange(THETA_MIN, THETA_MAX + THETA_STEP, THETA_STEP)
_prior = np.exp(-0.5 * ((_theta_grid - PRIOR_MEAN) / PRIOR_SD) ** 2) / (PRIOR_SD * np.sqrt(2 * np.pi))


def _get_item_params(it):
    """
    Returns (a, bs, is_grm) where bs is a numpy array of thresholds.
    If only dichotomous (2PL) params exist (a, b), returns bs for a 2‑category GRM equivalent [b].
    """
    a = getattr(it.params, 'a', None)
    if a is None:
        return None, None, False
    # Prefer GRM thresholds list 'bs'
    bs = getattr(it.params, 'bs', None)
    if bs is not None:
        bs = np.asarray(bs, dtype=float)
        return float(a), bs, True
    # Fallback to single threshold 'b' (2PL)
    b = getattr(it.params, 'b', None)
    if b is not None:
        return float(a), np.asarray([float(b)], dtype=float), False
    return None, None, False


# New function: expected_total
def expected_total(theta, items):
    """
    Sum expected category scores across all items at a given theta.
    Supports GRM via params.bs; falls back to single-threshold [b] if present.
    """
    if items is None:
        return 0.0
    import numpy as np
    total = 0.0
    for it in items:
        a = getattr(it.params, 'a', None)
        if a is None:
            continue
        bs = getattr(it.params, 'bs', None)
        if bs is None:
            b = getattr(it.params, 'b', None)
            if b is None:
                continue
            bs = [float(b)]
        total += float(grm_expected_score(np.array([theta]), float(a), np.asarray(bs, dtype=float), D_DEFAULT)[0])
    return total


def estimate_theta(responses, items, start=0.0, max_iter=25, eps=1e-4):
    """
    responses: list of response objects with attributes (itemId, value)
      - value must be an integer category 0..M for the item's category count (Likert kept as-is)
    items: iterable of item objects with .id and .params (expects .params.a and .params.bs or .params.b)

    Returns (theta_hat, se_est)
    """
    if len(responses) == 0:
        return 0.0, 1.0
    print(responses)
    # Map items
    items_by_id = {it.id: it for it in items}

    # Build per-item observed categories and parameters
    obs = []  # list of tuples (a, bs, y)
    for r in responses:
        it = items_by_id.get(r.itemId)
        if it is None:
            continue
        a, bs, _ = _get_item_params(it)
        if a is None:
            continue
        # Ensure integer category
        y = int(r.value)
        # Cap to valid range [0, M]
        M = len(bs)
        if y < 0:
            y = 0
        if y > M:
            y = M
        obs.append((a, bs, y))

    if len(obs) == 0:
        return 0.0, 1.0

    # Compute log-likelihood over grid
    loglik = np.zeros_like(_theta_grid)
    for a, bs, y in obs:
        P = grm_category_probabilities(_theta_grid, a, bs, D_CONST)  # (nθ, M+1)
        P_y = np.clip(P[:, y], 1e-12, 1.0)
        loglik += np.log(P_y)

    post_unnorm = _prior * np.exp(loglik)
    Z = np.trapezoid(post_unnorm, _theta_grid)
    if not np.isfinite(Z) or Z <= 0:
        return 0.0, 1.0

    post = post_unnorm / Z
    theta_hat = float(np.trapezoid(_theta_grid * post, _theta_grid))
    second_moment = float(np.trapezoid((_theta_grid ** 2) * post, _theta_grid))
    var = max(second_moment - theta_hat ** 2, 1e-9)
    se = float(np.sqrt(var))
    return theta_hat, se