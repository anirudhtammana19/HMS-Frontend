import React, { useState } from "react";
import { Modal, Input, notification, Button, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";

const ForgotPasswordModal = ({ isVisible, handleClose }) => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(null); 
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordReset = () => {
    if (!email || !dob || !newPassword) {
      notification.error({
        message: "Missing Information",
        description: "Please fill in all fields before submitting.",
        placement: "top",
        duration: 3.0,
      });
      return;
    }

    const formattedDob = dob.format("YYYY-MM-DD");
    const payload = { username: email, password: newPassword };

    axios
      .put(`http://localhost:8080/api/forgotPassword/${formattedDob}`, payload)
      .then((res) => {
        if (res.data === "ADMIN" || res.data === "DOCTOR") {
          notification.error({
            message: "Password Reset Failed",
            description: "Admin and Doctors can't reset Password.",
            placement: "top",
            duration: 3.0,
          });
        } else {
          notification.success({
            message: "Password Reset Successful",
            description: "Your password has been updated.",
            placement: "top",
            duration: 3.0,
          });
        }
        handleClose();
      })
      .catch(() => {
        notification.error({
          message: "Password Reset Failed",
          description: "Please check your details and try again.",
          placement: "top",
          duration: 3.0,
        });
      });
  };

  return (
    <Modal
      title="Reset Password of Patient"
      open={isVisible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handlePasswordReset}>
          Reset Password
        </Button>,
      ]}
    >
      <Input
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <DatePicker
        placeholder="Date of Birth"
        value={dob} 
        onChange={(date) => setDob(date)} 
        format="YYYY-MM-DD"
        disabledDate={(current) => current && current > moment().endOf("day")} 
        style={{ marginBottom: "10px", width: "100%" }}
      />
      <Input.Password
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ marginTop: "10px" }}
      />
    </Modal>
  );
};

export default ForgotPasswordModal;
