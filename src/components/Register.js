import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Add your register logic here
    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Password:', password);
    try {
      const res=await axios.post("http://localhost:5000/api/v1/register", {
        name,
        email,
        password
      })
      if (res.data) {
        toast.success("register success");
           // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
    navigate('/login')
      }
    } catch (error) {
      toast(error)
    }

 
  };

  return (
    <div className=" form_container">
      <h2>Welcome To Register</h2>
      <div>
        <Form style={{ minWidth: "400px" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
          <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
