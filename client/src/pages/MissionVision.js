import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaHeart, FaUsers, FaHandsHelping, FaLightbulb } from 'react-icons/fa';

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

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ValueCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  padding: 2rem;
  border-radius: 15px;
  border-left: 5px solid #667eea;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
`;

const ValueTitle = styled.h3`
  font-size: 1.4rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.6;
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

const MissionVision = () => {
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
          <Title>Our Mission & Vision</Title>
          <Subtitle>
            Empowering survivors to reclaim their power and build thriving communities
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaBullseye style={{ color: '#667eea' }} />
            Our Mission
          </SectionTitle>
          <SectionContent>
            <p>
              Rebirth of a Queen Foundation is dedicated to empowering survivors of sexual violence 
              and modern slavery through comprehensive support, education, and community building. 
              We provide safe spaces, resources, and opportunities for healing, growth, and 
              economic independence.
            </p>
            <p>
              Our mission is to break the cycle of violence by addressing root causes, 
              providing trauma-informed care, and creating pathways to sustainable 
              livelihoods for survivors and their families.
            </p>
          </SectionContent>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaEye style={{ color: '#667eea' }} />
            Our Vision
          </SectionTitle>
          <SectionContent>
            <p>
              We envision a world where every survivor of sexual violence and modern slavery 
              has access to healing, justice, and opportunities to thrive. A world where 
              communities are free from violence, where survivors are celebrated as leaders, 
              and where every person can live with dignity and purpose.
            </p>
            <p>
              Our vision extends beyond individual healing to systemic change - creating 
              societies that prevent violence, support survivors, and celebrate the 
              resilience and strength of those who have overcome trauma.
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
            <FaHeart style={{ color: '#667eea' }} />
            Our Core Values
          </SectionTitle>
          <ValuesGrid>
            <ValueCard variants={fadeUp}>
              <ValueTitle>
                <FaUsers style={{ color: '#667eea' }} />
                Survivor-Centered
              </ValueTitle>
              <ValueDescription>
                Every decision we make is guided by the voices and experiences of survivors. 
                We believe survivors are the experts of their own healing journey.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard variants={fadeUp}>
              <ValueTitle>
                <FaHandsHelping style={{ color: '#667eea' }} />
                Empowerment
              </ValueTitle>
              <ValueDescription>
                We provide tools, resources, and opportunities that enable survivors to 
                reclaim their power and build independent, fulfilling lives.
              </ValueDescription>
            </ValueCard>
            
            <ValueCard variants={fadeUp}>
              <ValueTitle>
                <FaLightbulb style={{ color: '#667eea' }} />
                Innovation
              </ValueTitle>
              <ValueDescription>
                We continuously evolve our approaches, using evidence-based practices and 
                creative solutions to address complex challenges in survivor support.
              </ValueDescription>
            </ValueCard>
          </ValuesGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <SectionTitle>
            Our Impact
          </SectionTitle>
          <StatsGrid>
            <StatCard variants={fadeUp}>
              <StatNumber>500+</StatNumber>
              <StatLabel>Survivors Supported</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>15</StatNumber>
              <StatLabel>Programs Delivered</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>50+</StatNumber>
              <StatLabel>Community Partners</StatLabel>
            </StatCard>
            <StatCard variants={fadeUp}>
              <StatNumber>95%</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </StatCard>
          </StatsGrid>
        </Section>
      </Content>
    </Container>
  );
};

export default MissionVision;
