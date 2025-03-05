import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RescheduleAppointment = ({
  show,
  appointment,
  onClose,
  onSubmit,
}) => {
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState("10:00");

  const handleSubmit = () => {
    const updatedAppointment = {
      appointmentId: appointment.appointmentId,
      newDate: newDate.toISOString().split("T")[0],
      newTime,
    };
    onSubmit(updatedAppointment);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reschedule Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* New Date */}
          <Form.Group controlId="newDate" className="mb-3">
            <Form.Label>New Appointment Date</Form.Label>
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)}
              minDate={new Date()}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="newTime" className="mb-3">
            <Form.Label>New Appointment Time</Form.Label>
            <Form.Control
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RescheduleAppointment;
