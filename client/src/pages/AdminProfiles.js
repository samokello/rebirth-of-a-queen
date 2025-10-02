import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaUser, FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaTimes, 
  FaCheck, FaUsers, FaCalendar, FaMapMarkerAlt, FaClock, FaSearch, 
  FaFilter, FaSync, FaDownload, FaUpload, FaEnvelope, 
  FaPhone, FaGraduationCap, FaHandsHelping, FaCheckCircle, 
  FaTimesCircle, FaExclamationTriangle, FaIdCard, FaUserTie,
  FaHeart, FaBriefcase, FaAward, FaGlobe
} from 'react-icons/fa';

const Container = styled.div`
  padding: 0;
  max-width: 100%;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  color: white;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'secondary' ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    background: ${props => props.variant === 'secondary' ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #5563c1, #6a4190)'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255,255,255,0.7);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.status === 'active' ? '#10b981' : '#ef4444'};
    border: 2px solid white;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: white;
`;

const ProfileRole = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const ProfileLocation = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
`;

const ProfileDetails = styled.div`
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => {
    switch(props.variant) {
      case 'edit': return 'rgba(59, 130, 246, 0.2)';
      case 'delete': return 'rgba(239, 68, 68, 0.2)';
      case 'view': return 'rgba(16, 185, 129, 0.2)';
      case 'activate': return 'rgba(16, 185, 129, 0.2)';
      case 'deactivate': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255,255,255,0.2);

  &:hover {
    background: ${props => {
      switch(props.variant) {
        case 'edit': return 'rgba(59, 130, 246, 0.3)';
        case 'delete': return 'rgba(239, 68, 68, 0.3)';
        case 'view': return 'rgba(16, 185, 129, 0.3)';
        case 'activate': return 'rgba(16, 185, 129, 0.3)';
        case 'deactivate': return 'rgba(245, 158, 11, 0.3)';
        default: return 'rgba(255,255,255,0.2)';
      }
    }};
    transform: scale(1.05);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: rgba(255,255,255,0.7);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: rgba(255,255,255,0.7);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;
  opacity: 0.7;
`;

const AdminProfiles = () => {
  const { getAdminToken } = useAdminAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    bio: '',
    skills: '',
    experience: '',
    status: 'active',
    joinDate: '',
    lastActive: ''
  });

  // Sample profiles data
  const sampleProfiles = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Mwangi',
      email: 'sarah.mwangi@email.com',
      phone: '+254712345678',
      role: 'Program Coordinator',
      location: 'Nairobi, Kenya',
      bio: 'Passionate about youth empowerment and community development',
      skills: 'Leadership, Mentorship, Project Management',
      experience: '5 years in NGO sector',
      status: 'active',
      joinDate: '2023-06-15',
      lastActive: '2024-01-20',
      programs: 3,
      applications: 12,
      achievements: 5,
      createdAt: '2023-06-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Kiprop',
      email: 'john.kiprop@email.com',
      phone: '+254723456789',
      role: 'Skills Trainer',
      location: 'Kajiado, Kenya',
      bio: 'Expert in leather crafting and traditional skills',
      skills: 'Leather Work, Teaching, Quality Control',
      experience: '8 years in leather industry',
      status: 'active',
      joinDate: '2023-08-10',
      lastActive: '2024-01-19',
      programs: 2,
      applications: 8,
      achievements: 3,
      createdAt: '2023-08-10',
      updatedAt: '2024-01-19'
    },
    {
      id: 3,
      firstName: 'Grace',
      lastName: 'Akinyi',
      email: 'grace.akinyi@email.com',
      phone: '+254734567890',
      role: 'Wellness Coach',
      location: 'Mombasa, Kenya',
      bio: 'Certified fitness instructor specializing in trauma recovery',
      skills: 'Fitness Training, Counseling, Group Therapy',
      experience: '6 years in wellness field',
      status: 'active',
      joinDate: '2023-09-05',
      lastActive: '2024-01-18',
      programs: 1,
      applications: 15,
      achievements: 7,
      createdAt: '2023-09-05',
      updatedAt: '2024-01-18'
    },
    {
      id: 4,
      firstName: 'Peter',
      lastName: 'Ochieng',
      email: 'peter.ochieng@email.com',
      phone: '+254745678901',
      role: 'Digital Media Specialist',
      location: 'Kisumu, Kenya',
      bio: 'Creative professional with expertise in digital storytelling',
      skills: 'Video Production, Graphic Design, Social Media',
      experience: '4 years in digital media',
      status: 'inactive',
      joinDate: '2023-11-20',
      lastActive: '2024-01-10',
      programs: 1,
      applications: 6,
      achievements: 2,
      createdAt: '2023-11-20',
      updatedAt: '2024-01-10'
    }
  ];

  const roles = ['all', 'Program Coordinator', 'Skills Trainer', 'Wellness Coach', 'Digital Media Specialist', 'Volunteer', 'Mentor'];

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfiles(sampleProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = () => {
    setEditingProfile(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      location: '',
      bio: '',
      skills: '',
      experience: '',
      status: 'active',
      joinDate: '',
      lastActive: ''
    });
    setShowModal(true);
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
      location: profile.location,
      bio: profile.bio,
      skills: profile.skills,
      experience: profile.experience,
      status: profile.status,
      joinDate: profile.joinDate,
      lastActive: profile.lastActive
    });
    setShowModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      if (editingProfile) {
        // Update existing profile
        setProfiles(prev => prev.map(profile => 
          profile.id === editingProfile.id 
            ? { ...profile, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
            : profile
        ));
      } else {
        // Create new profile
        const newProfile = {
          id: Date.now(),
          ...formData,
          programs: 0,
          applications: 0,
          achievements: 0,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setProfiles(prev => [...prev, newProfile]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    }
  };

  const handleToggleStatus = async (profileId) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === profileId 
        ? { 
            ...profile, 
            status: profile.status === 'active' ? 'inactive' : 'active',
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : profile
    ));
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = 
      profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || profile.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <FaSync className="animate-spin" style={{ marginRight: '0.5rem' }} />
          Loading profiles...
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaUser />
          User Profiles Management
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={fetchProfiles}>
            <FaSync />
            Refresh
          </Button>
          <Button onClick={handleCreateProfile}>
            <FaPlus />
            Create Profile
          </Button>
        </HeaderActions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search profiles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role === 'all' ? 'All Roles' : role}
            </option>
          ))}
        </FilterSelect>
      </SearchBar>

      {filteredProfiles.length === 0 ? (
        <EmptyState>
          <FaUser style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No profiles found</h3>
          <p>Create your first profile to get started</p>
        </EmptyState>
      ) : (
        <ProfilesGrid>
          {filteredProfiles.map(profile => (
            <ProfileCard key={profile.id}>
              <ProfileHeader>
                <ProfileAvatar status={profile.status}>
                  {profile.firstName[0]}{profile.lastName[0]}
                </ProfileAvatar>
                <ProfileInfo>
                  <ProfileName>{profile.firstName} {profile.lastName}</ProfileName>
                  <ProfileRole>{profile.role}</ProfileRole>
                  <ProfileLocation>
                    <FaMapMarkerAlt />
                    {profile.location}
                  </ProfileLocation>
                </ProfileInfo>
              </ProfileHeader>

              <ProfileStats>
                <StatItem>
                  <StatValue>{profile.programs}</StatValue>
                  <StatLabel>Programs</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{profile.applications}</StatValue>
                  <StatLabel>Applications</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{profile.achievements}</StatValue>
                  <StatLabel>Achievements</StatLabel>
                </StatItem>
              </ProfileStats>

              <ProfileDetails>
                <DetailItem>
                  <FaEnvelope />
                  {profile.email}
                </DetailItem>
                <DetailItem>
                  <FaPhone />
                  {profile.phone}
                </DetailItem>
                <DetailItem>
                  <FaCalendar />
                  Joined: {new Date(profile.joinDate).toLocaleDateString()}
                </DetailItem>
                <DetailItem>
                  <FaClock />
                  Last active: {new Date(profile.lastActive).toLocaleDateString()}
                </DetailItem>
              </ProfileDetails>

              <ProfileActions>
                <ActionButton variant="view" onClick={() => handleEditProfile(profile)}>
                  <FaEye />
                </ActionButton>
                <ActionButton variant="edit" onClick={() => handleEditProfile(profile)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton 
                  variant={profile.status === 'active' ? 'deactivate' : 'activate'}
                  onClick={() => handleToggleStatus(profile.id)}
                >
                  {profile.status === 'active' ? <FaTimes /> : <FaCheck />}
                </ActionButton>
                <ActionButton variant="delete" onClick={() => handleDeleteProfile(profile.id)}>
                  <FaTrash />
                </ActionButton>
              </ProfileActions>
            </ProfileCard>
          ))}
        </ProfilesGrid>
      )}

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingProfile ? 'Edit Profile' : 'Create New Profile'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Role</Label>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="">Select role</option>
                  {roles.slice(1).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </FormGroup>
            </div>

            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
              />
            </FormGroup>

            <FormGroup>
              <Label>Bio</Label>
              <TextArea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Enter bio"
              />
            </FormGroup>

            <FormGroup>
              <Label>Skills</Label>
              <Input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                placeholder="Enter skills (comma separated)"
              />
            </FormGroup>

            <FormGroup>
              <Label>Experience</Label>
              <TextArea
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Enter experience details"
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                <FaTimes />
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <FaSave />
                {editingProfile ? 'Update Profile' : 'Create Profile'}
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminProfiles;
