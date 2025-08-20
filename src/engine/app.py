from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from cat.estimators import estimate_theta
from cat.selectors import select_next_item
from cat.stoppers import should_stop


class ItemParam(BaseModel):
    a: float
    b: float
    c: float | None = None
    d: float | None = None


class Item(BaseModel):
    id: str
    scaleId: Optional[str] = None
    params: ItemParam


class ResponseModel(BaseModel):
    itemId: str
    value: float


class NextRequest(BaseModel):
    scaleCode: Optional[str] = None
    theta: Optional[float] = None
    responses: List[ResponseModel]
    items: List[Item]


app = FastAPI(title="Adaptive Engine (Phase‑0)")

@app.post("/next")
def next_item(req: NextRequest):
    theta_hat, se = estimate_theta(req.responses, req.items)
    next_id = select_next_item(theta_hat, req.responses, req.items, req.scaleCode)
    stop = should_stop(theta_hat, se, min_se=0.32, max_items=12, n_answered=len(req.responses))
    return {"nextItemId": None if stop else next_id, "stop": stop, "theta": float(theta_hat), "se": float(se)}
    return {"message": "Endpoint not yet implemented"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)