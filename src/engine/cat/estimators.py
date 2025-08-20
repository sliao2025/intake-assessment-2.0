import numpy as np
from .models import p_2pl

# responses are treated as 0/1 for Phase‑0 demo; Likert can be mapped to 0/1 via threshold

def estimate_theta(responses, items, start=0.0, max_iter=25, eps=1e-4):
    if len(responses) == 0:
        return 0.0, 1.0  # priorless start

    theta = start
    # Build lookup
    items_by_id = {it.id: it for it in items}
    y = []
    ab = []
    for r in responses:
        it = items_by_id.get(r.itemId)
        if it is None: 
            continue
        # Map any Likert value > 0 to 1 for demo
        y.append(1.0 if r.value > 0 else 0.0)
        ab.append((it.params.a, it.params.b))

    y = np.array(y)
    if len(y) == 0:
        return 0.0, 1.0

    for _ in range(max_iter):
        p = np.array([p_2pl(theta, a, b) for a, b in ab])
        W = p * (1 - p)
        grad = np.sum((y - p) * np.array([a for a, _ in ab]))
        hess = -np.sum(W * np.array([a for a, _ in ab]) ** 2)
        if abs(hess) < 1e-8:
            break
        step = grad / hess
        theta_new = theta - step
        if abs(theta_new - theta) < eps:
            theta = theta_new
            break
        theta = theta_new

    se = float(1.0 / np.sqrt(max(np.sum(W * np.array([a for a, _ in ab]) ** 2), 1e-6)))
    return float(theta), se