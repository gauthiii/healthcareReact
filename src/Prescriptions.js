import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/prescriptions');
                setPrescriptions(response.data);

                console.log(prescriptions)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [prescriptions]);

    const cellStyle = {
        minWidth: '250px', // This ensures all cells have at least this width
        backgroundColor: 'lightblue', 
        color: 'darkblue', 
        border: '1px solid grey',
  
    };

    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{color:"black",   fontFamily:"Poppins", fontWeight:700,marginBottom:5}}>
                Prescriptions List
            </Typography>
            <TableContainer component={Paper} sx={{border:2 }}>
                <Table className='tab' sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Prescription ID", "Patient ID", "Doctor ID", "Date of Prescription", "Date of Validity", "Medicine Name", "Medicine Dosage", "Medicine Frequency",  "Status", "Ailment", "Special Instructions","Pharmacy ID", "Notes"].map(header => (
                                <TableCell key={header} sx={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#c2cace', color: 'black' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prescriptions.map((prescription) => (
                            <TableRow key={prescription.id} sx={{ '& > *': cellStyle }}>
                                <TableCell>{prescription.id}</TableCell>
                                <TableCell>{prescription.patientId}</TableCell>
                                <TableCell>{prescription.doctorId}</TableCell>
                                <TableCell>{prescription.dateOfPrescription}</TableCell>
                                <TableCell>{prescription.dateOfValidity}</TableCell>
                                <TableCell>{prescription.medicines[0].name}</TableCell>
                                <TableCell>{prescription.medicines[0].dosage}</TableCell>
                                <TableCell>{prescription.medicines[0].frequency}</TableCell>
                                {/* <TableCell>{prescription.medicines.join(', ')}</TableCell>
                                <TableCell>{prescription.doses.join(', ')}</TableCell> */}
                                <TableCell>{prescription.status}</TableCell>
                                <TableCell>{prescription.ailment}</TableCell>
                                <TableCell>{prescription.specialInstructions}</TableCell>
                                <TableCell>{prescription.pharmacyId}</TableCell>
                                <TableCell>{prescription.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Prescriptions;
