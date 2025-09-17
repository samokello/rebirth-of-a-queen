import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaSave, FaCheckCircle } from 'react-icons/fa';
import logo from '../assets/logo-1.png';

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 340px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: block;
`;

const Title = styled.h2`
  color: #26a69a;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 1rem 0;
`;

const SuccessAlert = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  text-align: left;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

const HelperText = styled.small`
  color: #666;
  font-size: 0.8rem;
  text-align: left;
`;

const SaveButton = styled.button`
  background: #26a69a;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: #1e8a7e;
  }
`;

export default function AdminProfile() {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <Container>
      <ProfileCard>
        <Avatar src={logo} alt="Admin" />
        <Title>Admin Profile</Title>
        <Divider />
        {success && (
          <SuccessAlert>
            <FaCheckCircle />
            Profile updated successfully!
          </SuccessAlert>
        )}
        <Form onSubmit={handleSave}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <HelperText>Leave blank to keep current password</HelperText>
          </FormGroup>
          <SaveButton type="submit">
            <FaSave />
            Save Changes
          </SaveButton>
        </Form>
      </ProfileCard>
    </Container>
  );
} 