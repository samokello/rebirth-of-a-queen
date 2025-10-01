import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaShieldAlt, FaUsers, FaUserCog, FaPlus, FaEdit, FaTrash, 
  FaEye, FaSave, FaTimes, FaCheck, FaLock, FaUnlock,
  FaDownload, FaUpload, FaSync, FaSearch, FaFilter, FaCog
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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

const RolesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const RoleCard = styled.div`
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

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const RoleInfo = styled.div`
  flex: 1;
`;

const RoleName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
`;

const RoleDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

const RoleStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
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

const PermissionsList = styled.div`
  margin-bottom: 1rem;
`;

const PermissionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  font-size: 0.9rem;
`;

const PermissionIcon = styled.div`
  color: ${props => props.active ? '#10b981' : '#6b7280'};
  font-size: 0.8rem;
`;

const RoleActions = styled.div`
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
  max-width: 600px;
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

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const Checkbox = styled.input`
  margin: 0;
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

const AdminRoles = () => {
  const { getAdminToken } = useAdminAuth();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  // Available permissions
  const availablePermissions = [
    { id: 'users.read', name: 'View Users', description: 'Can view user profiles and data' },
    { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts' },
    { id: 'users.update', name: 'Update Users', description: 'Can modify user information' },
    { id: 'users.delete', name: 'Delete Users', description: 'Can remove user accounts' },
    { id: 'roles.read', name: 'View Roles', description: 'Can view role information' },
    { id: 'roles.create', name: 'Create Roles', description: 'Can create new roles' },
    { id: 'roles.update', name: 'Update Roles', description: 'Can modify role permissions' },
    { id: 'roles.delete', name: 'Delete Roles', description: 'Can remove roles' },
    { id: 'content.read', name: 'View Content', description: 'Can view all content' },
    { id: 'content.create', name: 'Create Content', description: 'Can create new content' },
    { id: 'content.update', name: 'Update Content', description: 'Can modify existing content' },
    { id: 'content.delete', name: 'Delete Content', description: 'Can remove content' },
    { id: 'analytics.read', name: 'View Analytics', description: 'Can access analytics and reports' },
    { id: 'settings.read', name: 'View Settings', description: 'Can view system settings' },
    { id: 'settings.update', name: 'Update Settings', description: 'Can modify system settings' }
  ];

  // Sample roles data
  const sampleRoles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      userCount: 2,
      isActive: true,
      permissions: availablePermissions.map(p => p.id),
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Content Manager',
      description: 'Manages all content and media',
      userCount: 5,
      isActive: true,
      permissions: ['content.read', 'content.create', 'content.update', 'content.delete', 'users.read'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      name: 'User Manager',
      description: 'Manages user accounts and profiles',
      userCount: 3,
      isActive: true,
      permissions: ['users.read', 'users.create', 'users.update', 'users.delete', 'roles.read'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19'
    },
    {
      id: 4,
      name: 'Viewer',
      description: 'Read-only access to most features',
      userCount: 12,
      isActive: true,
      permissions: ['users.read', 'content.read', 'analytics.read'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16'
    }
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRoles(sampleRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowModal(true);
  };

  const handleSaveRole = async () => {
    try {
      if (editingRole) {
        // Update existing role
        setRoles(prev => prev.map(role => 
          role.id === editingRole.id 
            ? { ...role, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
            : role
        ));
      } else {
        // Create new role
        const newRole = {
          id: Date.now(),
          ...formData,
          userCount: 0,
          isActive: true,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setRoles(prev => [...prev, newRole]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && role.isActive) ||
                         (filterStatus === 'inactive' && !role.isActive);
    return matchesSearch && matchesFilter;
  });

  const getPermissionName = (permissionId) => {
    const permission = availablePermissions.find(p => p.id === permissionId);
    return permission ? permission.name : permissionId;
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <FaSync className="animate-spin" style={{ marginRight: '0.5rem' }} />
          Loading roles...
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaShieldAlt />
          Roles & Permissions Management
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={fetchRoles}>
            <FaSync />
            Refresh
          </Button>
          <Button onClick={handleCreateRole}>
            <FaPlus />
            Create Role
          </Button>
        </HeaderActions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </FilterSelect>
      </SearchBar>

      {filteredRoles.length === 0 ? (
        <EmptyState>
          <FaShieldAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No roles found</h3>
          <p>Create your first role to get started</p>
        </EmptyState>
      ) : (
        <RolesGrid>
          {filteredRoles.map(role => (
            <RoleCard key={role.id}>
              <RoleHeader>
                <RoleInfo>
                  <RoleName>{role.name}</RoleName>
                  <RoleDescription>{role.description}</RoleDescription>
                </RoleInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {role.isActive ? (
                    <FaCheck style={{ color: '#10b981' }} />
                  ) : (
                    <FaTimes style={{ color: '#ef4444' }} />
                  )}
                </div>
              </RoleHeader>

              <RoleStats>
                <StatItem>
                  <StatValue>{role.userCount}</StatValue>
                  <StatLabel>Users</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{role.permissions.length}</StatValue>
                  <StatLabel>Permissions</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{role.isActive ? 'Active' : 'Inactive'}</StatValue>
                  <StatLabel>Status</StatLabel>
                </StatItem>
              </RoleStats>

              <PermissionsList>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', opacity: 0.8 }}>Key Permissions:</h4>
                {role.permissions.slice(0, 3).map(permissionId => (
                  <PermissionItem key={permissionId}>
                    <PermissionIcon active>
                      <FaCheck />
                    </PermissionIcon>
                    {getPermissionName(permissionId)}
                  </PermissionItem>
                ))}
                {role.permissions.length > 3 && (
                  <PermissionItem>
                    <PermissionIcon>
                      <FaEye />
                    </PermissionIcon>
                    +{role.permissions.length - 3} more permissions
                  </PermissionItem>
                )}
              </PermissionsList>

              <RoleActions>
                <ActionButton variant="view" onClick={() => handleEditRole(role)}>
                  <FaEye />
                </ActionButton>
                <ActionButton variant="edit" onClick={() => handleEditRole(role)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton variant="delete" onClick={() => handleDeleteRole(role.id)}>
                  <FaTrash />
                </ActionButton>
              </RoleActions>
            </RoleCard>
          ))}
        </RolesGrid>
      )}

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <FormGroup>
              <Label>Role Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter role description"
              />
            </FormGroup>

            <FormGroup>
              <Label>Permissions</Label>
              <CheckboxGroup>
                {availablePermissions.map(permission => (
                  <CheckboxItem key={permission.id}>
                    <Checkbox
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                    />
                    <div>
                      <div style={{ fontWeight: '600' }}>{permission.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{permission.description}</div>
                    </div>
                  </CheckboxItem>
                ))}
              </CheckboxGroup>
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                <FaTimes />
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>
                <FaSave />
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminRoles;
