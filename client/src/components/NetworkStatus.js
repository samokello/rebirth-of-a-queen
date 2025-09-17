import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StatusContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.online {
    background-color: #4CAF50;
    color: white;
  }
  
  &.offline {
    background-color: #f44336;
    color: white;
  }
  
  &.checking {
    background-color: #ff9800;
    color: white;
  }
`;

const NetworkStatus = () => {
  const [status, setStatus] = useState('checking');
  const [lastCheck, setLastCheck] = useState(null);

  const checkServerHealth = async () => {
    try {
      setStatus('checking');
      const response = await axios.get('http://localhost:5000/health', {
        timeout: 5000
      });
      
      if (response.status === 200) {
        setStatus('online');
        setLastCheck(new Date());
      } else {
        setStatus('offline');
      }
    } catch (error) {
      console.error('Server health check failed:', error);
      setStatus('offline');
    }
  };

  useEffect(() => {
    checkServerHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkServerHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return '🟢 Server Online';
      case 'offline':
        return '🔴 Server Offline';
      case 'checking':
        return '🟡 Checking...';
      default:
        return '❓ Unknown';
    }
  };

  return (
    <StatusContainer className={status}>
      {getStatusText()}
      {lastCheck && (
        <div style={{ fontSize: '10px', marginTop: '2px' }}>
          Last: {lastCheck.toLocaleTimeString()}
        </div>
      )}
    </StatusContainer>
  );
};

export default NetworkStatus; 