import json
import mysql.connector
from datetime import datetime

# Load JSON file
json_file_path = r"C:\xampp\htdocs\mysql_from_json\stock_market_data.json"
with open(json_file_path, "r") as file:
    data = json.load(file)

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",   # Keep as "localhost" if MySQL is running locally
    user="root",        # Your MySQL username (default is "root")
    password="",        # Leave empty if no password is set
    database="stock_db" # The database you created for stock market data
)

cursor = db.cursor()

# Insert data into MySQL
for record in data:
    try:
        # Convert date format
        record_date = datetime.strptime(record["date"], "%Y-%m-%d").date()
        
        # Convert values and remove commas from volume
        high = float(record["high"]) if record["high"] else 0
        low = float(record["low"]) if record["low"] else 0
        open_price = float(record["open"]) if record["open"] else 0
        close = float(record["close"]) if record["close"] else 0
        volume = int(record["volume"].replace(",", "")) if record["volume"] else 0

        # Insert into MySQL
        sql = """
        INSERT INTO stocks (date, trade_code, high, low, open, close, volume)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (record_date, record["trade_code"], high, low, open_price, close, volume)
        
        cursor.execute(sql, values)
    except Exception as e:
        print(f"Error inserting record {record}: {e}")

# Commit and close connection
db.commit()
cursor.close()
db.close()

print("Data uploaded successfully!")
