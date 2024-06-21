import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './Patients';
import Prescriptions from './Prescriptions';
import Nav from './Nav';
import Home from './Home';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <Nav />
                <div className="main-content">
                    {/* Route configuration */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/prescriptions" element={<Prescriptions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
