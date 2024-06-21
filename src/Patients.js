import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './App.css';

function Patients() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ }}>
            <Typography variant="h4" gutterBottom sx={{color:"white",textAlign:"center",fontFamily:"Poppins",fontWeight:500}}>
                Patients List
            </Typography>
            <TableContainer component={Paper} sx={{border:2 }}>
                <Table className='tab' sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Patient ID", "Name", "Birth Date", "Medical History", "Contact", "Address", "Gender", "Allergies", "Current Medications", "Height", "Weight", "BMI", "Blood Type", "Primary Diagnosis", "Insurance Provider", "Policy Number", "Emergency Contact Name","Emergency Contact Relation","Emergency Contact Number","Appointments","Prescriptions","Bills"].map(header => (
                                <TableCell key={header} sx={{ minWidth: '200px', backgroundColor: '#c2cace', color: 'black', fontWeight:'bold', border: '1px solid #ddd' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow
                                key={patient.id}
                                sx={{ '& > *': { border: '1px solid #ccc' } }}
                            >
                                {Object.values(patient).map((value, index) => (
                                    <TableCell key={index} sx={{ minWidth: '200px', backgroundColor: 'lightblue', color: 'darkblue', border: '1px solid #ddd' }}>
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Patients;
