import { useEffect, useState } from "react";
import DoctorNavbar from "../../Navbar/DoctorNavbar";
import Header from "../../User/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import { message, Modal, Button, Input, Form, Collapse } from "antd";
import "./Prescription.css"; 

const { Panel } = Collapse;

const Prescription = () => {
  const { token } = useSelector((state) => state.user);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [form] = Form.useForm();

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
        if (res.data) {
          setFirstname(res.data.firstName);
          setLastname(res.data.lastName);
        } else {
          message.error("Doctor ID is not available in the profile.");
        }
      })
      .catch((e) => {
        console.error("Error fetching doctor profile:", e);
        message.error("Failed to fetch doctor profile. Please try again.");
      });
  }, [token]);

  const fetchPrescriptions = (recordId) => {
    if (!recordId) {
      message.error("Please provide a valid record ID.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/medicalRecord/viewPrescriptions/${recordId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Prescriptions fetched:", res.data);
        setPrescriptions(res.data);
      })
      .catch((e) => {
        console.error("Error fetching prescriptions:", e);
        
      });
  };

  const handleEditPrescription = (prescription) => {
  
    setEditingPrescription(prescription);
    form.setFieldsValue({
      medicationName: prescription.medicationName,
      dosage: prescription.dosage,
      duration: prescription.duration,
      frequency: prescription.frequency,
      notes: prescription.notes,
    });
  };

  const handleSubmitEdit = (values) => {
    if (!editingPrescription) {
      return;
    }

    axios
      .put(
        `http://localhost:8080/api/medicalRecord/editPrescription/${selectedRecordId}/${editingPrescription.prescriptionId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        message.success("Prescription updated successfully.");
        fetchPrescriptions(selectedRecordId);
        setEditingPrescription(null); 
        form.resetFields();
      })
      .catch((e) => {
        console.error("Error updating prescription:", e);
        message.error("Failed to update prescription. Please try again.");
      });
  };

  const handleDeletePrescription = (recordId, prescriptionId) => {
    axios
      .delete(
        `http://localhost:8080/api/medicalRecord/deletePrescription/${recordId}/${prescriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        message.success("Prescription deleted successfully.");
        setPrescriptions((prevPrescriptions) =>
          prevPrescriptions.filter((prescription) => prescription.prescriptionId !== prescriptionId)
        );
      })
      .catch((e) => {
        console.error("Error deleting prescription:", e);
        message.error("Failed to delete prescription. Please try again.");
      });
  };
  

  return (
    <>
      <div className="dashboard-container">

        <DoctorNavbar activeItem="prescriptions" userName={`${firstname} ${lastname}`} className="dashboard-sidebar" />

        <div className="dashboard-main">
          <Header
            userName={`${firstname} ${lastname}`}
            userType="Doctor"
            className="dashboard-header"
          />
          <div className="prescription-container">
            <div className="record-id-container">
              <Input
                type="text"
                placeholder="Enter Record ID"
                onChange={(e) => setSelectedRecordId(e.target.value)}
                style={{ width: 200, marginBottom: 20, marginRight:'10px' }}
              />
              <Button type="primary" onClick={() => fetchPrescriptions(selectedRecordId)}>
                View Prescriptions
              </Button>
            </div>

            <div className="prescriptions-list">
              <Collapse accordion>
                {prescriptions.map((prescription) => (
                  <Panel
                    header={`Record ID: ${selectedRecordId} - Prescription #${prescription.prescriptionId}`}
                    key={prescription.prescriptionId}
                    className="prescription-panel"
                  >
                    <p><strong>Medication Name:</strong> {prescription.medicationName}</p>
                    <p><strong>Dosage:</strong> {prescription.dosage}</p>
                    <p><strong>Duration:</strong> {prescription.duration} days</p>
                    <p><strong>Frequency:</strong> {prescription.frequency}</p>
                    <p><strong>Notes:</strong> {prescription.notes}</p>
                    <div className="buttons-container">
                      <Button
                        type="primary"
                        onClick={() => handleEditPrescription(prescription)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="danger"
                        onClick={() =>
                          handleDeletePrescription(selectedRecordId, prescription.prescriptionId)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </div>

            <Modal
              title="Edit Prescription"
              open={!!editingPrescription}
              onCancel={() => setEditingPrescription(null)}
              footer={null}
            >
              <Form
                form={form}
                onFinish={handleSubmitEdit}
                layout="vertical"
                initialValues={{
                  medicationName: editingPrescription?.medicationName,
                  dosage: editingPrescription?.dosage,
                  duration: editingPrescription?.duration,
                  frequency: editingPrescription?.frequency,
                  notes: editingPrescription?.notes,
                }}
              >
                <Form.Item
                  name="medicationName"
                  label="Medication Name"
                  rules={[{ required: true, message: "Please input the medication name!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="dosage"
                  label="Dosage"
                  rules={[{ required: true, message: "Please input the dosage!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="duration"
                  label="Duration (days)"
                  rules={[{ required: true, message: "Please input the duration!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="frequency"
                  label="Frequency"
                  rules={[{ required: true, message: "Please input the frequency!" }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Prescription
                </Button>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prescription;
