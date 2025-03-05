import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import AppointmentModal from "./BookAppoinment/BookApppointment";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";

const DoctorCard=({doctor})=>{

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    let {userid,token} =useSelector(state => state.user);

    const handleSubmitAppointment = (appointmentDetails) => {
        console.log("Appointment Details: ", appointmentDetails);
        axios.post(`http://localhost:8080/api/patient/bookappointment/${userid}/${doctor.doctorId}`, appointmentDetails, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"application/json"
            },
          })
            .then((response) => {
              message.success("Appointment requested Successfully!!")
              console.log('Appointment requested successfully:', response.data);
            })
            .catch((error) => {
              console.error('Error requesting Appointment :', error);
            });
        
      };

return(
    <>
    <Card >
    <Card.Img
      variant="top"
      src={doctor.profile_image}
      height='200px'
      width='100px'
      alt={`${doctor.firstName}'s profile`}
    />
    <Card.Body>
      <Card.Title>{doctor.firstName} {doctor.lastName}</Card.Title>
      <Card.Text>
        <strong>Specialty:</strong> {doctor.specialty}
      </Card.Text>
      <Card.Text>
        <strong>Experience:</strong> {doctor.experience} years
      </Card.Text>
      <Card.Text>
        <strong>Designation:</strong> {doctor.designation}
      </Card.Text>
      <Card.Text>
        <strong>Qualification:</strong> {doctor.qualification}
      </Card.Text>
      <Card.Text>
        <strong>Contact:</strong> {doctor.contactNumber}
      </Card.Text>
      <Button variant="primary" onClick={handleShowModal}>Schedule Appointment</Button>
    </Card.Body>
  </Card>

  <AppointmentModal
        show={showModal}
        handleClose={handleCloseModal}
        doctor={doctor}
        handleSubmitAppointment={handleSubmitAppointment}
      />
  </>
)
}
export default DoctorCard;