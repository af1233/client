import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";

export default function SortingComp({
  handleSortByRent,
  handleSortByName,
  handleSearch,
  setEndDate,
  setStartDate,
  startDate,
  endDate,
}) {
  return (
    <div>
      <div className="mb-3">
        <Container fluid>
          <Row className="mb-3 justify-content-center align-items-center">
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Form.Select
                aria-label="Sort Cars by Rent"
                onChange={handleSortByRent}
              >
                <option>Sort Cars by Rent</option>
                <option value="1">Low to high</option>
                <option value="2">High to low</option>
              </Form.Select>
            </Col>
 
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Form.Select
                aria-label="Sort Cars by Name"
                onChange={handleSortByName}
              >
                <option>Sort Cars by Name</option>
                <option value="1">Ascending order</option>
                <option value="2">Descending order</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={2} className="mb-3 d-flex align-items-end">
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
