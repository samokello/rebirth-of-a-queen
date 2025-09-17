import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ProfileSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  margin: 0 auto 20px;
  text-transform: uppercase;
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.div`
  color: #666;
  font-size: 1rem;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
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

const EditButton = styled(Button)`
  background: #667eea;
  color: white;
  
  &:hover:not(:disabled) {
    background: #5a6fd8;
    transform: translateY(-1px);
  }
`;

const SaveButton = styled(Button)`
  background: #28a745;
  color: white;
  
  &:hover:not(:disabled) {
    background: #218838;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
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

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #667eea;
`;

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || {}
    });
  }, [user, navigate]);

  const getUserInitials = (user) => {
    if (!user) return 'U';
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setIsUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || {}
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  if (loading) {
    return (
      <ProfileContainer>
        <LoadingSpinner>
          <FaSpinner className="fa-spin" />
          Loading profile...
        </LoadingSpinner>
      </ProfileContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>My Profile</ProfileTitle>
        <ProfileSubtitle>Manage your account information</ProfileSubtitle>
      </ProfileHeader>

      {message.text && (
        message.type === 'success' ? (
          <SuccessMessage>{message.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{message.text}</ErrorMessage>
        )
      )}

      <ProfileCard>
        <ProfileAvatar>
          {getUserInitials(user)}
        </ProfileAvatar>

        <ProfileInfo>
          <InfoGroup>
            <InfoLabel>First Name</InfoLabel>
            {isEditing ? (
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            ) : (
              <InfoValue>{user.firstName || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Last Name</InfoLabel>
            {isEditing ? (
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            ) : (
              <InfoValue>{user.lastName || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Phone</InfoLabel>
            {isEditing ? (
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            ) : (
              <InfoValue>{user.phone || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Street Address</InfoLabel>
            {isEditing ? (
              <Input
                name="address.street"
                value={formData.address?.street || ''}
                onChange={handleInputChange}
                placeholder="Enter street address"
              />
            ) : (
              <InfoValue>{user.address?.street || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>City</InfoLabel>
            {isEditing ? (
              <Input
                name="address.city"
                value={formData.address?.city || ''}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            ) : (
              <InfoValue>{user.address?.city || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>State/Province</InfoLabel>
            {isEditing ? (
              <Input
                name="address.state"
                value={formData.address?.state || ''}
                onChange={handleInputChange}
                placeholder="Enter state/province"
              />
            ) : (
              <InfoValue>{user.address?.state || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Postal Code</InfoLabel>
            {isEditing ? (
              <Input
                name="address.postalCode"
                value={formData.address?.postalCode || ''}
                onChange={handleInputChange}
                placeholder="Enter postal code"
              />
            ) : (
              <InfoValue>{user.address?.postalCode || 'Not provided'}</InfoValue>
            )}
          </InfoGroup>
        </ProfileInfo>

        <ButtonGroup>
          {!isEditing ? (
            <EditButton onClick={() => setIsEditing(true)}>
              <FaEdit />
              Edit Profile
            </EditButton>
          ) : (
            <>
              <SaveButton onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? <FaSpinner className="fa-spin" /> : <FaSave />}
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </SaveButton>
              <CancelButton onClick={handleCancel} disabled={isUpdating}>
                <FaTimes />
                Cancel
              </CancelButton>
            </>
          )}
        </ButtonGroup>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile; 