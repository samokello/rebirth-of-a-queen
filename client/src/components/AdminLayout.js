import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { API_MAIN } from '../api';
import { renderIcon } from '../utils/iconMapper';
import { useSidebarData } from '../hooks/useSidebarData';
import { 
  FaTachometerAlt, FaUsers, FaDonate, FaFileAlt, FaChartBar, 
  FaCog, FaUser, FaBell, FaBars, FaTimes,
  FaGraduationCap, FaHandsHelping, FaHeart, FaNewspaper,
  FaShoppingCart, FaBox, FaStore, FaEdit, FaShieldAlt,
  FaHome, FaCrown, FaStar, FaRocket, FaGem, FaMagic,
  FaLightbulb, FaBrain, FaEye, FaPalette, FaCode,
  FaDatabase, FaServer, FaNetworkWired, FaCloud,
  FaMobile, FaTablet, FaDesktop, FaGlobe, FaMapMarkerAlt,
  FaCalendar, FaClock, FaHistory, FaBookmark, FaThumbsUp,
  FaThumbsDown, FaEnvelope, FaPhone, FaSms, FaVideo,
  FaImage, FaMusic, FaGamepad, FaTrophy, FaMedal,
  FaFire, FaWater, FaLeaf, FaSun, FaMoon, FaStarHalf,
  FaCreditCard
} from 'react-icons/fa';

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.8), 0 0 30px rgba(102, 126, 234, 0.6);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Sidebar = styled.div`
  width: 260px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: ${slideIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    width: 250px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(102, 126, 234, 0.1) 0%, 
      rgba(118, 75, 162, 0.1) 50%, 
      rgba(240, 147, 251, 0.1) 100%);
    pointer-events: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.8rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  animation: ${pulse} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea);
    background-size: 400% 400%;
    animation: ${rotate} 3s linear infinite;
    z-index: -1;
  }
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const BrandInfo = styled.div`
  flex: 1;
`;

const BrandName = styled.h2`
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.25rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BrandSubtitle = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 500;
`;

const SidebarMenu = styled.nav`
  padding: 1.5rem 0;
  flex: 1;
  overflow-y: auto;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
    border-radius: 3px;
    
    &:hover {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
    }
  }
`;

const MenuSection = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const MenuTitle = styled.h3`
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    right: 1.5rem;
    bottom: -0.5rem;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      transparent 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 1.5rem;
    width: 20px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 1px;
  }
`;

const MenuTitleIcon = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  color: white;
  text-decoration: none;
  border-radius: 0 50px 50px 0;
  margin: 0.2rem 0 0.2rem 0.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-weight: 500;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 100%);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &.active {
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    animation: ${glow} 2s ease-in-out infinite;
    
    &::after {
      content: '';
      position: absolute;
      right: 1rem;
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    }
  }
`;

const MenuIcon = styled.div`
  font-size: 1rem;
  width: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
  
  ${MenuItem}:hover & {
    animation: ${float} 1s ease-in-out infinite;
  }
`;

const MenuLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

const MenuBadge = styled.span`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
  animation: ${pulse} 2s ease-in-out infinite;
`;



const MainContent = styled.div`
  flex: 1;
  margin-left: 260px;
  padding: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
  animation: ${pulse} 2s ease-in-out infinite;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const AdminLayout = ({ children }) => {
  const { adminUser, adminLogout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  
  // Use custom hook for sidebar data
  const { sidebarData, loading, error, refreshData } = useSidebarData();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/admin': 'Dashboard',
      '/admin/users': 'User Management',
      '/admin/donations': 'Donations',
      '/admin/applications': 'Applications',
      '/admin/reports': 'Reports',
      '/admin/settings': 'Settings',
      '/admin/profile': 'Profile',
      '/admin/announcements': 'Announcements',
      '/admin/products': 'Products',
      '/admin/orders': 'Orders',
      '/admin/shop-settings': 'Shop Settings',
      '/admin/bulk-sms': 'Bulk SMS'
    };
    return titles[path] || 'Admin Panel';
  };

  // Get menu items from backend data or fallback to empty array
  const menuItems = sidebarData?.menuItems || [];

  return (
    <AdminContainer>
      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      
      <Sidebar ref={sidebarRef} isOpen={isSidebarOpen}>
        <SidebarHeader>
          <LogoContainer>
            <Logo>RQ</Logo>
          </LogoContainer>
          <BrandInfo>
            <BrandName>Rebirth Queen</BrandName>
            <BrandSubtitle>Admin Panel</BrandSubtitle>
          </BrandInfo>
        </SidebarHeader>
        
        <SidebarMenu>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
              Loading sidebar...
            </div>
          ) : error ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#ff6b6b' }}>
              Error loading sidebar data
              <button 
                onClick={refreshData}
                style={{ 
                  marginTop: '10px', 
                  padding: '5px 10px', 
                  background: 'rgba(255,255,255,0.2)', 
                  border: 'none', 
                  borderRadius: '4px', 
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            menuItems.map((section, sectionIndex) => (
              <MenuSection key={sectionIndex}>
                <MenuTitle>
                  <MenuTitleIcon>{renderIcon(section.icon)}</MenuTitleIcon>
                  {section.title}
                </MenuTitle>
                {section.items.map((item, itemIndex) => (
                  <MenuItem 
                    key={itemIndex} 
                    to={item.to}
                    className={location.pathname === item.to ? 'active' : ''}
                  >
                    <MenuIcon>{renderIcon(item.icon)}</MenuIcon>
                    <MenuLabel>{item.label}</MenuLabel>
                    {item.badge && <MenuBadge>{item.badge}</MenuBadge>}
                  </MenuItem>
                ))}
              </MenuSection>
            ))
          )}
        </SidebarMenu>
        

      </Sidebar>

      <MainContent>
        <TopBar>
          <PageTitle>{getPageTitle()}</PageTitle>
          <TopBarActions>
            <NotificationButton>
              <FaBell />
              {sidebarData?.stats?.unreadNotifications > 0 && (
                <NotificationBadge>{sidebarData.stats.unreadNotifications}</NotificationBadge>
              )}
            </NotificationButton>
            <MobileMenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <FaBars />
            </MobileMenuButton>
          </TopBarActions>
        </TopBar>
        
        {children}
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout; 