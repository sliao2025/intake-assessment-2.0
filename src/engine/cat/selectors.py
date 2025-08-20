from .models import info_2pl

def select_next_item(theta, responses, items, scale_code=None):
    answered = {r.itemId for r in responses}
    best = None
    best_info = -1.0
    for it in items:
        if it.id in answered:
            continue
        if scale_code and it.scaleId and it.scaleId != scale_code:
            continue
        info = info_2pl(theta, it.params.a, it.params.b)
        if info > best_info:
            best_info = info
            best = it.id
    return best