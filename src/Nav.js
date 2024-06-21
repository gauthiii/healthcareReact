import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome ,faUserNurse,faFileMedical} from '@fortawesome/free-solid-svg-icons';

import doc from './doc.png';
import { NavLink } from 'react-router-dom';

function Nav() {

    return (

        <div className="sidebar">
        {/* Navigation links */}
        <div style={{textAlign:"center"}}>
        <img src={doc} alt="Animation" className="dash-image" />
        </div>
        <div style={{textAlign:"center",fontWeight:900, fontSize:16,fontFamily:"Poppins",marginBottom:"40px"}}>MY DASHBOARD SCREEN</div>
        <FontAwesomeIcon icon="fa-solid fa-house" />
        
        <NavLink to="/" className="link" activeClassName="active"> <FontAwesomeIcon icon={faHome}  style={{fontSize:"15px", marginRight:"20px",marginLeft:"40px"}}/> Home</NavLink>
        <NavLink to="/patients" className="link" activeClassName="active"><FontAwesomeIcon icon={faUserNurse} style={{fontSize:"15px", marginRight:"28px",marginLeft:"40px"}}/>Patients</NavLink>
        <NavLink to="/prescriptions" className="link" activeClassName="active"><FontAwesomeIcon icon={faFileMedical} style={{fontSize:"15px", marginRight:"30px",marginLeft:"40px"}}/>Prescriptions</NavLink>
      </div>
    );

 
}

export default Nav;