import React from "react";
import { Navbar, Button } from "react-bootstrap";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../../UserSlice";
import { useNavigate } from "react-router-dom";

const Header = ({ userName, userType,setIsModalOpen }) => {
  let dispatch=useDispatch()
  let nav=useNavigate()
  
  
  const handlelogout=()=>{

    nav("/")
    dispatch(logout());
  }
  return (
    <Navbar bg="white" className="shadow-sm header px-3">
      <Navbar.Brand  className="text-primary fw-bold">Amaze Care</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="me-3">
          <div>{userName}</div>
          <small>{userType}</small>
        </Navbar.Text>
        {userType==='Admin' && typeof setIsModalOpen === "function" && (
        <div className="edit-profile-container">
            <button
              className="edit-profile-btn"
              onClick={()=>setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
)}
        
        <Button onClick={handlelogout} variant="outline-danger" size="sm">
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
