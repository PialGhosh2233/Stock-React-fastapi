# 📈 Stock Market Dashboard  

This is a **Stock Market Dashboard** built with **FastAPI, React, MySQL, and Chart.js**. It provides a user-friendly interface to visualize stock market data, manage stock entries, and analyze trends using interactive charts and tables.  

## 🚀 Features  
✅ **FastAPI Backend**: Efficient REST API with CRUD operations.  
✅ **React Frontend**: Interactive UI for stock data visualization.  
✅ **MySQL Database**: Stores stock market data securely.  
✅ **Chart.js Integration**: Line & bar charts for stock trends.  
✅ **Pagination & Search**: Fast stock data browsing.  
✅ **CORS Enabled**: API accessible from the frontend.  

## 🛠️ Tech Stack  
- **Backend**: FastAPI, SQLAlchemy, MySQL  
- **Frontend**: React, Chart.js, Bootstrap  
- **Database**: MySQL  
- **API Features**: Pagination, Filtering, CRUD Operations  

## 📂 Project Structure  
```
📦 stock-market-dashboard  
├── backend/  
│   ├── database.py  # MySQL & SQLAlchemy setup  
│   ├── main.py      # FastAPI application  
│   ├── models.py    # Database models  
│   └── requirements.txt # Dependencies  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   │   ├── StockChart.jsx  # Visualizes stock data  
│   │   │   ├── StockTable.jsx  # Displays stock data with CRUD  
│   │   ├── api.js  # API service for fetching data  
│   │   └── App.jsx  # Main application entry
│   │   ├── index.css
│   │   └── main.jsx
│   │   └── App.css
│   ├── package.json # Frontend dependencies  
├── data_loader.py  # Script to load stock data from JSON to MySQL  
└── README.md  
```  

## 🚀 Getting Started  

### 1️⃣ Backend Setup  
```sh
cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  
```  

### 2️⃣ Frontend Setup  
```sh
cd frontend  
npm install  
npm start  
```  

### 3️⃣ API Endpoints  
- `GET /stocks` - Fetch stock data with pagination  
- `POST /stocks` - Add a new stock entry  
- `PUT /stocks/{id}` - Update stock data  
- `DELETE /stocks/{id}` - Remove a stock entry  

### 📌 Contributions  
Feel free to fork, contribute, or report issues! 🚀  
