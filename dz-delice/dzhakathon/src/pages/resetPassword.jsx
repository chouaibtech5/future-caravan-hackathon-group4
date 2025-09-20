import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  // Custom styles based on the design specifications
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
      transform: 'translate(-50%, -50%)'
    },
    title: {
      color: '#F67F20',
      fontSize: '28px',
      fontWeight: '600',
      fontFamily: '"Poppins", sans-serif',
      textAlign: 'center',
      marginBottom: '24px'
    },
    regularText: {
      color: '#8A94A6',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif',
      textAlign: 'center',
      marginBottom: '32px'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      color: '#8A94A6',
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #D9D9D9',
      marginBottom: '32px',
      fontFamily: '"Poppins", sans-serif',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '14px 0',
      backgroundColor: '#F67F20',
      color: 'white',
      fontWeight: '600',
      fontFamily: '"Poppins", sans-serif',
      borderRadius: '8px',
      transition: 'background-color 0.2s',
      cursor: 'pointer',
      border: 'none'
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would add logic to send the password reset code
      console.log('Sending password reset code to:', email);
      // Navigate to reset password confirm page
      navigate('/reset-password-confirm');
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div className="mb-8">
          <button 
            onClick={handleBack} 
            className="flex items-center"
            style={{color: '#F67F20', fontWeight: '600'}}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="text-xl" style={{fontWeight: '600', fontFamily: '"Poppins", sans-serif'}}>Back</span>
          </button>
        </div>

        <h1 style={styles.title}>Reset Your Password</h1>
        
        <p style={styles.regularText}>
          Please enter your phone messages. We will send you a code to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={styles.inputLabel}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            style={styles.input}
            className="focus:border-[#F67F20]"
            required
          />

          <button
            type="submit"
            style={styles.button}
            className="hover:bg-[#e06a10]"
          >
            Send the code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
