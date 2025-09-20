import React from 'react';
import { useNavigate } from 'react-router-dom';
import Password from "../icons/Password" ; 

const SuccessConfirm = () => {
  const navigate = useNavigate();

  // Custom styles based on the design specifications (matching SMS component)
  const styles = {
    background: {
      backgroundColor: '#FFF8F0',
      minHeight: '100vh',
      width: '100%',
      fontFamily: '"Poppins", sans-serif'
    },
    container: {
      width: '450px',
      maxWidth: '95%',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      padding: '32px',
      margin: '0 auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    },
    title: {
      color: '#F67F20',
      fontWeight: '600',
      fontFamily: '"Poppins", sans-serif'
    },
    regularText: {
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif'
    }
  };

  const handleConfirm = () => {
    // Navigate to home or login page
    navigate('/');
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        {/* Hexagonal Icon */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' , paddingTop: '50px'}}>
          <div style={{ position: 'relative' }}>
            {/* Hexagon background */}
         
             
                {/* Lock icon */}
                <Password />
                
           
            {/* Small decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '-12px'
            }}>
              <div style={{
                width: '24px',
                height: '3px',
                backgroundColor: '#F67F20',
                borderRadius: '2px',
                transform: 'rotate(-45deg)'
              }} />
              <div style={{
                width: '3px',
                height: '24px',
                backgroundColor: '#F67F20',
                borderRadius: '2px',
                transform: 'rotate(45deg)',
                marginTop: '-3px'
              }} />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            ...styles.title,
            fontSize: '24px',
            lineHeight: '1.4',
            margin: '0'
          }}>
            You successfully changed your password
          </h1>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          style={{
            width: '100%',
            padding: '14px 0',
            backgroundColor: '#F67F20',
            color: 'white',
            fontWeight: '600',
            fontFamily: '"Poppins", sans-serif',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            border: 'none',
            cursor: 'pointer'
          }}
          className="hover:bg-[#e06a10]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SuccessConfirm;