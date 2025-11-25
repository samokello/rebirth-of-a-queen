import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNotification } from '../context/NotificationContext';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner, FaShieldAlt } from 'react-icons/fa';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const LoginWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 350px;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 70px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

const SecurityIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #718096;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 220px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.6rem 0.6rem 2.2rem;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #2d3748;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  ${Input}:focus + & {
    color: #667eea;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  padding: 0.25rem;
  
  &:hover {
    color: #667eea;
  }
`;

const HelperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: -0.4rem;
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #4a5568;
  cursor: pointer;
`;

const SmallLink = styled.a`
  font-size: 0.8rem;
  color: #667eea;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const Hint = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
  text-align: center;
  margin-top: 0.2rem;
`;

const ErrorText = styled.div`
  font-size: 0.8rem;
  color: #e53e3e;
  text-align: center;
`;

const SuccessText = styled.div`
  font-size: 0.8rem;
  color: #38a169;
  text-align: center;
`;

const LoginButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 16px;
  font-size: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    
    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &.success {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    box-shadow: 0 8px 32px rgba(40, 167, 69, 0.2);
    
    &:hover:not(:disabled) {
      box-shadow: 0 12px 40px rgba(40, 167, 69, 0.4);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #feb2b2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #c3e6cb;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(21, 87, 36, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #28a745;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 0; }
  }
`;

const BackLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  display: inline-block;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
  
  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const DecorativeCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  
  &:nth-child(1) {
    width: 100px;
    height: 100px;
    top: -50px;
    right: -50px;
  }
  
  &:nth-child(2) {
    width: 60px;
    height: 60px;
    bottom: -30px;
    left: -30px;
  }
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [remember, setRemember] = useState(true);
  const [capsOn, setCapsOn] = useState(false);
  const [twoFactor, setTwoFactor] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  
  const { adminLogin } = useAdminAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check for logout message on component mount
  useEffect(() => {
    const logoutParam = searchParams.get('logout');
    const logoutMessage = sessionStorage.getItem('adminLogoutMessage');
    
    if (logoutParam === 'success' && logoutMessage) {
      setSuccess(logoutMessage);
      // Clear the message from session storage
      sessionStorage.removeItem('adminLogoutMessage');
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await adminLogin(email, password, twoFactor);
      
      if (result.success) {
        setSuccess('Login successful. Redirecting to admin dashboard...');
        showSuccess('Login Successful', 'You have been logged in successfully. Redirecting...', 2000);
        if (remember) {
          try { localStorage.setItem('adminEmail', email); } catch (_) {}
        } else {
          try { localStorage.removeItem('adminEmail'); } catch (_) {}
        }
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(result.error || 'Login failed');
        if (result.requiresTwoFactor) {
          setShowTwoFactor(true);
        }
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('adminEmail');
      if (saved) setEmail(saved);
    } catch (_) {}
  }, []);

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginCard>
          <DecorativeCircle />
          <DecorativeCircle />
          
          <LogoSection>

            <Logo src=" https://res.cloudinary.com/samokello/image/upload/v1758281368/logo-removebg-preview_pn0mgv.png
" alt='Rebirth logo' />

            <SecurityIcon>
              <FaShieldAlt />
            </SecurityIcon>
            <Title>Admin Access</Title>
            <Subtitle>Secure login to manage Rebirth of a Queen</Subtitle>
          </LogoSection>
          
          {error && (
            <ErrorMessage>
              <span>⚠️</span>
              {error}
            </ErrorMessage>
          )}
          <AnimatePresence>
            {success && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  style={{ fontSize: '1.2rem' }}
                >
                  ✅
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {success}
                </motion.span>
              </SuccessMessage>
            )}
          </AnimatePresence>
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputIcon>
                <FaUser />
              </InputIcon>
            </InputGroup>
            
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => setCapsOn(e.getModifierState && e.getModifierState('CapsLock'))}
                required
              />
              <InputIcon>
                <FaLock />
              </InputIcon>
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>

            {capsOn && (
              <Hint>Caps Lock is ON</Hint>
            )}

            {showTwoFactor && (
              <InputGroup>
                <Input
                  type="text"
                  placeholder="2FA code (if required)"
                  value={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </InputGroup>
            )}

            <HelperRow>
              <CheckboxLabel>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember device
              </CheckboxLabel>
              <SmallLink href="/admin-login-help" title="Trouble logging in?">Need help?</SmallLink>
            </HelperRow>
            
            <LoginButton 
              type="submit" 
              disabled={loading}
              className={success ? 'success' : ''}
              whileHover={!loading && !success ? { scale: 1.02 } : {}}
              whileTap={!loading && !success ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                  Authenticating...
                </>
              ) : success ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    ✅
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    Success!
                  </motion.span>
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Access Dashboard
                </>
              )}
            </LoginButton>

            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessText>{success}</SuccessText>}
          </Form>
          
          <BackLink href="/">
            ← Return to main website
          </BackLink>
          <BackLink as={Link} to="/admin-signup" style={{ marginTop: '0.5rem' }}>
            Don't have an account? Sign up
          </BackLink>
        </LoginCard>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default AdminLogin; 