import React, { useEffect, useState } from "react";
import PatientNavBar from '../Navbar/PatientNavbar';
import Header from '../User/Header';
import Profile from './Profile/Profile';
import './PatientDashboard.css';
import axios from 'axios';
import { useSelector } from "react-redux";

const PatientDashboard = () => {

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

  const handleProfileUpdate = (updatedProfile) => {
    setUser(updatedProfile);
  };


  return (
    <div className="patient-dashboard">
   
      <PatientNavBar activeItem="dashboard" userName={`${user.firstName} ${user.lastName}`} />

      <div className="flex-grow-1">
        <Header userName={`${user.firstName} ${user.lastName}`} userType="Patient" />
        
        <div className="main-content mt-4">
          <Profile profile={user} onUpdateProfile={handleProfileUpdate}/>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
