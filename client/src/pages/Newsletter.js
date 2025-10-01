import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaNewspaper, FaHeart, FaUsers, FaHandsHelping, FaCheckCircle } from 'react-icons/fa';
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

const NewsletterForm = styled.form`
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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BenefitCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border-left: 5px solid #667eea;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  color: #666;
  line-height: 1.6;
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

const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    interests: '',
    message: ''
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
      const { data } = await API_MAIN.post('/newsletter/subscribe', formData);
      if (data?.success) {
        setStatus({ type: 'success', message: data?.message || 'Successfully subscribed to our newsletter!' });
        setFormData({ email: '', name: '', interests: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data?.message || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
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
          <Title>Newsletter</Title>
          <Subtitle>
            Stay connected with our latest news, stories, and opportunities
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaEnvelope style={{ color: '#667eea' }} />
            Subscribe to Our Newsletter
          </SectionTitle>
          <SectionContent>
            <p>
              Join our community of supporters and stay updated on our latest programs, 
              success stories, events, and opportunities to make a difference. Our 
              newsletter is published monthly and includes inspiring stories from 
              survivors, program updates, and ways you can get involved.
            </p>
          </SectionContent>

          <NewsletterForm onSubmit={handleSubmit}>
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="interests">Areas of Interest</Label>
              <Select
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
              >
                <option value="">Select your interests</option>
                <option value="programs">Program Updates</option>
                <option value="stories">Success Stories</option>
                <option value="events">Events & Activities</option>
                <option value="volunteer">Volunteer Opportunities</option>
                <option value="fundraising">Fundraising</option>
                <option value="advocacy">Advocacy & Policy</option>
                <option value="all">All Updates</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how you'd like to get involved or any questions you have..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
            </SubmitButton>

            {status.message && (
              <StatusMessage type={status.type}>
                {status.message}
              </StatusMessage>
            )}
          </NewsletterForm>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <SectionTitle>
            <FaNewspaper style={{ color: '#667eea' }} />
            What You'll Receive
          </SectionTitle>
          <BenefitsGrid>
            <BenefitCard variants={fadeUp}>
              <BenefitIcon>
                <FaHeart />
              </BenefitIcon>
              <BenefitTitle>Inspiring Stories</BenefitTitle>
              <BenefitDescription>
                Read powerful stories of resilience, healing, and transformation from survivors in our programs.
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard variants={fadeUp}>
              <BenefitIcon>
                <FaUsers />
              </BenefitIcon>
              <BenefitTitle>Program Updates</BenefitTitle>
              <BenefitDescription>
                Stay informed about our latest programs, initiatives, and impact in the community.
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard variants={fadeUp}>
              <BenefitIcon>
                <FaHandsHelping />
              </BenefitIcon>
              <BenefitTitle>Get Involved</BenefitTitle>
              <BenefitDescription>
                Learn about volunteer opportunities, events, and ways you can support our mission.
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard variants={fadeUp}>
              <BenefitIcon>
                <FaCheckCircle />
              </BenefitIcon>
              <BenefitTitle>Impact Reports</BenefitTitle>
              <BenefitDescription>
                Receive detailed reports on our impact, achievements, and the lives we're transforming.
              </BenefitDescription>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            Privacy & Unsubscribe
          </SectionTitle>
          <SectionContent>
            <p>
              We respect your privacy and will never share your information with third parties. 
              You can unsubscribe from our newsletter at any time by clicking the unsubscribe 
              link in any email we send you, or by contacting us directly.
            </p>
            <p>
              Our newsletter is sent monthly and includes relevant updates about our work. 
              We may occasionally send special announcements about urgent needs or important events.
            </p>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default Newsletter;
