import React, { useState } from 'react';
import AdminNavBar from '../Navbar/AdminNavbar';
import Header from '../User/Header';
import './Admindashboard.css';
import { useNavigate } from 'react-router-dom';
import AdminProfile from './AdminProfile';
import { Card } from 'antd';
import {
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const AdminDashboard = () => {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      <AdminNavBar activeItem="dashboard" />

      <div className="flex-grow-1">
        <Header userType="Admin" setIsModalOpen={setIsModalOpen} />

        <div className="main-content mt-4">
          <div className="dashboard-grid">
            <Card
              hoverable
              className="dashboard-card"
              onClick={() => nav('/admin/doctors')}
            >
              <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              <h5>Manage Doctors</h5>
              <p>View and manage doctor profiles and their schedules.</p>
            </Card>
            <Card
              hoverable
              className="dashboard-card"
              onClick={() => nav('/admin/appointments')}
            >
              <CalendarOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
              <h5>Manage Appointments</h5>
              <p>Track and organize patient appointments efficiently.</p>
            </Card>
            <Card
              hoverable
              className="dashboard-card"
              onClick={() => nav('/admin/patients')}
            >
              <UserOutlined style={{ fontSize: '48px', color: '#faad14' }} />
              <h5>Manage Patients</h5>
              <p>Manage patient information and their medical history.</p>
            </Card>
            <Card
              hoverable
              className="dashboard-card"
              onClick={() => nav('/admin/records')}
            >
              <FileTextOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />
              <h5>Manage Medical Records</h5>
              <p>Access and update patient medical records securely.</p>
            </Card>
          </div>
          <AdminProfile show={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
