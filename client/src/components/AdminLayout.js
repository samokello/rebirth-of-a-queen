import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { renderIcon } from '../utils/iconMapper';
import { useSidebarData } from '../hooks/useSidebarData';
import { FaBell, FaBars, FaArrowUp, FaArrowDown, FaChartLine, FaChartArea, FaChartBar, FaDonate } from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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
  width: ${props => props.collapsed ? '80px' : '260px'};
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
    width: ${props => props.collapsed ? '80px' : '250px'};
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
  padding: 1.1rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
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
  width: 40px;
  height: 40px;
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
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SidebarMenu = styled.nav`
  padding: ${props => props.collapsed ? '0.75rem 0' : '1.25rem 0'};
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

const SidebarSearch = styled.div`
  padding: 0 ${props => props.collapsed ? '0.5rem' : '1rem'} ${props => props.collapsed ? '0.5rem' : '1rem'} ${props => props.collapsed ? '0.5rem' : '1rem'};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  outline: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  
  &::placeholder { color: rgba(255,255,255,0.7); }
  &:focus { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.18); }
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
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 0 50px 50px 0;
  margin: 0.15rem 0 0.15rem 0.6rem;
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
  width: 24px;
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
  opacity: ${props => props.hidden ? 0 : 1};
  pointer-events: ${props => props.hidden ? 'none' : 'auto'};
  transition: opacity .2s ease;
`;

const SectionHeaderButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  background: transparent;
  color: rgba(255,255,255,0.95);
  border: none;
  cursor: pointer;
  text-align: left;
`;

const MenuBadge = styled.span`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  font-size: ${props => props.dot ? '0' : '0.7rem'};
  font-weight: 600;
  padding: ${props => props.dot ? '0' : '0.2rem 0.6rem'};
  border-radius: ${props => props.dot ? '50%' : '10px'};
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.4);
  animation: ${pulse} 2s ease-in-out infinite;
  width: ${props => props.dot ? '8px' : 'auto'};
  height: ${props => props.dot ? '8px' : 'auto'};
`;



const MainContent = styled.div`
  flex: 1;
  margin-left: ${props => props.collapsed ? '80px' : '260px'};
  padding: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

// Dashboard Enhancements
const WelcomeBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.25);
  background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08));
  backdrop-filter: blur(14px);
  color: #fff;
  box-shadow: 0 6px 22px rgba(0,0,0,0.12);
  margin-bottom: 1.5rem;
`;

const BannerTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
`;

const BannerSubtitle = styled.div`
  opacity: 0.9;
  font-size: 0.92rem;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.25);
  background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08));
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  box-shadow: 0 6px 22px rgba(0,0,0,0.1);
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
`;

const StatValue = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
`;

const StatDelta = styled.span`
  font-size: 0.75rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => props.positive ? '#10b981' : props.negative ? '#ef4444' : 'inherit'};
`;

// Analytics Section
const AnalyticsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.25);
  background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08));
  backdrop-filter: blur(14px);
  color: #fff;
  padding: 1.5rem;
  box-shadow: 0 6px 22px rgba(0,0,0,0.12);
`;

const ChartTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
`;

const MiniStatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;


// Recent Activity Section
const ActivitySection = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.25);
  background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08));
  backdrop-filter: blur(14px);
  color: #fff;
  padding: 1.5rem;
  box-shadow: 0 6px 22px rgba(0,0,0,0.12);
  margin-bottom: 1.5rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
`;

const SidebarFooter = styled.div`
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #fff;
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
`;

const LogoutButton = styled.button`
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff;
  padding: 0.45rem 0.7rem;
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover { background: rgba(255,255,255,0.22); transform: translateY(-1px); }
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

const CollapseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  &:hover { background: rgba(255,255,255,0.2); transform: translateY(-1px); }
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
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [menuQuery, setMenuQuery] = useState('');
  const sidebarRef = useRef();
  
  // Use custom hook for sidebar data
  const { sidebarData, loading, error, refreshData } = useSidebarData();

  // Ensure admin favicon/logo is shown in dashboard
  useEffect(() => {
    const envUrl = process.env.REACT_APP_FAVICON_URL;
    const faviconUrl = envUrl || 'https://res.cloudinary.com/samokello/image/upload/v1758121594/rebirth-of-a-queen/images/logo.png';
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      document.head.appendChild(link);
    }
    if (link.getAttribute('href') !== faviconUrl) {
      link.setAttribute('href', faviconUrl);
    }
  }, []);

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgba(102, 126, 234, 1)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 78, 90, 81, 95, 105],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
      },
    ],
  };

  const donationSourcesData = {
    labels: ['Online', 'Mobile', 'Bank Transfer', 'Cash'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          padding: 20,
        },
      },
    },
  };

  // Recent activities data
  const recentActivities = [
    { icon: '👤', text: 'New user registration', time: '2 minutes ago' },
    { icon: '💰', text: 'Donation received - $500', time: '15 minutes ago' },
    { icon: '📦', text: 'New order placed', time: '1 hour ago' },
    { icon: '📧', text: 'Newsletter sent to 1,200 subscribers', time: '2 hours ago' },
    { icon: '🎯', text: 'Campaign goal reached', time: '3 hours ago' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem('adminSidebarCollapsedFlag');
      if (savedCollapsed) setCollapsed(savedCollapsed === '1');
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarCollapsedFlag', collapsed ? '1' : '0');
    } catch (_) {}
  }, [collapsed]);

  // Persist collapsed sections and search query
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem('adminSidebarCollapsed');
      const savedQuery = localStorage.getItem('adminSidebarQuery');
      if (savedCollapsed) setCollapsedSections(JSON.parse(savedCollapsed));
      if (typeof savedQuery === 'string') setMenuQuery(savedQuery);
    } catch (_) { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarCollapsed', JSON.stringify(collapsedSections));
    } catch (_) { /* ignore */ }
  }, [collapsedSections]);

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarQuery', menuQuery);
    } catch (_) { /* ignore */ }
  }, [menuQuery]);

  // Safe, real-time user info derived from context
  const adminDisplay = useMemo(() => {
    const first = (adminUser?.firstName || '').trim();
    const last = (adminUser?.lastName || '').trim();
    const full = [first, last].filter(Boolean).join(' ').trim();
    const email = (adminUser?.email || '').trim();
    const name = full || (email ? email.split('@')[0] : 'Admin');
    const initials = (full || email || 'Admin')
      .split(/\s|\./)
      .filter(Boolean)
      .slice(0, 2)
      .map(s => s[0]?.toUpperCase())
      .join('') || 'A';
    return { name, email: email || 'admin@rebirthofaqueen.org', initials };
  }, [adminUser]);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      navigate('/admin/login');
    }
  };



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
  const filteredMenu = menuItems.map(section => ({
    ...section,
    items: (section.items || []).filter(item =>
      item.label.toLowerCase().includes(menuQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0 || menuQuery.trim() === '');

  return (
    <AdminContainer>
      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      
      <Sidebar ref={sidebarRef} isOpen={isSidebarOpen} collapsed={collapsed}>
        <SidebarHeader>
          <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
            <LogoContainer>
              <Logo>RQ</Logo>
            </LogoContainer>
            {!collapsed && (
              <BrandInfo>
                <BrandName>Rebirth Queen</BrandName>
              </BrandInfo>
            )}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
            <CollapseButton onClick={() => setCollapsed(v => !v)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              {collapsed ? '☰' : '↔'}
            </CollapseButton>
            <MobileMenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle sidebar">
              <FaBars />
            </MobileMenuButton>
          </div>
        </SidebarHeader>
        
        <SidebarMenu collapsed={collapsed}>
          <SidebarSearch collapsed={collapsed}>
            {!collapsed && (<SearchInput
              value={menuQuery}
              onChange={(e) => setMenuQuery(e.target.value)}
              placeholder="Search menu..."
            />)}
          </SidebarSearch>
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
            filteredMenu.map((section, sectionIndex) => (
              <MenuSection key={sectionIndex}>
                <MenuTitle>
                  <MenuTitleIcon>{renderIcon(section.icon)}</MenuTitleIcon>
                  {section.title}
                </MenuTitle>
                {!collapsed && (
                  <SectionHeaderButton onClick={() => setCollapsedSections(s => ({ ...s, [section.title]: !s[section.title] }))}>
                    {collapsedSections[section.title] ? 'Expand' : 'Collapse'} section
                  </SectionHeaderButton>
                )}
                {(!collapsedSections[section.title]) && section.items.map((item, itemIndex) => (
                  <MenuItem 
                    key={itemIndex} 
                    to={item.to}
                    className={location.pathname === item.to ? 'active' : ''}
                  >
                    <MenuIcon title={collapsed ? item.label : undefined}>{renderIcon(item.icon)}</MenuIcon>
                    <MenuLabel hidden={collapsed}>{item.label}</MenuLabel>
                    {item.badge && <MenuBadge dot={collapsed}>{collapsed ? '' : item.badge}</MenuBadge>}
                  </MenuItem>
                ))}
              </MenuSection>
            ))
          )}
        </SidebarMenu>
        <SidebarFooter>
          <ProfileRow>
            <ProfileInfo>
              <ProfileAvatar title={adminDisplay.email}>{adminDisplay.initials}</ProfileAvatar>
              {!collapsed && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{adminDisplay.name}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>{adminDisplay.email}</div>
                </div>
              )}
            </ProfileInfo>
            {!collapsed ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <LogoutButton onClick={() => navigate('/admin/profile')}>Profile</LogoutButton>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </div>
            ) : (
              <LogoutButton title="Logout" onClick={handleLogout}>⎋</LogoutButton>
            )}
          </ProfileRow>
        </SidebarFooter>
        

      </Sidebar>

      <MainContent collapsed={collapsed}>
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
        
        {/* Welcome banner */}
        <WelcomeBanner>
          <div>
            <BannerTitle>Welcome back, {adminDisplay.name}</BannerTitle>
            <BannerSubtitle>Here’s a quick snapshot of today’s activity.</BannerSubtitle>
          </div>
        </WelcomeBanner>

        {/* Quick stats */}
        <QuickStats>
          <StatCard>
            <StatInfo>
              <StatLabel>New Users</StatLabel>
              <StatValue>{sidebarData?.stats?.newUsersToday ?? 24}</StatValue>
            </StatInfo>
            <StatDelta positive>
              <FaArrowUp />
              {sidebarData?.stats?.usersDelta ?? '+12%'}
            </StatDelta>
          </StatCard>
          <StatCard>
            <StatInfo>
              <StatLabel>Donations</StatLabel>
              <StatValue>${sidebarData?.stats?.donationsToday ?? '2,450'}</StatValue>
            </StatInfo>
            <StatDelta positive>
              <FaArrowUp />
              {sidebarData?.stats?.donationsDelta ?? '+8%'}
            </StatDelta>
          </StatCard>
          <StatCard>
            <StatInfo>
              <StatLabel>Orders</StatLabel>
              <StatValue>{sidebarData?.stats?.ordersToday ?? 18}</StatValue>
            </StatInfo>
            <StatDelta negative>
              <FaArrowDown />
              {sidebarData?.stats?.ordersDelta ?? '-3%'}
            </StatDelta>
          </StatCard>
          <StatCard>
            <StatInfo>
              <StatLabel>Open Tickets</StatLabel>
              <StatValue>{sidebarData?.stats?.openTickets ?? 7}</StatValue>
            </StatInfo>
            <StatDelta>
              <FaChartArea />
              {sidebarData?.stats?.ticketsDelta ?? '-15%'}
            </StatDelta>
          </StatCard>
        </QuickStats>

        {/* Analytics Section */}
        <AnalyticsSection>
          <ChartCard>
            <ChartTitle>
              <FaChartBar />
              Revenue Trends
            </ChartTitle>
            <ChartContainer>
              <Line data={revenueData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
          
          <MiniStatsGrid>
            <ChartCard>
            <ChartTitle>
              <FaChartLine />
              User Growth
            </ChartTitle>
              <ChartContainer>
                <Bar data={userGrowthData} options={chartOptions} />
              </ChartContainer>
            </ChartCard>
            
            <ChartCard>
              <ChartTitle>
                <FaDonate />
                Donation Sources
              </ChartTitle>
              <ChartContainer>
                <Doughnut data={donationSourcesData} options={doughnutOptions} />
              </ChartContainer>
            </ChartCard>
          </MiniStatsGrid>
        </AnalyticsSection>

        {/* Recent Activity */}
        <ActivitySection>
          <ChartTitle>
            <FaBell />
            Recent Activity
          </ChartTitle>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivitySection>

        {children}
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout; 