import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import useAuth from "../redux/store";

function MyCars() {
  const [cars, setCars] = useState([]);
  const { token } = useAuth();
  
  async function fetchCars() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/getSignleUserCars",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  useEffect(() => {
    fetchCars();
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete-car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Car deleted successfully');
      fetchCars(); // Refresh car list after deletion
    } catch (error) {
      console.error("Error deleting car:", error);
      alert('Failed to delete car');
    }
  };

  return (
    <>
      {cars.length === 0 ? (
        <div className="container">
          <div className="form_container text-center">
            <h2>Ops, &#129322; You Don't have Cars For Rent</h2>
            <Button as={Link} to={'/addcar'} variant="primary" >Add Car</Button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div style={{ marginTop: "30px", padding: "30px" }}>
            <h2 className="text-center mb-4">My Cars</h2>
            <div className="row justify-content-center">
              {cars.map((car) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={car._id}>
                  <Card>
                    <Card.Img variant="top" src={car.image} style={{ height: "200px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title>{car.name}</Card.Title>
                      <Card.Text>
                        Rent: ${car.rent}/day
                      </Card.Text>
                      <Button as={Link} variant="outline-primary" className="mx-2" to={`/updatecar/${car._id}`}>Update</Button>
                      <Button variant="outline-danger" className="mx-2" onClick={() => handleDelete(car._id)}>Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyCars;
