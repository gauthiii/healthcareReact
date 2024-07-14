import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import doc from './doc.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed
import CryptoJS from 'crypto-js';
import { patients_api,api_username,patients_api_pwd } from './App';
import './LoadingSpinner.css';

function Login({ setIsLoggedIn, setUser,setAuthToken }) {
    const navigate = useNavigate();
    const [isAdminLogin, setAdminLogin] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate('/'); // Navigate to home if already logged in
        }
    }, [navigate]);

    const handleCredentialResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        localStorage.setItem("authToken", response.credential);
        setAuthToken(response.credential);
        setIsLoggedIn(true);
        setUser(jwtDecode(response.credential));
        navigate('/');
    };

    const handleAdminLogin = async () => {

        try {

            const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);

           
          
                const detailsResponse = await axios.get(`${patients_api}/users/id`, {
                    headers: { Authorization: basicAuth,'Authorization-ID':"6686abdf82166a5cb283227b" }
                });
              
                if (CryptoJS.SHA256(accessCode).toString(CryptoJS.enc.Hex) === detailsResponse.data.password) { // Replace "YourAccessCode" with your real access code
                    localStorage.setItem("authToken", "adminLogin");
                    setAuthToken("adminLogin");
                    setIsLoggedIn(true);
                    setUser(detailsResponse.data);
                    navigate('/');
        
                    
                    
                } else {
                    alert('Invalid access code.');
                }
         
        } catch (error) {
            console.error('Error fetching user details: ', error);
            alert("Server is busy. Admin can't login");
        }


       
    };

    return (
        <div className='logW'>
            <div className="login-container">
                <div className="login-content">
                    <h1 style={{ fontSize: '20px' }}>Health System Login Screen</h1>
                    <div style={{ textAlign: "center" }}>
                        <img src={doc} alt="Health System" className="dash-image" style={{ marginTop: '0vh', marginBottom: '20px' }} />
                    </div>
                    {isAdminLogin ? (
                        <>
                            <input
                                type="text"
                                placeholder="Enter access code"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                style={{ margin: '10px 0', padding: '10px',fontFamily:"Poppins",outline:'none',width:'250px',border:'2px solid #555' }}
                            /><br/>
                            <button onClick={handleAdminLogin} className="gbut">Submit</button>
                        </>
                    ) : (
                        <GoogleLogin
                        width = "300"
                            onSuccess={handleCredentialResponse}
                            onError={() => alert('Login Failed: Please try again.')}
                        />
                    )}
                    <div onClick={() => setAdminLogin(!isAdminLogin)} style={{ marginTop: '40px',cursor:'pointer',fontSize:'15px',color:'#DA172C',fontFamily:"Poppins",fontWeight:'500' }}>
                        {isAdminLogin ? "Login with Google" : "Login as Admin"}
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '13px' }}>© {new Date().getFullYear()} Gautham Vijayaraj. All rights reserved.</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
