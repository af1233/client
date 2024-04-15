import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UpdateCar() {
    const { id } = useParams();
    const [car, setCar] = useState({ name: '', color: '', rent: '', image: null });

    useEffect(() => {
        async function fetchCar() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/getCar/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car:', error);
            }
        }

        fetchCar();
    }, [id]);

    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append('name', car.name);
    //         formData.append('color', car.color);
    //         formData.append('rent', car.rent); 
    //         formData.append('image', car.image); // Append the image file

    //    const res=await axios.put(`http://localhost:5000/api/v1/update-car/${id}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data' // Set content type for formData
    //             }
    //         });
    //         if (res.data) {
    //             console.log(res.data)
    //         }
    //         alert('Car updated successfully');

    //         // Redirect user to the main page after updating
    //         window.location.href = '/mycars';
    //     } catch (error) {
    //         console.error('Error updating car:', error);
    //         alert('Failed to update car');
    //     }
    // };


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          // Check if each field has been changed and append to formData only if it's changed
          if (car.name !== "") formData.append('name', car.name);
          if (car.color !== "") formData.append('color', car.color);
          if (car.rent !== "") formData.append('rent', car.rent); 
          formData.append('image', car.image); // Append the image file
      
          const res = await axios.put(`http://localhost:5000/api/v1/update-car/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Set content type for formData
            }
          });
          if (res.data) {
            console.log(res.data)
          }
          alert('Car updated successfully');
      
          // Redirect user to the main page after updating
          window.location.href = '/mycars';
        } catch (error) {
          console.error('Error updating car:', error);
          alert('Failed to update car');
        }
      };
      
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            // Set the image file
            setCar({ ...car, image: e.target.files[0] });
        } else {
            setCar({ ...car, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="form_container">
            <h2>Update Car</h2>
            <div>
                <Form style={{ minWidth: "400px" }} onSubmit={handleUpdate}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={car.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicColor">
                        <Form.Label>Color:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter color"
                            name="color"
                            value={car.color}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRent">
                        <Form.Label>Rent:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Rent"
                            name="rent"
                            value={car.rent}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleChange} // Update the selected image file
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Car
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default UpdateCar;
