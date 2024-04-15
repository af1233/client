import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../redux/store';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [carNames, setCarName] = useState([]);

  const { token } = useAuth();
  
    // http://localhost:5000/api/v1/getAllUserBookings
    async function fetchCars() {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/v1/getAllUserBookings",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            } 
          );
          if (response.data) {
            setBookings(response.data.bookings);
            setCarName(response.data.carDetails);
          }
         
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching cars:", error);
        }
      }
      useEffect(() => {
        fetchCars();
      }, []);
  return (
    <>
            {bookings.length === 0 ? (
        <div className="form_container" style={{ textAlign: "center" }}>
          <h2>Ops, &#129322; You Don't have Bookings</h2>
          <Button as={Link} to={'/'} variant="primary" >Book Now </Button>
        </div>
      ) : (
  
    <div className='m-5 '>
      <h2>All Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr className='table-primary'>
            <th>Car</th>
            <th>Customer</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Contact</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
            <td>{carNames.find(car => car._id === booking.selectedCarId)?.name}</td>
              <td>{booking.username}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>
                Email: {booking.email}
                <br />
                Phone: {booking.phone}
                <br />
                Address: {booking.address}, {booking.city}
              </td>
              <td>{booking.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
          )  }
    </>
  );
}

export default AllBookings;
