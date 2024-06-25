import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './App.css';
import { patients_api } from './App';

function Patients() {
    const [patients, setPatients] = useState([]);
    const [err,setErr] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {

                 // Encode your username and password
            const username = 'user';
            const password = 'b7bb94f6-4f72-482a-96c9-741cc9d727ca';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await axios.get(`${patients_api}/patients`, {
                headers: { Authorization: basicAuth }
            });
               
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setErr(error.message);
                console.log ("err: ",err)
            }
        };

        fetchData();
    }, [patients,err]);

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

            {err!=='' &&(<div style={{margin:'20px'}}>Unable to fetch Patient Data due to {err}</div>)}
        </div>
    );
}

export default Patients;
