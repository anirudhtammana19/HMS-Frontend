import React, { useEffect, useState } from "react";
import PatientNavBar from '../../Navbar/PatientNavbar';
import Header from '../../User/Header';
import './PatientRecords.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import ViewPatientMedicalRecords from "./ViewMedicalRecords";


const PatientMedicalRecords = () => {

  const [user, setUser] = useState({});
  const {token} = useSelector(state => state.user); 
  
  useEffect(() => {
    
    if (token) {
      axios.get("http://localhost:8080/api/patient/viewProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          setUser(res.data);
        })
        .catch(e => {
          console.error("Error fetching profile:", e);
        });
    }
  }, [token]); 

  return (
    <div className="patient-medicalRecords">
      <PatientNavBar activeItem="medicalRecords" userName={`${user.firstName} ${user.lastName}`} />

      <div className="flex-grow-1">
        <Header userName={`${user.firstName} ${user.lastName}`} userType="Patient" />
        
        <div className="main-content mt-4">
          <ViewPatientMedicalRecords/>
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalRecords;
