import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUsers, FaDonate, FaBox, FaShoppingCart, FaChartBar, FaTrendingUp, FaBell, FaUserPlus, FaHandsHelping, FaGraduationCap, FaEnvelope, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
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

// Enhanced Dashboard Styles
const DashboardContainer = styled.div`
  padding: 0;
  max-width: 100%;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  color: white;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.positive ? '#10b981' : props.negative ? '#ef4444' : '#6b7280'};
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  color: white;
`;

const ChartTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
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

const RecentActivity = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  color: white;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
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
  font-size: 1rem;
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

const AdminDashboardNew = () => {
  const { getAdminToken } = useAdminAuth();
  const [dashboard, setDashboard] = useState({
    totalUsers: 1247,
    totalDonations: 45680,
    totalProducts: 89,
    totalOrders: 234,
    donationStats: { totalAmount: 45680, completedDonations: 89, pendingDonations: 12 },
    userStats: { activeUsers: 892, verifiedUsers: 1105 },
  });

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
    { icon: <FaUserPlus />, text: 'New user registration', time: '2 minutes ago' },
    { icon: <FaDonate />, text: 'Donation received - $500', time: '15 minutes ago' },
    { icon: <FaHandsHelping />, text: 'New volunteer application', time: '1 hour ago' },
    { icon: <FaGraduationCap />, text: 'Program completion certificate issued', time: '2 hours ago' },
    { icon: <FaEnvelope />, text: 'Newsletter sent to 1,200 subscribers', time: '3 hours ago' },
  ];

  return (
    <DashboardContainer>
      {/* Enhanced Stats Grid */}
      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatIcon>
              <FaUsers />
            </StatIcon>
          </StatHeader>
          <StatValue>{dashboard.totalUsers.toLocaleString()}</StatValue>
          <StatLabel>Total Users</StatLabel>
          <StatChange positive>
            <FaArrowUp />
            +12% from last month
          </StatChange>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon>
              <FaDonate />
            </StatIcon>
          </StatHeader>
          <StatValue>${dashboard.donationStats.totalAmount.toLocaleString()}</StatValue>
          <StatLabel>Total Donations</StatLabel>
          <StatChange positive>
            <FaArrowUp />
            +8% from last month
          </StatChange>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon>
              <FaBox />
            </StatIcon>
          </StatHeader>
          <StatValue>{dashboard.totalProducts}</StatValue>
          <StatLabel>Products</StatLabel>
          <StatChange positive>
            <FaArrowUp />
            +5% from last month
          </StatChange>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatIcon>
              <FaShoppingCart />
            </StatIcon>
          </StatHeader>
          <StatValue>{dashboard.totalOrders}</StatValue>
          <StatLabel>Orders</StatLabel>
          <StatChange negative>
            <FaArrowDown />
            -3% from last month
          </StatChange>
        </StatCard>
      </StatsGrid>

      {/* Charts Section */}
      <ChartsSection>
        <ChartCard>
          <ChartTitle>
            <FaChartBar />
            Revenue Trends
          </ChartTitle>
          <ChartContainer>
            <Line data={revenueData} options={chartOptions} />
          </ChartContainer>
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>
            <FaTrendingUp />
            User Growth
          </ChartTitle>
          <ChartContainer>
            <Bar data={userGrowthData} options={chartOptions} />
          </ChartContainer>
        </ChartCard>
      </ChartsSection>

      {/* Donation Sources Chart */}
      <ChartCard style={{ marginBottom: '2rem' }}>
        <ChartTitle>
          <FaDonate />
          Donation Sources Distribution
        </ChartTitle>
        <ChartContainer>
          <Doughnut data={donationSourcesData} options={doughnutOptions} />
        </ChartContainer>
      </ChartCard>

      {/* Recent Activity */}
      <RecentActivity>
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
      </RecentActivity>
    </DashboardContainer>
  );
};

export default AdminDashboardNew;
