import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import useAuth from "../redux/store";
// import UpdateCar from "./UpdateCar";

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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

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
        <div className="form_container" style={{ textAlign: "center" }}>
          <h2>Ops, &#129322; You Don't have Cars For Rent</h2>
          <Button as={Link} to={'/addcar'} variant="primary" >Add Car</Button>
        </div>
      ) : (
        <div style={{ marginTop: "30px", padding: "30px" }}>
          <h2>My Cars</h2>
          <ul className="d-flex justify-between items-center flex-wrap gap-5 mt-3">
            {cars.map((car) => (
              <Card style={{ width: "14rem" }} key={car._id}>
              <Card.Img
                variant="top"
                src={car.image}
                style={{ height: "200px", objectFit: "cover" }} // Set a fixed height and object-fit style
              />
                <Card.Body>
                  <Card.Title>Name: {car.name}</Card.Title>
                  <Card.Text>
                    Rent: ${car.rent}/day
                  </Card.Text>
                  <Button as={Link} variant="outline-primary" className="mx-2" to={`/updatecar/${car._id}`}>Update</Button>
                  <Button variant="outline-danger" className="mx-2"  onClick={() => handleDelete(car._id)}>Delete</Button>
                </Card.Body>
                {/* Render UpdateCar component */}
              </Card>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MyCars;
