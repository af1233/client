import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import SortingComp from "../components/SortingComp";
import Spinner from "react-bootstrap/Spinner";
import Loader from "../components/Loader";

function AllCars() {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [sortByRent, setSortByRent] = useState(null);
  const [sortByName, setSortByName] = useState(null);
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [loading, setLoading] = useState(true); // State to track loading status

  async function fetchCars() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/getAllcars`
      );
      setCars(response.data);
      setSortedCars(response.data);
      setLoading(false); // Set loading to false when cars are fetched
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false); // Set loading to false in case of error
    }
  }

  useEffect(() => {
    fetchCars();
  }, [startDate, endDate]); // Fetch cars when start date or end date changes

  // Function to handle sorting by rent
  const handleSortByRent = (event) => {
    const sortType = event.target.value;
    let sorted = [...sortedCars];
    if (sortType === "1") {
      sorted = sorted.sort((a, b) => a.rent - b.rent);
    } else if (sortType === "2") {
      sorted = sorted.sort((a, b) => b.rent - a.rent);
    }
    setSortedCars(sorted);
    setSortByRent(sortType);
  };

  // Function to handle sorting by name
  const handleSortByName = (event) => {
    const sortType = event.target.value;
    let sorted = [...sortedCars];
    if (sortType === "1") {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "2") {
      sorted = sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSortedCars(sorted);
    setSortByName(sortType);
  };

  const handleSearch = () => {
    const filteredCars = cars.filter((car) => {
      // Check each booked time slot for overlap with the specified start and end dates
      const hasOverlap = car.bookedTimeSlots.some((slot) => {
        return slot.startDate < endDate && slot.endDate > startDate;
      });
      // If no overlap is found, include the car in filteredCars
      return !hasOverlap;
    });
    // Update sortedCars state with the filtered cars
    setSortedCars(filteredCars);
  };

  return (
    <div style={{ marginTop: "30px", padding: "30px" }}>
      <h2 className="mb-4 pb-3">All Cars</h2>
      <SortingComp
        handleSearch={handleSearch}
        handleSortByName={handleSortByName}
        handleSortByRent={handleSortByRent}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
      {loading ? (
       <div>
        <Loader/>
       </div>
      ) : (
        <ul className="d-flex justify-between items-center flex-wrap gap-5 mt-3">
          {sortedCars.map((car) => (
            <Card style={{ width: "14rem" }} key={car._id}>
              <Card.Img
                variant="top"
                src={car.image}
                style={{ height: "200px", objectFit: "cover" }} // Set a fixed height and object-fit style
              />
              <Card.Body>
                <Card.Title>Name: {car.name}</Card.Title>
                <Card.Text>
                  Color: {car.color}
                  <br />
                  Rent: ${car.rent}/day
                </Card.Text>
                <Button
                  as={Link}
                  variant="outline-primary"
                  to={`/booknow/${car._id}`}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllCars;
