import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const UpdateRecord = ({ show, handleClose, setRefresh, record }) => {
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(record);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (token) {
      axios
        .put(`http://localhost:8080/api/medicalRecord/editRecord/${record.recordId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          message.success("Medical record updated successfully!");
          setRefresh((prev) => !prev);
          handleClose();
        })
        .catch((err) => {
          console.error("Error updating medical record:", err);
          message.error("Error updating medical record");
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Medical Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="symptoms">
            <Form.Label>Symptoms</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Enter symptoms"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="physicalExamination">
            <Form.Label>Physical Examination</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="physicalExamination"
              value={formData.physicalExamination}
              onChange={handleChange}
              placeholder="Enter physical examination details"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="treatmentPlan">
            <Form.Label>Treatment Plan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              placeholder="Enter treatment plan"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="testsRecommended">
            <Form.Label>Tests Recommended</Form.Label>
            <Form.Control
              type="text"
              name="testsRecommended"
              value={formData.testsRecommended}
              onChange={handleChange}
              placeholder="Enter recommended tests"
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

export default UpdateRecord;
