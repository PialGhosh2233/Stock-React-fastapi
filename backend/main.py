from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from database import SessionLocal, Stock
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime
from fastapi import HTTPException
from fastapi_pagination import Page, add_pagination, paginate
from fastapi_pagination.ext.sqlalchemy import paginate as sqlalchemy_paginate
from sqlalchemy import select, desc

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   #Others cannot connect with backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model for input data
class StockBase(BaseModel):
    date: datetime.date
    trade_code: str
    high: float
    low: float
    open: float
    close: float
    volume: float

class StockResponse(StockBase):
    id: int

    class Config:
        orm_mode = True 
#Get stock
@app.get("/stocks", response_model=Page[StockResponse])
def get_stocks(page: int = Query(1, ge=1), trade_code: str = None, db: Session = Depends(get_db)):
    query = select(Stock)
    
    if trade_code:
        query = query.where(Stock.trade_code == trade_code)

    #query = query.order_by(desc(Stock.date))
    query = query.order_by(desc(Stock.date))
    print(str(query))

    return sqlalchemy_paginate(db, query)
#Create stock
@app.post("/stocks", response_model=StockResponse)
def create_stock(stock: StockBase, db: Session = Depends(get_db)):
    db_stock = Stock(**stock.dict())
    db.add(db_stock)
    db.commit()
    db.refresh(db_stock)
    return db_stock
add_pagination(app)

#Update stock
@app.put("/stocks/{stock_id}", response_model=StockResponse)
def update_stock(
    stock_id: int, 
    stock: StockBase, 
    db: Session = Depends(get_db)
):
    db_stock = db.get(Stock, stock_id)
    if not db_stock:
        raise HTTPException(status_code=404, detail="Stock not found")
    for key, value in stock.dict().items():
        setattr(db_stock, key, value)
    db.commit()
    db.refresh(db_stock)
    return db_stock
#Delete stock
@app.delete("/stocks/{stock_id}",response_model=StockResponse)
def delete_stock(stock_id: int, db: Session = Depends(get_db)):
    print(f"Deleting stock with ID: {stock_id}")
    db_stock = db.get(Stock, stock_id)
    if not db_stock:
        raise HTTPException(status_code=404, detail="Stock not found")
    db.delete(db_stock)
    db.commit()
    return {"message": "Stock deleted successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)