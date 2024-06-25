import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import Patients from './Patients';
import Prescriptions from './Prescriptions';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import './App.css';


export const patients_api = 'https://localhost:8080';
export const prescriptions_api = 'http://localhost:8081';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

    return (
        <Router>
            <div className="container">
                {isLoggedIn && <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                <div className="main-content">
                    <Routes>
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>} />
                        <Route path="/patients" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Patients /></ProtectedRoute>} />
                        <Route path="/prescriptions" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Prescriptions /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;