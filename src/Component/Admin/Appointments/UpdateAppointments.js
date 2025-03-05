import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import DatePicker from "react-datepicker";

const UpdateAppointment = ({ show, handleClose, setRefresh, appointment }) => {
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(appointment);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      appointmentDate: date,
    }));
  };

  const handleSave = () => {
    if (token) {
      axios
        .put(`http://localhost:8080/api/admin/editAppointment/${appointment.appointmentId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          message.success("Appointment edited Successfully!");
          setRefresh(prev => !prev);
          handleClose();
        })
        .catch((err) => {
          console.error("Error editing Appointment:", err);
          message.error("Error editing Appointment");
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="appointmentDate" className="mb-3">
            <Form.Label>Appointment Date</Form.Label>
            <DatePicker
              selected={formData.appointmentDate}
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
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="reason" className="mb-3">
            <Form.Label>Reason for Visit</Form.Label>
            <Form.Control
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for visit"
            />
          </Form.Group>
          <Form.Group controlId="visitType" className="mb-3">
            <Form.Label>Visit Type</Form.Label>
            <Form.Control
              as="select"
              name="visitType"
              value={formData.visitType}
              onChange={handleChange}
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
              value={formData.consultationType}
              onChange={handleChange}
            >
              <option value="PHYSICAL">Physical</option>
              <option value="VIRTUAL">Virtual</option>
              <option value="HOME_VISIT">Home Visit</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAppointment;
