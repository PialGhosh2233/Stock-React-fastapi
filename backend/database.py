import mysql.connector
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create connection to the MySQL database using mysql.connector
#db_connection = mysql.connector.connect(
#    host="localhost",
#    user="root",
#    password="", 
#    database="stock_db"
#)

# SQLAlchemy setup
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:@localhost:3306/stock_db"

# Create engine with MySQL connection
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

# SessionLocal to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for SQLAlchemy models
Base = declarative_base()

#Stock model
from sqlalchemy import Column, Integer, String, Float, Date

class Stock(Base):
    __tablename__ = 'stocks'

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    trade_code = Column(String(10))
    high = Column(Float)
    low = Column(Float)
    open = Column(Float)
    close = Column(Float)
    volume = Column(Float)
