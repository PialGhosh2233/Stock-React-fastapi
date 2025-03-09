import React from "react";
import "./App.css";
import StockTable from "./components/StockTable";
import StockChart from "./components/StockChart";
import { Container, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from "./components/ErrorBoundary"; 

const App = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Stock Market Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <ErrorBoundary> {/* StockChart with ErrorBoundary */}
          <StockChart />
        </ErrorBoundary>
        <StockTable />
      </Container>
    </div>
  );
};

export default App;
