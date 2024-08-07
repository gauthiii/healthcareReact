import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserNurse, faFileMedical, faRightFromBracket,faCalendarCheck,faBell } from '@fortawesome/free-solid-svg-icons';

import doc from './doc.png';
import { NavLink, useNavigate } from 'react-router-dom';


function Nav({ isLoggedIn, setIsLoggedIn, user,setUser }) {

  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state on logout
    // Add logic for any logout specific actions (e.g., clear user data)
    localStorage.removeItem("authToken");
    setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  const logoutButton = (
    <div className="link" style={{cursor:'pointer'}} onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: "15px", marginRight: "26px", marginLeft: "25px" }} />
      Log Out
    </div>
  );

  return (
    <div className="sidebar">
      {/* Navigation links */}
      <div style={{ textAlign: "center" }}>
        <img src={doc} alt="Animation" className="dash-image" />
      </div>
      <div style={{ textAlign: "center", fontWeight: 900, fontSize: 16, fontFamily: "Poppins", marginBottom: "40px" }}>
        MY DASHBOARD SCREEN
      </div>
      
      
 
      
      <NavLink to="/" className="link" activeClassName="active">
        <FontAwesomeIcon icon={faHome} style={{ fontSize: "15px", marginRight: "20px", marginLeft: "25px" }} /> Home
      </NavLink>
      <NavLink to="/patients" className="link" activeClassName="active">
        <FontAwesomeIcon icon={faUserNurse} style={{ fontSize: "15px", marginRight: "24px", marginLeft: "25px" }} /> {user?.email==="admin@admin.com"?"Patients":"Patient Details"}
      </NavLink>
      <NavLink to="/prescriptions" className="link" activeClassName="active">
        <FontAwesomeIcon icon={faFileMedical} style={{ fontSize: "15px", marginRight: "26px", marginLeft: "25px" }} /> {user?.email==="admin@admin.com"?"Prescriptions":"Prescription Details"}
      </NavLink>
      <NavLink to="/appointments" className="link" activeClassName="active">
        <FontAwesomeIcon icon={faCalendarCheck} style={{ fontSize: "15px", marginRight: "22px", marginLeft: "25px" }} /> {user?.email==="admin@admin.com"?"Appointments":"Appointment Details"}
      </NavLink>
      {user?.email==="admin@admin.com" &&
      <NavLink to="/requests" className="link" activeClassName="active">
        <FontAwesomeIcon icon={faBell} style={{ fontSize: "15px", marginRight: "22px", marginLeft: "25px" }} /> Requests
      </NavLink>
}

      {/* Conditionally render logout button */}
      {isLoggedIn && logoutButton}

      
    </div>
  );
}

export default Nav;
