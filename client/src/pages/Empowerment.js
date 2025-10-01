import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaTools, FaLaptop, FaHandsHelping, FaChartLine, FaUsers, FaCertificate, FaBriefcase } from 'react-icons/fa';

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

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProgramCard = styled(motion.div)`
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

const ProgramTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProgramDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProgramFeatures = styled.ul`
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
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
`;

const Empowerment = () => {
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
          <Title>Skills Training & Empowerment</Title>
          <Subtitle>
            Building sustainable livelihoods through comprehensive skills development
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaGraduationCap style={{ color: '#667eea' }} />
            Our Training Programs
          </SectionTitle>
          <SectionContent>
            <p>
              Our comprehensive skills training programs are designed to equip survivors with 
              marketable skills, entrepreneurial knowledge, and the confidence needed to 
              build sustainable livelihoods. We focus on both traditional and modern skills 
              that align with market demands.
            </p>
          </SectionContent>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <ProgramsGrid>
            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaTools style={{ color: '#667eea' }} />
                Vocational Training
              </ProgramTitle>
              <ProgramDescription>
                Hands-on training in practical skills including tailoring, hairdressing, 
                catering, and crafts that provide immediate income opportunities.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>6-month intensive programs</Feature>
                <Feature>Industry-standard equipment</Feature>
                <Feature>Certification upon completion</Feature>
                <Feature>Job placement assistance</Feature>
              </ProgramFeatures>
            </ProgramCard>

            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaLaptop style={{ color: '#667eea' }} />
                Digital Skills
              </ProgramTitle>
              <ProgramDescription>
                Modern digital literacy programs covering computer basics, social media 
                marketing, online business, and remote work opportunities.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>Basic computer literacy</Feature>
                <Feature>Social media management</Feature>
                <Feature>Online business setup</Feature>
                <Feature>Remote work preparation</Feature>
              </ProgramFeatures>
            </ProgramCard>

            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaBriefcase style={{ color: '#667eea' }} />
                Entrepreneurship
              </ProgramTitle>
              <ProgramDescription>
                Business development training covering business planning, financial 
                management, marketing, and access to microfinance opportunities.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>Business plan development</Feature>
                <Feature>Financial literacy</Feature>
                <Feature>Marketing strategies</Feature>
                <Feature>Microfinance access</Feature>
              </ProgramFeatures>
            </ProgramCard>

            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaHandsHelping style={{ color: '#667eea' }} />
                Life Skills
              </ProgramTitle>
              <ProgramDescription>
                Essential life skills including communication, leadership, time management, 
                and emotional intelligence for personal and professional success.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>Communication skills</Feature>
                <Feature>Leadership development</Feature>
                <Feature>Time management</Feature>
                <Feature>Emotional intelligence</Feature>
              </ProgramFeatures>
            </ProgramCard>
          </ProgramsGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <SectionTitle>
            <FaChartLine style={{ color: '#667eea' }} />
            Program Impact
          </SectionTitle>
          <StatsGrid>
            <StatCard variants={fadeUp}>
              <StatNumber>300+</StatNumber>
              <StatLabel>Graduates Trained</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>85%</StatNumber>
              <StatLabel>Employment Rate</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>50+</StatNumber>
              <StatLabel>Businesses Started</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>200%</StatNumber>
              <StatLabel>Income Increase</StatLabel>
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
            <FaUsers style={{ color: '#667eea' }} />
            Success Stories
          </SectionTitle>
          <SectionContent>
            <p>
              Our graduates have gone on to start successful businesses, secure meaningful 
              employment, and become community leaders. Many have returned to mentor new 
              participants, creating a cycle of empowerment and support.
            </p>
            <p>
              From small tailoring businesses to digital marketing agencies, our participants 
              are building sustainable livelihoods and contributing to their communities' 
              economic development.
            </p>
          </SectionContent>
        </Section>

        <CTA
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <CTAButton>
            Apply for Training Program
          </CTAButton>
        </CTA>
      </Content>
    </Container>
  );
};

export default Empowerment;
