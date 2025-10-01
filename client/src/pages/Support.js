import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeart, FaShieldAlt, FaUsers, FaGraduationCap, FaHome } from 'react-icons/fa';
import { API_MAIN } from '../api';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #2d1a3a;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 2rem;
`;

const EmergencySection = styled(motion.div)`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  margin: 3rem 0;
`;

const EmergencyTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const EmergencyText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const EmergencyButton = styled.button`
  background: white;
  color: #ff6b6b;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  padding: 2.5rem;
  border-radius: 20px;
  border-left: 5px solid #667eea;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  color: #555;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ContactCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const ContactInfo = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const SupportForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2d1a3a;
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
  background: ${props => props.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};
  color: ${props => props.type === 'success' ? '#10b981' : '#ef4444'};
  border: 1px solid ${props => props.type === 'success' ? '#10b981' : '#ef4444'};
`;

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    supportType: '',
    message: '',
    urgency: 'medium'
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const { data } = await API_MAIN.post('/contact/support', formData);
      if (data?.success) {
        setStatus({ type: 'success', message: 'Your support request has been submitted. We will contact you within 24 hours.' });
        setFormData({ name: '', email: '', phone: '', supportType: '', message: '', urgency: 'medium' });
      } else {
        setStatus({ type: 'error', message: 'Failed to submit support request. Please try again or contact us directly.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again or contact us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Container>
      <Content>
        <Header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Title>Get Support</Title>
          <Subtitle>
            We're here to help. Reach out for support, guidance, and assistance
          </Subtitle>
        </Header>

        <EmergencySection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <EmergencyTitle>
            <FaPhone />
            Emergency Support
          </EmergencyTitle>
          <EmergencyText>
            If you or someone you know is in immediate danger, please call our 
            24/7 emergency hotline. We are here to help.
          </EmergencyText>
          <EmergencyButton>
            Call Emergency Hotline: +254 720 339 204
          </EmergencyButton>
        </EmergencySection>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHandsHelping style={{ color: '#667eea' }} />
            Our Support Services
          </SectionTitle>
          <SectionContent>
            <p>
              We provide comprehensive support services to survivors of sexual violence and 
              modern slavery. Our team of trained professionals is here to help you through 
              every step of your journey to healing and independence.
            </p>
          </SectionContent>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <ServicesGrid>
            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaShieldAlt style={{ color: '#667eea' }} />
                Crisis Support
              </ServiceTitle>
              <ServiceDescription>
                Immediate support for survivors in crisis situations, including emergency shelter, 
                safety planning, and crisis intervention.
              </ServiceDescription>
              <ServiceFeatures>
                <Feature>24/7 emergency hotline</Feature>
                <Feature>Emergency shelter placement</Feature>
                <Feature>Safety planning and assessment</Feature>
                <Feature>Crisis intervention counseling</Feature>
                <Feature>Emergency transportation</Feature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaHeart style={{ color: '#667eea' }} />
                Counseling & Therapy
              </ServiceTitle>
              <ServiceDescription>
                Professional counseling and therapy services to support healing from trauma 
                and building resilience.
              </ServiceDescription>
              <ServiceFeatures>
                <Feature>Individual trauma therapy</Feature>
                <Feature>Group counseling sessions</Feature>
                <Feature>Family therapy and support</Feature>
                <Feature>Art and music therapy</Feature>
                <Feature>Trauma-informed care</Feature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaHome style={{ color: '#667eea' }} />
                Shelter & Housing
              </ServiceTitle>
              <ServiceDescription>
                Safe, secure housing options for survivors and their children, with comprehensive 
                support services.
              </ServiceDescription>
              <ServiceFeatures>
                <Feature>Emergency shelter services</Feature>
                <Feature>Transitional housing programs</Feature>
                <Feature>Housing assistance and support</Feature>
                <Feature>Childcare services</Feature>
                <Feature>Life skills training</Feature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaGraduationCap style={{ color: '#667eea' }} />
                Education & Training
              </ServiceTitle>
              <ServiceDescription>
                Educational support and skills training programs to help survivors build 
                sustainable livelihoods and achieve independence.
              </ServiceDescription>
              <ServiceFeatures>
                <Feature>Educational support and tutoring</Feature>
                <Feature>Vocational skills training</Feature>
                <Feature>Digital literacy programs</Feature>
                <Feature>Entrepreneurship training</Feature>
                <Feature>Job placement assistance</Feature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaUsers style={{ color: '#667eea' }} />
                Legal & Advocacy
              </ServiceTitle>
              <ServiceDescription>
                Legal assistance and advocacy services to help survivors navigate the legal 
                system and access justice.
              </ServiceDescription>
              <ServiceFeatures>
                <Feature>Legal consultation and representation</Feature>
                <Feature>Court accompaniment</Feature>
                <Feature>Documentation assistance</Feature>
                <Feature>Rights education and advocacy</Feature>
                <Feature>Referral to legal services</Feature>
              </ServiceFeatures>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaHandsHelping style={{ color: '#667eea' }} />
                Community Support
              </ServiceTitle>
              <ServiceDescription>
                Community-based support services including peer support groups, mentorship, 
                and community integration programs.
              </ServiceDescription>
              <ServiceFeatures>
                <Feature>Peer support groups</Feature>
                <Feature>Mentorship programs</Feature>
                <Feature>Community integration support</Feature>
                <Feature>Social activities and events</Feature>
                <Feature>Alumni support network</Feature>
              </ServiceFeatures>
            </ServiceCard>
          </ServicesGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaEnvelope style={{ color: '#667eea' }} />
            Request Support
          </SectionTitle>
          <SectionContent>
            <p>
              If you need support or have questions about our services, please fill out the 
              form below and we will contact you within 24 hours. All information is kept 
              confidential and secure.
            </p>
          </SectionContent>

          <SupportForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="supportType">Type of Support Needed</Label>
              <Select
                id="supportType"
                name="supportType"
                value={formData.supportType}
                onChange={handleInputChange}
              >
                <option value="">Select the type of support you need</option>
                <option value="crisis">Crisis Support</option>
                <option value="counseling">Counseling & Therapy</option>
                <option value="shelter">Shelter & Housing</option>
                <option value="education">Education & Training</option>
                <option value="legal">Legal & Advocacy</option>
                <option value="community">Community Support</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
              >
                <option value="low">Low - General inquiry</option>
                <option value="medium">Medium - Need support within a week</option>
                <option value="high">High - Need support within 24 hours</option>
                <option value="emergency">Emergency - Immediate assistance needed</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Please describe your situation and how we can help you..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Support Request'}
            </SubmitButton>

            {status.message && (
              <StatusMessage type={status.type}>
                {status.message}
              </StatusMessage>
            )}
          </SupportForm>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <SectionTitle>
            <FaMapMarkerAlt style={{ color: '#667eea' }} />
            Contact Information
          </SectionTitle>
          <ContactGrid>
            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaPhone />
                Emergency Hotline
              </ContactTitle>
              <ContactInfo>+254 720 339 204<br />24/7 Available</ContactInfo>
            </ContactCard>

            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaEnvelope />
                Email Support
              </ContactTitle>
              <ContactInfo>support@rebirthofaqueen.org<br />Response within 24 hours</ContactInfo>
            </ContactCard>

            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaMapMarkerAlt />
                Office Location
              </ContactTitle>
              <ContactInfo>Nairobi, Kenya<br />(Exact address provided upon contact)</ContactInfo>
            </ContactCard>

            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaClock />
                Office Hours
              </ContactTitle>
              <ContactInfo>Monday - Friday<br />8:00 AM - 6:00 PM</ContactInfo>
            </ContactCard>
          </ContactGrid>
        </Section>
      </Content>
    </Container>
  );
};

export default Support;
