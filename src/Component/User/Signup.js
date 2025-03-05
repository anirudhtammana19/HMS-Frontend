import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import SignupForm from './PatientSignUp';
import './Signup.css';
import NavBar from "../Navbar/NavBar";
import { message } from 'antd';

const Signup = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must include at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must include at least one special character.';
    }
    return '';
  };

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return 'Strong';
    }
    if (password.length >= 8 && ((hasUpperCase && hasNumber) || (hasLowerCase && hasSpecialChar))) {
      return 'Medium';
    }
    return 'Weak';
  };
  
  const handlePasswordChange = (value) => {
    setPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
    setPasswordStrength(checkPasswordStrength(value));
  };
  
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'Strong':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Weak':
        return 'red';
      default:
        return '#333'; 
    }
  };
  

  const handleRegisterClick = () => {
    if (!email || !password || !confirmPassword) {
      message.warning('Mandatory fields are required.');
    } else if (!validateEmail(email)) {
      message.warning('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      message.warning('Passwords do not match.');
    } else if (passwordError) {
      message.warning(passwordError);
    } else {
      setModalOpen(true);
    }
  };
  

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <NavBar showSignUpButton={false} />
      <MDBContainer fluid className="signup-container">
        <MDBRow>
          <MDBCol col="10" md="6" className="signup-image-col">
            <img
              src="./Signup Image.jpg"
              className="img-fluid"
              alt="Signup"
              style={{ maxWidth: '80%', height: 'auto',borderRadius:"5px" }}
            />
          </MDBCol>

          <MDBCol col="4" md="6">
          <div className="signup-content">
        
            <h2 className="signup-heading">
              Amaze Care
              <h3 className="signup-subheading">
                Register For a Healthy Life
              </h3>
            </h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="email"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {password && (
  <div className="password-strength" style={{ marginTop: '10px' }}>
    <p>
      {`Password Strength: `} 
      <strong style={{ color: getPasswordStrengthColor() }}>
        {passwordStrength}
      </strong>
    </p>
    {passwordError && <p style={{ color: 'red', marginTop: '5px' }}>{passwordError}</p>}
  </div>
)}
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              size="lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="signup-btn-container">
              <MDBBtn
                className="signup-btn"
                size="lg"
                onClick={handleRegisterClick}
              >
                Register
              </MDBBtn>
            </div>
          </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <SignupForm
        className="signup-form"
        open={modalOpen}
        handleClose={closeModal}
        email={email}
        password={password}
      />
      <div className="footersignup">
        <div className="footer-text">Copyright &copy; 2024. All rights reserved.</div>
      </div>
    </>
  );
};

export default Signup;
