import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import useAuth from "../redux/store";
import Loader from "../components/Loader";

function AddCar() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [rent, setRent] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [loading, setLoading] = useState(false); // State to track loading status
  const navigate = useNavigate();
  const {token}=useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("color", color);
      formData.append("rent", rent);
      formData.append("image", image); // Append the image file to form data

      const res = await axios.post("http://localhost:5000/api/v1/create-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
          Authorization: `Bearer ${token}`
        },
      });

      if (res.data) {
        // Reset form fields and show success toast if needed
        toast.success("Car added successfully");
        setName("");
        setColor("");
        setRent("");
        setImage(null); // Reset the selected image file
        // Immediately navigate to home page
        navigate('/mycars');
      }
    } catch (error) {
      // Show error toast if request fails
      toast.error("Failed to add car");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <div className="modal" style={{ display: loading ? 'block' : 'none' }}>
        <Loader />
      </div>
      <div className="form_container">
        <h2>Add Car</h2>
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

            <Form.Group className="mb-3" controlId="formBasicColor">
              <Form.Label>Color:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRent">
              <Form.Label>Rent:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rent"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image:<small> (image size must be less then 5 MB)</small></Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // Update the selected image file
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Car
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
