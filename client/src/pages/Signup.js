import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaPhone, FaSpinner, FaCheck, FaTimes, FaShieldAlt, FaUserCheck, FaKey, FaExclamationTriangle, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { getBaseUrl } from '../utils/apiConfig';

// Custom SVG Icons - Professional Size
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#24292e" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1DA1F2" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: float 20s infinite linear;
    z-index: 1;
  }

  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(-50px, -50px) rotate(360deg); }
  }
`;

const SignupCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  img {
    height: 60px;
    width: auto;
  }

  h1 {
    color: #333;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;


const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.1rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    color: #667eea;
  }
`;

const SignupButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 16px;
  font-size: 0.9rem;
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
  background: #fee;
  color: #e74c3c;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #fcc;
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #999;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e5e9;
  }

  span {
    padding: 0 1rem;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const TermsCheckbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;

  input[type="checkbox"] {
    margin-top: 0.2rem;
    accent-color: #667eea;
  }

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Enhanced Features Components
const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.met ? '#27ae60' : '#666'};
  margin-bottom: 0.25rem;

  svg {
    font-size: 0.7rem;
  }
`;

const SocialLoginContainer = styled.div`
  margin: 1.5rem 0;
`;

const SocialLoginTitle = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const SocialButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 48px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &.google {
    border-color: #dadce0;
    color: #3c4043;
    
    &:hover {
      border-color: #4285f4;
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.25);
      background: #f8f9ff;
    }
  }

  &.facebook {
    border-color: #dadce0;
    color: #1877f2;
    
    &:hover {
      border-color: #1877f2;
      background: #f0f2f5;
      box-shadow: 0 4px 12px rgba(24, 119, 242, 0.25);
    }
    
    svg {
      color: #1877f2;
    }
  }

  &.github {
    border-color: #dadce0;
    color: #24292e;
    
    &:hover {
      border-color: #24292e;
      background: #f6f8fa;
      box-shadow: 0 4px 12px rgba(36, 41, 46, 0.25);
    }
    
    svg {
      color: #24292e;
    }
  }

  &.twitter {
    border-color: #dadce0;
    color: #1DA1F2;
    
    &:hover {
      border-color: #1DA1F2;
      background: #f0f8ff;
      box-shadow: 0 4px 12px rgba(29, 161, 242, 0.25);
    }
    
    svg {
      color: #1DA1F2;
    }
  }

  &.linkedin {
    border-color: #dadce0;
    color: #0077B5;
    
    &:hover {
      border-color: #0077B5;
      background: #f0f7ff;
      box-shadow: 0 4px 12px rgba(0, 119, 181, 0.25);
    }
    
    svg {
      color: #0077B5;
    }
  }

  &.apple {
    border-color: #dadce0;
    color: #000000;
    
    &:hover {
      border-color: #000000;
      background: #f5f5f5;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    }
    
    svg {
      color: #000000;
    }
  }
`;

const PasswordStrengthIndicator = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
`;

const StrengthBar = styled.div`
  flex: 1;
  height: 4px;
  background: #e1e5e9;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.strength}%;
    background: ${props => {
      if (props.strength < 25) return '#e74c3c';
      if (props.strength < 50) return '#f39c12';
      if (props.strength < 75) return '#f1c40f';
      return '#27ae60';
    }};
    transition: all 0.3s ease;
  }
`;

const SecurityFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e1e5e9;
`;

const SecurityFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;

  svg {
    color: #27ae60;
    font-size: 1rem;
  }
`;

const AnimatedInput = styled(motion.div)`
  position: relative;
`;

const InputLabel = styled(motion.label)`
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1;

  &.focused {
    top: 0;
    left: 1rem;
    font-size: 0.8rem;
    color: #667eea;
    background: white;
    padding: 0 0.5rem;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: float 6s infinite ease-in-out;

  &:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
  &:nth-child(2) { top: 60%; left: 20%; animation-delay: 2s; }
  &:nth-child(3) { top: 40%; left: 80%; animation-delay: 4s; }
  &:nth-child(4) { top: 80%; left: 70%; animation-delay: 1s; }
  &:nth-child(5) { top: 30%; left: 50%; animation-delay: 3s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.8rem;
  color: #666;
`;

const ProgressStep = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#667eea' : '#e1e5e9'};
  transition: all 0.3s ease;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #e1e5e9;
`;

const WelcomeTitle = styled.h3`
  color: #667eea;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const WelcomeText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const Signup = () => {
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
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const { register } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  // Password requirements checker
  const getPasswordRequirements = (password) => {
    return {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
  };

  // Social login handlers
  const handleSocialLogin = (provider) => {
    setLoading(true);
    setError('');
    
    try {
      if (provider === 'Google') {
        // Redirect to Google OAuth
        window.location.href = `${getBaseUrl()}/api/auth/google`;
      } else {
        // For other providers, show coming soon message
        setTimeout(() => {
          setLoading(false);
          setError(`${provider} login is coming soon! Please use Google or sign up with email.`);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setError('Social login failed. Please try again or use email/password.');
    }
  };

  // Update current step based on form completion
  useEffect(() => {
    let step = 1;
    if (formData.firstName && formData.lastName) step = 2;
    if (formData.email) step = 3;
    if (formData.password && formData.confirmPassword) step = 4;
    if (acceptTerms) step = 5;
    setCurrentStep(step);
  }, [formData, acceptTerms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (formData.firstName.trim().length < 2) {
      setError('First name must be at least 2 characters long');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (formData.lastName.trim().length < 2) {
      setError('Last name must be at least 2 characters long');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone.trim())) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password
      };

      const result = await register(userData);
      
      if (result.success) {
        setSuccess('Account created successfully. Redirecting to your dashboard...');
        showSuccess('Account Created', 'Your account has been created successfully. You will be redirected shortly.', 3000);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = getPasswordRequirements(formData.password);

  return (
    <SignupContainer>
      <FloatingElements>
        {[...Array(5)].map((_, i) => (
          <FloatingElement
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.5, duration: 0.5 }}
          />
        ))}
      </FloatingElements>
      
      <SignupCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <img 
  src="https://res.cloudinary.com/samokello/image/upload/v1758147536/rebirth-of-a-queen/images/logo_jwavy0.jpg"
  alt="Rebirth of a Queen"
  style={{ height: "60px", objectFit: "contain" }}
/>

          <h1>Create Account</h1>
          <p>Join our community and make a difference</p>
        </Logo>

        <WelcomeMessage>
          <WelcomeTitle>
            <FaStar />
            Welcome to Rebirth of a Queen
          </WelcomeTitle>
          <WelcomeText>
            Join thousands of women making a difference in their communities
          </WelcomeText>
        </WelcomeMessage>

        <ProgressIndicator>
          <span>Step {currentStep} of 5</span>
          {[...Array(5)].map((_, i) => (
            <ProgressStep key={i} active={i < currentStep} />
          ))}
        </ProgressIndicator>

        <Form onSubmit={handleSubmit}>
          <AnimatePresence>
            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FaExclamationTriangle />
                {error}
              </ErrorMessage>
            )}

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
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{ fontSize: '1.2rem' }}
                >
                  🎉
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

          <Row>
            <AnimatedInput>
              <InputIcon>
                <FaUser />
              </InputIcon>
                <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={() => handleFocus('firstName')}
                onBlur={handleBlur}
                required
              />
              <InputLabel className={focusedField === 'firstName' || formData.firstName ? 'focused' : ''}>
                First Name
              </InputLabel>
            </AnimatedInput>

            <AnimatedInput>
              <InputIcon>
                <FaUser />
              </InputIcon>
                <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={() => handleFocus('lastName')}
                onBlur={handleBlur}
                required
              />
              <InputLabel className={focusedField === 'lastName' || formData.lastName ? 'focused' : ''}>
                Last Name
              </InputLabel>
            </AnimatedInput>
          </Row>

          <AnimatedInput>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              required
            />
            <InputLabel className={focusedField === 'email' || formData.email ? 'focused' : ''}>
              Email Address
            </InputLabel>
          </AnimatedInput>

          <AnimatedInput>
            <InputIcon>
              <FaPhone />
            </InputIcon>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
            />
            <InputLabel className={focusedField === 'phone' || formData.phone ? 'focused' : ''}>
              Phone Number
            </InputLabel>
          </AnimatedInput>

          <Row>
            <AnimatedInput>
              <InputIcon>
                <FaLock />
              </InputIcon>
                <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
              />
              <InputLabel className={focusedField === 'password' || formData.password ? 'focused' : ''}>
                Password
              </InputLabel>
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
              
              {formData.password && (
                <PasswordStrengthIndicator>
                  <StrengthBar strength={passwordStrength} />
                  <span>
                    {passwordStrength < 25 ? 'Weak' : 
                     passwordStrength < 50 ? 'Fair' : 
                     passwordStrength < 75 ? 'Good' : 'Strong'}
                  </span>
                </PasswordStrengthIndicator>
              )}
            </AnimatedInput>

            <AnimatedInput>
              <InputIcon>
                <FaLock />
              </InputIcon>
                <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={handleBlur}
                required
              />
              <InputLabel className={focusedField === 'confirmPassword' || formData.confirmPassword ? 'focused' : ''}>
                Confirm Password
              </InputLabel>
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </AnimatedInput>
          </Row>

          {formData.password && (
            <PasswordRequirements>
              <RequirementItem met={passwordRequirements.length}>
                {passwordRequirements.length ? <FaCheck /> : <FaTimes />}
                At least 6 characters
              </RequirementItem>
              <RequirementItem met={passwordRequirements.uppercase}>
                {passwordRequirements.uppercase ? <FaCheck /> : <FaTimes />}
                One uppercase letter
              </RequirementItem>
              <RequirementItem met={passwordRequirements.lowercase}>
                {passwordRequirements.lowercase ? <FaCheck /> : <FaTimes />}
                One lowercase letter
              </RequirementItem>
              <RequirementItem met={passwordRequirements.number}>
                {passwordRequirements.number ? <FaCheck /> : <FaTimes />}
                One number
              </RequirementItem>
              <RequirementItem met={passwordRequirements.special}>
                {passwordRequirements.special ? <FaCheck /> : <FaTimes />}
                One special character
              </RequirementItem>
            </PasswordRequirements>
          )}

          <TermsCheckbox>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </span>
          </TermsCheckbox>

          <SignupButton 
            type="submit" 
            disabled={loading}
            className={success ? 'success' : ''}
            whileHover={!loading && !success ? { scale: 1.02 } : {}}
            whileTap={!loading && !success ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                Creating account...
              </>
            ) : success ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  🎉
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  Account Created!
                </motion.span>
              </>
            ) : (
              <>
                <FaUser />
                Create Account
              </>
            )}
          </SignupButton>

          <SecurityFeatures>
            <SecurityFeature>
              <FaShieldAlt />
              <span>SSL Encrypted</span>
            </SecurityFeature>
            <SecurityFeature>
              <FaUserCheck />
              <span>Secure Registration</span>
            </SecurityFeature>
            <SecurityFeature>
              <FaKey />
              <span>2FA Ready</span>
            </SecurityFeature>
            <SecurityFeature>
              <FaCheck />
              <span>Verified</span>
            </SecurityFeature>
          </SecurityFeatures>

          <SocialLoginContainer>
            <SocialLoginTitle>
              <span>Or continue with</span>
            </SocialLoginTitle>
            <SocialButtons>
              <SocialButton
                type="button"
                className="google"
                onClick={() => handleSocialLogin('Google')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GoogleIcon />
                <span>Google</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="facebook"
                onClick={() => handleSocialLogin('Facebook')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FacebookIcon />
                <span>Facebook</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="github"
                onClick={() => handleSocialLogin('GitHub')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="twitter"
                onClick={() => handleSocialLogin('Twitter')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TwitterIcon />
                <span>Twitter</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="linkedin"
                onClick={() => handleSocialLogin('LinkedIn')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="apple"
                onClick={() => handleSocialLogin('Apple')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AppleIcon />
                <span>Apple</span>
              </SocialButton>
            </SocialButtons>
          </SocialLoginContainer>

          <Divider>
            <span>or</span>
          </Divider>

          <LoginLink>
            Already have an account?
            <Link to="/login">Sign in here</Link>
          </LoginLink>
        </Form>
      </SignupCard>
    </SignupContainer>
  );
};

export default Signup; 