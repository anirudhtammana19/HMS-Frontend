import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const AddPatient = ({ show, handleClose, setRefresh }) => {
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContact: "",
    allergies: "",
    aadharCard: "",
    bloodGroup: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (token) {
      axios
        .post(`http://localhost:8080/api/register`, formData)
        .then((response) => {
          message.success("Patient added Successfully!");
          setRefresh((prev) => !prev);
          handleClose();
        })
        .catch((err) => {
          console.error("Error adding Patient:", err);
          message.error("Error adding Patient");
        });
    }
  };

  const genderOptions = [
    { key: "male", text: "Male", value: "MALE" },
    { key: "female", text: "Female", value: "FEMALE" },
    { key: "others", text: "Others", value: "OTHERS" },
  ];

  const bloodGroupOptions = [
    { key: "a_positive", text: "A Positive", value: "A_POSITIVE" },
    { key: "b_positive", text: "B Positive", value: "B_POSITIVE" },
    { key: "o_positive", text: "O Positive", value: "O_POSITIVE" },
    { key: "ab_positive", text: "AB Positive", value: "AB_POSITIVE" },
    { key: "a_negative", text: "A Negative", value: "A_NEGATIVE" },
    { key: "b_negative", text: "B Negative", value: "B_NEGATIVE" },
    { key: "o_negative", text: "O Negative", value: "O_NEGATIVE" },
    { key: "ab_negative", text: "AB Negative", value: "AB_NEGATIVE" },
  ];

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emergencyContact">
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Enter emergency contact"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="allergies">
            <Form.Label>Allergies</Form.Label>
            <Form.Control
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Enter allergies"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="aadharCard">
            <Form.Label>Aadhar Card</Form.Label>
            <Form.Control
              type="text"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
              placeholder="Enter aadhar card"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bloodGroup">
            <Form.Label>Blood Group</Form.Label>
            <Form.Control
              as="select"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              {bloodGroupOptions.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
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

export default AddPatient;
