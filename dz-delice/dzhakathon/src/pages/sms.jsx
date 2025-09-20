import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SMSVerification = () => {
  const navigate = useNavigate();
  
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
      fontWeight: '600',
      fontFamily: '"Poppins", sans-serif'
    },
    regularText: {
      fontWeight: '400',
      fontFamily: '"Poppins", sans-serif'
    }
  };
  // State for the 6-digit code
  const [code, setCode] = useState(['', '', '', '', '', '']);
  // State for timer
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const inputRefs = useRef([]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer]);

  // Format timer to MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if this one is filled
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key press for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move focus to the previous input field if current is empty and backspace is pressed
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle resend code
  const handleResendCode = () => {
    if (!isTimerActive) {
      setCode(['', '', '', '', '', '']);
      setTimer(60);
      setIsTimerActive(true);
      // Here you would add logic to actually resend the code
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      // Here you would add logic to verify the code
      console.log('Verifying code:', verificationCode);
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
            style={styles.title}
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
            <span className="text-xl" style={{fontWeight: '600', fontFamily: '"Poppins", sans-serif'}}>SMS verification</span>
          </button>
        </div>

        <div className="mb-10 text-gray-500" style={{color: '#8A94A6', ...styles.regularText}}>
          <p>We've sent a confirmation code to your phone number.</p>
          <p>Please check your inbox to continue signing up.</p>
        </div>

        <div className="flex justify-between mb-10" style={{gap: '12px'}}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: '55px',
                height: '55px',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: '"Poppins", sans-serif',
                borderBottom: '2px solid #D9D9D9',
                background: 'transparent',
                outline: 'none',
                color: digit ? '#F67F20' : 'inherit',
              }}
              className="focus:border-[#F67F20]"
            />
          ))}
        </div>

        <div className="mb-10 text-center">
          <button 
            onClick={handleResendCode} 
            style={{
              color: '#F67F20',
              fontWeight: '600',
              fontFamily: '"Poppins", sans-serif',
              opacity: isTimerActive ? '0.5' : '1',
              cursor: isTimerActive ? 'not-allowed' : 'pointer'
            }}
            disabled={isTimerActive}
          >
            Code Resent!
          </button>
          <p className="mt-1" style={{color: '#8A94A6', ...styles.regularText}}>
            Send code again in {formatTime()}
          </p>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '14px 0',
            backgroundColor: '#F67F20',
            color: 'white',
            fontWeight: '600',
            fontFamily: '"Poppins", sans-serif',
            borderRadius: '8px',
            transition: 'background-color 0.2s'
          }}
          className="hover:bg-[#e06a10]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SMSVerification;
