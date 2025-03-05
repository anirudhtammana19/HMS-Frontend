import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoctorNavbar from "../../Navbar/DoctorNavbar";
import Header from "../../User/Header";
import { Input, Button, message, Card } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import UpdateMedicalRecord from "./UpdateMedicalRecord";
import './ViewAppointments.css'

const ViewMedicalRecords = () => {
  const [searchId, setSearchId] = useState(""); 
  const [records, setRecords] = useState([]); 
  const [expandedRecordId, setExpandedRecordId] = useState(null); 
  const [editingRecord, setEditingRecord] = useState(null); 
  const[firstname,setfirstname] = useState(null);
  const[lastname,setlastname] = useState(null);

  const { token,userid } = useSelector((state) => state.user);

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
          
          setfirstname(res.data.firstName) 
          setlastname(res.data.lastName)
        } else {
          message.error("Doctor ID is not available in the profile.");
        }
      })
      .catch((e) => {
        console.error("Error fetching doctor profile:", e);
        message.error("Failed to fetch doctor profile. Please try again.");
      });
  }, [token]);

  

  
  const handleSearch = () => {
    if (!searchId) {
      message.warning("Please enter a Patient ID to search.");
      return;
    }

    setRecords([]);
    setExpandedRecordId(null); 
    setEditingRecord(null); 

    axios
      .get(`http://localhost:8080/api/doctor/viewPatientHistory/${searchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Fetched Medical Records:", res.data);
        if (res.data && res.data.length > 0) {

          /*setRecords(res.data.filter(
            record=> record.doctorId===userid)); */
            setRecords(res.data)
        } else {
          message.warning("No medical records found for this patient.");
          setRecords([]); 
        }
      })
      .catch((e) => {
        console.error("Error fetching medical records:", e);
        message.error("No medical records found for this patient.");
      });
  };

  const toggleRecordDetails = (recordId) => {
    setExpandedRecordId((prev) => (prev === recordId ? null : recordId));
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
  };

  
  const handleUpdateSuccess = (updatedRecord) => {
    setRecords((prevRecords) =>
      prevRecords.map((rec) =>
        rec.recordId === updatedRecord.recordId ? updatedRecord : rec
      )
    );
    setEditingRecord(null); 
  };

  return (
    <div className="dashboard-container">

      <DoctorNavbar activeItem="medicalRecords" userName={`${firstname} ${lastname}`} className="dashboard-sidebar" />

      <div className="dashboard-main">
        <Header
          userName={`${firstname} ${lastname}`} 
          userType="Doctor"
          className="dashboard-header"
        />

        <div className="dashboard-content mt-4">
          
          <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <Input
              placeholder="Enter Patient ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)} 
              style={{ width: "300px" }}
            />
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>

          {records.length > 0 ? (
            records.map((record) => (
              <Card
                key={record.recordId}
                style={{ marginBottom: "20px", cursor: "pointer" }}
                title={
                  <>
                    <span>Record ID: {record.recordId}</span>
                    <Button
                      type="link"
                      style={{ float: "right" }}
                      onClick={() => toggleRecordDetails(record.recordId)}
                    >
                      {expandedRecordId === record.recordId ? (
                        <>
                          Collapse <UpOutlined />
                        </>
                      ) : (
                        <>
                          Expand <DownOutlined />
                        </>
                      )}
                    </Button>
                  </>
                }
              >
                <p>
                  <strong>Patient:</strong> {record.patientFirstName}
                </p>

                {expandedRecordId === record.recordId && (
                  <>
                    <p>
                      <strong>Doctor:</strong> {record.doctorFirstName}
                    </p>
                    <p>
                      <strong>Symptoms:</strong> {record.symptoms}
                    </p>
                    <p>
                      <strong>Physical Examination:</strong>{" "}
                      {record.physicalExamination}
                    </p>
                    <p>
                      <strong>Treatment Plan:</strong> {record.treatmentPlan}
                    </p>
                    <p>
                      <strong>Tests Recommended:</strong> {record.testsRecommended}
                    </p>
                    <p>
                      <strong>Doctor Notes:</strong> {record.notes}
                    </p>
                    <Button type="primary" onClick={() => handleEditClick(record)}>
                      Edit Record
                    </Button>
                  </>
                )}
              </Card>
            ))
          ) : (
            <p>No medical records found. Please search for a Patient ID.</p>
          )}
        </div>
      </div>

      {editingRecord && (
        <UpdateMedicalRecord
          record={editingRecord}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ViewMedicalRecords;
