import axios from "axios";
import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useSelector } from "react-redux";

const UpdateMedicalRecord = ({ record, onUpdateSuccess }) => {
  const [editModalVisible, setEditModalVisible] = useState(true); 
  const { token } = useSelector((state) => state.user);
  const [form] = Form.useForm();

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      axios
        .put(
          `http://localhost:8080/api/medicalRecord/editRecord/${record.recordId}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          message.success("Medical record updated successfully!");
          onUpdateSuccess({ ...record, ...values }); 
          closeEditModal();
        })
        .catch((e) => {
          console.error("Error updating medical record:", e);
          message.error("Failed to update medical record. Please try again.");
        });
    });
  };

  return (
    <Modal
      title="Edit Medical Record"
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={handleSave}
      okText="Save"
    >
      <Form form={form} layout="vertical" initialValues={record}>
        <Form.Item name="symptoms" label="Symptoms" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="physicalExamination"
          label="Physical Examination"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="treatmentPlan"
          label="Treatment Plan"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="testsRecommended"
          label="Tests Recommended"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="notes" label="Doctor Notes">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMedicalRecord;
