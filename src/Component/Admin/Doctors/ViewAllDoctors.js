import './ViewAllDoctors.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddDoctor from "./AddDoctor";
import UpdateDoctor from "./UpdateDoctor";
import { useSelector } from 'react-redux';
import { message, Popconfirm } from 'antd';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const ViewAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { token } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/admin/getAllDoctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setDoctors(response.data);
          setFilteredDoctors(response.data); 
        })
        .catch((err) => {
          console.error("Error fetching doctors:", err);
        });
    }
  }, [token, refresh]);

  const handleDelete = (doctorId) => {
    if (token) {
      axios
        .delete(`http://localhost:8080/api/admin/deletedoctorbyid/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          message.success("Doctor deleted successfully!");
          setRefresh((prev) => !prev);
        })
        .catch((err) => {
          console.error("Error deleting doctor:", err);
          message.error("Error deleting doctor");
        });
    }
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = doctors.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(term) ||
        doctor.lastName.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term) ||
        doctor.qualification.toLowerCase().includes(term)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="view-alldoctors">
      <div className="add-doctor">
        <h4>All Doctors</h4>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="add-doctor-btn"
        >
         <FaPlus style={{ marginRight: '8px',marginLeft:'-8px' }} />  Add Doctor
        </Button>
      </div>


      <div className="search-container">
        <Form.Group style={{width:'400px'}}>
          <Form.Control
            type="text"
            placeholder="Search by name, specialty, or qualification"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </div>

      {filteredDoctors.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><b>Doctor ID</b></th>
              <th><b>Profile Image</b></th>
              <th><b>First Name</b></th>
              <th><b>Last Name</b></th>
              <th><b>Specialty</b></th>
              <th><b>Experience</b></th>
              <th><b>Qualification</b></th>
              <th><b>Designation</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.doctorId}>
                <td>
                  D000{doctor.doctorId}
                </td>
                <td>
                  <img
                    src={doctor.profile_image}
                    alt={doctor.firstName}
                    width="100px"
                    height="100px"
                  />
                </td>
                <td>{doctor.firstName}</td>
                <td>{doctor.lastName}</td>
                <td>{doctor.specialty}</td>
                <td>{doctor.experience} years</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.designation}</td>
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
                      onClick={() => handleEdit(doctor)}
                    >
                      <FaEdit size={18} title="Edit Doctor" />
                    </span>
                    <Popconfirm
                      title="Are you sure you want to delete this Doctor?"
                      onConfirm={() => handleDelete(doctor.doctorId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span style={{ cursor: "pointer", color: "#dc3545" }}>
                        <FaTrash size={18} title="Delete Doctor" />
                      </span>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No doctors found!</p>
      )}

      {isAddModalOpen && (
        <AddDoctor
          show={isAddModalOpen}
          handleClose={() => setIsAddModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
        />
      )}

      {isEditModalOpen && selectedDoctor && (
        <UpdateDoctor
          show={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
          doctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default ViewAllDoctors;
