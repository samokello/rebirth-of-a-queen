import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBullhorn, FaGavel, FaUsers, FaHandsHelping, FaChartLine, FaMicrophone, FaBook, FaGlobe } from 'react-icons/fa';

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

const InitiativesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const InitiativeCard = styled(motion.div)`
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

const InitiativeTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InitiativeDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const InitiativeFeatures = styled.ul`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const CTA = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
`;

const CTAButton = styled.button`
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
  margin: 0 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
`;

const Advocacy = () => {
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
          <Title>Advocacy & Voice</Title>
          <Subtitle>
            Amplifying survivor voices and driving systemic change
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaBullhorn style={{ color: '#667eea' }} />
            Our Advocacy Mission
          </SectionTitle>
          <SectionContent>
            <p>
              We believe that survivors are the most powerful advocates for change. Our 
              advocacy work focuses on amplifying survivor voices, influencing policy, 
              and creating systemic change to prevent sexual violence and modern slavery.
            </p>
            <p>
              Through strategic partnerships, policy engagement, and survivor-led campaigns, 
              we work to create a world where every person can live free from violence 
              and exploitation.
            </p>
          </SectionContent>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <SectionTitle>
            <FaGavel style={{ color: '#667eea' }} />
            Policy & Legal Advocacy
          </SectionTitle>
          <InitiativesGrid>
            <InitiativeCard variants={fadeUp}>
              <InitiativeTitle>
                <FaBook style={{ color: '#667eea' }} />
                Policy Development
              </InitiativeTitle>
              <InitiativeDescription>
                Working with government agencies and policymakers to develop and 
                implement laws that protect survivors and prevent violence.
              </InitiativeDescription>
              <InitiativeFeatures>
                <Feature>Survivor-informed policy recommendations</Feature>
                <Feature>Legislative advocacy campaigns</Feature>
                <Feature>Government partnership development</Feature>
                <Feature>Legal framework strengthening</Feature>
              </InitiativeFeatures>
            </InitiativeCard>

            <InitiativeCard variants={fadeUp}>
              <InitiativeTitle>
                <FaUsers style={{ color: '#667eea' }} />
                Survivor Leadership
              </InitiativeTitle>
              <InitiativeDescription>
                Training and supporting survivors to become advocates and leaders 
                in their communities and in policy discussions.
              </InitiativeDescription>
              <InitiativeFeatures>
                <Feature>Leadership development programs</Feature>
                <Feature>Public speaking training</Feature>
                <Feature>Media engagement skills</Feature>
                <Feature>Community organizing</Feature>
              </InitiativeFeatures>
            </InitiativeCard>

            <InitiativeCard variants={fadeUp}>
              <InitiativeTitle>
                <FaGlobe style={{ color: '#667eea' }} />
                International Advocacy
              </InitiativeTitle>
              <InitiativeDescription>
                Engaging with international organizations and forums to address 
                global issues of sexual violence and modern slavery.
              </InitiativeDescription>
              <InitiativeFeatures>
                <Feature>UN engagement and reporting</Feature>
                <Feature>International partnership building</Feature>
                <Feature>Global campaign participation</Feature>
                <Feature>Cross-border advocacy</Feature>
              </InitiativeFeatures>
            </InitiativeCard>

            <InitiativeCard variants={fadeUp}>
              <InitiativeTitle>
                <FaMicrophone style={{ color: '#667eea' }} />
                Public Awareness
              </InitiativeTitle>
              <InitiativeDescription>
                Raising public awareness about sexual violence, modern slavery, 
                and the rights of survivors through campaigns and education.
              </InitiativeDescription>
              <InitiativeFeatures>
                <Feature>Public awareness campaigns</Feature>
                <Feature>Media engagement and training</Feature>
                <Feature>Community education programs</Feature>
                <Feature>Social media advocacy</Feature>
              </InitiativeFeatures>
            </InitiativeCard>
          </InitiativesGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <SectionTitle>
            <FaChartLine style={{ color: '#667eea' }} />
            Our Impact
          </SectionTitle>
          <StatsGrid>
            <StatCard variants={fadeUp}>
              <StatNumber>15+</StatNumber>
              <StatLabel>Policy Changes Influenced</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>200+</StatNumber>
              <StatLabel>Survivor Advocates Trained</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>50+</StatNumber>
              <StatLabel>Media Engagements</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>10+</StatNumber>
              <StatLabel>International Partnerships</StatLabel>
            </StatCard>
          </StatsGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHandsHelping style={{ color: '#667eea' }} />
            Get Involved
          </SectionTitle>
          <SectionContent>
            <p>
              Join our advocacy efforts and help us create lasting change. Whether you're 
              a survivor, ally, or concerned citizen, there are many ways to get involved 
              in our advocacy work.
            </p>
          </SectionContent>
          <CTA
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <CTAButton>
              Become an Advocate
            </CTAButton>
            <CTAButton>
              Join Our Campaigns
            </CTAButton>
          </CTA>
        </Section>
      </Content>
    </Container>
  );
};

export default Advocacy;
