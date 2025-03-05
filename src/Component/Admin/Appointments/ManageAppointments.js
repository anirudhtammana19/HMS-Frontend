import AdminNavBar from '../../Navbar/AdminNavbar';
import Header from '../../User/Header';
import './ManageAppointments.css';
import ViewAllAppointments from './ViewAllAppointments';

const ManageAppointment = () => {

  
  return (
    <div className="admin-appointments">
      
      <AdminNavBar activeItem="appointments"  />

      <div className="flex-grow-1">
      <div >
        <Header  userType="Admin" />
        </div>
        <div className=" main-content mt-4">
            <ViewAllAppointments/>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointment;
