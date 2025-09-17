import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaChartLine, FaUsers, FaDonate, FaShoppingCart, FaEye, 
  FaDownload, FaCalendarAlt, FaMoneyBillWave, FaUserPlus, FaFileAlt, FaBox
} from 'react-icons/fa';
import { renderIcon } from '../utils/iconMapper';
import { useAdminAuth } from '../context/AdminAuthContext';

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'secondary' ? '#f8f9fa' : '#667eea'};
  color: ${props => props.variant === 'secondary' ? '#333' : 'white'};
  border: ${props => props.variant === 'secondary' ? '1px solid #dee2e6' : 'none'};
  
  &:hover {
    background: ${props => props.variant === 'secondary' ? '#e9ecef' : '#5a67d8'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.trend === 'up' ? 'linear-gradient(90deg, #10b981, #059669)' : 
                 props.trend === 'down' ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 
                 'linear-gradient(90deg, #667eea, #764ba2)'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${props => props.color || 'linear-gradient(135deg, #667eea, #764ba2)'};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.trend === 'up' ? '#10b981' : props.trend === 'down' ? '#ef4444' : '#6b7280'};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const ChartTitle = styled.h3`
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
  font-size: 1.1rem;
  border: 2px dashed #dee2e6;
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color || '#667eea'};
  color: white;
  font-size: 1rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #667eea;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30d');
  const { getAdminToken } = useAdminAuth();

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_BASE}/admin/analytics?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Error fetching analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? renderIcon('FaArrowUp') : renderIcon('FaArrowDown');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <FaUsers />;
      case 'donation': return <FaDonate />;
      case 'order': return <FaShoppingCart />;
      case 'product': return <FaBox />;
      default: return <FaFileAlt />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user': return '#667eea';
      case 'donation': return '#10b981';
      case 'order': return '#f59e0b';
      case 'product': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>
            <FaChartLine /> Analytics Dashboard
          </Title>
        </Header>
        <LoadingSpinner>
          <FaChartLine style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ marginLeft: '1rem' }}>Loading analytics...</span>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaChartLine /> Analytics Dashboard
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={() => setTimeRange('7d')}>
            <FaCalendarAlt /> 7 Days
          </Button>
          <Button variant="secondary" onClick={() => setTimeRange('30d')}>
            <FaCalendarAlt /> 30 Days
          </Button>
          <Button variant="secondary" onClick={() => setTimeRange('90d')}>
            <FaCalendarAlt /> 90 Days
          </Button>
          <Button onClick={() => fetchAnalytics()}>
            <FaDownload /> Export Report
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Key Metrics */}
      <StatsGrid>
        <StatCard trend="up">
          <StatHeader>
            <StatIcon color="linear-gradient(135deg, #667eea, #764ba2)">
              <FaUsers />
            </StatIcon>
          </StatHeader>
          <StatValue>{formatNumber(analytics?.totalUsers || 0)}</StatValue>
          <StatLabel>Total Users</StatLabel>
          <StatChange trend="up">
            {getTrendIcon('up')} +{analytics?.newUsers || 0} this period
          </StatChange>
        </StatCard>

        <StatCard trend="up">
          <StatHeader>
            <StatIcon color="linear-gradient(135deg, #10b981, #059669)">
              <FaDonate />
            </StatIcon>
          </StatHeader>
          <StatValue>{formatCurrency(analytics?.totalDonations || 0)}</StatValue>
          <StatLabel>Total Donations</StatLabel>
          <StatChange trend="up">
            {getTrendIcon('up')} +{analytics?.newDonations || 0} this period
          </StatChange>
        </StatCard>

        <StatCard trend="up">
          <StatHeader>
            <StatIcon color="linear-gradient(135deg, #f59e0b, #d97706)">
              <FaShoppingCart />
            </StatIcon>
          </StatHeader>
          <StatValue>{formatNumber(analytics?.totalOrders || 0)}</StatValue>
          <StatLabel>Total Orders</StatLabel>
          <StatChange trend="up">
            {getTrendIcon('up')} +{analytics?.newOrders || 0} this period
          </StatChange>
        </StatCard>

        <StatCard trend="up">
          <StatHeader>
            <StatIcon color="linear-gradient(135deg, #8b5cf6, #7c3aed)">
              <FaMoneyBillWave />
            </StatIcon>
          </StatHeader>
          <StatValue>{formatCurrency(analytics?.totalRevenue || 0)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
          <StatChange trend="up">
            {getTrendIcon('up')} +{analytics?.revenueGrowth || 0}% vs last period
          </StatChange>
        </StatCard>
      </StatsGrid>

      {/* Charts and Activity */}
      <ChartsGrid>
        <ChartCard>
          <ChartTitle>
            <FaChartLine /> Revenue Trends
          </ChartTitle>
          <ChartPlaceholder>
            Chart: Revenue over time (Last {timeRange === '7d' ? '7' : timeRange === '30d' ? '30' : '90'} days)
          </ChartPlaceholder>
        </ChartCard>

        <RecentActivity>
          <ChartTitle>
            <FaEye /> Recent Activity
          </ChartTitle>
          {analytics?.recentActivity?.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon color={getActivityColor(activity.type)}>
                {getActivityIcon(activity.type)}
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          )) || (
            <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
              No recent activity
            </div>
          )}
        </RecentActivity>
      </ChartsGrid>

      {/* Additional Charts */}
      <ChartsGrid>
        <ChartCard>
          <ChartTitle>
            <FaUsers /> User Growth
          </ChartTitle>
          <ChartPlaceholder>
            Chart: New user registrations over time
          </ChartPlaceholder>
        </ChartCard>

        <ChartCard>
          <ChartTitle>
            <FaDonate /> Donation Distribution
          </ChartTitle>
          <ChartPlaceholder>
            Chart: Donations by payment method and status
          </ChartPlaceholder>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

export default AdminAnalytics; 