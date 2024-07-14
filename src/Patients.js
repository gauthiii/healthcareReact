import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent,TextField,Button } from '@mui/material';
import './App.css';
import './LoadingSpinner.css';
import { patients_api, api_username, patients_api_pwd } from './App';


function Patients({ authToken, user }) {
    const [patients, setPatients] = useState([]);
    const [err, setErr] = useState('');
    const [patientDetails, setPatientDetails] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isAdd, setAdd] = useState(false);
    const [newPatient, setNewPatient] = useState({
        name: '',
        email: '',
        birthDate: '',
        medicalHistory: '',
        contact: '',
        address: '',
        gender: '',
        currentMedications: [],
        allergies: [],
        height: '',
        weight: '',
        bmi: '',
        blood: '',
        primaryDiagnosis: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        emergencyContactName: '',
        emergencyContactRelation: '',
        emergencyContactPhone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);
        try {
            const response = await axios.post(`${patients_api}/patients`, newPatient, {
                headers: { Authorization: basicAuth }
            });
            setPatients([...patients, response.data]);
            setNewPatient({
                name: '',
                email: '',
                birthDate: '',
                medicalHistory: '',
                contact: '',
                address: '',
                gender: '',
                currentMedications: [],
                allergies: [],
                height: '',
                weight: '',
                bmi: '',
                blood: '',
                primaryDiagnosis: '',
                insuranceProvider: '',
                insurancePolicyNumber: '',
                emergencyContactName: '',
                emergencyContactRelation: '',
                emergencyContactPhone: '',
            });
            alert('Patient created successfully!');
            setAdd(false);
        } catch (error) {
            console.error('Error creating patient: ', error);
            alert('Failed to create patient.');
        }
    };


    const calculateAge = (dob) => {
        const birthday = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    };

    // Function to format DOB
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);

                const response = await axios.get(`${patients_api}/patients`, {
                    headers: { Authorization: basicAuth }
                });
                setPatients(response.data);
                console.log(user);
                setErr('');
            } catch (error) {
                console.error('Error fetching data: ', error);
                setErr(error.message);
            }

            setLoading(false);
        };

        const fetchPatientID = async () => {
            setLoading(true);
            try {
                const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);

                // First get the patient ID using the email
                const idResponse = await axios.get(`${patients_api}/patients/check-email`, {
                    headers: { Authorization: basicAuth, 'Authorization-Email': user.email }
                });
                if (idResponse.data) {
                    // Now fetch the full details using the patient ID
                    const detailsResponse = await axios.get(`${patients_api}/patients/id`, {
                        headers: { Authorization: basicAuth, 'Authorization-ID': idResponse.data }
                    });
                    setPatientDetails(detailsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching patient details: ', error);
                setPatientDetails(null);

                try {
                    const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);
                    const updates = { "requests": user.email };
                    await axios.patch(`${patients_api}/users/6686abdf82166a5cb283227b`, updates, {
                        headers: { Authorization: basicAuth }
                    });
                } catch (error) {
                    console.error('Error sending admin requests', error);
                }
            }
            setLoading(false);
        };

        if (user?.email === 'admin@admin.com') {
            fetchData();
        } else {
            fetchPatientID();
        }
    }, [user]);

    const handleRemoveEmail = async (patientId) => {
        if (window.confirm('Are you sure you want to remove this email?')) {
            try {
                const basicAuth = 'Basic ' + btoa(api_username + ':' + patients_api_pwd);
                const updates = { email: null };
                await axios.patch(`${patients_api}/patients/id`, updates, {
                    headers: { Authorization: basicAuth, 'Authorization-ID': patientId }
                });
                setPatients(patients.map(patient => 
                    patient.id === patientId ? { ...patient, email: null } : patient
                ));
                alert('Email removed successfully');
            } catch (error) {
                console.error('Error removing email: ', error);
                setErr('Error removing email');
            }
        }
    };

    const cellStyle = {
        minWidth: '250px',
        backgroundColor: 'lightblue',
        color: 'darkblue',
        border: '1px solid grey'
    };

    return (
        <>
            <div style={{ margin: '20px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: "black", fontFamily: "Poppins", fontWeight: 700, marginBottom: 5 }}>
                    {user?.email === 'admin@admin.com' ? "Patients List" : "Patient Details"}
                </Typography>

                {/* Create Patient Form */}
                {isAdd && <Card sx={{ maxWidth: 650, marginBottom: 5, backgroundColor: 'lightGrey', border: '2px solid black' }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ fontFamily: "Poppins", fontWeight: 700, marginBottom: 2 }}>
                            Create New Patient
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', fontFamily:'Poppins' }}>
                               {/* Name */}
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    name="name"
                                    value={newPatient.name}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Email */}
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    value={newPatient.email}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Birth Date */}
                                <TextField
                                    label="Birth Date"
                                    variant="outlined"
                                    type="date"
                                    name="birthDate"
                                    value={newPatient.birthDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Medical History */}
                                <TextField
                                    label="Medical History"
                                    variant="outlined"
                                    name="medicalHistory"
                                    value={newPatient.medicalHistory}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Contact */}
                                <TextField
                                    label="Contact"
                                    variant="outlined"
                                    name="contact"
                                    value={newPatient.contact}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Address */}
                                <TextField
                                    label="Address"
                                    variant="outlined"
                                    name="address"
                                    value={newPatient.address}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Gender */}
                                <TextField
                                    label="Gender"
                                    variant="outlined"
                                    name="gender"
                                    value={newPatient.gender}
                                    onChange={handleChange}
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                >
                                    <option value=""></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </TextField>

                                {/* Current Medications (Assuming a simple comma-separated list for UI, convert to array in handleChange if needed) */}
                                <TextField
                                    label="Current Medications"
                                    variant="outlined"
                                    name="currentMedications"
                                    value={newPatient.currentMedications.join(', ')}
                                    onChange={(e) => handleChange({ target: { name: 'currentMedications', value: e.target.value.split(',') } })}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Allergies (Same assumption as Current Medications) */}
                                <TextField
                                    label="Allergies"
                                    variant="outlined"
                                    name="allergies"
                                    value={newPatient.allergies.join(', ')}
                                    onChange={(e) => handleChange({ target: { name: 'allergies', value: e.target.value.split(',') } })}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Height */}
                                <TextField
                                    label="Height (in cm)"
                                    variant="outlined"
                                    name="height"
                                    value={newPatient.height}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Weight */}
                                <TextField
                                    label="Weight (in kg)"
                                    variant="outlined"
                                    name="weight"
                                    value={newPatient.weight}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* BMI */}
                                <TextField
                                    label="BMI"
                                    variant="outlined"
                                    name="bmi"
                                    value={newPatient.bmi}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Blood Type */}
                                <TextField
                                    label="Blood Type"
                                    variant="outlined"
                                    name="blood"
                                    value={newPatient.blood}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Primary Diagnosis */}
                                <TextField
                                    label="Primary Diagnosis"
                                    variant="outlined"
                                    name="primaryDiagnosis"
                                    value={newPatient.primaryDiagnosis}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Insurance Provider */}
                                <TextField
                                    label="Insurance Provider"
                                    variant="outlined"
                                    name="insuranceProvider"
                                    value={newPatient.insuranceProvider}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Insurance Policy Number */}
                                <TextField
                                    label="Insurance Policy Number"
                                    variant="outlined"
                                    name="insurancePolicyNumber"
                                    value={newPatient.insurancePolicyNumber}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Emergency Contact Name */}
                                <TextField
                                    label="Emergency Contact Name"
                                    variant="outlined"
                                    name="emergencyContactName"
                                    value={newPatient.emergencyContactName}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Emergency Contact Relation */}
                                <TextField
                                    label="Emergency Contact Relation"
                                    variant="outlined"
                                    name="emergencyContactRelation"
                                    value={newPatient.emergencyContactRelation}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                                {/* Emergency Contact Phone */}
                                <TextField
                                    label="Emergency Contact Phone"
                                    variant="outlined"
                                    name="emergencyContactPhone"
                                    value={newPatient.emergencyContactPhone}
                                    onChange={handleChange}
                                    sx={{ marginBottom: 2, width: '48%' }}
                                />

                            </div>
                            <Button sx={{backgroundColor:'black', fontFamily:'Poppins'}} type="submit" variant="contained" color="primary">
                                Create Patient
                            </Button>
                            <Button onClick={()=>{setAdd(false)}} sx={{backgroundColor:'brown', fontFamily:'Poppins',marginLeft:'20px'}} variant="contained" >
                                Cancel Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>}

                {!isAdd && authToken === "adminLogin" && <Button onClick={()=>{setAdd(true)}} sx={{backgroundColor:'black', fontFamily:'Poppins',marginBottom:'20px'}} variant="contained" >
                Add Patient
                </Button>}

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
                            <TableContainer component={Paper} sx={{ border: 2, width:1200, height:500 }}>
                                <Table className='tab' sx={{ maxWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {["Patient ID", "Email", "Name", "Birth Date", "Medical History", "Contact", "Address", "Gender", "Allergies", "Current Medications", "Height", "Weight", "BMI", "Blood Type", "Primary Diagnosis", "Insurance Provider", "Policy Number", "Emergency Contact Name", "Emergency Contact Relation", "Emergency Contact Number", "Appointments", "Prescriptions", "Bills"].map(header => (
                                                <TableCell key={header} sx={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#c2cace', color: 'black', fontFamily: "Poppins" }}>
                                                    {header}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {patients.map((patient) => (
                                            <TableRow key={patient.id} sx={{ '& > *': cellStyle }}>
                                                {Object.entries(patient).map(([key, value], index) => (
                                                    <TableCell 
                                                        key={index} 
                                                        sx={{ ...cellStyle, fontFamily: "Poppins" }}
                                                        onClick={key === 'email' && value ? () => handleRemoveEmail(patient.id) : undefined}
                                                        style={key === 'email' && value ? { cursor: 'pointer' } : {}}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>}
                            <div style={{ marginTop: '40px' }}></div>
                            {/* {JSON.stringify(user)} */}
                            <div style={{ marginBlockStart: '40px' }}></div>
                        </> :
                        patientDetails ? (
                            // f3f4f6
                            <>
                                <Card className='patCard' sx={{ maxWidth: 345, marginTop: 2, borderRadius: '10px', backgroundColor: 'lightblue', padding: '10px', border: '3px solid #3F4243' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Patient ID Card
                                        </Typography>
                                        {["id", "name", "contact", "email", "address"].map(key => (
                                            <Typography variant="body2" color="text.secondary" key={key}>
                                                <strong>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</strong> {`${patientDetails[key]}`}
                                            </Typography>
                                        ))}
                                    </CardContent>
                                </Card>
                                <Card className='patCard' sx={{ maxWidth: 345, marginTop: 4, borderRadius: '10px', backgroundColor: 'lightblue', padding: '10px', border: '3px solid black' }}>
                                    <CardContent>
                                        {["height", "weight", "bmi", "blood", "gender", "birthDate"].map(key => (
                                            <Typography variant="body2" color="text.secondary" key={key}>
                                                <strong>{key === "birthDate" ? "DOB:" : `${key.charAt(0).toUpperCase() + key.slice(1)}:`}</strong>
                                                {key === "birthDate" ? ` ${formatDate(patientDetails[key])}` : ` ${patientDetails[key]}`}
                                            </Typography>
                                        ))}
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Age:</strong> {calculateAge(patientDetails.birthDate)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Typography variant="h3" gutterBottom sx={{ color: "black", fontFamily: "Poppins", fontWeight: 300, marginBottom: 5, marginTop: "10px" }}>
                                Your account has not been verified yet.
                            </Typography>
                        )
                }
            </div>
        </>
    );
}

export default Patients;
