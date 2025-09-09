from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from cat.estimators import estimate_theta, expected_total
from cat.selectors import select_next_item
from cat.stoppers import should_stop
from cat.stoppers import DEFAULT_MIN_SE, DEFAULT_MAX_ITEMS


class ItemParam(BaseModel):
    a: float
    bs: Optional[list[float]] = None  # GRM thresholds (preferred)
    b: Optional[float] = None         # 2PL fallback (single threshold)


class Item(BaseModel):
    id: str
    scaleId: Optional[str] = None
    params: ItemParam


class ResponseModel(BaseModel):
    itemId: str
    value: int  # integer category 0..M for that item


class NextRequest(BaseModel):
    scaleCode: Optional[str] = None
    theta: Optional[float] = None
    responses: List[ResponseModel]
    items: List[Item]

# Start request model
class StartRequest(BaseModel):
    scaleCode: Optional[str] = None
    items: List[Item]


app = FastAPI(title="Adaptive Engine (Phase‑0)")


@app.get("/")
def root():
    return {"message": "Adaptive Engine (Phase‑0)"}

@app.post("/next")
def next_item(req: NextRequest):
    theta_hat, se = estimate_theta(req.responses, req.items)
    next_id = select_next_item(theta_hat, req.responses, req.items, req.scaleCode)
    expectedtotal = expected_total(theta_hat, req.items)
    stop = should_stop(theta_hat, se, min_se=DEFAULT_MIN_SE, max_items=DEFAULT_MAX_ITEMS, n_answered=len(req.responses))
    return {"nextItemId": None if stop else next_id, "stop": stop, "theta": float(theta_hat), "se": float(se), 'expectedTotal': float(expectedtotal)}

@app.post("/start")
def start_cat(req: StartRequest):
    # Start with theta=0.0 and no responses; pick the most informative item at 0
    theta0 = 0.0
    next_id = select_next_item(theta0, [], req.items, req.scaleCode)
    # Use defaults for stop rule; with 0 items answered it will not stop
    stop = should_stop(theta0, 1.0, min_se=DEFAULT_MIN_SE, max_items=DEFAULT_MAX_ITEMS, n_answered=0)
    return {"nextItemId": next_id, "stop": stop, "theta": float(theta0), "se": 1.0}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)