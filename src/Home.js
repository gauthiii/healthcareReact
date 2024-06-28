import React from 'react'; 


function Home({authToken,user}) {
   
    
    return (
        <div style={{ padding: '20px', fontFamily:"Poppins" }}>
            <h1>Welcome to the Health System Dashboard</h1>
            <p style={{ textAlign: 'justify', fontSize: '18px' }}>
                Healthcare is vital to the society because people get ill, accidents and emergencies do arise and the hospitals are needed to diagnose, treat and manage different types of ailments and diseases. From birth to death, health care is a constant need. This is why the system must be highly effective at all times.
            </p>
            <p style={{ textAlign: 'justify', fontSize: '18px' }}>
                The importance of healthcare can be seen in the life expectancy increases that have been evident in each generation. It not only helps extend lifespans but also helps improve the quality of life through factors like better prenatal and postnatal care, medicine, and more effective medical treatments.
            </p>
            <p style={{ textAlign: 'justify', fontSize: '18px' }}>
                Everyone deserves access to basic healthcare needs and providing this can prevent death and disability, and is crucial in maintaining the basic quality and dignity of life. A well-functioning healthcare system can significantly improve the well-being of a nation.
            </p>
            <p style={{ textAlign: 'justify', fontSize: '18px' }}>
                You have been authorized by <strong>Google OAuth</strong> to access this website!
            </p>
            {/* {authToken}<br/>
            {JSON.stringify(user)} */}
            <footer style={{ textAlign: 'center', marginTop: '30vh', fontSize: '16px'  }}>
                © {new Date().getFullYear()} Gautham Vijayaraj. All rights reserved.<br/>
            </footer>
        </div>
    );
}

export default Home;
