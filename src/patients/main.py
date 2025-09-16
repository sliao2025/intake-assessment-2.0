from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from models import Profile

app = FastAPI(title="Patient Data Storage")

@app.get("/")
def root():
    return {"message": "Patient Data Storage"}

@app.post("/store")
def store_results(req:Profile):
    # Placeholder for storing results; in a real app this would save to a database
    print(req, 'storing to database...')
    return {"status": "success", "data": req}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)