import "./ViewAllRecords.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateRecord from "./UpdateMedicalRecord";
import { useSelector } from "react-redux";
import { message, Popconfirm } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewAllRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { token } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);
  let nav = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:8080/api/admin/getAllRecords`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setRecords(response.data);
          setFilteredRecords(response.data);
        })
        .catch((err) => {
          console.error("Error fetching Records:", err);
        });
    }
  }, [token, refresh]);

  const handleDelete = (recordId) => {
    if (token) {
      axios
        .delete(
          `http://localhost:8080/api/admin/deleterecordbyid/${recordId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          message.success("Medical Record deleted successfully!");
          setRefresh((prev) => !prev);
        })
        .catch((err) => {
          console.error("Error deleting Medical Record:", err);
          message.error("Error deleting Medical Record");
        });
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      setFilteredRecords(records);
    } else {
      setFilteredRecords(
        records.filter(
          (record) =>
            record.doctorFirstName?.toLowerCase().includes(term) ||
            record.patientFirstName?.toLowerCase().includes(term) ||
            record.symptoms?.toLowerCase().includes(term)
        )
      );
    }
  };

  return (
    <div className="view-allrecords">
      <div className="add-record">
        <h4>All Medical Records</h4>
      </div>

      <Form.Group style={{ width: "450px" }} className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by doctor, patient, symptoms"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

      {filteredRecords.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th><b>Record ID</b></th>
              <th><b>Doctor Name</b></th>
              <th><b>Patient Name</b></th>
              <th><b>Symptoms</b></th>
              <th><b>Physical Examination</b></th>
              <th><b>Treatment Plan</b></th>
              <th><b>Tests Recommended</b></th>
              <th><b>Notes</b></th>
              <th><b>Prescriptions</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.recordId}>
                <td>MR000{record.recordId}</td>
                <td>{record.doctorFirstName}</td>
                <td>{record.patientFirstName}</td>
                <td>{record.symptoms}</td>
                <td>{record.physicalExamination}</td>
                <td>{record.treatmentPlan}</td>
                <td>{record.testsRecommended}</td>
                <td>{record.notes}</td>
                <td>
                  <div
                    onClick={() =>
                      nav("/admin/prescriptions", {
                        state: { id: record.recordId },
                      })
                    }
                    className="viewprescriptions"
                  >
                    View Prescriptions
                  </div>
                </td>
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
                      onClick={() => handleEdit(record)}
                    >
                      <FaEdit size={18} title="Edit Medical Record" />
                    </span>
                    <Popconfirm
                      title="Are you sure you want to delete this Medical Record?"
                      onConfirm={() => handleDelete(record.recordId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span style={{ cursor: "pointer", color: "#dc3545" }}>
                        <FaTrash size={18} title="Delete Medical Record" />
                      </span>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No medical records available!</p>
      )}

            {isEditModalOpen && selectedRecord && (
        <UpdateRecord
          show={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          setRefresh={() => setRefresh((prev) => !prev)}
          record={selectedRecord}
        />
      )}
    </div>
  );
};

export default ViewAllRecords;
