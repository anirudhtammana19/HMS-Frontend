import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import DatePicker from "react-datepicker";

const AddAppointments = ({ show, handleClose, setRefresh }) => {
  const { token } = useSelector((state) => state.user);
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setselectedDoctor] = useState();
  const [selectedPatient, setSelectedPatient] = useState();
  const [formData, setFormData] = useState({
    appointmentDate: new Date(),
    appointmentTime: "10:00",
    status: "REQUESTED",
    reason: "",
    visitType: "General",
    consultationType: "PHYSICAL",
  });


  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/admin/getAllDoctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
        })
        .then((response) => {
          setDoctors(response.data);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
        });
    }
    
    axios
    .get(`http://localhost:8080/api/admin/getAllPatients`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json"
      },
    })
    .then((response) => {
      setPatients(response.data);
    })
    .catch((err) => {
      console.error("Error fetching appointments:", err);
    });
  }, [token]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      appointmentDate: date,
    }));
  };

  const handleSave = () => {
        console.log("Appointment Details: ", formData);
        axios.post(`http://localhost:8080/api/patient/bookappointment/${selectedPatient}/${selectedDoctor}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json"
            },
          })
            .then((response) => {
              message.success("Appointment requested Successfully!!")
              console.log('Appointment requested successfully:', response.data);
                handleClose(); 
                setRefresh(prev => !prev); 
            })
            .catch((error) => {
              console.error('Error requesting Appointment :', error);
            });
        

  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="patient">
            <Form.Label>Patient</Form.Label>
            <Form.Control
              as="select"
              name="patient"
              value={selectedPatient}
              onChange={(e)=>setSelectedPatient(e.target.value)}
            >
              
        <option value="">Select Patient</option>
              {patients.map((option) => (
                <option key={option.patientId} value={option.patientId}>
                  P000{option.patientId} {option.firstName} {option.lastName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="doctor">
            <Form.Label>Doctor</Form.Label>
            <Form.Control
              as="select"
              name="doctor"
              value={selectedDoctor}
              onChange={(e)=>setselectedDoctor(e.target.value)}
            >
              
        <option value="">Select Doctor</option>
              {doctors.map((option) => (
                <option key={option.doctorId} value={option.doctorId}>
                  D000{option.doctorId} {option.firstName} {option.lastName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="appointmentDate" className="mb-3">
            <Form.Label>Appointment Date</Form.Label>
            <DatePicker
              selected={formData.appointmentDate}
              onChange={handleDateChange}
              className="form-control"
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
            />
          </Form.Group>
          <Form.Group controlId="appointmentTime" className="mb-3">
            <Form.Label>Appointment Time</Form.Label>
            <Form.Control
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="reason" className="mb-3">
            <Form.Label>Reason for Visit</Form.Label>
            <Form.Control
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for visit"
            />
          </Form.Group>
          <Form.Group controlId="visitType" className="mb-3">
            <Form.Label>Visit Type</Form.Label>
            <Form.Control
              as="select"
              name="visitType"
              value={formData.visitType}
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine Checkup">Routine Checkup</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Vaccination">Vaccination</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="consultationType" className="mb-3">
            <Form.Label>Consultation Type</Form.Label>
            <Form.Control
              as="select"
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
            >
              <option value="PHYSICAL">Physical</option>
              <option value="VIRTUAL">Virtual</option>
              <option value="HOME_VISIT">Home Visit</option>
            </Form.Control>
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

export default AddAppointments;
