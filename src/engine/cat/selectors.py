from .models import info_2pl, grm_item_information

D_CONST = 1.702


def _get_item_params(it):
    a = getattr(it.params, 'a', None)
    if a is None:
        return None, None, False
    bs = getattr(it.params, 'bs', None)
    if bs is not None:
        return float(a), list(bs), True
    b = getattr(it.params, 'b', None)
    if b is not None:
        return float(a), [float(b)], False
    return None, None, False


def select_next_item(theta, responses, items, scale_code=None):
    answered = {r.itemId for r in responses}
    best = None
    best_info = -1.0
    for it in items:
        if it.id in answered:
            continue
        if scale_code and getattr(it, 'scaleId', None) and it.scaleId != scale_code:
            continue
        a, ths, is_grm = _get_item_params(it)
        if a is None:
            continue
        if is_grm:
            info = float(grm_item_information([theta], a, ths, D_CONST)[0])
        else:
            # Dichotomous fallback
            info = float(info_2pl(theta, a, ths[0]))
        if info > best_info:
            best_info = info
            best = it.id
    return best