import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentModal = ({ show, handleClose, doctor, handleSubmitAppointment }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    appointmentDate: new Date(),
    appointmentTime: "10:00",
    status: "REQUESTED",
    reason: "",
    visitType: "General",
    consultationType: "PHYSICAL",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setAppointmentDetails((prevState) => ({
      ...prevState,
      appointmentDate: date,
    }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitAppointment(appointmentDetails);
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Appointment with Dr. {doctor.firstName} {doctor.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="appointmentDate" className="mb-3">
            <Form.Label>Appointment Date</Form.Label>
            <DatePicker
              selected={appointmentDetails.appointmentDate}
              onChange={handleDateChange}
              className="form-control"
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
            />
          </Form.Group>
          <Form.Group controlId="appointmentTime" className="mb-3">
            <Form.Label>Appointment Time</Form.Label>
            <Form.Control
              type="time"
              name="appointmentTime"
              value={appointmentDetails.appointmentTime}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="reason" className="mb-3">
            <Form.Label>Reason for Visit</Form.Label>
            <Form.Control
              type="text"
              name="reason"
              value={appointmentDetails.reason}
              onChange={handleInputChange}
              placeholder="Enter reason for visit"
            />
          </Form.Group>
          <Form.Group controlId="visitType" className="mb-3">
            <Form.Label>Visit Type</Form.Label>
            <Form.Control
              as="select"
              name="visitType"
              value={appointmentDetails.visitType}
              onChange={handleInputChange}
            >
              <option value="General">General</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine Checkup">Routine Checkup</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Vaccination">Vaccination</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="consultationType" className="mb-3">
            <Form.Label>Consultation Type</Form.Label>
            <Form.Control
              as="select"
              name="consultationType"
              value={appointmentDetails.consultationType}
              onChange={handleInputChange}
            >
              <option value="PHYSICAL">Physical</option>
              <option value="VIRTUAL">Virtual</option>
              <option value="HOME_VISIT">Home Visit</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="me-3">
            Confirm Appointment
          </Button>
          <Button  variant="secondary" onClick={handleClose} className="me-3">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentModal;
