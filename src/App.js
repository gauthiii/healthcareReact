import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import Patients from './Patients';
import Prescriptions from './Prescriptions';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import './App.css';
import Appointments from './Appointments';
import {jwtDecode} from 'jwt-decode';

export const patients_api = 'https://localhost:8089';
export const prescriptions_api = 'https://localhost:8081';
export const appointments_api = 'https://localhost:8082';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
    const [authToken, setAuthToken] = useState('');
    const [user, setUser] = useState(null);

    // Check for an auth token on initial render
    useEffect(() => {
        const getUser = () => {

            const token = localStorage.getItem("authToken");
            if (token) {
                setAuthToken(token);
                setIsLoggedIn(true);
                if (token !== "adminLogin")
                setUser(jwtDecode(token));
                
            }    


        };
       
        getUser();
    }, []);

    return (
        <Router>
            <div className="container">
                {isLoggedIn && <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />}
                <div className="main-content">
                    <Routes>
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setAuthToken={setAuthToken} />} />
                        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home authToken={authToken} user={user} /></ProtectedRoute>} />
                        <Route path="/patients" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Patients user={user} authToken={authToken} /></ProtectedRoute>} />
                        <Route path="/prescriptions" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Prescriptions user={user} authToken={authToken} /></ProtectedRoute>} />
                        <Route path="/appointments" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Appointments user={user} authToken={authToken} /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;


// eyJhbGciOiJSUzI1NiIsImtpZCI6IjJhZjkwZTg3YmUxNDBjMjAwMzg4OThhNmVmYTExMjgzZGFiNjAzMWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NjEyNzQyNjY4ODQtc240OHBiMDY5cXNwcDg2a2dpZGRzNDVuZG5lY2FnY3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0NjEyNzQyNjY4ODQtc240OHBiMDY5cXNwcDg2a2dpZGRzNDVuZG5lY2FnY3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc4MTUyMjc2NDE1NDk0NDM2MDAiLCJlbWFpbCI6ImdhdXZpai45OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzE5NTA1NTI1LCJuYW1lIjoiR2F1dGhhbSBWaWpheWFyYWoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSldoeWx1ZXlyQzN5Mml0UHF1cFhsU1FSRjliLXBPRVdlRDBQdU1rb0t1NHhLemVVdUU0QT1zOTYtYyIsImdpdmVuX25hbWUiOiJHYXV0aGFtIiwiZmFtaWx5X25hbWUiOiJWaWpheWFyYWoiLCJpYXQiOjE3MTk1MDU4MjUsImV4cCI6MTcxOTUwOTQyNSwianRpIjoiOWQwYTJlOGFlOTJjYzdkOTFhOTYzNjY5MGQzMzY1OWVjODQzYzI0NCJ9.2RJGZpMV2HvefDL6UuDO2nXCVFFG1s6k4KdwXqyZpIeC4lzifb1zyka4WYENRJl9GY6m0B6cc9Ydj6yzKXZXHKeriez946wPkTVS-ah5LR96trtxaTkzdVJrxu3MxkL0vYqMvy316rbQ0v0ObtYrLEgwgTf7sdSt5Gkkrutv3BiIo4hg87FuhGQqDhb9W9Bywa79wz2bD45GBzK77nKOAT5DVwOtma9yhDN4J9GtD7Ayuqk7SAg-K66tcERaUSuj5AF2ZdAFTtna_BeEf5aG2sB3Q3v9B2jy_pcw8OJfg3gigUUoDtly11kdWXLzPSOcAKE3nWsej0pd-OCyo3OsyA
