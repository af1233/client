import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center">404 - Page Not Found</h1>
          <p className="text-center">The page you are looking for does not exist.</p>
          <div className="text-center">
            <Button as={Link} to="/" variant="primary">Go Home</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
