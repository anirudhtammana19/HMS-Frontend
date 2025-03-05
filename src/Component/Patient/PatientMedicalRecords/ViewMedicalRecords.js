import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import './MedicalRecord.css';

const ViewPatientMedicalRecords = () => {
  const { token, userid } = useSelector((state) => state.user);
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  useEffect(() => {
    if (token && userid) {
      axios.get(`http://localhost:8080/api/patient/getmedicalrecords/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          setRecords(res.data);
        })
        .catch(e => {
          console.error("Error fetching medical records:", e);
        });
    }
  }, [token, userid]);

  const handleViewPrescriptions = (prescriptions) => {
    setSelectedPrescriptions(prescriptions || []);
    setShowModal(true);
  };

  return (
    <div className="view-records">
      <h3>My Medical History</h3>
      <br/>
      {records.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><b>Doctor ID</b></th>
              <th><b>Doctor Name</b></th>
              <th><b>Symptoms</b></th>
              <th><b>Physical Examination</b></th>
              <th><b>Treatment Plan</b></th>
              <th><b>Tests Recommended</b></th>
              <th><b>Notes</b></th>
              <th><b>Prescriptions</b></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.recordId}>
                <td>D000{record.doctorId}</td>
                <td>{record.doctorFirstName}</td>
                <td>{record.symptoms}</td>
                <td>{record.physicalExamination}</td>
                <td>{record.treatmentPlan}</td>
                <td>{record.testsRecommended}</td>
                <td>{record.notes}</td>
                <td>
                  {record.prescriptions && record.prescriptions.length > 0 ? (
                    <Button
                      variant="link"
                      onClick={() => handleViewPrescriptions(record.prescriptions)}
                    >
                      View Prescriptions
                    </Button>
                  ) : (
                    "No prescriptions available"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No medical records available for this patient.</p>
      )}

      <PrescriptionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        prescriptions={selectedPrescriptions}
      />
    </div>
  );
};

const PrescriptionModal = ({ show, onClose, prescriptions }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Prescription Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {prescriptions.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th><b>#</b></th>
                <th><b>Medicine Name</b></th>
                <th><b>Dosage</b></th>
                <th><b>Frequency</b></th>
                <th><b>Duration (days)</b></th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{prescription.medicationName}</td>
                  <td>{prescription.dosage}</td>
                  <td>{prescription.frequency==="AF"?"After Food":"Before Food"}</td>
                  <td>{prescription.duration}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No prescription details available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPatientMedicalRecords;
