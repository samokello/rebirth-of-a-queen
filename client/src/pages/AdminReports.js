import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChartBar, FaMoneyBillWave, FaChartLine, FaUsers, FaFileAlt, FaDownload, FaCalendarAlt, FaFilter, FaSync, FaChartArea, FaChartPie, FaUserPlus, FaDonate, FaCheckCircle, FaClock } from 'react-icons/fa';
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
  margin: 0;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FiltersSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CardTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  border: 1px solid #e9ecef;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: #718096;
  font-size: 1.1rem;
  border: 1px solid #e2e8f0;
`;

const DataTable = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #e9ecef;
  font-weight: 600;
  color: #333;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f1f3f4;
  }
`;

const DonorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DonorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
`;

const DonorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const DonorInfo = styled.div`
  flex: 1;
`;

const DonorName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const DonorAmount = styled.div`
  color: #10b981;
  font-weight: 600;
  font-size: 1.1rem;
`;

const DonorDate = styled.div`
  color: #666;
  font-size: 0.8rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #718096;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  background: #fed7d7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

export default function AdminReports() {
  const [reportData, setReportData] = useState({
    overview: {},
    userGrowth: [],
    donationTrends: [],
    topDonors: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reportType, setReportType] = useState('overview');
  const [period, setPeriod] = useState('30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { getAdminToken } = useAdminAuth();

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        type: reportType,
        period,
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });

      const response = await fetch(`${API_BASE}/admin/financial-reports?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReportData(data.report || {});
      } else {
        setError('Failed to fetch report data');
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
      setError('Error fetching report data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [reportType, period, startDate, endDate]);

  const handleExport = async () => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        type: reportType,
        period,
        format: 'csv',
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });

      const response = await fetch(`${API_BASE}/admin/export/reports?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to export report');
      }
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Error exporting report');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDonorInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setPeriod('30');
  };

  if (loading && !reportData.overview) {
    return (
      <Container>
        <LoadingSpinner>Loading reports...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaChartBar />
          Reports & Analytics
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={handleExport}>
            <FaDownload />
            Export
          </Button>
          <Button onClick={fetchReportData}>
            <FaSync />
            Refresh
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FiltersSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaFilter />
            Report Filters
          </h3>
          <Button variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
        
        <FiltersGrid>
          <FilterGroup>
            <FilterLabel>Report Type</FilterLabel>
            <FilterSelect value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="overview">Overview</option>
              <option value="user-growth">User Growth</option>
              <option value="donation-trends">Donation Trends</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Period</FilterLabel>
            <FilterSelect value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Start Date</FilterLabel>
            <FilterInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>End Date</FilterLabel>
            <FilterInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FilterGroup>
        </FiltersGrid>
      </FiltersSection>

      <ReportsGrid>
        {/* Overview Report */}
        {reportType === 'overview' && (
          <>
            <ReportCard>
              <CardHeader>
                <CardTitle>
                  <FaChartArea />
                  Overview Statistics
                </CardTitle>
              </CardHeader>
              
              <StatsGrid>
                <StatCard>
                  <StatValue>{reportData.overview?.users?.newUsers || 0}</StatValue>
                  <StatLabel>New Users</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{reportData.overview?.users?.activeUsers || 0}</StatValue>
                  <StatLabel>Active Users</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{reportData.overview?.users?.verifiedUsers || 0}</StatValue>
                  <StatLabel>Verified Users</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{formatCurrency(reportData.overview?.donations?.totalAmount || 0)}</StatValue>
                  <StatLabel>Total Donations</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{reportData.overview?.donations?.totalDonations || 0}</StatValue>
                  <StatLabel>Donation Count</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{formatCurrency(reportData.overview?.donations?.completedAmount || 0)}</StatValue>
                  <StatLabel>Completed Amount</StatLabel>
                </StatCard>
              </StatsGrid>

              <ChartContainer>
                Chart visualization will be implemented here
              </ChartContainer>
            </ReportCard>

            <ReportCard>
              <CardHeader>
                <CardTitle>
                  <FaUsers />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                  <FaUserPlus />
                  <span>New user registrations: {reportData.overview?.users?.newUsers || 0}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#667eea' }}>
                  <FaDonate />
                  <span>New donations: {reportData.overview?.donations?.totalDonations || 0}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b' }}>
                  <FaCheckCircle />
                  <span>Completed payments: {reportData.overview?.donations?.completedDonations || 0}</span>
                </div>
              </div>
            </ReportCard>
          </>
        )}

        {/* User Growth Report */}
        {reportType === 'user-growth' && (
          <ReportCard>
            <CardHeader>
              <CardTitle>
                <FaChartLine />
                User Growth Trends
              </CardTitle>
            </CardHeader>
            
            <ChartContainer>
              User growth chart will be implemented here
            </ChartContainer>

            {reportData.userGrowth && reportData.userGrowth.length > 0 ? (
              <DataTable>
                <TableHeader>
                  <div>Date</div>
                  <div>New Users</div>
                  <div>Cumulative</div>
                </TableHeader>
                {reportData.userGrowth.map((item, index) => (
                  <TableRow key={index}>
                    <div>{`${item._id?.month}/${item._id?.day}/${item._id?.year}`}</div>
                    <div>{item.count}</div>
                    <div>{/* Calculate cumulative */}</div>
                  </TableRow>
                ))}
              </DataTable>
            ) : (
              <EmptyState>No user growth data available</EmptyState>
            )}
          </ReportCard>
        )}

        {/* Donation Trends Report */}
        {reportType === 'donation-trends' && (
          <ReportCard>
            <CardHeader>
              <CardTitle>
                <FaMoneyBillWave />
                Donation Trends
              </CardTitle>
            </CardHeader>
            
            <ChartContainer>
              Donation trends chart will be implemented here
            </ChartContainer>

            {reportData.donationTrends && reportData.donationTrends.length > 0 ? (
              <DataTable>
                <TableHeader>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Count</div>
                </TableHeader>
                {reportData.donationTrends.map((item, index) => (
                  <TableRow key={index}>
                    <div>{`${item._id?.month}/${item._id?.day}/${item._id?.year}`}</div>
                    <div>{formatCurrency(item.amount)}</div>
                    <div>{item.count}</div>
                  </TableRow>
                ))}
              </DataTable>
            ) : (
              <EmptyState>No donation trends data available</EmptyState>
            )}
          </ReportCard>
        )}

        {/* Top Donors Report */}
        <ReportCard>
          <CardHeader>
            <CardTitle>
              <FaUsers />
              Top Donors
            </CardTitle>
          </CardHeader>
          
          <DonorsList>
            {reportData.topDonors && reportData.topDonors.length > 0 ? (
              reportData.topDonors.map((donor, index) => (
                <DonorItem key={index}>
                  <DonorAvatar>
                    {getDonorInitials(donor.firstName, donor.lastName)}
                  </DonorAvatar>
                  <DonorInfo>
                    <DonorName>{donor.firstName} {donor.lastName}</DonorName>
                    <DonorAmount>{formatCurrency(donor.totalAmount)}</DonorAmount>
                    <DonorDate>{donor.donationCount} donations</DonorDate>
                  </DonorInfo>
                </DonorItem>
              ))
            ) : (
              <EmptyState>No donor data available</EmptyState>
            )}
          </DonorsList>
        </ReportCard>
      </ReportsGrid>
    </Container>
  );
}
