import React, { useEffect, useState } from "react";
import api from "../api";
import { Chart as ChartJS, LineController, BarController, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Form, Container } from "react-bootstrap";


ChartJS.register(LineController, BarController, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const StockChart = () => {
  const [stocks, setStocks] = useState([]);
  const [tradeCodes, setTradeCodes] = useState([]);
  const [selectedTradeCode, setSelectedTradeCode] = useState("");

  // Fetch trade codes first
  useEffect(() => {
    const fetchTradeCodes = async () => {
      try {
        const response = await api.get("/stocks");
        const uniqueTradeCodes = Array.from(new Set(response.data.items.map((s) => s.trade_code)));
        setTradeCodes(uniqueTradeCodes);

        if (uniqueTradeCodes.length > 0) {
          setSelectedTradeCode(uniqueTradeCodes[0]);
        }
      } catch (error) {
        console.error("Error fetching trade codes", error);
      }
    };
    fetchTradeCodes();
  }, []);

  // Fetch stocks when trade code changes
  useEffect(() => {
    if (selectedTradeCode) {
      fetchStocks();
    }
  }, [selectedTradeCode]);

  const fetchStocks = async () => {
    try {
      const response = await api.get("/stocks", { params: { trade_code: selectedTradeCode } });
      setStocks(response.data.items);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  // Chart Data
  const chartData = {
    labels: stocks.map((s) => s.date),
    datasets: [
      {
        label: "Close Price",
        data: stocks.map((s) => s.close),
        borderColor: "blue",
        backgroundColor: "transparent",
        type: "line",
      },
      {
        label: "Volume",
        data: stocks.map((s) => s.volume),
        backgroundColor: "red",
        type: "bar",
      },
    ],
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Stock Market Chart</h2>
      {/*Chart*/}
      <Form.Group className="mb-3">
        <Form.Label>Select Trade Code</Form.Label>
        <Form.Select value={selectedTradeCode} onChange={(e) => setSelectedTradeCode(e.target.value)}>
          {tradeCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="chart-container">
        {stocks.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-center">No data available for this trade code.</p>
        )}
      </div>
    </Container>
  );
};

export default StockChart;