import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../redux/store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { storeTokenToLS } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
      });
      if (res.data) {
        toast.success("Login successful");
        storeTokenToLS(res.data.token);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome To Login</h2>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3">
              Submit
            </Button>
            <p className="mt-3 text-center">
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Please Register
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
