import AdminNavBar from '../../Navbar/AdminNavbar';
import Header from '../../User/Header';
import './ManageMedicalRecord.css';
import ViewAllRecords from './ViewAllRecords';

const ManageMedicalRecord = () => {

  
  return (
    <div className="admin-records">
      <div style={{width:'80%'}}>
      <AdminNavBar activeItem="medicalRecords"  />
      </div>
      <div className="flex-grow-1">
        <div >
        <Header  userType="Admin" />
        </div>
        <div className="main-content mt-4">
          <ViewAllRecords/>
        </div>
      </div>
    </div>
  );
};

export default ManageMedicalRecord;
