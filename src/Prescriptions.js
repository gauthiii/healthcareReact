import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoadingSpinner.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent } from '@mui/material';
import { prescriptions_api,api_username,prescriptions_api_pwd } from './App';


function Prescriptions({ authToken, user }) {
    const [prescriptions, setPrescriptions] = useState([]);
    const [err, setErr] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [prescriptionDetails, setPrescriptionDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

             
            const basicAuth = 'Basic ' + btoa(api_username + ':' + prescriptions_api_pwd);

                const response = await axios.get(`${prescriptions_api}/prescriptions`, {
                headers: { Authorization: basicAuth }
            });
                setPrescriptions(response.data);
                console.log(prescriptions)
                setErr('');

            } catch (error) {
                console.error('Error fetching data: ', error);
                setErr(error.message);
            }
            setLoading(false);
        };

        const fetchPrescriptionID = async () => {
            setLoading(true);
            try {
                const basicAuth = 'Basic ' + btoa(api_username + ':' + prescriptions_api_pwd);

                
                const prescriptionResponse = await axios.get(`${prescriptions_api}/prescriptions/667441c086a00055683b196d`, {
                    headers: { Authorization: basicAuth}
                });
                console.log(prescriptionResponse);
                setPrescriptionDetails(prescriptionResponse.data);

            } catch (error) {
                console.error('Error fetching patient details: ', error);
                setPrescriptionDetails(null);

               
            }
            setLoading(false);
        };
        
        if (user?.email === 'admin@admin.com')
        {fetchData();
        } else {
          fetchPrescriptionID();
        }
    }, [user,prescriptions]);

    const cellStyle = {
        minWidth: '250px', // Adjust this width as needed
        backgroundColor: 'lightblue', 
        color: 'darkblue', 
        border: '1px solid grey'
    };

    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{color:"black",   fontFamily:"Poppins", fontWeight:700,marginBottom:5}}>
            {user?.email === 'admin@admin.com' ? "Prescriptions List" : "Prescription Details"}
            </Typography>

            {isLoading ?
                    <>
                        {/* Display the loading spinner while loading is true */}
                        <br></br><br></br> <br></br><br></br>
                        <div className="loading-spinner-container">
                            <div className="loading-spinner"></div>
                        </div>
                    </> :
                     authToken === "adminLogin" ?
                    <>
         {err !== '' ? (<div style={{ }}>Unable to fetch Patient Data due to {err}</div>):
            <TableContainer component={Paper} sx={{border:2, width:1200, maxHeight:500  }}>
                <Table className='tab' sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Prescription ID", "Patient ID", "Doctor ID", "Date of Prescription", "Date of Validity", "Medicine Name", "Medicine Dosage", "Medicine Frequency",  "Status", "Ailment", "Special Instructions","Pharmacy ID", "Notes"].map(header => (
                                <TableCell key={header} sx={{ ...cellStyle, fontWeight:'bold', backgroundColor: '#c2cace', color: 'black',fontFamily:"Poppins" }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prescriptions.map((prescription) => (
                            <TableRow key={prescription.id} sx={{ '& > *': cellStyle }}>
                                {Object.entries(prescription).map(([key, value], index) => {
                                
                                    // Check if the key is 'medicines', skip rendering this in the main table
                                    if (key === "medicines") {
                                          // Assuming 'value' is an array of medicine objects
                    const medicineName = value.map(medicine => 
                  `${medicine.name}; `
                    );

                    const medicineDosage = value.map(medicine => 
                        `${medicine.dosage}; `
                          );

                          const medicineFrequency = value.map(medicine => 
                            `${medicine.frequency}; `
                              );
                    
                    
                    return (
                        <>
                        <TableCell key={index} sx={{...cellStyle, fontFamily:"Poppins"}}>
                            {medicineName}
                        </TableCell>
                         <TableCell key={index} sx={{...cellStyle, fontFamily:"Poppins"}}>
                         {medicineDosage}
                     </TableCell>
                      <TableCell key={index} sx={{...cellStyle, fontFamily:"Poppins"}}>
                      {medicineFrequency}
                  </TableCell>
                  </>
                    );
                                    };

                                    return (
                                        <TableCell key={index} sx={{...cellStyle, fontFamily:"Poppins"}}>
                                            {typeof value === 'object' ? JSON.stringify(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> }
                    </> :
                    prescriptionDetails ? 
                    (<>
                     <Card className='patCard' sx={{ maxWidth: 345, marginTop: 2, borderRadius: '0px', backgroundColor: 'lightGrey', padding: '10px', border: '3px solid #3F4243' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Prescription Sheet
                                        </Typography>
                                        {["id", "dateOfPrescription", "status", "notes", "ailment", "dateOfValidity"].map(key => (
                                            <Typography variant="body2" color="text.secondary" key={key}>
                                                <strong>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</strong> {`${prescriptionDetails[key]}`}
                                            </Typography>
                                        ))}
                                    </CardContent>
                                </Card>
                              
                    </>) :
                    (
                        <Typography variant="h3" gutterBottom sx={{ color: "black", fontFamily: "Poppins", fontWeight: 300, marginBottom: 5, marginTop: "10px" }}>
                            You don't have any prescriptions.
                        </Typography>
                    )
                    
                }
        </div>
    );
}

export default Prescriptions;
