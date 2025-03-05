import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./EditProfile.css"

const EditProfileModal = ({ show, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState(profile);

  console.log(profile)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = () => {
    onSave(formData); 
    console.log(formData)
    onClose(); 
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

  return (
    <Modal
  show={show}
  onHide={onClose}
  dialogClassName="wide-modal"
>
  <Modal.Header closeButton>
    <Modal.Title>Edit Profile</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group  className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDOB" className="mb-3">
            <Form.Label>Specialty</Form.Label>
            <Form.Control
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContactNumber" className="mb-3">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formEmergencyContact" className="mb-3">
            <Form.Label>Qualification</Form.Label>
            <Form.Control
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
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
              style={{
                width: "100%",
                marginBottom: "10px",
                borderRadius: "10px",
              }}
            />
          )}
          <Form.Group controlId="formBloodGroup" className="mb-3">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="A_POSITIVE">A_POSITIVE</option>
              <option value="A_NEGATIVE">A_NEGATIVE</option>
              <option value="B_POSITIVE">B_POSITIVE</option>
              <option value="B_NEGATIVE">B_NEGATIVE</option>
              <option value="AB_POSITIVE">AB_POSITIVE</option>
              <option value="AB_NEGATIVE">AB_NEGATIVE</option>
              <option value="O_POSITIVE">O_POSITIVE</option>
              <option value="O_NEGATIVE">O_NEGATIVE</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formAadharCard" className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

  );
};

export default EditProfileModal;
