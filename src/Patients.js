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
    }, [patients]);

    const cellStyle = {
        minWidth: '250px', // Adjust this width as needed
        backgroundColor: 'lightblue', 
        color: 'darkblue', 
        border: '1px solid grey'
    };

    return (
        <div style={{ margin: '20px'}}>
            <Typography variant="h4" gutterBottom sx={{color:"black", fontFamily:"Poppins",fontWeight:700,marginBottom:5}}>
                Patients List
            </Typography>
            <TableContainer component={Paper} sx={{border:2 }}>
                <Table className='tab' sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Patient ID", "Name", "Birth Date", "Medical History", "Contact", "Address", "Gender", "Allergies", "Current Medications", "Height", "Weight", "BMI", "Blood Type", "Primary Diagnosis", "Insurance Provider", "Policy Number", "Emergency Contact Name","Emergency Contact Relation","Emergency Contact Number","Appointments","Prescriptions","Bills"].map(header => (
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
            </TableContainer>
        </div>
    );
}

export default Patients;
