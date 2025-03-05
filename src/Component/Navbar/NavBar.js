import React from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({showSignInButton = true,showSignUpButton=true }) => {
  const nav=useNavigate()
  return (
    <header className="navheader">
      <div onClick={()=>nav('/')} className="logo">Amaze Care</div>
      <div className="nav-buttons">
        {showSignInButton && 
        (<Link to={"/login"}><button className="sdn btn-signin">Sign In</button></Link>)}
        {showSignUpButton &&
         (<Link to={"/signup"}><button className="sdn btn-register">Register</button></Link>)}
        
      </div>
    </header>
  );
};

export default Header;
