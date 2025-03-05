import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";

const UpdateDoctor = ({ show, handleClose, setRefresh, doctor }) => {
  const { token } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(doctor);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (token) {
      axios
        .put(`http://localhost:8080/api/doctor/editProfile/${doctor.doctorId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          message.success("Doctor edited Successfully!");
          setRefresh(prev => !prev);
          handleClose();
        })
        .catch((err) => {
          console.error("Error editing Doctor:", err);
          message.error("Error editing Doctor");
        });
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "doctor_profile_images");
    uploadData.append("cloud_name", "dsd4xolgw");
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dsd4xolgw/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );
  
      const data = await response.json();
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile_image: data.secure_url,
      }));
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      message.error("Failed to upload image. Please try again.");
    }
  };

  const genderOptions = [
    { key: 'male', text: 'Male', value: 'MALE' },
    { key: 'female', text: 'Female', value: 'FEMALE' },
    { key: 'others', text: 'Others', value: 'OTHERS' },
  ];

  const bloodGroupOptions = [
    { key: 'a_positive', text: 'A Positive', value: 'A_POSITIVE' },
    { key: 'b_positive', text: 'B Positive', value: 'B_POSITIVE' },
    { key: 'o_positive', text: 'O Positive', value: 'O_POSITIVE' },
    { key: 'ab_positive', text: 'AB Positive', value: 'AB_POSITIVE' },
    { key: 'a_negative', text: 'A Negative', value: 'A_NEGATIVE' },
    { key: 'b_negative', text: 'B Negative', value: 'B_NEGATIVE' },
    { key: 'o_negative', text: 'O Negative', value: 'O_NEGATIVE' },
    { key: 'ab_negative', text: 'AB Negative', value: 'AB_NEGATIVE' },
  ];

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient Details</Modal.Title>
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
          <Form.Group className="mb-3" controlId="profileImage">
         <Form.Label>Upload Profile Image</Form.Label>
           <Form.Control
              type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Form.Group>
            {formData.profile_image && (
            <img
              src={formData.profile_image}
              alt="Profile Preview"
              style={{ width: "100%", marginBottom: "10px", borderRadius: "10px" }}
            />
          )}

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Speciality</Form.Label>
            <Form.Control
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Enter specialty"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emergencyContact">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="tel"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter Experience in years"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="allergies">
            <Form.Label>Qualification</Form.Label>
            <Form.Control
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter qualification"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="aadharCard">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
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

export default UpdateDoctor;
