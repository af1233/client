import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import useAuth from "../redux/store";

function MainHeader() {
  const { isloggedIn, LogoutUser } = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Car Rental
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100%" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {isloggedIn ? (
              <>
                <Nav.Link as={Link} to="/mycars">
                  My Cars
                </Nav.Link>
                <Nav.Link as={Link} to="/getallbookings">
                  My Bookings
                </Nav.Link>
                <Nav.Link as={Link} to="/getAll-carOrders">
                  Orders
                </Nav.Link>
            
            <Nav.Link as={Link} to="/addcar">
              Add Car
            </Nav.Link>
            </>
            ) 
            : (
              ""
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            {!isloggedIn ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-success"
                  className="mx-2"
                >
                  Login
                </Button>
                <Button as={Link} to="/register" variant="outline-primary">
                  Register
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="outline-danger"
                onClick={LogoutUser}
              >
                LogOut
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainHeader;
