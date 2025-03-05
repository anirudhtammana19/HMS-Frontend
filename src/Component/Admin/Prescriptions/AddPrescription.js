import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const AddPrescription = ({ show, handleClose, setRefresh }) => {
  const { token } = useSelector((state) => state.user);
  const [recordID, setRecordID] = useState("");
  const [recordOptions, setRecordOptions] = useState([]); 

  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "AF", 
    duration: "",
    notes: "",
  });

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/admin/getAllRecords", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setRecordOptions(response.data); 
        })
        .catch((err) => {
          console.error("Error fetching record IDs:", err);
          message.error("Failed to load record IDs");
        });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (token) {
      if (!recordID) {
        message.warning("Please select a Record ID");
        return;
      }
      axios
        .post(
          `http://localhost:8080/api/medicalRecord/addPrescription/${recordID}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          message.success("Record added successfully!");
          setRefresh((prev) => !prev);
          handleClose();
        })
        .catch((err) => {
          console.error("Error adding record:", err);
          message.error("Error adding record");
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="recordID">
            <Form.Label>Record ID</Form.Label>
            <Form.Select
              value={recordID}
              onChange={(e) => setRecordID(e.target.value)}
            >
              <option value="">Select Record ID</option>
              {recordOptions.map((record) => (
                <option key={record.recordId} value={record.recordId}>
                  MR000{record.recordId}
                </option>
              ))}
            </Form.Select>
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
              placeholder="Enter any additional notes"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPrescription;
