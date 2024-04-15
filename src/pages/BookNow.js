import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import useAuth from '../redux/store';
function BookNow() {
    const { id } = useParams();
    const [car, setCar] = useState({ name: '', color: '', rent: '' });
    const [carName, setCarName] = useState('');
    const [color, setColor] = useState('');
    const [rentPerDay, setRentPerDay] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [username , setUsername]=useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
   const navigate=useNavigate();
   const { token } = useAuth();
    useEffect(() => {
        async function fetchCar() {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/getCar/${id}`);
                setCar(response.data);
                setCarName(response.data.name);
                setColor(response.data.color);
                // Set default rent value when car data is fetched
                setRentPerDay(response.data.rent);
               
            } catch (error) {
                console.error('Error fetching car:', error);
            }
        }

        fetchCar();
    }, [id]);

    useEffect(() => {
        // Calculate total amount when the component mounts or when startDate and endDate are set
        if (startDate && endDate && rentPerDay) {
            calculateTotalAmount(startDate, endDate, rentPerDay);
        }
    }, [startDate, endDate, rentPerDay]);

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        setStartDate(selectedStartDate);
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        setEndDate(selectedEndDate);
    };

    // const handleRentPerDayChange = (e) => {
    //     const rent = e.target.value;
    //     setRentPerDay(car.rent);
    // };

    const calculateTotalAmount = (start, end, rent) => {
        const startTimestamp = new Date(start).getTime();
        const endTimestamp = new Date(end).getTime();
        const days = Math.ceil((endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24));
        const total = days * rent;
        setTotalAmount(total);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // console.log(carName,color,rentPerDay,startDate,endDate,username,address,email,phone,city,totalAmount)
        try {
            const res=await axios.post(`http://localhost:5000/api/v1/create-bookcar/${car._id}`,{
                startDate,endDate,username,address,email,phone,city,totalAmount
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            })
            if (res.data) {
                toast("order place success");
                navigate('/getallbookings')
            }
        } catch (error) {
            console.log(error);
        }
        // Handle form submission here
    };
 
    return (
<div className="container">
    <h3 className="text-center mt-5">Car Rental Form</h3>
    <Form className='m-5' onSubmit={handleSubmit}>
        <Row className='mb-3'>
            <Col md={4}>
                <Form.Group controlId="carName">
                    <Form.Label>Car Name</Form.Label>
                    <Form.Control type='text' placeholder='Car Name' readOnly value={car.name} />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type='text' placeholder='Color' readOnly value={car.color} />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId="rentPerDay">
                    <Form.Label>Rent/1(day)</Form.Label>
                    <Form.Control type='number' placeholder='Rent Per Day' readOnly value={car.rent} onChange={e=>setRentPerDay(car.rent)} />
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Start Date" value={startDate} onChange={handleStartDateChange} />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter End Date" value={endDate} onChange={handleEndDateChange} />
                </Form.Group>
            </Col>
        </Row>
        <Row className='mb-3'>
            <Col md={12}>
                <Form.Group controlId="userName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Name' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
            </Col>
        </Row>

        <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="totalAmount">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control type='text' placeholder='Total' value={totalAmount} readOnly />
                </Form.Group>
            </Col>
        </Row>
        <Button variant="success" type="submit">
            Book Me
        </Button>
    </Form>
</div>

    );
}

export default BookNow;
