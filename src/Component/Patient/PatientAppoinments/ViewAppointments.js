import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAppointments.css";
import { useSelector } from "react-redux";
import RescheduleAppointment from "./RescheduleAppointment";
import {message} from 'antd'

const ViewPatientAppointment = () => {
  const { token ,userid} = useSelector((state) => state.user); 
  const [appointments, setAppointments] = useState([]); 
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/patient/getappointments/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
        })
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
        });
    }
  }, [token,refresh]);

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (updatedAppointment) => {
    axios
      .put(
        `http://localhost:8080/api/patient/rescheduleAppointment/${updatedAppointment.appointmentId}/${updatedAppointment.newDate}/${updatedAppointment.newTime}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      )
      .then((response) => {
        message.success("Appointment rescheduled successfully!");
        setShowRescheduleModal(false);
       setRefresh(prev=>!prev);
      })
      .catch((err) => {
        console.log(err)
        message.error("Error rescheduling appointment");
        setShowRescheduleModal(false);
      });
  };

  const handleCancel = (doctorId,appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      axios
        .put(`http://localhost:8080/api/doctor/cancelAppointment/${doctorId}/${appointmentId}`, null,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success(`Appointment cancelled successfully!`);
          setRefresh(prev=>!prev);
          
        })
        .catch((err) => {
          console.error("Error cancelling appointment:", err);
          message.error("Error cancelling appointment!")
        });
    }
  };
  const getRowClass = (appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    const currentDate = new Date();
  
    appointmentDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    if (appointment.status === "COMPLETED" || appointment.status === "CANCELLED") {
      return { color: 'white', backgroundColor: 'red' };
    } else if (appointmentDate < currentDate) {
      return { color: 'white', backgroundColor: 'red' };
    } else if (appointmentDate > currentDate) {
      return { color: 'white', backgroundColor: 'limegreen' };
    } else if (appointmentDate.getTime() === currentDate.getTime()) {
      return null;
    } else {
      return null;
    }
  };
  

  return (
    <div className="view-appointments">
      <h3>My Appointments</h3>
      <br/>
      {appointments.length>0?<>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th><b>Patient Name</b></th>
            <th><b>Doctor ID</b></th>
            <th><b>Doctor Name</b></th>
            <th><b>Status</b></th>
            <th><b>Reason</b></th>
            <th><b>Visit Type</b></th>
            <th><b>Date</b></th>
            <th><b>Time</b></th>
            <th><b>Actions</b></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td style={getRowClass(appointment)}>{appointment.patientFirstName}</td>
              <td style={getRowClass(appointment)}>D000{appointment.doctorId}</td>
              <td style={getRowClass(appointment)}>{appointment.doctorFirstName}</td>
              <td style={getRowClass(appointment)}>{appointment.status}</td>
              <td style={getRowClass(appointment)}>{appointment.reason}</td>
              <td style={getRowClass(appointment)}>{appointment.visitType}</td>
              <td style={getRowClass(appointment)}>{appointment.appointmentDate}</td>
              <td style={getRowClass(appointment)}>{appointment.appointmentTime}</td>
              <td style={getRowClass(appointment)}>
               <div className="actions-container">
                  {(appointment.status !== "COMPLETED" && appointment.status !== "CANCELLED" && appointment.status !== "REQUESTED") && (
                  <Button
                variant="warning"
                  className="me-2"
                  onClick={() => handleReschedule(appointment)}
                >
                  Reschedule
                </Button>
              )}
              {(appointment.status !== "COMPLETED" && appointment.status !== "CANCELLED") && (
                <Button
                  variant="danger"
                  onClick={() => handleCancel(appointment.doctorId, appointment.appointmentId)}
                >
                  Cancel
                </Button>
                )}
              </div>
            </td>

            </tr>
          ))}
        </tbody>
      </Table>

      <RescheduleAppointment
        show={showRescheduleModal}
        appointment={selectedAppointment}
        onClose={() => setShowRescheduleModal(false)}
        onSubmit={handleRescheduleSubmit}
      />
      </>:"No Appointments for You"}
    </div>
  );
};

export default ViewPatientAppointment;
