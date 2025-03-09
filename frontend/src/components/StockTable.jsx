import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import api from "../api";
import { Table, Button, Modal, Form } from "react-bootstrap";

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    trade_code: "",
    high: "",
    low: "",
    open: "",
    close: "",
    volume: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, [currentPage]);
//Fetching stocks
  const fetchStocks = async () => {
    try {
      const response = await api.get("/stocks", { params: { page: currentPage } });
      setStocks(response.data.items || []);
      setTotalPages(response.data.pages || 1);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      date: "",
      trade_code: "",
      high: "",
      low: "",
      open: "",
      close: "",
      volume: "",
    });
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
//Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedStock) {
        // Update stock
        await api.put(`/stocks/${selectedStock.id}`, formData);
      } else {
        // Create new stock
        await api.post("/stocks", formData);
      }
      fetchStocks(); // Refresh stock list after updating
      handleModalClose();
    } catch (error) {
      console.error("Error saving stock data", error);
    }
  };

  const handleEditClick = (stock) => {
    setSelectedStock(stock);
    setIsEditMode(true);
    setFormData({
      date: stock.date,
      trade_code: stock.trade_code,
      high: stock.high,
      low: stock.low,
      open: stock.open,
      close: stock.close,
      volume: stock.volume,
    });
    setShowModal(true);
  };
//To handle delete
  const handleDeleteClick = async (stockId) => {
    try {
      //Delete stock
      await api.delete(`/stocks/${stockId}`);
      fetchStocks(); // Refresh stock list after deleting
    } catch (error) {
      console.error("Error deleting stock", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Stock Market Data</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        + Add New Stock
      </Button>
      {/*Stock Table*/}
      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Trade Code</th>
            <th>High</th>
            <th>Low</th>
            <th>Open</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.date}</td>
                <td>{stock.trade_code}</td>
                <td>{stock.high}</td>
                <td>{stock.low}</td>
                <td>{stock.open}</td>
                <td>{stock.close}</td>
                <td>{stock.volume}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(stock)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => handleDeleteClick(stock.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No stock data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Paginate */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
      />

      {/* Modal for Adding/Editing Stock */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Stock" : "Add New Stock"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Trade Code</Form.Label>
              <Form.Control
                type="text"
                name="trade_code"
                value={formData.trade_code}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>High</Form.Label>
              <Form.Control
                type="number"
                name="high"
                value={formData.high}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Low</Form.Label>
              <Form.Control
                type="number"
                name="low"
                value={formData.low}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Open</Form.Label>
              <Form.Control
                type="number"
                name="open"
                value={formData.open}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Close</Form.Label>
              <Form.Control
                type="number"
                name="close"
                value={formData.close}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type="number"
                name="volume"
                value={formData.volume}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditMode ? "Save Changes" : "Add Stock"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StockTable;
