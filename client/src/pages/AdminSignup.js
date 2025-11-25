import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNotification } from '../context/NotificationContext';
import { getBaseUrl } from '../utils/apiConfig';
import { 
  FaLock, 
  FaUser, 
  FaEye, 
  FaEyeSlash, 
  FaSpinner, 
  FaShieldAlt, 
  FaEnvelope, 
  FaPhone,
  FaCheckCircle,
  FaExclamationCircle,
  FaCrown,
  FaArrowLeft
} from 'react-icons/fa';

const SignupContainer = styled.div`
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
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.3) 0%, transparent 50%);
    animation: pulse 15s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
`;

const SignupWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 500px;
`;

const SignupCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const IconWrapper = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  box-shadow: 
    0 10px 30px rgba(102, 126, 234, 0.4),
    0 0 0 4px rgba(102, 126, 234, 0.1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 0;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  font-size: 1rem;
  z-index: 1;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8fafc;
  color: #1e293b;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 
      0 0 0 4px rgba(102, 126, 234, 0.1),
      0 4px 12px rgba(102, 126, 234, 0.15);
    transform: translateY(-1px);
  }
  
  &:focus + ${IconContainer} {
    color: #667eea;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #f1f5f9;
  }
  
  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
  
  ${props => props.$error && `
    border-color: #ef4444;
    background: #fef2f2;
    
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }
  `}
  
  ${props => props.$success && `
    border-color: #10b981;
    background: #f0fdf4;
    
    &:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    }
  `}
`;

const PasswordInput = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;
  border-radius: 6px;
  
  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.25rem;
  height: 4px;
`;

const StrengthBar = styled(motion.div)`
  flex: 1;
  height: 100%;
  border-radius: 2px;
  background: #e2e8f0;
  
  ${props => props.$active && `
    background: ${props.$color || '#667eea'};
  `}
`;

const StrengthText = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
  font-weight: 500;
  
  ${props => props.$strength && `
    color: ${props.$color || '#667eea'};
    font-weight: 600;
  `}
`;

const ValidationMessage = styled(motion.div)`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${props => props.$error ? '#ef4444' : '#10b981'};
  font-weight: 500;
`;

const SignupButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.125rem 2rem;
  border-radius: 14px;
  font-size: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 
    0 8px 24px rgba(102, 126, 234, 0.3),
    0 0 0 0 rgba(102, 126, 234, 0.4);
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 32px rgba(102, 126, 234, 0.4),
      0 0 0 4px rgba(102, 126, 234, 0.1);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  font-size: 0.9rem;
  border: 1px solid #fca5a5;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #6ee7b7;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
`;

const BackLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    color: #764ba2;
    gap: 0.75rem;
  }
`;

const LoginLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: block;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const { adminLogin } = useAdminAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#e2e8f0';
    if (passwordStrength <= 1) return '#ef4444';
    if (passwordStrength <= 2) return '#f59e0b';
    if (passwordStrength <= 3) return '#3b82f6';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (value && value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 'phone':
        const phoneRegex = /^[\d\s\-+()]+$/;
        if (value && !phoneRegex.test(value)) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return !errors[name];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      validateField(name, value);
    }
    
    setError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFieldErrors(errors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    });
    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const API_BASE = getBaseUrl();
      
      const existingAdminToken = localStorage.getItem('adminToken');
      
      const endpoint = '/api/auth/register-admin';
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (existingAdminToken) {
        headers['Authorization'] = `Bearer ${existingAdminToken}`;
      }
      
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.data?.user?.role === 'admin') {
          if (existingAdminToken) {
            setSuccess('Admin account created successfully.');
            showSuccess('Account Created', 'Admin account has been created successfully.');
            setTimeout(() => {
              navigate('/admin/users');
            }, 1500);
          } else {
            setSuccess('Account created. Logging you in...');
            showSuccess('Admin account created successfully!');
            
            setTimeout(async () => {
              const loginResult = await adminLogin(formData.email, formData.password);
              if (loginResult.success) {
                navigate('/admin');
              } else {
                setError(loginResult.error || 'Account created but login failed. Please login manually.');
                showError('Login failed', loginResult.error);
                setTimeout(() => {
                  navigate('/admin-login');
                }, 2000);
              }
            }, 1500);
          }
        } else {
          setError('Account was created but admin role was not assigned. Please contact support.');
          showError('Signup failed', 'Admin role was not assigned');
        }
      } else {
        if (response.status === 401 || response.status === 403) {
          setError('Admin authentication required. If you are creating the first admin, please try again. If admins already exist, you must be logged in as an admin to create new admin accounts.');
          showError('Access Denied', 'Admin authentication required to create new admin accounts.');
        } else {
          setError(data.message || 'Failed to create admin account');
          showError('Signup failed', data.message);
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred. Please try again.');
      showError('Signup failed', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <SignupCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <Header>
            <IconWrapper
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <FaCrown />
            </IconWrapper>
            <Title
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Admin Sign Up
            </Title>
            <Subtitle>
              <FaShieldAlt />
              Create a secure admin account
            </Subtitle>
          </Header>

          <AnimatePresence mode="wait">
            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaExclamationCircle />
                {error}
              </ErrorMessage>
            )}
            {success && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaCheckCircle />
                {success}
              </SuccessMessage>
            )}
          </AnimatePresence>

          <Form onSubmit={handleSubmit}>
            <FormRow>
              <InputGroup>
                <Label>
                  <FaUser />
                  First Name
                </Label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John"
                    required
                    disabled={loading}
                    $error={touched.firstName && fieldErrors.firstName}
                    $success={touched.firstName && !fieldErrors.firstName && formData.firstName}
                  />
                  <IconContainer>
                    <FaUser />
                  </IconContainer>
                </InputWrapper>
                {touched.firstName && fieldErrors.firstName && (
                  <ValidationMessage
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    $error
                  >
                    <FaExclamationCircle />
                    {fieldErrors.firstName}
                  </ValidationMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label>
                  <FaUser />
                  Last Name
                </Label>
                <InputWrapper>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Doe"
                    required
                    disabled={loading}
                    $error={touched.lastName && fieldErrors.lastName}
                    $success={touched.lastName && !fieldErrors.lastName && formData.lastName}
                  />
                  <IconContainer>
                    <FaUser />
                  </IconContainer>
                </InputWrapper>
                {touched.lastName && fieldErrors.lastName && (
                  <ValidationMessage
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    $error
                  >
                    <FaExclamationCircle />
                    {fieldErrors.lastName}
                  </ValidationMessage>
                )}
              </InputGroup>
            </FormRow>

            <InputGroup>
              <Label>
                <FaEnvelope />
                Email Address
              </Label>
              <InputWrapper>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                  $error={touched.email && fieldErrors.email}
                  $success={touched.email && !fieldErrors.email && formData.email}
                />
                <IconContainer>
                  <FaEnvelope />
                </IconContainer>
              </InputWrapper>
              {touched.email && fieldErrors.email && (
                <ValidationMessage
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  $error
                >
                  <FaExclamationCircle />
                  {fieldErrors.email}
                </ValidationMessage>
              )}
            </InputGroup>

            <InputGroup>
              <Label>
                <FaPhone />
                Phone Number
              </Label>
              <InputWrapper>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+1234567890"
                  required
                  disabled={loading}
                  $error={touched.phone && fieldErrors.phone}
                  $success={touched.phone && !fieldErrors.phone && formData.phone}
                />
                <IconContainer>
                  <FaPhone />
                </IconContainer>
              </InputWrapper>
              {touched.phone && fieldErrors.phone && (
                <ValidationMessage
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  $error
                >
                  <FaExclamationCircle />
                  {fieldErrors.phone}
                </ValidationMessage>
              )}
            </InputGroup>

            <InputGroup>
              <Label>
                <FaLock />
                Password
              </Label>
              <PasswordInput>
                <InputWrapper>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Create a strong password"
                    required
                    disabled={loading}
                    $error={touched.password && fieldErrors.password}
                    $success={touched.password && !fieldErrors.password && formData.password && passwordStrength >= 3}
                    style={{ paddingRight: '3rem' }}
                  />
                  <IconContainer>
                    <FaLock />
                  </IconContainer>
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </InputWrapper>
                {formData.password && (
                  <>
                    <PasswordStrength>
                      {[0, 1, 2, 3].map((index) => (
                        <StrengthBar
                          key={index}
                          $active={index < passwordStrength}
                          $color={getPasswordStrengthColor()}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: index < passwordStrength ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </PasswordStrength>
                    <StrengthText $strength={passwordStrength > 0} $color={getPasswordStrengthColor()}>
                      {getPasswordStrengthText()}
                    </StrengthText>
                  </>
                )}
                {touched.password && fieldErrors.password && (
                  <ValidationMessage
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    $error
                  >
                    <FaExclamationCircle />
                    {fieldErrors.password}
                  </ValidationMessage>
                )}
              </PasswordInput>
            </InputGroup>

            <InputGroup>
              <Label>
                <FaLock />
                Confirm Password
              </Label>
              <PasswordInput>
                <InputWrapper>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                    $error={touched.confirmPassword && fieldErrors.confirmPassword}
                    $success={touched.confirmPassword && !fieldErrors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword}
                    style={{ paddingRight: '3rem' }}
                  />
                  <IconContainer>
                    <FaLock />
                  </IconContainer>
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                </InputWrapper>
                {touched.confirmPassword && fieldErrors.confirmPassword && (
                  <ValidationMessage
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    $error
                  >
                    <FaExclamationCircle />
                    {fieldErrors.confirmPassword}
                  </ValidationMessage>
                )}
                {touched.confirmPassword && !fieldErrors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <ValidationMessage
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FaCheckCircle />
                    Passwords match
                  </ValidationMessage>
                )}
              </PasswordInput>
            </InputGroup>

            <SignupButton
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                  Creating Account...
                </>
              ) : (
                <>
                  <FaCrown />
                  Create Admin Account
                </>
              )}
            </SignupButton>
          </Form>

          <BackLink to="/admin-login">
            <FaArrowLeft />
            Back to Login
          </BackLink>
          
          <LoginLink to="/admin-login">
            Already have an account? Sign in
          </LoginLink>
        </SignupCard>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default AdminSignup;
