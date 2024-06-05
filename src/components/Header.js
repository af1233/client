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
    <Navbar expand="lg" className="navbar px-3">
      <Container fluid>
        <Navbar.Brand>
          <div className="logo-container">
           {/* <h2>Car <span>Rental.</span></h2>
            */}
            <img
            src="./logo1.svg"
            width="130"
            className="d-inline-block align-top"
            alt="Car Logo"
          />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to={'/'} className="nav-links items" style={{color:"white"}}>Home</Nav.Link>
            {isloggedIn ? (
              <>
                <Nav.Link as={Link} to={'/mycars'} className="nav-links items"  style={{color:"white"}}>MyCar</Nav.Link>
                <Nav.Link as={Link} to={'/addcar'} className="nav-links items"  style={{color:"white"}}>Add Car</Nav.Link>
                <Nav.Link as={Link} to={'/getallbookings'} className="nav-links items"  style={{color:"white"}}>Bookings</Nav.Link>
                <Nav.Link as={Link} to={'/getAll-carOrders'} className="nav-links items"  style={{color:"white"}}>MyOrdrs</Nav.Link>
              </>
            ) : null }
          </Nav>
          <Form className="d-flex">
            {!isloggedIn ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="danger"
                  className="login-button"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="success"
                  className="login-button"
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="outline-danger"
                className="logout-button"
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
