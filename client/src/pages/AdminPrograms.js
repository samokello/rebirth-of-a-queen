import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaGraduationCap, FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaTimes, 
  FaCheck, FaUsers, FaCalendar, FaMapMarkerAlt, FaClock, FaSearch, 
  FaFilter, FaSync, FaDownload, FaUpload, FaBook, FaHandsHelping,
  FaHeart, FaLightbulb, FaFutbol, FaCamera, FaVideo, FaImage
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

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProgramCard = styled.div`
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

const ProgramHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProgramInfo = styled.div`
  flex: 1;
`;

const ProgramName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgramDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

const ProgramStats = styled.div`
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

const ProgramDetails = styled.div`
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

const ProgramActions = styled.div`
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

const AdminPrograms = () => {
  const { getAdminToken } = useAdminAuth();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: '',
    location: '',
    maxParticipants: '',
    startDate: '',
    endDate: '',
    status: 'active',
    requirements: '',
    objectives: ''
  });

  // Sample programs data
  const samplePrograms = [
    {
      id: 1,
      name: 'Raising Authentic Voices (RAV)',
      description: 'Community-centered program fostering advocacy, mentorship, and education for vulnerable youth.',
      category: 'Education',
      duration: '6 months',
      location: 'Nairobi, Kenya',
      maxParticipants: 50,
      currentParticipants: 35,
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      status: 'active',
      requirements: 'Ages 15-25, basic literacy',
      objectives: 'Empower youth through mentorship and advocacy',
      icon: <FaBook />,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Rebirth Empowerment Hub',
      description: '3-month training program in leather crafting, fashion design, IT, and digital skills.',
      category: 'Skills Training',
      duration: '3 months',
      location: 'Kajiado County',
      maxParticipants: 30,
      currentParticipants: 28,
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'active',
      requirements: 'Ages 18-35, interest in creative skills',
      objectives: 'Provide marketable skills for economic empowerment',
      icon: <FaHandsHelping />,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      name: 'Fitness for Therapy',
      description: 'Wellness program integrating fitness as therapy for survivors.',
      category: 'Wellness',
      duration: 'Ongoing',
      location: 'Multiple locations',
      maxParticipants: 100,
      currentParticipants: 67,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      requirements: 'Open to all survivors',
      objectives: 'Promote physical and mental wellness',
      icon: <FaFutbol />,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Digital Storytelling Workshop',
      description: 'Creative workshop teaching digital media and storytelling skills.',
      category: 'Creative Arts',
      duration: '2 weeks',
      location: 'Online',
      maxParticipants: 20,
      currentParticipants: 18,
      startDate: '2024-02-15',
      endDate: '2024-02-28',
      status: 'active',
      requirements: 'Basic computer skills',
      objectives: 'Develop digital storytelling capabilities',
      icon: <FaVideo />,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19'
    }
  ];

  const categories = ['all', 'Education', 'Skills Training', 'Wellness', 'Creative Arts', 'Mentorship'];

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrograms(samplePrograms);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProgram = () => {
    setEditingProgram(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      duration: '',
      location: '',
      maxParticipants: '',
      startDate: '',
      endDate: '',
      status: 'active',
      requirements: '',
      objectives: ''
    });
    setShowModal(true);
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      description: program.description,
      category: program.category,
      duration: program.duration,
      location: program.location,
      maxParticipants: program.maxParticipants.toString(),
      startDate: program.startDate,
      endDate: program.endDate,
      status: program.status,
      requirements: program.requirements,
      objectives: program.objectives
    });
    setShowModal(true);
  };

  const handleSaveProgram = async () => {
    try {
      if (editingProgram) {
        // Update existing program
        setPrograms(prev => prev.map(program => 
          program.id === editingProgram.id 
            ? { 
                ...program, 
                ...formData, 
                maxParticipants: parseInt(formData.maxParticipants),
                updatedAt: new Date().toISOString().split('T')[0] 
              }
            : program
        ));
      } else {
        // Create new program
        const newProgram = {
          id: Date.now(),
          ...formData,
          maxParticipants: parseInt(formData.maxParticipants),
          currentParticipants: 0,
          icon: <FaGraduationCap />,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setPrograms(prev => [...prev, newProgram]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(prev => prev.filter(program => program.id !== programId));
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <FaSync className="animate-spin" style={{ marginRight: '0.5rem' }} />
          Loading programs...
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaGraduationCap />
          Programs Management
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={fetchPrograms}>
            <FaSync />
            Refresh
          </Button>
          <Button onClick={handleCreateProgram}>
            <FaPlus />
            Create Program
          </Button>
        </HeaderActions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </FilterSelect>
      </SearchBar>

      {filteredPrograms.length === 0 ? (
        <EmptyState>
          <FaGraduationCap style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No programs found</h3>
          <p>Create your first program to get started</p>
        </EmptyState>
      ) : (
        <ProgramsGrid>
          {filteredPrograms.map(program => (
            <ProgramCard key={program.id}>
              <ProgramHeader>
                <ProgramInfo>
                  <ProgramName>
                    {program.icon}
                    {program.name}
                  </ProgramName>
                  <ProgramDescription>{program.description}</ProgramDescription>
                </ProgramInfo>
                <div style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  background: program.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: program.status === 'active' ? '#10b981' : '#ef4444',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {program.status}
                </div>
              </ProgramHeader>

              <ProgramStats>
                <StatItem>
                  <StatValue>{program.currentParticipants}/{program.maxParticipants}</StatValue>
                  <StatLabel>Participants</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{program.duration}</StatValue>
                  <StatLabel>Duration</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{program.category}</StatValue>
                  <StatLabel>Category</StatLabel>
                </StatItem>
              </ProgramStats>

              <ProgramDetails>
                <DetailItem>
                  <FaMapMarkerAlt />
                  {program.location}
                </DetailItem>
                <DetailItem>
                  <FaCalendar />
                  {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                </DetailItem>
                <DetailItem>
                  <FaUsers />
                  {program.requirements}
                </DetailItem>
              </ProgramDetails>

              <ProgramActions>
                <ActionButton variant="view" onClick={() => handleEditProgram(program)}>
                  <FaEye />
                </ActionButton>
                <ActionButton variant="edit" onClick={() => handleEditProgram(program)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton variant="delete" onClick={() => handleDeleteProgram(program.id)}>
                  <FaTrash />
                </ActionButton>
              </ProgramActions>
            </ProgramCard>
          ))}
        </ProgramsGrid>
      )}

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Program Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter program name"
                />
              </FormGroup>

              <FormGroup>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select category</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Select>
              </FormGroup>
            </div>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter program description"
              />
            </FormGroup>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Duration</Label>
                <Input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 3 months"
                />
              </FormGroup>

              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location"
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Max Participants</Label>
                <Input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                  placeholder="Enter max participants"
                />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </Select>
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Label>Requirements</Label>
              <TextArea
                value={formData.requirements}
                onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                placeholder="Enter program requirements"
              />
            </FormGroup>

            <FormGroup>
              <Label>Objectives</Label>
              <TextArea
                value={formData.objectives}
                onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                placeholder="Enter program objectives"
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                <FaTimes />
                Cancel
              </Button>
              <Button onClick={handleSaveProgram}>
                <FaSave />
                {editingProgram ? 'Update Program' : 'Create Program'}
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminPrograms;
