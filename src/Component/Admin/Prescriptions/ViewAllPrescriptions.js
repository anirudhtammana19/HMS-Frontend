import "./ViewAllPrescriptions.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPrescription from "./AddPrescription";
import UpdatePrescription from "./UpdatePrescription";
import { useSelector } from "react-redux";
import { message, Popconfirm } from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ViewAllPrescriptions = () => {
  let data = useLocation();
  let recordID = data.state?.id;
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(recordID || "");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPrescripiton, setSelectedPrescription] = useState(null);
  const { token } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/admin/getAllPrescriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setPrescriptions(response.data);
          if (searchTerm !== "") {
            setFilteredPrescriptions(
              response.data.filter(
                (prescription) => prescription.recordId === parseInt(searchTerm)
              )
            );
          } else {
            setFilteredPrescriptions(response.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching Prescriptions:", err);
        });
    }
  }, [token, refresh]);

  const handleDelete = (prescription) => {
    if (token) {
      axios
        .delete(
          `http://localhost:8080/api/medicalRecord/deletePrescription/${prescription.recordId}/${prescription.prescriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          message.success("Prescription deleted successfully!");
          setRefresh((prev) => !prev);
        })
        .catch((err) => {
          console.error("Error deleting Prescription:", err);
          message.error("Error deleting Prescription");
        });
    }
  };

  const handleEdit = (prescription) => {
    setSelectedPrescription(prescription);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredPrescriptions(prescriptions);
    } else {
      setFilteredPrescriptions(
        prescriptions.filter(
          (prescription) =>
            prescription.recordId === parseInt(term) ||
            prescription.medicationName?.toLowerCase().includes(term) ||
            prescription.frequency?.toLowerCase() === term
        )
      );
    }
  };

  return (
    <div className="view-allprescriptions">
      <div className="add-prescription">
        <h4>All Prescriptions</h4>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="add-prescription-btn"
        >
        <FaPlus style={{ marginRight: '8px',marginLeft:'-8px' }} />   Add Prescription
        </Button>
      </div>

      <Form.Group style={{ width: "450px" }} className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by recordID, medicine or frequency"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      {filteredPrescriptions.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><b>Record ID</b></th>
              <th><b>Prescription ID</b></th>
              <th><b>Medicine Name</b></th>
              <th><b>Dosage</b></th>
              <th><b>Frequency</b></th>
              <th><b>Duration</b></th>
              <th><b>Notes</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.prescriptionId}>
                <td>MR000{prescription.recordId}</td>
                <td>P000{prescription.prescriptionId}</td>
                <td>{prescription.medicationName}</td>
                <td>{prescription.dosage}</td>
                <td>{prescription.frequency}</td>
                <td>{prescription.duration} days</td>
                <td>{prescription.notes}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", color: "#17a2b8" }}
                      onClick={() => handleEdit(prescription)}
                    >
                      <FaEdit size={18} title="Edit prescription" />
                    </span>
                    <Popconfirm
                      title="Are you sure you want to delete this prescription?"
                      onConfirm={() => handleDelete(prescription)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span style={{ cursor: "pointer", color: "#dc3545" }}>
                        <FaTrash size={18} title="Delete prescription" />
                      </span>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No Prescriptions available!</p>
      )}

      {isAddModalOpen && (
        <AddPrescription
          show={isAddModalOpen}
          handleClose={() => setIsAddModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
        />
      )}

      {isEditModalOpen && selectedPrescripiton && (
        <UpdatePrescription
          show={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
          prescription={selectedPrescripiton}
        />
      )}
    </div>
  );
};

export default ViewAllPrescriptions;
