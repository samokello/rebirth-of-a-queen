import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBook, FaDownload, FaFilePdf, FaVideo, FaPhone, FaEnvelope, FaHandsHelping, FaHeart, FaShieldAlt, FaGraduationCap } from 'react-icons/fa';

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

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ResourceCard = styled(motion.div)`
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

const ResourceTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ResourceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ResourceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResourceItem = styled.li`
  color: #555;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
`;

const DownloadButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
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

const Resources = () => {
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
          <Title>Resources</Title>
          <Subtitle>
            Essential resources for survivors, supporters, and community members
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaBook style={{ color: '#667eea' }} />
            Educational Resources
          </SectionTitle>
          <SectionContent>
            <p>
              Access comprehensive educational materials, guides, and resources designed to 
              support survivors, educate the community, and provide tools for healing and empowerment.
            </p>
          </SectionContent>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <ResourcesGrid>
            <ResourceCard variants={fadeUp}>
              <ResourceTitle>
                <FaHeart style={{ color: '#667eea' }} />
                Survivor Support Guides
              </ResourceTitle>
              <ResourceDescription>
                Comprehensive guides for survivors covering healing, recovery, and building new lives.
              </ResourceDescription>
              <ResourceList>
                <ResourceItem>Healing from Trauma: A Survivor's Guide</ResourceItem>
                <ResourceItem>Building Healthy Relationships</ResourceItem>
                <ResourceItem>Financial Independence Planning</ResourceItem>
                <ResourceItem>Mental Health and Wellness</ResourceItem>
                <ResourceItem>Legal Rights and Resources</ResourceItem>
              </ResourceList>
              <DownloadButton>
                <FaDownload />
                Download Guides
              </DownloadButton>
            </ResourceCard>

            <ResourceCard variants={fadeUp}>
              <ResourceTitle>
                <FaHandsHelping style={{ color: '#667eea' }} />
                Supporter Resources
              </ResourceTitle>
              <ResourceDescription>
                Resources for family members, friends, and supporters who want to help survivors.
              </ResourceDescription>
              <ResourceList>
                <ResourceItem>How to Support a Survivor</ResourceItem>
                <ResourceItem>Understanding Trauma Responses</ResourceItem>
                <ResourceItem>Communication Guidelines</ResourceItem>
                <ResourceItem>Self-Care for Supporters</ResourceItem>
                <ResourceItem>Community Resources Directory</ResourceItem>
              </ResourceList>
              <DownloadButton>
                <FaDownload />
                Download Resources
              </DownloadButton>
            </ResourceCard>

            <ResourceCard variants={fadeUp}>
              <ResourceTitle>
                <FaGraduationCap style={{ color: '#667eea' }} />
                Training Materials
              </ResourceTitle>
              <ResourceDescription>
                Educational materials for professionals, volunteers, and community members.
              </ResourceDescription>
              <ResourceList>
                <ResourceItem>Trauma-Informed Care Training</ResourceItem>
                <ResourceItem>Sexual Violence Prevention</ResourceItem>
                <ResourceItem>Modern Slavery Awareness</ResourceItem>
                <ResourceItem>Volunteer Training Manual</ResourceItem>
                <ResourceItem>Community Education Toolkit</ResourceItem>
              </ResourceList>
              <DownloadButton>
                <FaDownload />
                Download Materials
              </DownloadButton>
            </ResourceCard>

            <ResourceCard variants={fadeUp}>
              <ResourceTitle>
                <FaShieldAlt style={{ color: '#667eea' }} />
                Safety Resources
              </ResourceTitle>
              <ResourceDescription>
                Safety planning and emergency resources for survivors and their families.
              </ResourceDescription>
              <ResourceList>
                <ResourceItem>Safety Planning Guide</ResourceItem>
                <ResourceItem>Emergency Contact Information</ResourceItem>
                <ResourceItem>Legal Protection Resources</ResourceItem>
                <ResourceItem>Digital Safety Tips</ResourceItem>
                <ResourceItem>Crisis Intervention Resources</ResourceItem>
              </ResourceList>
              <DownloadButton>
                <FaDownload />
                Download Safety Resources
              </DownloadButton>
            </ResourceCard>
          </ResourcesGrid>
        </Section>

        <EmergencySection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <EmergencyTitle>
            <FaPhone />
            Emergency Resources
          </EmergencyTitle>
          <EmergencyText>
            If you or someone you know is in immediate danger, please contact our 
            24/7 emergency hotline or local emergency services.
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
            <FaVideo style={{ color: '#667eea' }} />
            Video Resources
          </SectionTitle>
          <SectionContent>
            <p>
              Access our library of educational videos, survivor stories, and training materials 
              to learn more about our work and how you can get involved.
            </p>
          </SectionContent>
          <ResourcesGrid>
            <ResourceCard variants={fadeUp}>
              <ResourceTitle>
                <FaVideo style={{ color: '#667eea' }} />
                Educational Videos
              </ResourceTitle>
              <ResourceDescription>
                Watch educational videos covering topics from trauma recovery to community awareness.
              </ResourceDescription>
              <ResourceList>
                <ResourceItem>Understanding Trauma and Healing</ResourceItem>
                <ResourceItem>Building Resilience and Strength</ResourceItem>
                <ResourceItem>Community Awareness and Prevention</ResourceItem>
                <ResourceItem>Skills Training and Empowerment</ResourceItem>
                <ResourceItem>Advocacy and Policy Change</ResourceItem>
              </ResourceList>
              <DownloadButton>
                <FaVideo />
                Watch Videos
              </DownloadButton>
            </ResourceCard>

            <ResourceCard variants={fadeUp}>
              <ResourceTitle>
                <FaHeart style={{ color: '#667eea' }} />
                Survivor Stories
              </ResourceTitle>
              <ResourceDescription>
                Inspiring stories of resilience, healing, and transformation from survivors in our programs.
              </ResourceDescription>
              <ResourceList>
                <ResourceItem>Journey to Healing</ResourceItem>
                <ResourceItem>Building New Lives</ResourceItem>
                <ResourceItem>Becoming Advocates</ResourceItem>
                <ResourceItem>Community Leadership</ResourceItem>
                <ResourceItem>Hope and Transformation</ResourceItem>
              </ResourceList>
              <DownloadButton>
                <FaVideo />
                Watch Stories
              </DownloadButton>
            </ResourceCard>
          </ResourcesGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaEnvelope style={{ color: '#667eea' }} />
            Contact for Resources
          </SectionTitle>
          <SectionContent>
            <p>
              Need specific resources or have questions about our materials? Contact us and we'll 
              help you find the resources you need or create custom materials for your situation.
            </p>
            <p>
              We're committed to providing accessible, culturally appropriate, and trauma-informed 
              resources that meet the diverse needs of our community.
            </p>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default Resources;
