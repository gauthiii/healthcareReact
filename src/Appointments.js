import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './App.css';
import { appointments_api } from './App';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [err,setErr] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {

                 // Encode your username and password
            const username = 'user';
            // const password = 'b7bb94f6-4f72-482a-96c9-741cc9d727ca';
            const password = 'appointments';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await axios.get(`${appointments_api}/appointments`, {
                headers: { Authorization: basicAuth }
            });
               
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setErr(error.message);
                console.log ("err: ",err)
            }
        };

        fetchData();
    }, [appointments,err]);

    const cellStyle = {
        minWidth: '250px', // Adjust this width as needed
        backgroundColor: 'lightblue', 
        color: 'darkblue', 
        border: '1px solid grey'
    };

    return (
        <div style={{ margin: '20px'}}>
            <Typography variant="h4" gutterBottom sx={{color:"black", fontFamily:"Poppins",fontWeight:700,marginBottom:5}}>
                Appointments List
            </Typography>
            <TableContainer component={Paper} sx={{border:2 }}>
                <Table className='tab' sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Appointment ID","appointment ID","Doctor ID", "Hospital Name", "Date of Appointment", "Date Booked", "Priority", "Department", "Status", "Notes", "Room Number", "Treatment Type"].map(header => (
                                <TableCell key={header} sx={{ ...cellStyle, fontWeight:'bold', backgroundColor: '#c2cace', color: 'black',fontFamily:"Poppins" }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow key={appointment.id} sx={{ '& > *': cellStyle }}>
                                {Object.values(appointment).map((value, index) => (
                                    <TableCell key={index} sx={{...cellStyle,fontFamily:"Poppins"}}>
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {err!=='' &&(<div style={{margin:'20px'}}>Unable to fetch Appointment Data due to {err}</div>)}
        </div>
    );
}

export default Appointments;
