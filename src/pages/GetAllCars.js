import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import SortingComp from "../components/SortingComp";
// import Spinner from "react-bootstrap/Spinner";
import Loader from "../components/Loader";

function AllCars() {
  const [cars, setCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [loading, setLoading] = useState(true); // State to track loading status
  const [searchPerformed, setSearchPerformed] = useState(false);

  async function fetchCars() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/getAllcars`
      );
      setCars(response.data);
      setLoading(false); // Set loading to false when cars are fetched
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false); // Set loading to false in case of error
    }
  }

  useEffect(() => {
    fetchCars();
  }, []); // Fetch cars only once when component mounts

  const handleSort = (event) => {
    const sortType = event.target.value;
    let sorted = [...sortedCars];
    if (sortType === "rentLowToHigh") {
      sorted = sorted.sort((a, b) => a.rent - b.rent);
    } else if (sortType === "rentHighToLow") {
      sorted = sorted.sort((a, b) => b.rent - a.rent);
    } else if (sortType === "nameAscending") {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "nameDescending") {
      sorted = sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSortedCars(sorted);
  };

  // const handleSearch = () => {
  //   const filteredCars = cars.filter((car) => {
  //     const hasOverlap = car.bookedTimeSlots.some((slot) => {
  //       return slot.startDate < endDate && slot.endDate > startDate;
  //     });
  //     return !hasOverlap;
  //   });
  //   setSortedCars(filteredCars);
  //   setSearchPerformed(true); // Set searchPerformed to true after search
  // };
  const handleSearch = () => {
    // Check if the start date is greater than the end date
    if (startDate > endDate) {
      // If start date is greater, set end date equal to start date
      setEndDate(startDate);
    }
  
    // Perform the search logic
    const filteredCars = cars.filter((car) => {
      const hasOverlap = car.bookedTimeSlots.some((slot) => {
        return slot.startDate < endDate && slot.endDate > startDate;
      });
      return !hasOverlap;
    });
  
    setSortedCars(filteredCars);
    setSearchPerformed(true); // Set searchPerformed to true after search
  };
  
  return (
    <>
    <div  className="search-items">
      <h2 className="text-center my-4">Find Used Cars in Pakistan</h2>
   <div>
   <SortingComp
        handleSort={handleSort}
        handleSearch={handleSearch}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        searchPerformed={searchPerformed}
      />
   </div>
    </div>
    {/* ........................... */}
    {loading ? (
        <div className="text-center my-5">
          <Loader />
        </div>
      ) : searchPerformed ? (
        <div className="row justify-content-start cars-section">
          {sortedCars.length > 0 ? (
            sortedCars.map((car, index) => (
              <div key={car._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={car.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Text>
                      Color: {car.color}
                      <br />
                      Rent: ${car.rent}/day
                    </Card.Text>
                    <Button
                      as={Link}
                      variant="outline-primary"
                      to={`/booknow/${car._id}?startDate=${startDate}&endDate=${endDate}`}
                    >
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center">No available cars for selected dates.</p>
          )}
        </div>
      ) : (
       null
      )}
    </>
  );
}

export default AllCars;
