import React, { useEffect, useState } from "react";
import Header from "../User/Header";
import Profile from "./Profile"
import "./Doctordashboard.css";
import axios from "axios";
import { useSelector } from "react-redux";
import DoctorNavbar from "../Navbar/DoctorNavbar";

const DoctorDashboard = () => {
  const [user, setUser] = useState({});
  const { token } = useSelector((state) => state.user);

  const handleProfileUpdate = (updatedProfile) => {
    setUser(updatedProfile);
  };
  
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/doctor/viewProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => {
          console.error("Error fetching profile:", e);
        });
    }
  }, [token]);

  return (
    <div className="dashboard-container">

      <DoctorNavbar activeItem="dashboard" userName={`${user.firstName} ${user.lastName}`} className="dashboard-sidebar" />

      <div className="dashboard-main">
        <Header
          userName={`${user.firstName} ${user.lastName}`}
          userType="Doctor"
          className="dashboard-header"
        />

        <div className="dashboard-content mt-4">
        <Profile profile={user} onUpdateProfile={handleProfileUpdate} className="dashboard-profile" />

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
