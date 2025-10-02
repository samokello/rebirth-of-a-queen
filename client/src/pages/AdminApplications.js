import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaFileAlt, FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaTimes, 
  FaCheck, FaUsers, FaCalendar, FaMapMarkerAlt, FaClock, FaSearch, 
  FaFilter, FaSync, FaDownload, FaUpload, FaUser, FaEnvelope, 
  FaPhone, FaGraduationCap, FaHandsHelping, FaCheckCircle, 
  FaTimesCircle, FaExclamationTriangle
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

const ApplicationsTable = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  overflow: hidden;
  color: white;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-bottom: 2px solid rgba(255,255,255,0.2);
  font-weight: 700;
  color: white;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ApplicationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
`;

const ApplicantDetails = styled.div`
  flex: 1;
`;

const ApplicantName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ApplicantEmail = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
`;

const StatusBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: ${props => {
    switch(props.status) {
      case 'approved': return 'rgba(16, 185, 129, 0.2)';
      case 'pending': return 'rgba(245, 158, 11, 0.2)';
      case 'rejected': return 'rgba(239, 68, 68, 0.2)';
      case 'under_review': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'approved': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      case 'under_review': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  border: 1px solid ${props => {
    switch(props.status) {
      case 'approved': return 'rgba(16, 185, 129, 0.3)';
      case 'pending': return 'rgba(245, 158, 11, 0.3)';
      case 'rejected': return 'rgba(239, 68, 68, 0.3)';
      case 'under_review': return 'rgba(59, 130, 246, 0.3)';
      default: return 'rgba(107, 114, 128, 0.3)';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => {
    switch(props.variant) {
      case 'view': return 'rgba(16, 185, 129, 0.2)';
      case 'edit': return 'rgba(59, 130, 246, 0.2)';
      case 'approve': return 'rgba(16, 185, 129, 0.2)';
      case 'reject': return 'rgba(239, 68, 68, 0.2)';
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
        case 'view': return 'rgba(16, 185, 129, 0.3)';
        case 'edit': return 'rgba(59, 130, 246, 0.3)';
        case 'approve': return 'rgba(16, 185, 129, 0.3)';
        case 'reject': return 'rgba(239, 68, 68, 0.3)';
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
  max-width: 800px;
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

const AdminApplications = () => {
  const { getAdminToken } = useAdminAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    status: 'pending',
    notes: '',
    appliedDate: '',
    experience: '',
    motivation: ''
  });

  // Sample applications data
  const sampleApplications = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Mwangi',
      email: 'sarah.mwangi@email.com',
      phone: '+254712345678',
      program: 'Raising Authentic Voices (RAV)',
      status: 'pending',
      notes: 'Strong background in community work',
      appliedDate: '2024-01-15',
      experience: '2 years in youth mentorship',
      motivation: 'Passionate about empowering young people',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Kiprop',
      email: 'john.kiprop@email.com',
      phone: '+254723456789',
      program: 'Rebirth Empowerment Hub',
      status: 'approved',
      notes: 'Excellent leather crafting skills',
      appliedDate: '2024-01-12',
      experience: '5 years in leather work',
      motivation: 'Want to share skills with others',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      firstName: 'Grace',
      lastName: 'Akinyi',
      email: 'grace.akinyi@email.com',
      phone: '+254734567890',
      program: 'Fitness for Therapy',
      status: 'under_review',
      notes: 'Certified fitness instructor',
      appliedDate: '2024-01-18',
      experience: '3 years fitness training',
      motivation: 'Believe in healing through movement',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19'
    },
    {
      id: 4,
      firstName: 'Peter',
      lastName: 'Ochieng',
      email: 'peter.ochieng@email.com',
      phone: '+254745678901',
      program: 'Digital Storytelling Workshop',
      status: 'rejected',
      notes: 'Insufficient digital skills',
      appliedDate: '2024-01-10',
      experience: 'Basic computer skills',
      motivation: 'Interested in learning digital media',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-16'
    }
  ];

  const statuses = ['all', 'pending', 'approved', 'rejected', 'under_review'];
  const programs = ['Raising Authentic Voices (RAV)', 'Rebirth Empowerment Hub', 'Fitness for Therapy', 'Digital Storytelling Workshop'];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApplications(sampleApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplication = (application) => {
    setEditingApplication(application);
    setFormData({
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      phone: application.phone,
      program: application.program,
      status: application.status,
      notes: application.notes,
      appliedDate: application.appliedDate,
      experience: application.experience,
      motivation: application.motivation
    });
    setShowModal(true);
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : app
    ));
  };

  const handleSaveApplication = async () => {
    try {
      if (editingApplication) {
        setApplications(prev => prev.map(app => 
          app.id === editingApplication.id 
            ? { ...app, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
            : app
        ));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || application.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <FaCheckCircle />;
      case 'rejected': return <FaTimesCircle />;
      case 'pending': return <FaClock />;
      case 'under_review': return <FaExclamationTriangle />;
      default: return <FaClock />;
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <FaSync className="animate-spin" style={{ marginRight: '0.5rem' }} />
          Loading applications...
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaFileAlt />
          Applications Management
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={fetchApplications}>
            <FaSync />
            Refresh
          </Button>
          <Button variant="secondary">
            <FaDownload />
            Export
          </Button>
        </HeaderActions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </FilterSelect>
      </SearchBar>

      {filteredApplications.length === 0 ? (
        <EmptyState>
          <FaFileAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No applications found</h3>
          <p>Applications will appear here when submitted</p>
        </EmptyState>
      ) : (
        <ApplicationsTable>
          <TableHeader>
            <div>Applicant</div>
            <div>Program</div>
            <div>Applied Date</div>
            <div>Status</div>
            <div>Experience</div>
            <div>Actions</div>
          </TableHeader>
          {filteredApplications.map(application => (
            <TableRow key={application.id}>
              <ApplicationInfo>
                <Avatar>
                  {application.firstName[0]}{application.lastName[0]}
                </Avatar>
                <ApplicantDetails>
                  <ApplicantName>{application.firstName} {application.lastName}</ApplicantName>
                  <ApplicantEmail>{application.email}</ApplicantEmail>
                </ApplicantDetails>
              </ApplicationInfo>
              <div>{application.program}</div>
              <div>{new Date(application.appliedDate).toLocaleDateString()}</div>
              <StatusBadge status={application.status}>
                {getStatusIcon(application.status)} {application.status.replace('_', ' ')}
              </StatusBadge>
              <div>{application.experience}</div>
              <ActionButtons>
                <ActionButton variant="view" onClick={() => handleViewApplication(application)}>
                  <FaEye />
                </ActionButton>
                {application.status === 'pending' && (
                  <>
                    <ActionButton variant="approve" onClick={() => handleUpdateStatus(application.id, 'approved')}>
                      <FaCheck />
                    </ActionButton>
                    <ActionButton variant="reject" onClick={() => handleUpdateStatus(application.id, 'rejected')}>
                      <FaTimes />
                    </ActionButton>
                  </>
                )}
              </ActionButtons>
            </TableRow>
          ))}
        </ApplicationsTable>
      )}

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Application Details</ModalTitle>
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
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  readOnly
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
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  readOnly
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Program</Label>
                <Input
                  type="text"
                  value={formData.program}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
              </FormGroup>
            </div>

            <FormGroup>
              <Label>Experience</Label>
              <TextArea
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label>Motivation</Label>
              <TextArea
                value={formData.motivation}
                onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label>Admin Notes</Label>
              <TextArea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add admin notes..."
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                <FaTimes />
                Close
              </Button>
              <Button onClick={handleSaveApplication}>
                <FaSave />
                Update Application
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminApplications;
