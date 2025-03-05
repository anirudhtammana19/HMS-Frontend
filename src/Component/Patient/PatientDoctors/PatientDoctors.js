
import React, { useEffect, useState } from "react";
import PatientNavBar from '../../Navbar/PatientNavbar';
import Header from '../../User/Header';
import './PatientDoctors.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import SearchDoctors from "./BookAppoinment/SearchDoctors";

const PatientDoctors = () => {

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
    <div className="patient-doctors">

      <PatientNavBar activeItem="doctors" userName={`${user.firstName} ${user.lastName}`} />

      <div className="flex-grow-1">
        <Header userName={`${user.firstName} ${user.lastName}`} userType="Patient" />
        
        <div className="main-content mt-4">
          <SearchDoctors />
        </div>
      </div>
    </div>
  );
};

export default PatientDoctors;
