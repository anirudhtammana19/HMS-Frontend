import AdminNavBar from '../../Navbar/AdminNavbar';
import Header from '../../User/Header';
import './ManagePrescription.css';
import ViewAllPrescriptions from './ViewAllPrescriptions';

const ManagePrescription = () => {

  
  return (
    <div className="admin-prescriptions">
      
      <AdminNavBar activeItem="prescriptions"  />

      <div className="flex-grow-1">
        <div >
        <Header  userType="Admin" />
        </div>
        <div className="main-content mt-4">
          <ViewAllPrescriptions/>
        </div>
      </div>
    </div>
  );
};

export default ManagePrescription;
