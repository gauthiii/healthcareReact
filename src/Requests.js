import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { patients_api, api_username, patients_api_pwd } from './App';
import './LoadingSpinner.css';

function Requests({ authToken }) {
    const [requests, setRequests] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);
                const response = await axios.get(`${patients_api}/users`, {
                    headers: { Authorization: basicAuth }
                });
                const admin = response.data.find(user => user.email === 'admin@admin.com');
                setRequests(admin.requests);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        const fetchPatients = async () => {
            setLoading(true);
            try {
                const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);
                const response = await axios.get(`${patients_api}/patients`, {
                    headers: { Authorization: basicAuth }
                });
                setPatients([{ id: '', name: '(Select Patient)' }, ...response.data.filter(patient => !patient.email)]);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchRequests();
        fetchPatients();
    }, []);

    const handleAssignRequest = async (requestEmail) => {
        const selectedPatient = selectedPatients[requestEmail];
        if (!selectedPatient) {
            alert('Please select a patient to assign the request to.');
            return;
        }
        
        try {
            const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);
            await axios.patch(`${patients_api}/patients/id`, { email: requestEmail }, {
                headers: { Authorization: basicAuth, 'Authorization-ID': selectedPatient }
            });

            const updates = { "removeRequest": requestEmail };
            await axios.patch(`${patients_api}/users/6686abdf82166a5cb283227b`, updates, {
                headers: { Authorization: basicAuth }
            });

            alert('Request assigned successfully');
            // Update local state
            setPatients(patients.filter(patient => patient.id !== selectedPatient));
            setRequests(requests.filter(email => email !== requestEmail));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSelectChange = (requestEmail, value) => {
        setSelectedPatients(prevState => ({
            ...prevState,
            [requestEmail]: value
        }));
    };

    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{color:"black", fontFamily:"Poppins",fontWeight:700,marginBottom:5}}>
                Admin Requests
            </Typography>
            {isLoading ? (
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : requests.length===0?(
            <>
             <Typography variant="h3" gutterBottom sx={{color:"black", fontFamily:"Poppins",fontWeight:300,marginBottom:5,marginTop:"10px"}}>
                 There are no requests for you.
                </Typography>
            </>) :(
                <>
                    {error && <Typography color="error">{error}</Typography>}
                    <TableContainer component={Paper} sx={{border:2 }}>
                        <Table className='tab' sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#c2cace', color: 'black', fontFamily: "Poppins" }}>Request Email</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#c2cace', color: 'black', fontFamily: "Poppins" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map((request, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>{request}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>
                                            <FormControl fullWidth>
                                                <InputLabel>Assign to Patient</InputLabel>
                                                <Select
                                                    value={selectedPatients[request] || ''}
                                                    onChange={(e) => handleSelectChange(request, e.target.value)}
                                                >
                                                    {patients.map(patient => (
                                                        <MenuItem key={patient.id} value={patient.id}>
                                                            {patient.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleAssignRequest(request)}
                                                style={{ marginTop: '10px' }}
                                            >
                                                Assign
                                            </Button>
                                            </FormControl>
                                            
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </div>
    );
}

export default Requests;
