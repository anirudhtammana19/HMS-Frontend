import React from "react";
import { Nav } from "react-bootstrap";
import "./AdminNavbar.css";
import { Link } from 'react-router-dom';

const AdminNavBar = ({ activeItem }) => {
  
  const isActive = (item) => activeItem === item ? "active-link" : "";

  return (
    <div className="sidebar bg-primary text-white vh-100">
      <h2 className="mb-4 p-3">Welcome, ADMIN</h2>
      <Nav defaultActiveKey="/admin/dashboard" className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard" className={isActive("dashboard")}>
          <i className="bi bi-speedometer2 me-2"></i>Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/patients" className={isActive("patients")}>
          <i className="bi bi-person-fill me-2"></i>Patients
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/doctors" className={isActive("doctors")}>
          <i className="bi bi-person-fill me-2"></i>Doctors
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/appointments" className={isActive("appointments")}>
          <i className="bi bi-calendar-check-fill me-2"></i>Appointments
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/records" className={isActive("medicalRecords")}>
          <i className="bi bi-file-earmark-text-fill me-2"></i>Medical Records
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/prescriptions" className={isActive("prescriptions")}>
          <i className="bi bi-file-earmark-text-fill me-2"></i>Prescriptions
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminNavBar;
