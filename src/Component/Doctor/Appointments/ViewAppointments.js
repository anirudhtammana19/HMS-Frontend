import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import DoctorNavbar from "../../Navbar/DoctorNavbar";
import Header from "../../User/Header";
import Modal from "react-modal"; 
import "./ViewAppointments.css";
import { Modal as Modall,Button, ButtonGroup, Form } from "react-bootstrap";

const ViewAppointments = () => {
  const { token } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorid, setDoctorId] = useState(null);
  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);

  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isConductModalOpen, setIsConductModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const [symptoms, setSymptoms] = useState("");
  const [physicalExamination, setPhysicalExamination] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [testsRecommended, setTestsRecommended] = useState("");
  const [notes, setNotes] = useState("");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [recordId, setRecordId] = useState();
  const [prescriptionData, setPrescriptionData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  useEffect(() => {
    if (!token) {
      message.error("Token is not available.");
      return;
    }

    axios
      .get("http://localhost:8080/api/doctor/viewProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.doctorId) {
          setDoctorId(res.data.doctorId);
          setfirstname(res.data.firstName);
          setlastname(res.data.lastName); 
        } else {
          message.error("Doctor ID is not available in the profile.");
        }
      })
      .catch((e) => {
        console.error("Error fetching doctor profile:", e);
        message.error("Failed to fetch doctor profile. Please try again.");
      });
  }, [token]);

  useEffect(() => {
    if (!doctorid) {
      return;
    }

    axios
      .get(`http://localhost:8080/api/doctor/viewAppointments/${doctorid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAppointments(res.data);
        } else {
          message.warning("No appointments found.");
          setAppointments([]);
        }
      })
      .catch((e) => {
        console.error("Error fetching appointments:", e);
        message.error("Failed to fetch appointments. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [doctorid, token]);

  const handleAccept = () => {
    axios
      .put(
        `http://localhost:8080/api/doctor/acceptAppointment/${doctorid}/${selectedAppointment.appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Appointment accepted.");
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.appointmentId === selectedAppointment.appointmentId
              ? { ...appointment, status: "SCHEDULED" }
              : appointment
          )
        );
      })
      .catch((error) => {
        message.error("Failed to accept appointment.");
        console.error(error);
      })
      .finally(() => setIsAcceptModalOpen(false));
  };

  const handleCancel = () => {
    axios
      .put(
        `http://localhost:8080/api/doctor/cancelAppointment/${doctorid}/${selectedAppointment.appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Appointment canceled.");
        setAppointments((prev) =>
          prev.filter(
            (appointment) =>
              appointment.appointmentId !== selectedAppointment.appointmentId
          )
        );
      })
      .catch((error) => {
        message.error("Failed to cancel appointment.");
        console.error(error);
      })
      .finally(() => setIsCancelModalOpen(false));
  };

  const handleReschedule = () => {
    axios
      .put(
        `http://localhost:8080/api/doctor/rescheduleAppointment/${doctorid}/${selectedAppointment.appointmentId}/${newDate}/${newTime}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Appointment rescheduled.");
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.appointmentId === selectedAppointment.appointmentId
              ? {
                  ...appointment,
                  appointmentDate: newDate,
                  appointmentTime: newTime,
                  status: "RESCHEDULED",
                }
              : appointment
          )
        );
      })
      .catch((error) => {
        message.error("Failed to reschedule appointment.");
        console.error(error);
      })
      .finally(() => setIsRescheduleModalOpen(false));
  };

  const handleConduct = () => {
    const medicalRecordData = {
      symptoms,
      physicalExamination,
      treatmentPlan,
      testsRecommended,
      notes,
    };

    axios
      .post(
        `http://localhost:8080/api/doctor/conductAppointment/${selectedAppointment.appointmentId}`,
        medicalRecordData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Appointment conducted successfully.");
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.appointmentId === selectedAppointment.appointmentId
              ? { ...appointment, status: "COMPLETED" }
              : appointment
          )
        );
      })
      .catch((error) => {
        message.error("Failed to conduct appointment.");
        console.error(error.response ? error.response.data : error);
      })
      .finally(() => setIsConductModalOpen(false));
  };
  const handleAddPrescription = () => {
    axios
      .post(
        `http://localhost:8080/api/medicalRecord/addPrescription/${recordId}`,
        prescriptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Prescription added successfully.");
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.appointmentId === selectedAppointment.appointmentId
              ? { ...appointment, prescriptionAdded: true }
              : appointment
          )
        );
      })
      .catch((error) => {
        message.error("Failed to add prescription.");
        console.error(error);
      })
      .finally(() => setIsPrescriptionModalOpen(false));
  };

  const fetchMedicalRecord = (patientId) => {
    axios
      .get(`http://localhost:8080/api/doctor/viewPatientHistory/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setRecordId(res.data[0].recordId); 
        } else {
          message.warning("No medical records found for this patient.");
          setRecordId(null); 
        }
      })
      .catch((error) => {
        console.error("Error fetching medical record:", error);
        message.error("No medical records available.");
      });
  };

  const handleModalOpen = (appointment, modalType) => {
    setSelectedAppointment(appointment);
    switch (modalType) {
      case "accept":
        setIsAcceptModalOpen(true);
        break;
      case "cancel":
        setIsCancelModalOpen(true);
        break;
      case "reschedule":
        setIsRescheduleModalOpen(true);
        break;
      case "conduct":
        setIsConductModalOpen(true);
        break;
      case "prescription":
        fetchMedicalRecord(appointment.patientId);
        setIsPrescriptionModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleModalClose = (modalType) => {
    switch (modalType) {
      case "accept":
        setIsAcceptModalOpen(false);
        break;
      case "cancel":
        setIsCancelModalOpen(false);
        break;
      case "reschedule":
        setIsRescheduleModalOpen(false);
        break;
      case "conduct":
        setIsConductModalOpen(false);
        break;
      case "prescription":
        setIsPrescriptionModalOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      <DoctorNavbar
        activeItem="appointments"
        userName={`${firstname} ${lastname}`}
        className="dashboard-sidebar"
      />
      <div className="dashboard-main">
        <Header
          userName={`${firstname} ${lastname}`}
          userType="Doctor"
          className="dashboard-header"
        />

        <div className="appointments-list">
          {loading ? (
            <p className="loading-text">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Consultation Type</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.appointmentId}>
                    <td>
                      {appointment.patientFirstName}{" "}
                      {appointment.patientLastName}
                    </td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>{appointment.consultationType}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                      {appointment.status === "COMPLETED" && (
                        <button
                          onClick={() =>
                            handleModalOpen(appointment, "prescription")
                          }
                        >
                          Add Prescription
                        </button>
                      )}

                      {appointment.status === "REQUESTED" && (
                        <>
                          <ButtonGroup>
                            <button
                              onClick={() =>
                                handleModalOpen(appointment, "accept")
                              }
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleModalOpen(appointment, "cancel")
                              }
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                handleModalOpen(appointment, "reschedule")
                              }
                            >
                              Reschedule
                            </button>
                          </ButtonGroup>
                        </>
                      )}
                      {appointment.status === "SCHEDULED" && (
                        <>
                          <ButtonGroup>
                            <button
                              onClick={() =>
                                handleModalOpen(appointment, "conduct")
                              }
                            >
                              Conduct
                            </button>
                            <button
                              onClick={() =>
                                handleModalOpen(appointment, "cancel")
                              }
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                handleModalOpen(appointment, "reschedule")
                              }
                            >
                              Reschedule
                            </button>
                          </ButtonGroup>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments available.</p>
          )}
        </div>

        <Modall show={isPrescriptionModalOpen} onHide={() => handleModalClose("prescription")}>
      <Modall.Header closeButton>
        <Modall.Title>Add Prescription</Modall.Title>
      </Modall.Header>
      <Modall.Body>
        <Form>
          <Form.Group controlId="medicationName">
            <Form.Label>Medication Name:</Form.Label>
            <Form.Control
              type="text"
              value={prescriptionData.medicationName}
              onChange={(e) =>
                setPrescriptionData({
                  ...prescriptionData,
                  medicationName: e.target.value,
                })
              }
              placeholder="Enter Medicine Name"
              required
            />
          </Form.Group>

          <Form.Group controlId="dosage" className="mt-3">
            <Form.Label>Dosage:</Form.Label>
            <Form.Control
              type="text"
              value={prescriptionData.dosage}
              onChange={(e) =>
                setPrescriptionData({
                  ...prescriptionData,
                  dosage: e.target.value,
                })
              }
              placeholder="Enter number of dosages"
              required
            />
          </Form.Group>

          <Form.Group controlId="frequency" className="mt-3">
            <Form.Label>Frequency:</Form.Label>
            <Form.Select
              value={prescriptionData.frequency}
              onChange={(e) =>
                setPrescriptionData({
                  ...prescriptionData,
                  frequency: e.target.value,
                })
              }
              required
            >
              <option value="" disabled>
                Select Frequency
              </option>
              <option value="AF">After Food</option>
              <option value="BF">Before Food</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="duration" className="mt-3">
            <Form.Label>Duration (in days):</Form.Label>
            <Form.Control
              type="number"
              value={prescriptionData.duration}
              onChange={(e) =>
                setPrescriptionData({
                  ...prescriptionData,
                  duration: e.target.value,
                })
              }
              placeholder="Enter number of days"
              required
            />
          </Form.Group>

          <Form.Group controlId="notes" className="mt-3">
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={prescriptionData.notes}
              onChange={(e) =>
                setPrescriptionData({
                  ...prescriptionData,
                  notes: e.target.value,
                })
              }
              placeholder="Enter any additional notes"
            />
          </Form.Group>
        </Form>
      </Modall.Body>
      <Modall.Footer>
        <Button variant="primary" onClick={handleAddPrescription}>
          Add Prescription
        </Button>
        <Button variant="secondary" onClick={() => handleModalClose("prescription")}>
          Cancel
        </Button>
      </Modall.Footer>
    </Modall>
    
        <Modal
          isOpen={isAcceptModalOpen}
          onRequestClose={() => handleModalClose("accept")}
        >
          <h2>Accept Appointment</h2>
          <p>Are you sure you want to accept this appointment?</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={() => handleModalClose("accept")}>Cancel</button>
        </Modal>

        <Modal
          isOpen={isCancelModalOpen}
          onRequestClose={() => handleModalClose("cancel")}
        >
          <h2>Cancel Appointment</h2>
          <p>Are you sure you want to cancel this appointment?</p>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={() => handleModalClose("cancel")}>Close</button>
        </Modal>

        <Modal
          isOpen={isRescheduleModalOpen}
          onRequestClose={() => handleModalClose("reschedule")}
        >
          <h2>Reschedule Appointment</h2>
          <label>New Date:</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
          <label>New Time:</label>
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            required
          />
          <button onClick={handleReschedule}>Reschedule</button>
          <button onClick={() => handleModalClose("reschedule")}>Cancel</button>
        </Modal>

        <Modal
          isOpen={isConductModalOpen}
          onRequestClose={() => handleModalClose("conduct")}
        >
          <h2>Conduct Appointment</h2>
          <label>Symptoms:</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter symptoms"
          />
          <label>Physical Examination:</label>
          <textarea
            value={physicalExamination}
            onChange={(e) => setPhysicalExamination(e.target.value)}
            placeholder="Enter physical examination findings"
          />
          <label>Treatment Plan:</label>
          <textarea
            value={treatmentPlan}
            onChange={(e) => setTreatmentPlan(e.target.value)}
            placeholder="Enter treatment plan"
          />
          <label>Tests Recommended:</label>
          <textarea
            value={testsRecommended}
            onChange={(e) => setTestsRecommended(e.target.value)}
            placeholder="Enter tests recommended"
          />
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes"
          />
          <button onClick={handleConduct}>Submit</button>
          <button onClick={() => handleModalClose("conduct")}>Cancel</button>
        </Modal>
      </div>
    </div>
  );
};

export default ViewAppointments;
