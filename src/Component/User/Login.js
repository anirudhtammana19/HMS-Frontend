import React, { useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../UserSlice";
import Navbar from "../Navbar/NavBar";
import { notification } from "antd";
import ForgotPasswordModal from "./ForgotPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    const logindata = { username: email, password };

    axios
      .post("http://localhost:8080/api/login", logindata)
      .then((res) => {
        const userdata = {
          token: res.data.jwt,
          userid: res.data.userid,
          username: res.data.username,
          role: res.data.role,
        };
        dispatch(login(userdata));

        switch (userdata.role) {
          case "PATIENT":
            navigate("/patient/dashboard");
            break;
          case "DOCTOR":
            navigate("/doctor/dashboard");
            break;
          case "ADMIN":
            navigate("/admin/dashboard");
            break;
          default:
            notification.error({
              message: "Login Error",
              description: "Unknown role. Please contact support.",
              placement: "top",
            });
        }
      })
      .catch(() => {
        notification.error({
          message: "Login Failed",
          description: "Incorrect Email or Password",
          placement: "top",
          duration: 3.0,
        });
      });
  };

  return (
    <>
      <Navbar showSignInButton={false} />

      <MDBRow className="login-container">
        <MDBCol col="10" md="6" className="login-image-col">
          <img
            src="./Doctor Login.jpg"
            className="img-fluid"
            alt="Login"
            style={{ maxWidth: "80%", height: "auto", borderRadius: "8px" }}
          />
        </MDBCol>

        <MDBCol className="login-form-col">
          <h2 className="login-header">
            Amaze Care
            <h4 className="login-subheader">Make your health journey easy</h4>
          </h2>

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            type="email"
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <div className="password-input-container">
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type={passwordVisible ? "text" : "password"}
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-options">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
              className="login-checkbox"
            />
            <p
              onClick={() => setForgotPasswordModalOpen(true)}
              className="forgot-password-link"
            >
              Forgot password?
            </p>
          </div>

          <div className="login-submit-section">
            <MDBBtn
              className="login-btn"
              size="lg"
              onClick={handleLogin}
            >
              Login
            </MDBBtn>
            <p className="signup-link">
              Don't have an account?{" "}
              <Link to="/signup" className="link-danger">
                Register
              </Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="footerlogin">
        <div className="footer-text">Copyright &copy; 2024. All rights reserved.</div>
      </div>

      <ForgotPasswordModal
        isVisible={isForgotPasswordModalOpen}
        handleClose={() => setForgotPasswordModalOpen(false)}
      />
    </>
  );
}

export default Login;
