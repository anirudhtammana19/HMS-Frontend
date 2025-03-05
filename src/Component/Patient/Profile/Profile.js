import React, { useState } from "react";
import { Card, Row, Col, Button} from "react-bootstrap";
import "./Profile.css";
import EditProfileModal from "./EditProfile";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import ChangePasswordModal from "./ChangePassword";

const Profile = ({ profile ,onUpdateProfile}) => {
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { token } = useSelector((state) => state.user);

  const handleSaveProfile = (updatedData) => {
    axios
      .put(`http://localhost:8080/api/patient/updateprofile/${profile.patientId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success("Profile edited successfully!");
        console.log("Profile updated successfully:", response.data);
        if (onUpdateProfile) {
          onUpdateProfile(response.data);
        }

      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChangePassword = (newPasswordData) => {
    axios
      .put(
        `http://localhost:8080/api/patient/updateprofile/${profile.patientId}`,
        newPasswordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Password changed successfully!");
        console.log("Password changed successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  return (
    <>
      <Card className="p-4 profile-card">
        <h5 className="mb-3">Profile Info</h5>
        <Row>
          <Col md={6}>
            <p>
              <strong>Patient ID:</strong> P000{profile.patientId}
            </p>
            <p>
              <strong>Name:</strong> {profile.firstName} {profile.lastName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profile.dateOfBirth}
            </p>
            <p>
              <strong>Phone:</strong> {profile.contactNumber}
            </p>
            <p>
              <strong>Gender:</strong> {profile.gender}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Allergies:</strong> {profile.allergies || "None"}
            </p>
          </Col>
          <Col md={6}>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Emergency Phone:</strong> {profile.emergencyContact}
            </p>
            <p>
              <strong>Blood Group:</strong> {profile.bloodGroup}
            </p>
            <p>
              <strong>Aadhar Card:</strong> {profile.aadharCard}
            </p>
            <p>
              <strong>Address:</strong> {profile.address}
            </p>
          </Col>
        </Row>
        <div style={{height:"40px"}} className="d-flex justify-content-center mt-3">
  <Button
    style={{ marginRight: "10px" }}
    variant="primary"
    onClick={() => setShowEditModal(true)}
  >
    Edit Profile
  </Button>
  <Button
    variant="secondary"
    onClick={() => setShowPasswordModal(true)}
  >
    Change Password
  </Button>
</div>

      </Card>

      <EditProfileModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={handleChangePassword}
      />
    </>
  );
};


export default Profile;
