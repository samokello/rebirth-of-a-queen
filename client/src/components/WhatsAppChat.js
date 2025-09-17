import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBook, FaHandsHelping, FaDonate, FaGraduationCap, FaChevronDown } from 'react-icons/fa';

// WhatsApp Chat Container
const WhatsAppContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
`;

// WhatsApp Button
const WhatsAppButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: #128C7E;
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 1.3rem;
  }
`;

// WhatsApp Chat Window
const WhatsAppWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 550px;
  background: #f0f0f0;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 500px;
    bottom: 70px;
  }
`;

// WhatsApp Header
const WhatsAppHeader = styled.div`
  background: #075E54;
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
`;

const WhatsAppHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const WhatsAppAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #128C7E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const WhatsAppHeaderTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const WhatsAppStatus = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
`;

const CloseButton = styled.button`
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

// Chat Messages Area
const MessagesArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #E5DDD5;
  background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="chat-bg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23ffffff" fill-opacity="0.1"/></pattern></defs><rect width="100%25" height="100%25" fill="url(%23chat-bg)"/></svg>');
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

// Message Container
const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.8rem 1rem;
  border-radius: 18px;
  background: ${({ isUser }) => isUser ? '#DCF8C6' : 'white'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    ${({ isUser }) => isUser ? 'right: -8px' : 'left: -8px'};
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${({ isUser }) => isUser ? '#DCF8C6' : 'white'};
    border-bottom: 0;
    ${({ isUser }) => isUser ? 'border-right: 0' : 'border-left: 0'};
  }
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  color: #303030;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #667781;
  margin-top: 0.3rem;
  text-align: ${({ isUser }) => isUser ? 'right' : 'left'};
`;

// Quick Reply Buttons
const QuickRepliesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuickReplyButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f0f0f0;
    border-color: #25D366;
  }
`;

// Input Area
const InputArea = styled.div`
  background: #f0f0f0;
  padding: 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  outline: none;
  background: white;
  
  &:focus {
    box-shadow: 0 0 0 2px #25D366;
  }
`;

const SendButton = styled.button`
  background: #25D366;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #128C7E;
    transform: scale(1.1);
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

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hello! 👋 Welcome to Rebirth of a Queen. How can I help you today?", [
          "Learn about our programs",
          "Make a donation",
          "Volunteer with us",
          "Contact information"
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text, quickReplies = []) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isUser: false,
        quickReplies,
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    }]);
  };

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('program') || lowerInput.includes('education') || lowerInput.includes('fashion') || lowerInput.includes('fitness')) {
      addBotMessage("We offer amazing programs! 🎓\n\n• Education & Scholarships\n• Fashion Design & Entrepreneurship\n• Fitness & Wellness\n• Leather Making\n• Photography\n\nWhich program interests you most?", [
        "Education programs",
        "Fashion design",
        "Fitness & wellness",
        "Leather making"
      ]);
    } else if (lowerInput.includes('donat') || lowerInput.includes('support') || lowerInput.includes('give')) {
      addBotMessage("Thank you for wanting to support us! 💝\n\nYou can donate through:\n• M-Pesa\n• PayPal\n• Bank Transfer\n• Cash\n\nEvery donation helps empower women and girls in Kenya.", [
        "Donate now",
        "Learn about our impact",
        "Other ways to help"
      ]);
    } else if (lowerInput.includes('volunteer') || lowerInput.includes('help') || lowerInput.includes('join')) {
      addBotMessage("We'd love to have you join our team! 🤝\n\nVolunteer opportunities:\n• Teaching & Mentoring\n• Event Organization\n• Administrative Support\n• Community Outreach\n\nWhat skills would you like to share?", [
        "Teaching & mentoring",
        "Event organization",
        "Administrative support",
        "Contact us"
      ]);
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('address')) {
      addBotMessage("Here's how to reach us: 📞\n\n📱 Phone: +254 700 000 000\n📧 Email: info@rebirthofaqueen.org\n📍 Address: Nairobi, Kenya\n\nWe're here to help! What would you like to know?", [
        "Call us now",
        "Send email",
        "Visit our location",
        "Other questions"
      ]);
    } else {
      addBotMessage("Thanks for your message! 😊 I'm here to help you learn more about Rebirth of a Queen and how you can get involved. What would you like to know?", [
        "Our programs",
        "Make a donation",
        "Volunteer",
        "Contact info"
      ]);
    }
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    processUserInput(reply);
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      addUserMessage(inputMessage);
      processUserInput(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <WhatsAppContainer>
      <AnimatePresence>
        {isOpen && (
          <WhatsAppWindow
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <WhatsAppHeader>
              <WhatsAppHeaderInfo>
                <WhatsAppAvatar>
                  <FaUser />
                </WhatsAppAvatar>
                <div>
                  <WhatsAppHeaderTitle>Rebirth of a Queen</WhatsAppHeaderTitle>
                  <WhatsAppStatus>Online</WhatsAppStatus>
                </div>
              </WhatsAppHeaderInfo>
              <CloseButton onClick={() => setIsOpen(false)}>
                <FaTimes />
              </CloseButton>
            </WhatsAppHeader>

            <MessagesArea>
              {messages.map((message) => (
                <MessageContainer key={message.id} isUser={message.isUser}>
                  <div>
                    <MessageBubble isUser={message.isUser}>
                      <MessageText>{message.text}</MessageText>
                    </MessageBubble>
                    <MessageTime isUser={message.isUser}>
                      {formatTime(message.timestamp)}
                    </MessageTime>
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <QuickRepliesContainer>
                        {message.quickReplies.map((reply, index) => (
                          <QuickReplyButton
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                          >
                            {reply}
                          </QuickReplyButton>
                        ))}
                      </QuickRepliesContainer>
                    )}
                  </div>
                </MessageContainer>
              ))}
              
              {isTyping && (
                <MessageContainer isUser={false}>
                  <TypingIndicator>
                    <TypingDot />
                    <TypingDot />
                    <TypingDot />
                  </TypingIndicator>
                </MessageContainer>
              )}
              
              <div ref={messagesEndRef} />
            </MessagesArea>

            <InputArea>
              <MessageInput
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendButton 
                onClick={handleSend}
                disabled={!inputMessage.trim()}
              >
                <FaPaperPlane />
              </SendButton>
            </InputArea>
          </WhatsAppWindow>
        )}
      </AnimatePresence>

      <WhatsAppButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp />
      </WhatsAppButton>
    </WhatsAppContainer>
  );
};

export default WhatsAppChat; 