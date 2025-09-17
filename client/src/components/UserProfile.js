import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaCog, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// User Profile Container
const UserProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Profile Button
const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  transition: all 0.2s ease;
  color: #333;
  
  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }
`;

// Profile Avatar
const ProfileAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

// User Name
const UserName = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #333;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Dropdown Arrow
const DropdownArrow = styled.span`
  transition: transform 0.2s ease;
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});
  color: #666;
  
  svg {
    font-size: 10px;
  }
`;

// Dropdown Menu
const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  min-width: 200px;
  z-index: 1000;
  margin-top: 8px;
  
  @media (max-width: 768px) {
    right: -10px;
    min-width: 180px;
  }
`;

// Dropdown Item
const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }
  
  svg {
    font-size: 14px;
    width: 16px;
  }
`;

// Logout Button
const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #e74c3c;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #fdf2f2;
  }
  
  svg {
    font-size: 14px;
    width: 16px;
  }
`;

// Divider
const Divider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 8px 0;
`;

// User Profile Component
const UserProfile = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user initials (first 2 letters of first and last name)
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

  // Get display name
  const getDisplayName = (user) => {
    if (!user) return 'User';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    if (user.firstName) {
      return user.firstName;
    }
    
    return 'User';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsOpen(false);
  };

  const userInitials = getUserInitials(user);
  const displayName = getDisplayName(user);
  
  // Debug logging
  console.log('UserProfile received user:', user);
  console.log('User initials:', userInitials);
  console.log('Display name:', displayName);

  return (
    <UserProfileContainer ref={dropdownRef}>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>
        <ProfileAvatar>
          {userInitials}
        </ProfileAvatar>
        <UserName>{displayName}</UserName>
        <DropdownArrow $open={isOpen}>
          <FaChevronDown />
        </DropdownArrow>
      </ProfileButton>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownItem to="/profile">
              <FaUser />
              My Profile
            </DropdownItem>
            <DropdownItem to="/settings">
              <FaCog />
              Settings
            </DropdownItem>
            <Divider />
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </LogoutButton>
          </DropdownMenu>
        )}
      </AnimatePresence>
    </UserProfileContainer>
  );
};

export default UserProfile; 