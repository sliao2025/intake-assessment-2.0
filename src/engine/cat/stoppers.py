
def should_stop(theta, se, min_se=0.32, max_items=12, n_answered=0):
    if n_answered >= max_items:
        return True
    if se <= min_se and n_answered >= 4:  # require a few items first
        return True
    return False
# Default stopper parameters for GRM CAT
DEFAULT_MIN_SE = 0.32
DEFAULT_MAX_ITEMS = 7