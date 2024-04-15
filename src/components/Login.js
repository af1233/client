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
  const {storeTokenToLS}=useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your login logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
      });
      if (res.data) {
        toast.success("login success");
        // Reset form fields
         storeTokenToLS(res.data.token)
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className=" form_container">
      <h2>Welcome To Login</h2>
      <div>
        <Form style={{ minWidth: "400px" }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Please Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
