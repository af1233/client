import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import useAuth from "../redux/store";
// import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [carNames, setCarName] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
  const { token } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/getOwnerCarOrders",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the authorization token in the header
        },
      }); // Assuming this is the endpoint to fetch orders
        // Sort orders by timestamp in descending order
        const sortedOrders = response.data.allUsersBookings.sort((a, b) => {
            return new Date(b.startDate) - new Date(a.endDate);
          });
      setOrders(sortedOrders);
      setCarName(response.data.carDetails);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <>
    {orders.length === 0 ? (
      <div className="form_container" style={{ textAlign: "center" }}>
        <h2>Ops, &#129322; You Don't have Orders</h2>
        <i><small>go to...   </small><Link to={'/'}>Home</Link></i>
      </div>
    ) : (
    <div style={{padding:"30px"}}>
      <h2>Customer Orders</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Car Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{orders.length-index}</td>
                <td>{carNames.find(car => car._id === order.selectedCarId)?.name}</td>

                <td>{formatDate(order.startDate)}</td>
                <td>{formatDate(order.endDate)}</td>
                <td>{order.username}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.city}</td>
                <td>{order.totalAmount} <small>Cash in Hand</small></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    )}
    </>
  );
}

export default OrdersTable;
