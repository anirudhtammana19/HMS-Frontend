import './ViewAllAppointments.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAppointments from "./AddAppointments";
import { useSelector } from 'react-redux';
import { message, Popconfirm } from 'antd';
import UpdateAppointment from './UpdateAppointments';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const ViewAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchDate, setSearchDate] = useState(""); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { token } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/admin/getAllAppointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setAppointments(response.data);
          setFilteredAppointments(response.data); 
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
        });
    }
  }, [token, refresh]);

  const handleDelete = (appointmentId) => {
    if (token) {
      axios
        .delete(`http://localhost:8080/api/admin/deleteappointment/${appointmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          message.success("Appointment deleted successfully!");
          setRefresh((prev) => !prev);
        })
        .catch((err) => {
          console.error("Error deleting appointment:", err);
          message.error("Error deleting appointment");
        });
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterAppointments(term, searchDate);
  };

  const handleDateSearch = (e) => {
    const date = e.target.value;
    setSearchDate(date);
    filterAppointments(searchTerm, date);
  };

  const filterAppointments = (term, date) => {
    let filtered = appointments;

    if (term) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.patientFirstName?.toLowerCase().includes(term) ||
          appointment.doctorFirstName?.toLowerCase().includes(term) ||
          appointment.status?.toLowerCase().includes(term) ||
          appointment.reason?.toLowerCase().includes(term)
      );
    }

    if (date) {
      filtered = filtered.filter((appointment) => appointment.appointmentDate === date);
    }

    setFilteredAppointments(filtered);
  };

  return (
    <div className="view-allappointments">
      <div className="add-appointment">
        <h4>All Appointments</h4>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="add-appointment-btn"
        >
        <FaPlus style={{ marginRight: '8px',marginLeft:'-8px' }} />   Add Appointment
        </Button>
      </div>


<div className="search-container">
  <Form.Group className="search-field">
    <Form.Control
      type="text"
      placeholder="Search by patient, doctor, status, or reason"
      value={searchTerm}
      onChange={handleSearch}
    />
  </Form.Group>
  <Form.Group className="search-field">
    <Form.Control
      type="date"
      value={searchDate}
      onChange={handleDateSearch}
    />
  </Form.Group>
</div>


      {filteredAppointments.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><b>Appointment ID</b></th>
              <th><b>Patient Name</b></th>
              <th><b>Doctor Name</b></th>
              <th><b>Appointment Date</b></th>
              <th><b>Appointment Time</b></th>
              <th><b>Status</b></th>
              <th><b>Reason</b></th>
              <th><b>Visit Type</b></th>
              <th><b>Consultation Type</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>
                  A000{appointment.appointmentId}
                </td>
                <td>{appointment.patientFirstName}</td>
                <td>{appointment.doctorFirstName}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.status}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.visitType}</td>
                <td>{appointment.consultationType}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", color: "#17a2b8" }}
                      onClick={() => handleEdit(appointment)}
                    >
                      <FaEdit size={18} title="Edit Appointment" />
                    </span>
                    <Popconfirm
                      title="Are you sure you want to delete this Appointment?"
                      onConfirm={() => handleDelete(appointment.appointmentId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span style={{ cursor: "pointer", color: "#dc3545" }}>
                        <FaTrash size={18} title="Delete Appointment" />
                      </span>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No appointments available!</p>
      )}

      {isAddModalOpen && (
        <AddAppointments
          show={isAddModalOpen}
          handleClose={() => setIsAddModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
        />
      )}

      {isEditModalOpen && selectedAppointment && (
        <UpdateAppointment
          show={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default ViewAllAppointments;
