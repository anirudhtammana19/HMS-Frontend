import AdminNavBar from '../../Navbar/AdminNavbar';
import Header from '../../User/Header';
import './ManagePatient.css';
import ViewAllPatients from './ViewAllPatients';

const ManagePatient = () => {

  
  return (
    <div className="admin-patients">
      
      <AdminNavBar activeItem="patients"  />

      <div className="flex-grow-1">
        <Header  userType="Admin" />
        
        <div className="main-content mt-4">
          <ViewAllPatients/>
        </div>
      </div>
    </div>
  );
};

export default ManagePatient;
