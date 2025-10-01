import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSpinner, FaGoogle, FaFacebook, FaGithub, FaCheck, FaShieldAlt, FaUserCheck, FaKey, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
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

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
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

  &::placeholder {
    color: #999;
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

const LoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
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

const SuccessMessage = styled.div`
  background: #efe;
  color: #27ae60;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #cfc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const ForgotPasswordLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  transition: color 0.2s;

  &:hover {
    color: #5a6fd8;
    text-decoration: underline;
  }
`;

const SignupLink = styled.div`
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

// Enhanced Features Components
const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

const RememberMeCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;

  input[type="checkbox"] {
    accent-color: #667eea;
    transform: scale(1.1);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

const SocialButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  background: white;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }

  &.google:hover {
    border-color: #db4437;
    color: #db4437;
    box-shadow: 0 5px 15px rgba(219, 68, 55, 0.2);
  }

  &.facebook:hover {
    border-color: #1877f2;
    color: #1877f2;
    box-shadow: 0 5px 15px rgba(24, 119, 242, 0.2);
  }

  &.github:hover {
    border-color: #333;
    color: #333;
    box-shadow: 0 5px 15px rgba(51, 51, 51, 0.2);
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

const LoginAttempts = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;

  svg {
    color: #f39c12;
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [focusedField, setFocusedField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || location.state?.returnUrl || '/';

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

  // Social login handlers
  const handleSocialLogin = (provider) => {
    setLoading(true);
    setError('');
    
    // Simulate social login (replace with actual implementation)
    setTimeout(() => {
      setLoading(false);
      setError(`${provider} login is not yet implemented. Please use email/password.`);
    }, 1000);
  };

  // Load saved credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (savedEmail && savedRememberMe) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Save credentials if remember me is checked
  useEffect(() => {
    if (rememberMe && formData.email) {
      localStorage.setItem('rememberedEmail', formData.email);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
    }
  }, [rememberMe, formData.email]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Track login attempts
    const currentAttempts = loginAttempts + 1;
    setLoginAttempts(currentAttempts);

    try {
      const result = await login(formData.email.trim(), formData.password);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setLoginAttempts(0); // Reset attempts on successful login
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
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
      
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Rebirth of a Queen" />
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </Logo>

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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FaCheck />
                {success}
              </SuccessMessage>
            )}
          </AnimatePresence>

          <AnimatedInput>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
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
              <FaLock />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
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

          <RememberMeContainer>
            <RememberMeCheckbox>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </RememberMeCheckbox>
            <ForgotPasswordLink to="/forgot-password">
              Forgot password?
            </ForgotPasswordLink>
          </RememberMeContainer>

          <LoginButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </LoginButton>

          <SecurityFeatures>
            <SecurityFeature>
              <FaShieldAlt />
              <span>SSL Encrypted</span>
            </SecurityFeature>
            <SecurityFeature>
              <FaUserCheck />
              <span>Secure Login</span>
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

          {loginAttempts > 0 && (
            <LoginAttempts>
              <FaExclamationTriangle />
              <span>Login attempts: {loginAttempts}</span>
            </LoginAttempts>
          )}

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
                <FaGoogle />
                <span>Google</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="facebook"
                onClick={() => handleSocialLogin('Facebook')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaFacebook />
                <span>Facebook</span>
              </SocialButton>
              <SocialButton
                type="button"
                className="github"
                onClick={() => handleSocialLogin('GitHub')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGithub />
                <span>GitHub</span>
              </SocialButton>
            </SocialButtons>
          </SocialLoginContainer>

          <Divider>
            <span>or</span>
          </Divider>

          <SignupLink>
            Don't have an account?
            <Link to="/signup">Create one now</Link>
          </SignupLink>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 