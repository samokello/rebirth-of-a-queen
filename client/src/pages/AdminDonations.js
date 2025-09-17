import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaDownload, FaSearch, FaSync, FaEye, FaMoneyBillWave, FaFilter, FaCalendarAlt, FaUser, FaCreditCard, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
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
  margin-bottom: 1rem;
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

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const DonationsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e9ecef;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  color: #333;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DonorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

const DonorDetails = styled.div`
  flex: 1;
`;

const DonorName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const DonorEmail = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const Amount = styled.div`
  font-weight: 700;
  color: #10b981;
  font-size: 1.1rem;
`;

const StatusBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  background: ${props => {
    switch (props.status) {
      case 'completed': return '#d1fae5';
      case 'pending': return '#fef3c7';
      case 'failed': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return '#065f46';
      case 'pending': return '#92400e';
      case 'failed': return '#991b1b';
      default: return '#374151';
    }
  }};
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.variant === 'danger' ? '#dc3545' : '#667eea'};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? '#c82333' : '#5a67d8'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$active && `
    background: #667eea;
    color: white;
    border-color: #667eea;
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  background: #fed7d7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
`;

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalCount: 0,
    completedAmount: 0,
    completedCount: 0,
    pendingAmount: 0,
    pendingCount: 0
  });

  const { getAdminToken } = useAdminAuth();

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(paymentMethodFilter && { paymentMethod: paymentMethodFilter }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });

      const response = await fetch(`${API_BASE}/admin/donations?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDonations(data.donations || []);
        setTotalPages(data.pagination?.pages || 1);
        setSummary(data.summary || {
          totalAmount: 0,
          totalCount: 0,
          completedAmount: 0,
          completedCount: 0,
          pendingAmount: 0,
          pendingCount: 0
        });
      } else {
        setError('Failed to fetch donations');
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setError('Error fetching donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [currentPage, searchTerm, statusFilter, paymentMethodFilter, startDate, endDate]);

  const handleExport = async () => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        format: 'csv',
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`${API_BASE}/admin/donations/export?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to export donations');
      }
    } catch (error) {
      console.error('Error exporting donations:', error);
      alert('Error exporting donations');
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

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'paypal': return <FaCreditCard />;
      case 'mpesa_stk': return <FaMoneyBillWave />;
      case 'mpesa_manual': return <FaMoneyBillWave />;
      default: return <FaCreditCard />;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaymentMethodFilter('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  if (loading && donations.length === 0) {
    return (
      <Container>
        <LoadingMessage>Loading donations...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaMoneyBillWave />
          Donations Management
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={handleExport}>
            <FaDownload />
            Export
          </Button>
          <Button onClick={fetchDonations}>
            <FaSync />
            Refresh
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <StatsGrid>
        <StatCard>
          <StatValue>{formatCurrency(summary.totalAmount)}</StatValue>
          <StatLabel>Total Donations</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{summary.totalCount}</StatValue>
          <StatLabel>Total Count</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatCurrency(summary.completedAmount)}</StatValue>
          <StatLabel>Completed Amount</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{summary.completedCount}</StatValue>
          <StatLabel>Completed Count</StatLabel>
        </StatCard>
      </StatsGrid>

      <FiltersSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaFilter />
            Filters
          </h3>
          <Button variant="secondary" onClick={clearFilters}>
            <FaTimes />
            Clear Filters
          </Button>
        </div>
        
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search by donor name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FiltersGrid>
          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Payment Method</FilterLabel>
            <FilterSelect value={paymentMethodFilter} onChange={(e) => setPaymentMethodFilter(e.target.value)}>
              <option value="">All Methods</option>
              <option value="paypal">PayPal</option>
              <option value="mpesa_stk">M-Pesa STK</option>
              <option value="mpesa_manual">M-Pesa Manual</option>
              <option value="mchanga">M-Changa</option>
              <option value="bank_transfer">Bank Transfer</option>
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

      <DonationsTable>
        <TableHeader>
          <div>Donor</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Payment Method</div>
          <div>Date</div>
          <div>Transaction ID</div>
          <div>Actions</div>
        </TableHeader>

        {donations.length === 0 ? (
          <EmptyState>
            <h3>No donations found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          donations.map((donation) => (
            <TableRow key={donation._id}>
              <DonorInfo>
                <DonorAvatar>
                  {getDonorInitials(donation.firstName, donation.lastName)}
                </DonorAvatar>
                <DonorDetails>
                  <DonorName>{donation.firstName} {donation.lastName}</DonorName>
                  <DonorEmail>{donation.email}</DonorEmail>
                </DonorDetails>
              </DonorInfo>
              <Amount>{formatCurrency(donation.amount)}</Amount>
              <StatusBadge status={donation.paymentStatus}>
                {donation.paymentStatus}
              </StatusBadge>
              <PaymentMethod>
                {getPaymentMethodIcon(donation.paymentMethod)}
                {donation.paymentMethod.replace('_', ' ')}
              </PaymentMethod>
              <div>{formatDate(donation.createdAt)}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {donation.transactionId ? donation.transactionId.slice(-8) : 'N/A'}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <ActionButton title="View Details">
                  <FaEye />
                </ActionButton>
              </div>
            </TableRow>
          ))
        )}
      </DonationsTable>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton
              key={page}
              $active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          
          <PageButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
} 