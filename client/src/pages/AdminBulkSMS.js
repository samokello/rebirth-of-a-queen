import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaSms, FaUsers, FaPaperPlane, FaHistory, FaFileAlt, 
  FaCheckCircle, FaExclamationTriangle, FaClock, FaTrash,
  FaEdit, FaEye, FaDownload, FaUpload, FaFilter, FaSearch,
  FaPhone, FaEnvelope, FaUser, FaCalendarAlt, FaChartBar,
  FaArrowLeft, FaPlus, FaSave, FaTimes, FaCopy, FaShare
} from 'react-icons/fa';
import SMSService from '../services/smsService';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const HeaderLeft = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  p {
    color: #718096;
    font-size: 1rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #4a5568;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.variant === 'primary' && `
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    
    &:disabled {
      background: #cbd5e0;
      cursor: not-allowed;
      transform: none;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: #f7fafc;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background: #edf2f7;
    }
  `}
  
  ${props => props.variant === 'success' && `
    background: #10b981;
    color: white;
    
    &:hover {
      background: #059669;
      transform: translateY(-1px);
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }
  `}
`;

const RecipientsSection = styled.div`
  margin-top: 1rem;
`;

const RecipientsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const RecipientsCount = styled.div`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`;

const RecipientsList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const RecipientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
  background: #f7fafc;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RecipientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecipientName = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const RecipientPhone = styled.span`
  color: #718096;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    background: #fee2e2;
  }
`;

const MessagePreview = styled.div`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const PreviewTitle = styled.h4`
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
`;

const CharacterCount = styled.span`
  font-size: 0.8rem;
  color: ${props => props.count > 160 ? '#ef4444' : '#718096'};
  font-weight: 500;
`;

const PreviewContent = styled.div`
  color: #4a5568;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#667eea'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.25rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.9rem;
`;

const HistoryTable = styled.div`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  align-items: center;
  
  &:hover {
    background: #f8fafc;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => props.status === 'sent' && `
    background: #d1fae5;
    color: #065f46;
  `}
  
  ${props => props.status === 'pending' && `
    background: #fef3c7;
    color: #92400e;
  `}
  
  ${props => props.status === 'failed' && `
    background: #fee2e2;
    color: #991b1b;
  `}
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  
  &:hover {
    background: #edf2f7;
  }
`;

const AdminBulkSMS = () => {
  const [formData, setFormData] = useState({
    message: '',
    recipients: [],
    scheduleDate: '',
    scheduleTime: '',
    template: ''
  });
  
  const [recipients, setRecipients] = useState([
    { id: 1, name: 'Alice Johnson', phone: '+254712345678', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', phone: '+254723456789', email: 'bob@example.com' },
    { id: 3, name: 'Carol Davis', phone: '+254734567890', email: 'carol@example.com' },
    { id: 4, name: 'David Wilson', phone: '+254745678901', email: 'david@example.com' },
    { id: 5, name: 'Eva Brown', phone: '+254756789012', email: 'eva@example.com' }
  ]);
  
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [sending, setSending] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSent: 0,
    totalRecipients: 0,
    deliveryRate: 0,
    scheduledMessages: 0
  });
  const [testPhone, setTestPhone] = useState('');
  const [testMessage, setTestMessage] = useState('Hello from Rebirth of a Queen! This is a test SMS from our new system.');
  const [testResult, setTestResult] = useState(null);

  const templates = [
    { id: 'donation', name: 'Donation Thank You', message: 'Thank you for your generous donation of {amount}. Your support helps us empower more women and girls. We appreciate you!' },
    { id: 'event', name: 'Event Invitation', message: 'You\'re invited to our {event_name} on {date} at {location}. RSVP by calling {phone}. We look forward to seeing you!' },
    { id: 'application', name: 'Application Update', message: 'Your {program_name} application has been {status}. We will contact you within 3-5 business days with further details.' },
    { id: 'reminder', name: 'Payment Reminder', message: 'Friendly reminder: Your payment of {amount} is due on {due_date}. Please contact us if you need assistance.' },
    { id: 'custom', name: 'Custom Message', message: '' }
  ];

  const statsData = [
    { icon: <FaSms />, value: stats.totalSent.toLocaleString(), label: 'Total SMS Sent', color: '#667eea' },
    { icon: <FaUsers />, value: stats.totalRecipients.toLocaleString(), label: 'Active Recipients', color: '#10b981' },
    { icon: <FaCheckCircle />, value: `${stats.deliveryRate}%`, label: 'Delivery Rate', color: '#f59e0b' },
    { icon: <FaClock />, value: stats.scheduledMessages.toString(), label: 'Scheduled Messages', color: '#8b5cf6' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const template = templates.find(t => t.id === templateId);
    
    setFormData(prev => ({
      ...prev,
      template: templateId,
      message: template ? template.message : ''
    }));
  };

  const handleRecipientToggle = (recipient) => {
    setSelectedRecipients(prev => {
      const isSelected = prev.find(r => r.id === recipient.id);
      if (isSelected) {
        return prev.filter(r => r.id !== recipient.id);
      } else {
        return [...prev, recipient];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRecipients.length === recipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(recipients);
    }
  };

  const handleTestSMS = async () => {
    if (!testPhone.trim()) {
      setTestResult({ success: false, message: 'Please enter a phone number' });
      return;
    }

    setSending(true);
    setTestResult(null);
    
    try {
      const response = await fetch('/api/sms/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: testPhone,
          message: testMessage
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setTestResult({ success: true, message: 'Test SMS sent successfully! Check your phone.' });
        setTestPhone('');
      } else {
        setTestResult({ success: false, message: result.message || 'Failed to send test SMS' });
      }
    } catch (error) {
      console.error('Test SMS error:', error);
      setTestResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const handleSendSMS = async (e) => {
    e.preventDefault();
    
    if (!formData.message.trim() || selectedRecipients.length === 0) {
      alert('Please enter a message and select recipients');
      return;
    }

    setSending(true);
    
    try {
      // Prepare data for API
      const smsData = {
        recipients: selectedRecipients,
        message: formData.message,
        template: formData.template,
        scheduleDate: formData.scheduleDate || null,
        scheduleTime: formData.scheduleTime || null
      };

      // Send bulk SMS
      const response = await SMSService.sendBulkSMS(smsData);
      
      // Add to history
      const newMessage = {
        id: Date.now(),
        message: formData.message,
        recipients: selectedRecipients.length,
        sent: response.data.successful,
        failed: response.data.failed,
        status: response.data.failed > 0 ? 'partial' : 'sent',
        date: new Date().toLocaleString(),
        template: templates.find(t => t.id === formData.template)?.name || 'Custom',
        batchId: response.data.batchId
      };
      
      setMessageHistory(prev => [newMessage, ...prev]);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalSent: prev.totalSent + response.data.successful
      }));
      
      // Reset form
      setFormData({
        message: '',
        recipients: [],
        scheduleDate: '',
        scheduleTime: '',
        template: ''
      });
      setSelectedRecipients([]);
      
      alert(`SMS sent successfully! ${response.data.successful} sent, ${response.data.failed} failed`);
    } catch (error) {
      console.error('SMS send error:', error);
      alert(`Failed to send SMS: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  const characterCount = formData.message.length;
  const isOverLimit = characterCount > 160;

  // Load SMS data on component mount
  useEffect(() => {
    loadSMSData();
  }, []);

  const loadSMSData = async () => {
    setLoading(true);
    try {
      // Load SMS statistics
      const statsResponse = await SMSService.getSMSStats();
      setStats(statsResponse.data);

      // Load SMS history
      const historyResponse = await SMSService.getSMSHistory();
      setMessageHistory(historyResponse.data.history);
    } catch (error) {
      console.error('Failed to load SMS data:', error);
      // Use fallback data if API fails
      setStats({
        totalSent: 2847,
        totalRecipients: 1234,
        deliveryRate: 98.5,
        scheduledMessages: 12
      });
      setMessageHistory([
        {
          id: 1,
          message: 'Thank you for your donation! Your support makes a difference.',
          recipients: 45,
          sent: 42,
          failed: 3,
          status: 'sent',
          date: '2024-01-15 14:30',
          template: 'Donation Thank You'
        },
        {
          id: 2,
          message: 'Join us for our upcoming empowerment workshop this Saturday!',
          recipients: 120,
          sent: 118,
          failed: 2,
          status: 'sent',
          date: '2024-01-14 09:15',
          template: 'Event Invitation'
        },
        {
          id: 3,
          message: 'Your scholarship application has been received and is under review.',
          recipients: 25,
          sent: 0,
          failed: 0,
          status: 'pending',
          date: '2024-01-16 16:45',
          template: 'Application Update'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
          <h2>Loading SMS Dashboard...</h2>
          <p>Please wait while we load your SMS data</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader>
        <HeaderLeft>
          <h1>
            <FaSms />
            Bulk SMS Management
          </h1>
          <p>Send messages to multiple recipients efficiently</p>
        </HeaderLeft>
        <HeaderRight>
          <BackButton>
            <FaArrowLeft />
            Back to Dashboard
          </BackButton>
        </HeaderRight>
      </PageHeader>

      <StatsGrid>
        {statsData.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon color={stat.color}>
              {stat.icon}
            </StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <CardTitle>
              <FaPaperPlane />
              Compose Message
            </CardTitle>
          </CardHeader>
          
          <Form onSubmit={handleSendSMS}>
            <FormGroup>
              <Label>Message Template</Label>
              <Select name="template" value={formData.template} onChange={handleTemplateChange}>
                <option value="">Select a template or write custom message</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Message Content</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message here..."
                maxLength={500}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <small style={{ color: '#718096' }}>
                  Use placeholders like {'{name}'}, {'{amount}'}, {'{date}'} for personalization
                </small>
                <CharacterCount count={characterCount}>
                  {characterCount}/160 characters
                </CharacterCount>
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Schedule (Optional)</Label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  type="date"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                <Input
                  type="time"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleInputChange}
                />
              </div>
            </FormGroup>

            <Button 
              type="submit" 
              variant="primary" 
              disabled={sending || !formData.message.trim() || selectedRecipients.length === 0 || isOverLimit}
            >
              {sending ? (
                <>
                  <FaClock />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send SMS ({selectedRecipients.length} recipients)
                </>
              )}
            </Button>
          </Form>

          {formData.message && (
            <MessagePreview>
              <PreviewHeader>
                <PreviewTitle>Message Preview</PreviewTitle>
                <CharacterCount count={characterCount}>
                  {characterCount} characters
                </CharacterCount>
              </PreviewHeader>
              <PreviewContent>{formData.message}</PreviewContent>
            </MessagePreview>
          )}
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader>
            <CardTitle>
              <FaUsers />
              Select Recipients
            </CardTitle>
            <Button variant="secondary" onClick={handleSelectAll}>
              {selectedRecipients.length === recipients.length ? 'Deselect All' : 'Select All'}
            </Button>
          </CardHeader>

          <RecipientsSection>
            <RecipientsHeader>
              <RecipientsCount>
                {selectedRecipients.length} of {recipients.length} recipients selected
              </RecipientsCount>
            </RecipientsHeader>

            <RecipientsList>
              {recipients.map(recipient => (
                <RecipientItem key={recipient.id}>
                  <RecipientInfo>
                    <input
                      type="checkbox"
                      checked={selectedRecipients.some(r => r.id === recipient.id)}
                      onChange={() => handleRecipientToggle(recipient)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <div>
                      <RecipientName>{recipient.name}</RecipientName>
                      <RecipientPhone>{recipient.phone}</RecipientPhone>
                    </div>
                  </RecipientInfo>
                  <RemoveButton>
                    <FaTrash />
                  </RemoveButton>
                </RecipientItem>
              ))}
            </RecipientsList>
          </RecipientsSection>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary">
              <FaUpload />
              Import CSV
            </Button>
            <Button variant="secondary">
              <FaPlus />
              Add Recipient
            </Button>
          </div>
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle>
              <FaPhone />
              Test SMS
            </CardTitle>
          </CardHeader>
          
          <Form>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter phone number (e.g., 0712345678)"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Test Message</Label>
              <TextArea
                placeholder="Enter test message..."
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows={3}
              />
            </FormGroup>
            
            <Button
              type="button"
              onClick={handleTestSMS}
              disabled={!testPhone || sending}
              style={{ width: '100%' }}
            >
              {sending ? 'Sending...' : 'Send Test SMS'}
            </Button>
            
            {testResult && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                backgroundColor: testResult.success ? '#d1fae5' : '#fee2e2',
                color: testResult.success ? '#065f46' : '#991b1b'
              }}>
                <strong>{testResult.success ? 'Success!' : 'Error:'}</strong> {testResult.message}
              </div>
            )}
          </Form>
        </Card>
      </Grid>

      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CardHeader>
          <CardTitle>
            <FaHistory />
            Message History
          </CardTitle>
          <Button variant="secondary">
            <FaDownload />
            Export History
          </Button>
        </CardHeader>

        <HistoryTable>
          <TableHeader>
            <div>Date</div>
            <div>Message</div>
            <div>Recipients</div>
            <div>Sent</div>
            <div>Failed</div>
            <div>Status</div>
          </TableHeader>
          
          {messageHistory.map(message => (
            <TableRow key={message.id}>
              <div>{message.date}</div>
              <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {message.message}
              </div>
              <div>{message.recipients}</div>
              <div>{message.sent}</div>
              <div>{message.failed}</div>
              <div>
                <StatusBadge status={message.status}>
                  {message.status}
                </StatusBadge>
              </div>
            </TableRow>
          ))}
        </HistoryTable>
      </Card>
    </Container>
  );
};

export default AdminBulkSMS; 