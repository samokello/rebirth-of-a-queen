import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaRobot, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaBook, FaHandsHelping, FaDonate, FaGraduationCap } from 'react-icons/fa';

// Main Container
const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
`;

// Chat Button
const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ variant }) => variant === 'whatsapp' ? '#25D366' : '#8B5CF6'};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px ${({ variant }) => variant === 'whatsapp' ? 'rgba(37, 211, 102, 0.3)' : 'rgba(139, 92, 246, 0.3)'};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${({ variant }) => variant === 'whatsapp' ? '#128C7E' : '#6D28D9'};
    transform: scale(1.1);
    box-shadow: 0 6px 25px ${({ variant }) => variant === 'whatsapp' ? 'rgba(37, 211, 102, 0.4)' : 'rgba(139, 92, 246, 0.4)'};
  }
  
  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 1.3rem;
  }
`;

// Floating Close Button
const FloatingCloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ff4757;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
  transition: all 0.2s;
  
  &:hover {
    background: #ff3742;
    transform: scale(1.1);
  }
`;

// Chat Window
const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 2rem;
  width: 350px;
  height: 350px;
  background: ${({ variant }) => variant === 'whatsapp' ? '#f0f0f0' : 'white'};
  border-radius: ${({ variant }) => variant === 'whatsapp' ? '12px' : '20px'};
  box-shadow: ${({ variant }) => variant === 'whatsapp' ? 
    '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' : 
    '0 10px 40px rgba(0, 0, 0, 0.15)'
  };
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;
  border: ${({ variant }) => variant === 'whatsapp' ? '1px solid #e0e0e0' : 'none'};
  
  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    height: 300px;
    bottom: 70px;
    right: 1rem;
    left: 1rem;
  }
`;

// Chat Header
const ChatHeader = styled.div`
  background: ${({ variant }) => variant === 'whatsapp' ? '#075E54' : '#8B5CF6'};
  color: white;
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.75rem 1rem' : '1rem 1.5rem'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ variant }) => variant === 'whatsapp' ? '12px 12px 0 0' : '20px 20px 0 0'};
  border-bottom: ${({ variant }) => variant === 'whatsapp' ? '1px solid #128C7E' : 'none'};
`;

const ChatHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ChatAvatar = styled.div`
  width: ${({ variant }) => variant === 'whatsapp' ? '35px' : '40px'};
  height: ${({ variant }) => variant === 'whatsapp' ? '35px' : '40px'};
  border-radius: 50%;
  background: ${({ variant }) => variant === 'whatsapp' ? '#128C7E' : '#6D28D9'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ variant }) => variant === 'whatsapp' ? '1rem' : '1.2rem'};
  border: ${({ variant }) => variant === 'whatsapp' ? '2px solid rgba(255, 255, 255, 0.3)' : 'none'};
`;

const ChatHeaderTitle = styled.h3`
  margin: 0;
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.95rem' : '1.1rem'};
  font-weight: ${({ variant }) => variant === 'whatsapp' ? '500' : '600'};
  letter-spacing: ${({ variant }) => variant === 'whatsapp' ? '0.2px' : 'normal'};
`;

const ChatStatus = styled.div`
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.75rem' : '0.8rem'};
  opacity: ${({ variant }) => variant === 'whatsapp' ? '0.8' : '0.9'};
  font-weight: ${({ variant }) => variant === 'whatsapp' ? '400' : 'normal'};
`;

const HeaderCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

// Messages Area
const MessagesArea = styled.div`
  flex: 1;
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.5rem 0.75rem' : '1rem'};
  overflow-y: auto;
  background: ${({ variant }) => variant === 'whatsapp' ? '#E5DDD5' : '#f8f9fa'};
  background-image: ${({ variant }) => variant === 'whatsapp' ? 
    'url("data:image/svg+xml;utf8,<svg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="chat-bg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23ffffff" fill-opacity="0.1"/></pattern></defs><rect width="100%25" height="100%25" fill="url(%23chat-bg)"/></svg>")' : 'none'};
  
  &::-webkit-scrollbar {
    width: ${({ variant }) => variant === 'whatsapp' ? '4px' : '6px'};
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ variant }) => variant === 'whatsapp' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.2)'};
    border-radius: ${({ variant }) => variant === 'whatsapp' ? '2px' : '3px'};
  }
`;

// Message Container
const MessageContainer = styled.div`
  display: flex;
  margin-bottom: ${({ variant }) => variant === 'whatsapp' ? '0.5rem' : '1rem'};
  justify-content: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.25rem 0' : '0'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.6rem 0.8rem' : '0.8rem 1rem'};
  border-radius: ${({ variant, isUser }) => variant === 'whatsapp' ? 
    (isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px') : '18px'
  };
  background: ${({ isUser, variant }) => {
    if (variant === 'whatsapp') {
      return isUser ? '#DCF8C6' : 'white';
    } else {
      return isUser ? '#8B5CF6' : 'white';
    }
  }};
  color: ${({ isUser, variant }) => {
    if (variant === 'whatsapp') {
      return '#303030';
    } else {
      return isUser ? 'white' : '#333';
    }
  }};
  box-shadow: ${({ variant }) => variant === 'whatsapp' ? 
    '0 1px 0.5px rgba(0, 0, 0, 0.13)' : '0 1px 2px rgba(0, 0, 0, 0.1)'
  };
  position: relative;
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.9rem' : '0.95rem'};
  line-height: ${({ variant }) => variant === 'whatsapp' ? '1.3' : '1.4'};
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    ${({ isUser }) => isUser ? 'right: -8px' : 'left: -8px'};
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${({ isUser, variant }) => {
      if (variant === 'whatsapp') {
        return isUser ? '#DCF8C6' : 'white';
      } else {
        return isUser ? '#8B5CF6' : 'white';
      }
    }};
    border-bottom: 0;
    ${({ isUser }) => isUser ? 'border-right: 0' : 'border-left: 0'};
  }
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const MessageTime = styled.div`
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.65rem' : '0.7rem'};
  color: ${({ variant }) => variant === 'whatsapp' ? '#667781' : '#667781'};
  margin-top: ${({ variant }) => variant === 'whatsapp' ? '0.2rem' : '0.3rem'};
  text-align: ${({ isUser }) => isUser ? 'right' : 'left'};
  opacity: ${({ variant }) => variant === 'whatsapp' ? '0.7' : '1'};
`;

// Quick Reply Buttons
const QuickRepliesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ variant }) => variant === 'whatsapp' ? '0.4rem' : '0.5rem'};
  margin-top: ${({ variant }) => variant === 'whatsapp' ? '0.4rem' : '0.5rem'};
`;

const QuickReplyButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: ${({ variant }) => variant === 'whatsapp' ? '16px' : '20px'};
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.4rem 0.8rem' : '0.5rem 1rem'};
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.8rem' : '0.85rem'};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ variant }) => variant === 'whatsapp' ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    background: #f0f0f0;
    border-color: ${({ variant }) => variant === 'whatsapp' ? '#25D366' : '#8B5CF6'};
    transform: ${({ variant }) => variant === 'whatsapp' ? 'translateY(-1px)' : 'none'};
  }
`;

// Input Area
const InputArea = styled.div`
  background: ${({ variant }) => variant === 'whatsapp' ? '#f0f0f0' : '#f0f0f0'};
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.75rem' : '1rem'};
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: ${({ variant }) => variant === 'whatsapp' ? '0.6rem' : '0.8rem'};
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  border-radius: ${({ variant }) => variant === 'whatsapp' ? '20px' : '20px'};
  padding: ${({ variant }) => variant === 'whatsapp' ? '0.6rem 1rem' : '0.8rem 1rem'};
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.9rem' : '0.95rem'};
  outline: none;
  background: white;
  box-shadow: ${({ variant }) => variant === 'whatsapp' ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:focus {
    box-shadow: 0 0 0 2px ${({ variant }) => variant === 'whatsapp' ? '#25D366' : '#8B5CF6'};
  }
`;

const SendButton = styled.button`
  background: ${({ variant }) => variant === 'whatsapp' ? '#25D366' : '#8B5CF6'};
  color: white;
  border: none;
  border-radius: 50%;
  width: ${({ variant }) => variant === 'whatsapp' ? '36px' : '40px'};
  height: ${({ variant }) => variant === 'whatsapp' ? '36px' : '40px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: ${({ variant }) => variant === 'whatsapp' ? '0.9rem' : '1rem'};
  
  &:hover {
    background: ${({ variant }) => variant === 'whatsapp' ? '#128C7E' : '#6D28D9'};
    transform: ${({ variant }) => variant === 'whatsapp' ? 'scale(1.05)' : 'scale(1.1)'};
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

// Typing Indicator
const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem 1rem;
  background: white;
  border-radius: 18px;
  max-width: 70%;
  margin-bottom: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-left: 0;
  }
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: typing 1.4s infinite ease-in-out;
  
  &:nth-child(1) { animation-delay: -0.32s; }
  &:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes typing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Chatbot = () => {
  const [openChats, setOpenChats] = useState({ sms: false, whatsapp: false });
  const [messages, setMessages] = useState({ sms: [], whatsapp: [] });
  const [inputMessages, setInputMessages] = useState({ sms: '', whatsapp: '' });
  const [isTyping, setIsTyping] = useState({ sms: false, whatsapp: false });
  const messagesEndRefs = { sms: useRef(null), whatsapp: useRef(null) };
  const inputRefs = { sms: useRef(null), whatsapp: useRef(null) };

  // Initial welcome messages
  useEffect(() => {
    if (openChats.sms && messages.sms.length === 0) {
      setTimeout(() => {
        addBotMessage('sms', "Hello! 👋 Welcome to Rebirth of a Queen. How can I help you today?", [
          "Learn about our programs",
          "Make a donation",
          "Volunteer with us",
          "Contact information"
        ]);
      }, 500);
    }
  }, [openChats.sms, messages.sms.length]);

  useEffect(() => {
    if (openChats.whatsapp && messages.whatsapp.length === 0) {
      setTimeout(() => {
        addBotMessage('whatsapp', "Hello! 👋 Welcome to Rebirth of a Queen. How can I help you today?", [
          "Learn about our programs",
          "Make a donation",
          "Volunteer with us",
          "Contact information"
        ]);
      }, 500);
    }
  }, [openChats.whatsapp, messages.whatsapp.length]);

  const scrollToBottom = (type) => {
    messagesEndRefs[type].current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (openChats.sms) scrollToBottom('sms');
  }, [messages.sms]);

  useEffect(() => {
    if (openChats.whatsapp) scrollToBottom('whatsapp');
  }, [messages.whatsapp]);

  const addBotMessage = (type, text, quickReplies = []) => {
    setIsTyping(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [type]: false }));
      setMessages(prev => ({
        ...prev,
        [type]: [...prev[type], {
          id: Date.now(),
          text,
          isUser: false,
          quickReplies,
          timestamp: new Date()
        }]
      }));
    }, 1000);
  };

  const addUserMessage = (type, text) => {
    setMessages(prev => ({
      ...prev,
      [type]: [...prev[type], {
        id: Date.now(),
        text,
        isUser: true,
        timestamp: new Date()
      }]
    }));
  };

  const processUserInput = (type, input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('program') || lowerInput.includes('education') || lowerInput.includes('fashion') || lowerInput.includes('fitness')) {
      addBotMessage(type, "We offer amazing programs! 🎓\n\n• Education & Scholarships\n• Fashion Design & Entrepreneurship\n• Fitness & Wellness\n• Leather Making\n• Photography\n\nWhich program interests you most?", [
        "Education programs",
        "Fashion design",
        "Fitness & wellness",
        "Leather making"
      ]);
    } else if (lowerInput.includes('donat') || lowerInput.includes('support') || lowerInput.includes('give')) {
      addBotMessage(type, "Thank you for wanting to support us! 💝\n\nYou can donate through:\n• M-Pesa\n• PayPal\n• Bank Transfer\n• Cash\n\nEvery donation helps empower women and girls in Kenya.", [
        "Donate now",
        "Learn about our impact",
        "Other ways to help"
      ]);
    } else if (lowerInput.includes('volunteer') || lowerInput.includes('help') || lowerInput.includes('join')) {
      addBotMessage(type, "We'd love to have you join our team! 🤝\n\nVolunteer opportunities:\n• Teaching & Mentoring\n• Event Organization\n• Administrative Support\n• Community Outreach\n\nWhat skills would you like to share?", [
        "Teaching & mentoring",
        "Event organization",
        "Administrative support",
        "Contact us"
      ]);
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('address')) {
      addBotMessage(type, "Here's how to reach us: 📞\n\n📱 Phone: +254 700 000 000\n📧 Email: info@rebirthofaqueen.org\n📍 Address: Nairobi, Kenya\n\nWe're here to help! What would you like to know?", [
        "Call us now",
        "Send email",
        "Visit our location",
        "Other questions"
      ]);
    } else {
      addBotMessage(type, "Thanks for your message! 😊 I'm here to help you learn more about Rebirth of a Queen and how you can get involved. What would you like to know?", [
        "Our programs",
        "Make a donation",
        "Volunteer",
        "Contact info"
      ]);
    }
  };

  const handleQuickReply = (type, reply) => {
    addUserMessage(type, reply);
    processUserInput(type, reply);
  };

  const handleSend = (type) => {
    const message = inputMessages[type].trim();
    if (message) {
      addUserMessage(type, message);
      processUserInput(type, message);
      setInputMessages(prev => ({ ...prev, [type]: '' }));
    }
  };

  const handleKeyPress = (type, e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(type);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const toggleChat = (type) => {
    setOpenChats(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const closeChat = (type) => {
    setOpenChats(prev => ({ ...prev, [type]: false }));
  };

  return (
    <ChatbotContainer>
      {/* SMS Chat */}
      <div style={{ position: 'relative', pointerEvents: 'auto' }}>
        <AnimatePresence>
          {openChats.sms && (
            <ChatWindow
              variant="sms"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatHeader variant="sms">
                <ChatHeaderInfo>
                  <ChatAvatar variant="sms">
                    <FaComments />
                  </ChatAvatar>
                  <div>
                    <ChatHeaderTitle>SMS Support</ChatHeaderTitle>
                    <ChatStatus>Online</ChatStatus>
                  </div>
                </ChatHeaderInfo>
                <HeaderCloseButton onClick={() => closeChat('sms')}>
                  <FaTimes />
                </HeaderCloseButton>
              </ChatHeader>

              <MessagesArea variant="sms">
                {messages.sms.map((message) => (
                  <MessageContainer key={message.id} isUser={message.isUser} variant="sms">
                    <div>
                      <MessageBubble isUser={message.isUser} variant="sms">
                        <MessageText>{message.text}</MessageText>
                      </MessageBubble>
                      <MessageTime isUser={message.isUser}>
                        {formatTime(message.timestamp)}
                      </MessageTime>
                                             {message.quickReplies && message.quickReplies.length > 0 && (
                         <QuickRepliesContainer variant="sms">
                           {message.quickReplies.map((reply, index) => (
                             <QuickReplyButton
                               key={index}
                               variant="sms"
                               onClick={() => handleQuickReply('sms', reply)}
                             >
                               {reply}
                             </QuickReplyButton>
                           ))}
                         </QuickRepliesContainer>
                       )}
                    </div>
                  </MessageContainer>
                ))}
                
                                 {isTyping.sms && (
                   <MessageContainer isUser={false} variant="sms">
                    <TypingIndicator>
                      <TypingDot />
                      <TypingDot />
                      <TypingDot />
                    </TypingIndicator>
                  </MessageContainer>
                )}
                
                <div ref={messagesEndRefs.sms} />
              </MessagesArea>

                             <InputArea variant="sms">
                 <MessageInput
                   ref={inputRefs.sms}
                   type="text"
                   placeholder="Type a message..."
                   value={inputMessages.sms}
                   onChange={(e) => setInputMessages(prev => ({ ...prev, sms: e.target.value }))}
                   onKeyPress={(e) => handleKeyPress('sms', e)}
                   variant="sms"
                 />
                 <SendButton 
                   variant="sms"
                   onClick={() => handleSend('sms')}
                   disabled={!inputMessages.sms.trim()}
                 >
                   <FaPaperPlane />
                 </SendButton>
               </InputArea>
            </ChatWindow>
          )}
        </AnimatePresence>

        <ChatButton
          variant="sms"
          onClick={() => toggleChat('sms')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaComments />
          {openChats.sms && (
            <FloatingCloseButton onClick={(e) => {
              e.stopPropagation();
              closeChat('sms');
            }}>
              <FaTimes />
            </FloatingCloseButton>
          )}
        </ChatButton>
      </div>

      {/* WhatsApp Chat */}
      <div style={{ position: 'relative', pointerEvents: 'auto' }}>
        <AnimatePresence>
          {openChats.whatsapp && (
            <ChatWindow
              variant="whatsapp"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatHeader variant="whatsapp">
                <ChatHeaderInfo>
                  <ChatAvatar variant="whatsapp">
                    <FaWhatsapp />
                  </ChatAvatar>
                  <div>
                    <ChatHeaderTitle>WhatsApp Support</ChatHeaderTitle>
                    <ChatStatus>Online</ChatStatus>
                  </div>
                </ChatHeaderInfo>
                <HeaderCloseButton onClick={() => closeChat('whatsapp')}>
                  <FaTimes />
                </HeaderCloseButton>
              </ChatHeader>

                             <MessagesArea variant="whatsapp">
                 {messages.whatsapp.map((message) => (
                   <MessageContainer key={message.id} isUser={message.isUser} variant="whatsapp">
                    <div>
                      <MessageBubble isUser={message.isUser} variant="whatsapp">
                        <MessageText>{message.text}</MessageText>
                      </MessageBubble>
                      <MessageTime isUser={message.isUser}>
                        {formatTime(message.timestamp)}
                      </MessageTime>
                                             {message.quickReplies && message.quickReplies.length > 0 && (
                         <QuickRepliesContainer variant="whatsapp">
                           {message.quickReplies.map((reply, index) => (
                             <QuickReplyButton
                               key={index}
                               variant="whatsapp"
                               onClick={() => handleQuickReply('whatsapp', reply)}
                             >
                               {reply}
                             </QuickReplyButton>
                           ))}
                         </QuickRepliesContainer>
                       )}
                    </div>
                  </MessageContainer>
                ))}
                
                                 {isTyping.whatsapp && (
                   <MessageContainer isUser={false} variant="whatsapp">
                    <TypingIndicator>
                      <TypingDot />
                      <TypingDot />
                      <TypingDot />
                    </TypingIndicator>
                  </MessageContainer>
                )}
                
                <div ref={messagesEndRefs.whatsapp} />
              </MessagesArea>

                             <InputArea variant="whatsapp">
                 <MessageInput
                   ref={inputRefs.whatsapp}
                   type="text"
                   placeholder="Type a message..."
                   value={inputMessages.whatsapp}
                   onChange={(e) => setInputMessages(prev => ({ ...prev, whatsapp: e.target.value }))}
                   onKeyPress={(e) => handleKeyPress('whatsapp', e)}
                   variant="whatsapp"
                 />
                 <SendButton 
                   variant="whatsapp"
                   onClick={() => handleSend('whatsapp')}
                   disabled={!inputMessages.whatsapp.trim()}
                 >
                   <FaPaperPlane />
                 </SendButton>
               </InputArea>
            </ChatWindow>
          )}
        </AnimatePresence>

        <ChatButton
          variant="whatsapp"
          onClick={() => toggleChat('whatsapp')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWhatsapp />
          {openChats.whatsapp && (
            <FloatingCloseButton onClick={(e) => {
              e.stopPropagation();
              closeChat('whatsapp');
            }}>
              <FaTimes />
            </FloatingCloseButton>
          )}
        </ChatButton>
      </div>
    </ChatbotContainer>
  );
};

export default Chatbot; 