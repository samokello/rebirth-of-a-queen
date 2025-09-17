import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaUser, FaLock, FaBell, FaCog, FaSave, FaEye, FaEyeSlash,
  FaEnvelope, FaPhone, FaGlobe, FaShieldAlt, FaPalette, FaDownload,
  FaCheck, FaTimes, FaExclamationTriangle
} from 'react-icons/fa';

const SettingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #718096;
    font-size: 1rem;
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsSidebar = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SettingsNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SettingsNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-weight: ${props => props.active ? '600' : '500'};
  
  &:hover {
    background: ${props => props.active ? '#5a6fd8' : '#f7fafc'};
  }
`;

const SettingsContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #e53e3e;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const PasswordInputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.25rem;
  
  &:hover {
    color: #4a5568;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SwitchLabel = styled.div`
  flex: 1;
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.9rem;
    color: #718096;
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const SwitchInput = styled.input`
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

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e0;
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

const ColorPicker = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #5a6fd8;
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #edf2f7;
  }
`;

const AlertMessage = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  
  &.success {
    background: #c6f6d5;
    color: #22543d;
  }
  
  &.error {
    background: #fed7d7;
    color: #c53030;
  }
  
  &.warning {
    background: #fef5e7;
    color: #744210;
  }
`;

const AdminSettings = () => {
  const { adminUser } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const savedProfile = localStorage.getItem('adminProfileSettings');
      const savedSecurity = localStorage.getItem('adminSecuritySettings');
      const savedNotifications = localStorage.getItem('adminNotificationSettings');
      const savedAppearance = localStorage.getItem('adminAppearanceSettings');
      
      return {
        profile: savedProfile ? JSON.parse(savedProfile) : {
          name: adminUser?.name || 'Admin User',
          email: adminUser?.email || 'admin@rebirthofaqueen.org',
          phone: '+234 801 234 5678',
          bio: 'Super Administrator for Rebirth of a Queen organization.',
          timezone: 'Africa/Lagos',
          language: 'English'
        },
        security: savedSecurity ? JSON.parse(savedSecurity) : {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          twoFactorEnabled: true,
          sessionTimeout: '8'
        },
        notifications: savedNotifications ? JSON.parse(savedNotifications) : {
          emailNotifications: true,
          pushNotifications: true,
          newUserAlerts: true,
          donationAlerts: true,
          applicationAlerts: true,
          systemUpdates: false,
          marketingEmails: false
        },
        appearance: savedAppearance ? JSON.parse(savedAppearance) : {
          theme: 'light',
          primaryColor: '#667eea',
          sidebarCollapsed: false,
          compactMode: false
        }
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  };
  
  const [settings, setSettings] = useState(loadSettings() || {
    profile: {
      name: adminUser?.name || 'Admin User',
      email: adminUser?.email || 'admin@rebirthofaqueen.org',
      phone: '+234 801 234 5678',
      bio: 'Super Administrator for Rebirth of a Queen organization.',
      timezone: 'Africa/Lagos',
      language: 'English'
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: true,
      sessionTimeout: '8'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newUserAlerts: true,
      donationAlerts: true,
      applicationAlerts: true,
      systemUpdates: false,
      marketingEmails: false
    },
    appearance: {
      theme: 'light',
      primaryColor: '#667eea',
      sidebarCollapsed: false,
      compactMode: false
    }
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Profile validation
    if (!settings.profile.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!settings.profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(settings.profile.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Security validation
    if (settings.security.newPassword && settings.security.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (settings.security.newPassword && settings.security.newPassword !== settings.security.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setAlert({ type: 'error', message: 'Please fix the errors before saving.' });
      return;
    }

    setSaving(true);
    setAlert(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('adminProfileSettings', JSON.stringify(settings.profile));
      localStorage.setItem('adminSecuritySettings', JSON.stringify(settings.security));
      localStorage.setItem('adminNotificationSettings', JSON.stringify(settings.notifications));
      localStorage.setItem('adminAppearanceSettings', JSON.stringify(settings.appearance));
      
      setAlert({ type: 'success', message: 'Settings saved successfully!' });
      
      // Clear sensitive fields
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      }));
      
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const defaultSettings = loadSettings();
    if (defaultSettings) {
      setSettings(defaultSettings);
      setErrors({});
      setAlert({ type: 'warning', message: 'Settings reset to last saved state.' });
    }
  };

  const updateSetting = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const renderProfileSettings = () => (
    <>
      <SectionTitle>
        <FaUser />
        Profile Information
      </SectionTitle>
      
      <FormGroup>
        <Label>Full Name *</Label>
        <Input
          type="text"
          value={settings.profile.name}
          onChange={(e) => updateSetting('profile', 'name', e.target.value)}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <div style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</div>}
      </FormGroup>
      
      <FormGroup>
        <Label>Email Address *</Label>
        <Input
          type="email"
          value={settings.profile.email}
          onChange={(e) => updateSetting('profile', 'email', e.target.value)}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <div style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</div>}
      </FormGroup>
      
      <FormGroup>
        <Label>Phone Number</Label>
        <Input
          type="tel"
          value={settings.profile.phone}
          onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Bio</Label>
        <TextArea
          value={settings.profile.bio}
          onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Timezone</Label>
        <Select
          value={settings.profile.timezone}
          onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
        >
          <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
          <option value="UTC">UTC (GMT+0)</option>
          <option value="America/New_York">America/New_York (GMT-5)</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Language</Label>
        <Select
          value={settings.profile.language}
          onChange={(e) => updateSetting('profile', 'language', e.target.value)}
        >
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderSecuritySettings = () => (
    <>
      <SectionTitle>
        <FaLock />
        Security Settings
      </SectionTitle>
      
      <FormGroup>
        <Label>Current Password</Label>
        <PasswordInputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={settings.security.currentPassword}
            onChange={(e) => updateSetting('security', 'currentPassword', e.target.value)}
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </PasswordInputGroup>
      </FormGroup>
      
      <FormGroup>
        <Label>New Password</Label>
        <PasswordInputGroup>
          <Input
            type={showNewPassword ? 'text' : 'password'}
            value={settings.security.newPassword}
            onChange={(e) => updateSetting('security', 'newPassword', e.target.value)}
            className={errors.newPassword ? 'error' : ''}
          />
          <PasswordToggle onClick={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </PasswordInputGroup>
        {errors.newPassword && <div style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.newPassword}</div>}
      </FormGroup>
      
      <FormGroup>
        <Label>Confirm New Password</Label>
        <Input
          type="password"
          value={settings.security.confirmPassword}
          onChange={(e) => updateSetting('security', 'confirmPassword', e.target.value)}
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <div style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.confirmPassword}</div>}
      </FormGroup>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Two-Factor Authentication</h4>
          <p>Add an extra layer of security to your account</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.security.twoFactorEnabled}
            onChange={(e) => updateSetting('security', 'twoFactorEnabled', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <FormGroup>
        <Label>Session Timeout (hours)</Label>
        <Select
          value={settings.security.sessionTimeout}
          onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
        >
          <option value="1">1 hour</option>
          <option value="4">4 hours</option>
          <option value="8">8 hours</option>
          <option value="24">24 hours</option>
        </Select>
      </FormGroup>
    </>
  );

  const renderNotificationSettings = () => (
    <>
      <SectionTitle>
        <FaBell />
        Notification Preferences
      </SectionTitle>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Email Notifications</h4>
          <p>Receive notifications via email</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Push Notifications</h4>
          <p>Receive browser push notifications</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.pushNotifications}
            onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>New User Alerts</h4>
          <p>Get notified when new users register</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.newUserAlerts}
            onChange={(e) => updateSetting('notifications', 'newUserAlerts', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Donation Alerts</h4>
          <p>Get notified of new donations</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.donationAlerts}
            onChange={(e) => updateSetting('notifications', 'donationAlerts', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Application Alerts</h4>
          <p>Get notified of new program applications</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.applicationAlerts}
            onChange={(e) => updateSetting('notifications', 'applicationAlerts', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>System Updates</h4>
          <p>Receive notifications about system updates</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.systemUpdates}
            onChange={(e) => updateSetting('notifications', 'systemUpdates', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Marketing Emails</h4>
          <p>Receive promotional and marketing emails</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.notifications.marketingEmails}
            onChange={(e) => updateSetting('notifications', 'marketingEmails', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
    </>
  );

  const renderAppearanceSettings = () => (
    <>
      <SectionTitle>
        <FaPalette />
        Appearance & Display
      </SectionTitle>
      
      <FormGroup>
        <Label>Theme</Label>
        <Select
          value={settings.appearance.theme}
          onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
        >
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
          <option value="auto">Auto (System)</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label>Primary Color</Label>
        <ColorPicker
          type="color"
          value={settings.appearance.primaryColor}
          onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
        />
      </FormGroup>
      
      <SwitchContainer>
        <SwitchLabel>
          <h4>Compact Mode</h4>
          <p>Reduce spacing for more content on screen</p>
        </SwitchLabel>
        <Switch>
          <SwitchInput
            type="checkbox"
            checked={settings.appearance.compactMode}
            onChange={(e) => updateSetting('appearance', 'compactMode', e.target.checked)}
          />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <SettingsContainer>
      <PageHeader>
        <h1>Admin Settings</h1>
        <p>Manage your account preferences and system settings</p>
      </PageHeader>

      {alert && (
        <AlertMessage className={alert.type}>
          {alert.type === 'success' ? <FaCheck /> : alert.type === 'error' ? <FaTimes /> : <FaExclamationTriangle />}
          {alert.message}
        </AlertMessage>
      )}

      <SettingsGrid>
        <SettingsSidebar>
          <SettingsNav>
            <SettingsNavItem
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser />
              Profile
            </SettingsNavItem>
            <SettingsNavItem
              active={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
            >
              <FaLock />
              Security
            </SettingsNavItem>
            <SettingsNavItem
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            >
              <FaBell />
              Notifications
            </SettingsNavItem>
            <SettingsNavItem
              active={activeTab === 'appearance'}
              onClick={() => setActiveTab('appearance')}
            >
              <FaPalette />
              Appearance
            </SettingsNavItem>
          </SettingsNav>
        </SettingsSidebar>

        <SettingsContent>
          {renderContent()}
          
          <ButtonGroup>
            <SaveButton onClick={handleSave} disabled={saving}>
              <FaSave />
              {saving ? 'Saving...' : 'Save Changes'}
            </SaveButton>
            <CancelButton onClick={handleReset}>
              Reset
            </CancelButton>
          </ButtonGroup>
        </SettingsContent>
      </SettingsGrid>
    </SettingsContainer>
  );
};

export default AdminSettings;
