import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const UpdatePrescription = ({ show, handleClose, setRefresh, prescription }) => {
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    recordId: prescription.recordId || "",
    medicationName: prescription.medicationName || "",
    dosage: prescription.dosage || "",
    frequency: prescription.frequency || "AF",
    duration: prescription.duration || "",
    notes: prescription.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log(prescription)
    if (token) {
      axios
        .put(
          `http://localhost:8080/api/medicalRecord/editPrescription/${prescription.recordId}/${prescription.prescriptionId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          message.success("Prescription updated successfully!");
          setRefresh((prev) => !prev);
          handleClose();
        })
        .catch((err) => {
          console.error("Error updating Prescription:", err);
          message.error("Error updating Prescription");
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="recordID">
            <Form.Label>Record ID</Form.Label>
            <Form.Control
              type="text"
              name="recordID"
              value={`MR000${formData.recordId}`}
              disabled
              placeholder="Record ID (read-only)"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="medicationName">
            <Form.Label>Medication Name</Form.Label>
            <Form.Control
              type="text"
              name="medicationName"
              value={formData.medicationName}
              onChange={handleChange}
              placeholder="Enter medication name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dosage">
            <Form.Label>Dosage</Form.Label>
            <Form.Control
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="Enter dosage"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="frequency">
            <Form.Label>Frequency</Form.Label>
            <Form.Select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option value="AF">After Food</option>
              <option value="BF">Before Food</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration (in days)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter duration"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter additional notes"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePrescription;
