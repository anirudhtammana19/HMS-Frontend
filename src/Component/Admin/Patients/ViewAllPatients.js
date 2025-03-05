import './ViewAllPatients.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPatient from "./AddPatient";
import UpdatePatient from "./UpdatePatient";
import { useSelector } from 'react-redux';
import { message, Popconfirm } from 'antd';
import { FaEdit,FaPlus, FaTrash } from 'react-icons/fa';

const ViewAllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { token } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/admin/getAllPatients`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setPatients(response.data);
          setFilteredPatients(response.data); 
        })
        .catch((err) => {
          console.error("Error fetching patients:", err);
        });
    }
  }, [token, refresh]);

  const handleDelete = (patientId) => {
    if (token) {
      axios
        .delete(`http://localhost:8080/api/admin/deletepatientbyid/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          message.success("Patient deleted successfully!");
          setRefresh((prev) => !prev);
        })
        .catch((err) => {
          console.error("Error deleting patient:", err);
          message.error("Error deleting patient");
        });
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(term) ||
        patient.lastName.toLowerCase().includes(term) ||
        patient.email.toLowerCase().includes(term) ||
        patient.contactNumber.toLowerCase().includes(term)
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="view-allpatients">
      <div className="add-patient">
        <h4>All Patients</h4>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="add-patient-btn"
        >
          <FaPlus style={{ marginRight: '8px',marginLeft:'-8px' }} />  Add Patient
        </Button>
      </div>

      <div className="search-container">
        <Form.Group style={{width:'400px'}} >
          <Form.Control
            type="text"
            placeholder="Search by name, email, or contact"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </div>

      {filteredPatients.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><b>Patient ID</b></th>
              <th><b>First Name</b></th>
              <th><b>Last Name</b></th>
              <th><b>Date of Birth</b></th>
              <th><b>Gender</b></th>
              <th><b>Contact</b></th>
              <th><b>Email</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.patientId}>
                <td>
                  P000{patient.patientId}
                </td>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.dateOfBirth}</td>
                <td>{patient.gender}</td>
                <td>{patient.contactNumber}</td>
                <td>{patient.email}</td>
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
                      onClick={() => handleEdit(patient)}
                    >
                      <FaEdit size={18} title="Edit Patient" />
                    </span>
                    <Popconfirm
                      title="Are you sure you want to delete this Patient?"
                      onConfirm={() => handleDelete(patient.patientId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span style={{ cursor: "pointer", color: "#dc3545" }}>
                        <FaTrash size={18} title="Delete Patient" />
                      </span>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No patients found!</p>
      )}

      {isAddModalOpen && (
        <AddPatient
          show={isAddModalOpen}
          handleClose={() => setIsAddModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
        />
      )}

      {isEditModalOpen && selectedPatient && (
        <UpdatePatient
          show={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default ViewAllPatients;
