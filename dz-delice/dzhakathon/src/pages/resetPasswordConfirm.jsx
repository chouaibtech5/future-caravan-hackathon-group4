import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordConfirm = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
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
    inputContainer: {
      position: 'relative',
      marginBottom: '24px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #D9D9D9',
      fontFamily: '"Poppins", sans-serif',
      outline: 'none',
      paddingRight: '40px'
    },
    eyeIcon: {
      position: 'absolute',
      right: '12px',
      top: '12px',
      cursor: 'pointer',
      color: '#8A94A6'
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
    },
    errorText: {
      color: '#FF4D4F',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center'
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
    // Clear error when user types
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!passwords.newPassword || !passwords.confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    // Here you would add logic to update the password in your backend
    console.log('Setting new password:', passwords);
    
    // Navigate to success confirmation page
    navigate('/success-confirm');
  };

  // Handle back button
  const handleBack = () => {
    navigate('/');
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    switch(field) {
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={{ marginBottom: '16px' }}>
          <button 
            onClick={handleBack} 
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              color: '#F67F20',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0'
            }}
          >
            {/* Back arrow icon */}
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <path 
                d="M19 12H5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 19L5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Reset Password
          </button>
        </div>

        <h1 style={styles.title}>Reset Password</h1>
        
        <p style={styles.regularText}>
          Please enter a new password. Your new password must be different from previous one.
        </p>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <label style={styles.inputLabel}>New Password</label>
            <input 
              type={showNewPassword ? "text" : "password"} 
              name="newPassword"
              style={styles.input}
              value={passwords.newPassword}
              onChange={handleInputChange}
            />
            <div 
              style={styles.eyeIcon} 
              onClick={() => togglePasswordVisibility('new')}
            >
              {showNewPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.37C6.25 4.37 3.07 6.57 1.25 10C3.07 13.43 6.25 15.63 10 15.63C13.75 15.63 16.93 13.43 18.75 10C16.93 6.57 13.75 4.37 10 4.37ZM10 13.75C7.93 13.75 6.25 12.07 6.25 10C6.25 7.93 7.93 6.25 10 6.25C12.07 6.25 13.75 7.93 13.75 10C13.75 12.07 12.07 13.75 10 13.75ZM10 7.91C8.84 7.91 7.91 8.84 7.91 10C7.91 11.16 8.84 12.09 10 12.09C11.16 12.09 12.09 11.16 12.09 10C12.09 8.84 11.16 7.91 10 7.91Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.37C6.25 4.37 3.07 6.57 1.25 10C3.07 13.43 6.25 15.63 10 15.63C13.75 15.63 16.93 13.43 18.75 10C16.93 6.57 13.75 4.37 10 4.37ZM10 13.75C7.93 13.75 6.25 12.07 6.25 10C6.25 7.93 7.93 6.25 10 6.25C12.07 6.25 13.75 7.93 13.75 10C13.75 12.07 12.07 13.75 10 13.75Z" fill="currentColor"/>
                </svg>
              )}
            </div>
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.inputLabel}>Confirm Password</label>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              name="confirmPassword"
              style={styles.input}
              value={passwords.confirmPassword}
              onChange={handleInputChange}
            />
            <div 
              style={styles.eyeIcon} 
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showConfirmPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.37C6.25 4.37 3.07 6.57 1.25 10C3.07 13.43 6.25 15.63 10 15.63C13.75 15.63 16.93 13.43 18.75 10C16.93 6.57 13.75 4.37 10 4.37ZM10 13.75C7.93 13.75 6.25 12.07 6.25 10C6.25 7.93 7.93 6.25 10 6.25C12.07 6.25 13.75 7.93 13.75 10C13.75 12.07 12.07 13.75 10 13.75ZM10 7.91C8.84 7.91 7.91 8.84 7.91 10C7.91 11.16 8.84 12.09 10 12.09C11.16 12.09 12.09 11.16 12.09 10C12.09 8.84 11.16 7.91 10 7.91Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.37C6.25 4.37 3.07 6.57 1.25 10C3.07 13.43 6.25 15.63 10 15.63C13.75 15.63 16.93 13.43 18.75 10C16.93 6.57 13.75 4.37 10 4.37ZM10 13.75C7.93 13.75 6.25 12.07 6.25 10C6.25 7.93 7.93 6.25 10 6.25C12.07 6.25 13.75 7.93 13.75 10C13.75 12.07 12.07 13.75 10 13.75Z" fill="currentColor"/>
                </svg>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.button}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
