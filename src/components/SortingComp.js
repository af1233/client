import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";

// export default function SortingComp({
//   handleSort,
//   handleSearch,
//   setEndDate,
//   setStartDate,
//   startDate,
//   endDate,
//   searchPerformed,
// }) {
//   const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

//   return (
//     <div>
//       <div className="mb-3">
//         <Container fluid>
//           {searchPerformed ? (
//             <Row className="mb-3 justify-content-center align-items-center">
//               <Col xs={12} sm={6} md={4} className="mb-3">
//                 <Form.Select aria-label="Sort Cars" onChange={handleSort}>
//                   <option>Sort Cars</option>
//                   <option value="rentLowToHigh">Rent: Low to high</option>
//                   <option value="rentHighToLow">Rent: High to low</option>
//                   <option value="nameAscending">Name: Ascending order</option>
//                   <option value="nameDescending">Name: Descending order</option>
//                 </Form.Select>
//               </Col>
//             </Row>
//           ) : null}
//           <Row className="justify-content-center">
//             <Col xs={12} sm={6} md={4} className="mb-3">
//               <Form.Group controlId="startDate">
//                 <Form.Label>Start Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Enter Start Date"
//                   value={startDate}
//                   min={today} // Set min attribute to today's date
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col xs={12} sm={6} md={4} className="mb-3">
//               <Form.Group controlId="endDate">
//                 <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   placeholder="Enter End Date"
//                   value={endDate}
//                   min={startDate} // Set min attribute to the selected start date
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col
//               xs={12}
//               sm={6}
//               md={2}
//               className="mb-3 d-flex align-items-end"
//             >
//               <Button variant="primary" onClick={handleSearch}>
//                 Search
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// }
export default function SortingComp({
  handleSort,
  handleSearch,
  setEndDate,
  setStartDate,
  startDate,
  endDate,
  searchPerformed,
}) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
  
    // Convert selected start date to a Date object
    const startDateObj = new Date(selectedStartDate);
  
    // Check if selected start date is greater than current end date
    if (startDateObj > new Date(endDate)) {
      // Add one day to the selected start date
      const nextDay = new Date(startDateObj);
      nextDay.setDate(startDateObj.getDate() + 1);
  
      // Convert the next day back to a string in yyyy-mm-dd format
      const nextDayString = nextDay.toISOString().split('T')[0];
  
      // Set end date to be equal to the next day
      setEndDate(nextDayString);
    }
  };
  
  

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
  };

  return (
    <div>
      <div className="mb-3">
        <Container>
          <Row className="date-fields">
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Start Date"
                  value={startDate}
                  min={today} // Set min attribute to today's date
                  onChange={handleStartDateChange} // Call handleStartDateChange on change
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter End Date"
                  value={endDate}
                  min={startDate} // Set min attribute to the selected start date
                  onChange={handleEndDateChange} // Call handleEndDateChange on change
                />
              </Form.Group>
            </Col>
            <Col
              xs={12}
              sm={6}
              md={2}
              className="mb-3 d-flex align-items-end"
            >
              <Button variant="success" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
          {searchPerformed ? (
            <Row className="mt-5 justify-content-center align-items-center">
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Select aria-label="Sort Cars" onChange={handleSort}>
                  <option>Sort Cars</option>
                  <option value="rentLowToHigh">Rent: Low to high</option>
                  <option value="rentHighToLow">Rent: High to low</option>
                  <option value="nameAscending">Name: Ascending order</option>
                  <option value="nameDescending">Name: Descending order</option>
                </Form.Select>
              </Col>
            </Row>
          ) : null}
        </Container>
      </div>
    </div>
  );
}
