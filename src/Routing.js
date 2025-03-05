import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Component/User/Login';
import Signup from './Component/User/Signup';
import Home from './Component/Home/Home';
import PatientDashboard from './Component/Patient/PatientDashboard';
import PatientDoctors from './Component/Patient/PatientDoctors/PatientDoctors';
import PatientAppointment from './Component/Patient/PatientAppoinments/PatientAppointments';
import PatientMedicalRecords from './Component/Patient/PatientMedicalRecords/PatientRecords';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './Component/Admin/Admindashboard';
import ManageAppointment from './Component/Admin/Appointments/ManageAppointments';
import ManageDoctor from './Component/Admin/Doctors/ManageDoctors';
import ManagePatient from './Component/Admin/Patients/ManagePatient';
import ManageMedicalRecord from './Component/Admin/Records/ManageMedicalRecord';
import ManagePrescription from './Component/Admin/Prescriptions/ManagePrescription';
import DoctorDashboard from './Component/Doctor/Doctordashboard';
import ViewMedicalRecords from './Component/Doctor/Appointments/ViewmedicalRecords';
import ViewAppointments from './Component/Doctor/Appointments/ViewAppointments';
import Prescription from './Component/Doctor/Appointments/Prescription';



const routing = () => {
  return (
    <Routes>

      <Route path="/" element={<Home/>} />      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>}/>

      <Route path="/patient/dashboard" element={<ProtectedRoute> <PatientDashboard/></ProtectedRoute>} />
      <Route path="/patient/doctors" element={<ProtectedRoute><PatientDoctors/></ProtectedRoute>} />
      <Route path="/patient/appointments" element={<ProtectedRoute><PatientAppointment /></ProtectedRoute>} />
      <Route path="/patient/records" element={<ProtectedRoute><PatientMedicalRecords/></ProtectedRoute>} />
      
      <Route path="/doctor/dashboard"
       element={<ProtectedRoute> <DoctorDashboard/></ProtectedRoute>} />
       <Route path="/doctor/medicalrecords"
       element={<ProtectedRoute> <ViewMedicalRecords/></ProtectedRoute>} />
       <Route path="/doctor/appointments"
       element={<ProtectedRoute> <ViewAppointments/></ProtectedRoute>} />
       <Route path='/doctor/prescription' element={<ProtectedRoute><Prescription/></ProtectedRoute>}/>


      <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard/></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute> <ManageDoctor/></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute> <ManageAppointment/></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute> <ManagePatient/></ProtectedRoute>} />
      <Route path="/admin/records" element={<ProtectedRoute> <ManageMedicalRecord/></ProtectedRoute>} />
      <Route path="/admin/prescriptions" element={<ProtectedRoute> <ManagePrescription/></ProtectedRoute>} />
      
    </Routes>
  );
};

export default routing;
