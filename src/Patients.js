import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent } from '@mui/material';
import './App.css';
import { patients_api } from './App';

function Patients({ authToken, user }) {
    const [patients, setPatients] = useState([]);
    const [err, setErr] = useState('');
    const [patientDetails, setPatientDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = 'user';
                const password = 'patients';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);

                const response = await axios.get(`${patients_api}/patients`, {
                    headers: { Authorization: basicAuth }
                });
                setPatients(response.data);
                setErr('');
            } catch (error) {
                console.error('Error fetching data: ', error);
                setErr(error.message);
            }
        };

        const fetchPatientID = async () => {
            try {
                const username = 'user';
                const password = 'patients';
                const basicAuth = 'Basic ' + btoa(username + ':' + password);

                // First get the patient ID using the email
                const idResponse = await axios.get(`${patients_api}/patients/check-email`, {
                    headers: { Authorization: basicAuth, 'Authorization-Email': user.email }
                });
                if (idResponse.data) {
                    // Now fetch the full details using the patient ID
                    const detailsResponse = await axios.get(`${patients_api}/patients/${idResponse.data}`, {
                        headers: { Authorization: basicAuth }
                    });
                    setPatientDetails(detailsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching patient details: ', error);
                setPatientDetails(null);
            }
        };

        fetchData();
        if (user?.email) {
            fetchPatientID();
        }
    }, [user]);

    const cellStyle = {
        minWidth: '250px',
        backgroundColor: 'lightblue',
        color: 'darkblue',
        border: '1px solid grey'
    };

    return (
        <div style={{ margin: '20px'}}>
            <Typography variant="h4" gutterBottom sx={{color:"black", fontFamily:"Poppins",fontWeight:700,marginBottom:5}}>
                Patients List
            </Typography>
           {authToken==="adminLogin" && <TableContainer component={Paper} sx={{border:2 }}>
                <Table className='tab' sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Patient ID","Email", "Name", "Birth Date", "Medical History", "Contact", "Address", "Gender", "Allergies", "Current Medications", "Height", "Weight", "BMI", "Blood Type", "Primary Diagnosis", "Insurance Provider", "Policy Number", "Emergency Contact Name","Emergency Contact Relation","Emergency Contact Number","Appointments","Prescriptions","Bills"].map(header => (
                                <TableCell key={header} sx={{ ...cellStyle, fontWeight:'bold', backgroundColor: '#c2cace', color: 'black',fontFamily:"Poppins" }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id} sx={{ '& > *': cellStyle }}>
                                {Object.values(patient).map((value, index) => (
                                    <TableCell key={index} sx={{...cellStyle,fontFamily:"Poppins"}}>
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            {err !== '' && (<div style={{ margin: '20px' }}>Unable to fetch Patient Data due to {err}</div>)}
            {patientDetails && (
                <Card sx={{ maxWidth: 345, marginTop: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Patient ID Card
                        </Typography>
                        {["id", "name", "contact", "email","address"].map(key => (
                            <Typography variant="body2" color="text.secondary" key={key}>
                                {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${patientDetails[key]}`}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Patients;
