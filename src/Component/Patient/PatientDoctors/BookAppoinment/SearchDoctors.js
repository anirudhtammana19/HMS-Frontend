import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import "./SearchDoctors.css";
import axios from "axios";
import { useSelector } from "react-redux";
import DoctorCard from "../DoctorCard";

const SearchDoctors = () => {
  const { token } = useSelector((state) => state.user); 
  const [allDoctors, setAllDoctors] = useState([]); 
  const [doctors, setDoctors] = useState([]); 
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getDoctorSpecialties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((err) => {
        console.error("Error fetching specialties:", err);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/patient/getAvailableDoctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllDoctors(res.data);
        setDoctors(res.data); 
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, [token]);

  useEffect(() => {
    if (selectedSpecialty === "") {
      setDoctors(allDoctors); 
    } else {
      const filteredDoctors = allDoctors.filter((doctor) =>
        doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
      setDoctors(filteredDoctors); 
    }
  }, [selectedSpecialty, allDoctors]);

  useEffect(() => {
    if (searchTerm === "") {
      setDoctors(allDoctors); 
    } else {
      const filteredBySearch = allDoctors.filter((doctor) =>
        doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      ||doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDoctors(filteredBySearch); 
    }
  }, [searchTerm, allDoctors]);

  return (
    <div className="search-doctors">
      <h3 className="mb-4">Search doctor for appointment</h3>

      <Row className="mb-4">
      <Col md={5}>
      <Form.Group controlId="search" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      </Col>
    
      <Col md={5}>
      <Form.Group controlId="specialty" className="mb-3">
      <InputGroup>
        <Form.Control
          as="select"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">Select Speciality</option>
          {specialties.map((specialty, index) => (
            <option key={index} value={specialty}>
              {specialty}
            </option>
          ))}
          
        </Form.Control>
        <InputGroup.Text>
                <i className="bi bi-chevron-down"></i>
              </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      </Col>
      </Row>
      
      <Row>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Col key={doctor.doctorId} md={4} className="mb-4">
              <DoctorCard className="doctor-card" doctor={doctor}/>
            </Col>
          ))
        ) : (
          <p>No doctors found based on your search criteria.</p>
        )}
      </Row>
    </div>
  );
};

export default SearchDoctors;
