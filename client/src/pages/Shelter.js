import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaShieldAlt, FaHeart, FaUsers, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHandsHelping } from 'react-icons/fa';

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

const Shelter = () => {
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
          <Title>Women's Shelter</Title>
          <Subtitle>
            A safe haven for survivors seeking refuge and support
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHome style={{ color: '#667eea' }} />
            Our Shelter Services
          </SectionTitle>
          <SectionContent>
            <p>
              Our women's shelter provides a safe, secure, and supportive environment for 
              survivors of sexual violence and modern slavery. We offer comprehensive 
              services designed to help women and their children heal, rebuild their lives, 
              and transition to independence.
            </p>
            <p>
              The shelter operates 24/7 with trained staff, security measures, and 
              trauma-informed care to ensure the safety and well-being of all residents.
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
                Safe Accommodation
              </ServiceTitle>
              <ServiceDescription>
                Secure, comfortable living spaces with private rooms, shared common areas, 
                and 24/7 security. We accommodate women and their children with all 
                basic needs provided.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaHeart style={{ color: '#667eea' }} />
                Trauma Counseling
              </ServiceTitle>
              <ServiceDescription>
                Professional counseling services including individual therapy, group 
                sessions, and specialized trauma treatment to support healing and recovery.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaUsers style={{ color: '#667eea' }} />
                Case Management
              </ServiceTitle>
              <ServiceDescription>
                Dedicated case managers work with each resident to develop personalized 
                plans for housing, employment, education, and long-term stability.
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard variants={fadeUp}>
              <ServiceTitle>
                <FaHandsHelping style={{ color: '#667eea' }} />
                Life Skills Training
              </ServiceTitle>
              <ServiceDescription>
                Comprehensive training in practical life skills, financial literacy, 
                parenting, and job readiness to prepare residents for independent living.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>
        </Section>

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
          variants={stagger}
        >
          <SectionTitle>
            Contact Our Shelter
          </SectionTitle>
          <ContactGrid>
            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaPhone />
                Emergency Hotline
              </ContactTitle>
              <ContactInfo>+254 720 339 204</ContactInfo>
            </ContactCard>

            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaEnvelope />
                Email Support
              </ContactTitle>
              <ContactInfo>shelter@rebirthofaqueen.org</ContactInfo>
            </ContactCard>

            <ContactCard variants={fadeUp}>
              <ContactTitle>
                <FaMapMarkerAlt />
                Location
              </ContactTitle>
              <ContactInfo>Nairobi, Kenya<br />(Exact location provided upon admission)</ContactInfo>
            </ContactCard>
          </ContactGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            Admission Process
          </SectionTitle>
          <SectionContent>
            <p>
              Our admission process is designed to be safe, confidential, and supportive. 
              We work with local authorities, social workers, and other organizations to 
              ensure survivors can access our services when they need them most.
            </p>
            <p>
              <strong>Steps to admission:</strong>
            </p>
            <ol style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
              <li>Contact our emergency hotline or email</li>
              <li>Initial safety assessment and intake</li>
              <li>Confidential interview with our team</li>
              <li>Admission and orientation to shelter services</li>
              <li>Development of personalized support plan</li>
            </ol>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default Shelter;
