import React from 'react';
import { Modal, Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const SignupForm = ({ open, handleClose, email, password }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSave = (values) => {
    const formData = {
      ...values,
      email,
      password,
      allergies: values.allergies || "None", 
    };

    axios
      .post(`http://localhost:8080/api/register`, formData)
      .then(() => {
        message.success("Patient registered Successfully!");
        handleClose();
        navigate('/login');
      })
      .catch((err) => {
        console.error("Error registering Patient:", err);
        message.error("Error registering Patient");
      });
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="Personal Details"
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          email,
          password,
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            { required: true, message: 'Please enter your first name.' },
          ]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            { required: true, message: 'Please enter your last name.' },
          ]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[
            { required: true, message: 'Please select your date of birth.' },
          ]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            { required: true, message: 'Please select your gender.' },
          ]}
        >
          <Select placeholder="Select Gender">
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            <Option value="OTHERS">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            { required: true, message: 'Please enter your contact number.' },
            { pattern: /^\d{10}$/, message: 'Contact number must be 10 digits.' },
          ]}
        >
          <Input placeholder="Enter contact number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: 'Please enter your address.' },
          ]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          label="Emergency Contact"
          name="emergencyContact"
          rules={[
            { required: true, message: 'Please enter an emergency contact.' },
            { pattern: /^\d{10}$/, message: 'Emergency contact must be 10 digits.' },
          ]}
        >
          <Input placeholder="Enter emergency contact" />
        </Form.Item>

        <Form.Item
          label="Allergies"
          name="allergies"
        >
          <Input placeholder="Enter allergies (optional)" />
        </Form.Item>

        <Form.Item
          label="Aadhar Card"
          name="aadharCard"
          rules={[
            { required: true, message: 'Please enter your Aadhar card number.' },
            { pattern: /^\d{12}$/, message: 'Aadhar card must be 12 digits.' },
          ]}
        >
          <Input placeholder="Enter Aadhar card" />
        </Form.Item>

        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={[
            { required: true, message: 'Please select your blood group.' },
          ]}
        >
          <Select placeholder="Select Blood Group">
            <Option value="A_POSITIVE">A Positive</Option>
            <Option value="B_POSITIVE">B Positive</Option>
            <Option value="O_POSITIVE">O Positive</Option>
            <Option value="AB_POSITIVE">AB Positive</Option>
            <Option value="A_NEGATIVE">A Negative</Option>
            <Option value="B_NEGATIVE">B Negative</Option>
            <Option value="O_NEGATIVE">O Negative</Option>
            <Option value="AB_NEGATIVE">AB Negative</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupForm;
