import { GoogleLogin } from '@react-oauth/google';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doc from './doc.png';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate(); // Use useNavigate hook

    const responseMessage = (response) => {
        console.log(response);
        setIsLoggedIn(true); // Update login status on successful login
        navigate('/'); // Redirect to the home page after login
    };

    const errorMessage = (error) => {
        console.error(error);
        alert('Login failed. Please try again.'); // User-friendly error message
    };

    return (
        <div className='logW'>
        <div className="login-container">
            <div className="login-content">
                <h1 style={{fontSize:'20px'}}>Health System Login Screen</h1>
                <div style={{ textAlign: "center" }}>
                    <img src={doc} alt="Animation" className="dash-image" style={{marginTop:'0vh',marginBottom:'20px'}}/>
                </div>
                <div style={{marginLeft:'3.2vw'}}>
                <GoogleLogin
                    className="gbut"
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    buttonText="Login with Google"
                />
                </div>
                <div style={{marginTop:'40px',fontSize:'13px'}}>© {new Date().getFullYear()} Gautham Vijayaraj. All rights reserved.</div>
                
            </div>
        </div>
        </div>
    );
}

export default Login;
