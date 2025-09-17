import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBullhorn, FaPlus, FaTrash } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const AnnouncementsCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 1.5rem 0;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

const AddButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: #5a67d8;
  }
`;

const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AnnouncementItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
`;

const AnnouncementText = styled.div`
  color: #333;
  font-size: 1rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: #fee2e2;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const initialAnnouncements = [
  { id: 1, text: 'System maintenance scheduled for July 25th.' },
  { id: 2, text: 'New donation report feature released!' },
];

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newAnnouncement.trim()) {
      setAnnouncements([{ id: Date.now(), text: newAnnouncement }, ...announcements]);
      setNewAnnouncement('');
    }
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <Container>
      <AnnouncementsCard>
        <Title>
          <FaBullhorn />
          Announcements
        </Title>
        <Divider />
        <Form onSubmit={handleAdd}>
          <Input
            type="text"
            placeholder="New announcement"
            value={newAnnouncement}
            onChange={e => setNewAnnouncement(e.target.value)}
          />
          <AddButton type="submit">
            <FaPlus />
            Add
          </AddButton>
        </Form>
        <AnnouncementsList>
          {announcements.length === 0 ? (
            <EmptyState>
              <h3>No announcements</h3>
              <p>Add your first announcement above</p>
            </EmptyState>
          ) : (
            announcements.map((announcement) => (
              <AnnouncementItem key={announcement.id}>
                <AnnouncementText>{announcement.text}</AnnouncementText>
                <DeleteButton onClick={() => handleDelete(announcement.id)} title="Delete">
                  <FaTrash />
                </DeleteButton>
              </AnnouncementItem>
            ))
          )}
        </AnnouncementsList>
      </AnnouncementsCard>
    </Container>
  );
} 