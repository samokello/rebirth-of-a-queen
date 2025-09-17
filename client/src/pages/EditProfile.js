import React, { useState, useEffect } from 'react';
import API from '../api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fafafa;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 1rem auto;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 1rem;
  text-align: left;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin: 1rem 0;
`;

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/profile')
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhotoPreview(`http://localhost:5000/uploads/${res.data.photo}`);
      })
      .catch((err) => console.error('❌ Failed to fetch profile:', err));
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (photoFile) formData.append('photo', photoFile);

    try {
      const res = await API.put('/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Profile updated!');
      navigate('/profile');
    } catch (err) {
      console.error('❌ Failed to update profile:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <Wrapper>
      <h2>Edit Profile</h2>

      {photoPreview && <Avatar src={photoPreview} alt="Preview" />}

      <form onSubmit={handleUpdate}>
        <Label htmlFor="name">Name:</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Label htmlFor="photo">Change Photo:</Label>
        <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />

        <Button type="submit">Save Changes</Button>
      </form>
    </Wrapper>
  );
}
