import AdminNavBar from '../../Navbar/AdminNavbar';
import Header from '../../User/Header';
import './ManageDoctors.css';
import ViewAllDoctors from './ViewAllDoctors';

const ManageDoctor = () => {

  
  return (
    <div className="admin-doctors">
      
      <AdminNavBar activeItem="doctors"  />

      <div className="flex-grow-1">
        <Header userType="Admin" />
        
        <div className="main-content">
          <ViewAllDoctors/>
        </div>
      </div>
    </div>
  );
};

export default ManageDoctor;
