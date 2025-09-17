import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLock, FaBell, FaEnvelope, FaShieldAlt, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SettingsHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SettingsTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const SettingsSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: #667eea;
  color: white;
  
  &:hover:not(:disabled) {
    background: #5a6fd8;
    transform: translateY(-1px);
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SuccessMessage = styled(Message)`
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled(Message)`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ToggleLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ToggleTitle = styled.span`
  font-weight: 600;
  color: #333;
`;

const ToggleDescription = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #667eea;
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Settings = () => {
  const { user, changePassword, loading } = useAuth();
  const navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [preferences, setPreferences] = useState({
    newsletter: true,
    emailNotifications: true,
    smsNotifications: false
  });

  if (loading) {
    return (
      <SettingsContainer>
        <div style={{ textAlign: 'center', color: '#667eea' }}>
          <FaSpinner className="fa-spin" style={{ fontSize: '2rem' }} />
          <p>Loading settings...</p>
        </div>
      </SettingsContainer>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }

    setIsChangingPassword(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while changing password' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>Account Settings</SettingsTitle>
        <SettingsSubtitle>Manage your account preferences and security</SettingsSubtitle>
      </SettingsHeader>

      {message.text && (
        message.type === 'success' ? (
          <SuccessMessage>
            <FaCheck />
            {message.text}
          </SuccessMessage>
        ) : (
          <ErrorMessage>
            <FaTimes />
            {message.text}
          </ErrorMessage>
        )
      )}

      {/* Password Change Section */}
      <SettingsCard>
        <CardTitle>
          <FaLock />
          Change Password
        </CardTitle>
        
        <form onSubmit={handlePasswordSubmit}>
          <FormGroup>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your current password"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your new password"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm your new password"
              required
            />
          </FormGroup>

          <PrimaryButton type="submit" disabled={isChangingPassword}>
            {isChangingPassword ? <FaSpinner className="fa-spin" /> : <FaLock />}
            {isChangingPassword ? 'Changing Password...' : 'Change Password'}
          </PrimaryButton>
        </form>
      </SettingsCard>

      {/* Notification Preferences */}
      <SettingsCard>
        <CardTitle>
          <FaBell />
          Notification Preferences
        </CardTitle>
        
        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>Newsletter</ToggleTitle>
            <ToggleDescription>Receive updates about our programs and events</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={preferences.newsletter}
              onChange={() => handlePreferenceChange('newsletter')}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>Email Notifications</ToggleTitle>
            <ToggleDescription>Receive important updates via email</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={() => handlePreferenceChange('emailNotifications')}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>SMS Notifications</ToggleTitle>
            <ToggleDescription>Receive updates via text message</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={preferences.smsNotifications}
              onChange={() => handlePreferenceChange('smsNotifications')}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>
      </SettingsCard>

      {/* Account Security */}
      <SettingsCard>
        <CardTitle>
          <FaShieldAlt />
          Account Security
        </CardTitle>
        
        <div style={{ color: '#666', lineHeight: '1.6' }}>
          <p><strong>Account Status:</strong> Active</p>
          <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</p>
          <p><strong>Login Count:</strong> {user.loginCount || 0}</p>
          <p><strong>Member Since:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
        </div>
      </SettingsCard>
    </SettingsContainer>
  );
};

export default Settings; 