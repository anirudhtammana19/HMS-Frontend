import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import EditProfileModal from "./EditProfile";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import ChangePasswordModal from "./Changepassword";

const Profile = ({ profile, onUpdateProfile }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { token } = useSelector((state) => state.user);

  const handleSave = (updatedData) => {
    axios
      .put(
        `http://localhost:8080/api/doctor/editProfile/${profile.doctorId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Profile updated successfully!");
        if (onUpdateProfile) {
          onUpdateProfile(response.data);
        }
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChangePassword = (newPasswordData) => {
    axios
      .put(
        `http://localhost:8080/api/doctor/editProfile/${profile.doctorId}`,
        newPasswordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success("Password changed successfully!");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  return (
    <>
      <div>
        <h3 className="text-center mb-3">Profile Info</h3>
        <hr />
      </div>
      <Row>
        <Col md={4} className="text-center">
          <img
            src={profile.profile_image}
            alt={profile.firstName}
            style={{
              width: "150px",
              height: "220px",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={6} className="mb-3">
              <p>
                <strong>Doctor ID:</strong> D000{profile.doctorId}
              </p>
              <p>
                <strong>Name:</strong> {profile.firstName} {profile.lastName}
              </p>
              <p>
                <strong>Specialty:</strong> {profile.specialty}
              </p>
              <p>
                <strong>Experience:</strong> {profile.experience} years
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Contact Number:</strong> {profile.contactNumber}
              </p>
              <p>
                <strong>Blood Group:</strong> {profile.bloodGroup}
              </p>
              <p>
                <strong>Gender:</strong> {profile.gender}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Button
          variant="primary"
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            marginRight: "10px",
            display: "inline-block",
            width: "auto",
          }}
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </Button>

        <Button
          variant="secondary"
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            display: "inline-block",
            width: "auto",
          }}
          onClick={() => setShowPasswordModal(true)}
        >
          Change Password
        </Button>
      </Row>

      <EditProfileModal
        show={showModal}
        onClose={() => setShowModal(false)}
        profile={profile}
        onSave={handleSave}
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
