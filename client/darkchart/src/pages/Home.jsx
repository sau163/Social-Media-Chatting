import React from 'react';
import Homelayout from '../components/Layout/Homelayout';
import logo from '../../jpgfiles/darkchat2.jpg'; // Ensure the path to the image is correct

function Home() {
  console.log('Rendering Home');
  return (
    <Homelayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
          textAlign: 'center',
          flexDirection: 'column',
          backgroundColor: '#f0f0f0', // Optional background color
          padding: '20px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional for some styling
          borderRadius: '8px', // Optional rounded corners
        }}
      >
        <img src={logo} alt="Darkchat Logo" style={{ height: '8rem' }} />
        <h1>DarkChat</h1>
        <p>Send messages to friends with end-to-end encryption.</p>
      </div>
    </Homelayout>
  );
}

export default Home;
