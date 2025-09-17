// AboutUs.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay, FaUsers, FaGraduationCap, FaHandsHelping, FaHeart, FaStar } from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: white;
  padding: 120px 20px 80px;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/branding/about-hero.jpg') center/cover no-repeat;
  opacity: 0.3;
  filter: blur(2px);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const VideoLabel = styled.div`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroLeft = styled.div``;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  .highlight {
    color: #fbbf24;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 500px;

  .highlight {
    color: #fbbf24;
  }
`;

const CTAButton = styled(motion.button)`
  background: #fbbf24;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f59e0b;
    transform: translateY(-2px);
  }
`;

const HeroRight = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: #fbbf24;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(251, 191, 36, 0.4);
  }

  svg {
    color: #000;
    font-size: 1.5rem;
    margin-left: 4px;
  }
`;

const ServicesSection = styled.section`
  padding: 80px 0;
  background: #0a0a0a;
  position: relative;
`;

const DiagonalDivider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 70%);
  opacity: 0.1;
`;

const ServicesContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServicesLabel = styled.div`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const ServicesTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  .highlight {
    color: #fbbf24;
  }
`;

const ServicesDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  opacity: 0.9;

  .highlight {
    color: #fbbf24;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #000;
  font-size: 2rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const MissionSection = styled.section`
  padding: 80px 0;
  background: #0a0a0a;
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const MissionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
`;

const MissionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #000;
  font-size: 1.5rem;
`;

const MissionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fbbf24;
`;

const MissionDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.8;
`;

const About = () => (
  <Page>
    <Hero>
      <HeroBackground />
      <Container>
        <VideoLabel>Video</VideoLabel>
        <HeroContent>
          <HeroLeft>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Unlock your <span className="highlight">potential</span>.
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're a global organization that helps women and girls realize their full potential through education, skills development, and community support.
            </HeroDescription>
            <CTAButton
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Start collaborating +
            </CTAButton>
          </HeroLeft>
          <HeroRight>
            <PlayButton>
              <FaPlay />
            </PlayButton>
          </HeroRight>
        </HeroContent>
      </Container>
    </Hero>

    <ServicesSection>
      <DiagonalDivider />
      <Container>
        <ServicesLabel>Services</ServicesLabel>
        <ServicesContent>
          <div>
            <ServicesTitle>
              Our solutions leverage <span className="highlight">advanced programs</span> and deep expertise to help women in new and exciting ways.
            </ServicesTitle>
          </div>
          <ServicesDescription>
            We provide comprehensive support through education, skills training, and community development programs designed to empower women and girls.
          </ServicesDescription>
        </ServicesContent>

        <ServicesGrid>
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <ServiceIcon>
              <FaGraduationCap />
            </ServiceIcon>
            <ServiceTitle>Education Programs</ServiceTitle>
            <ServiceDescription>
              Comprehensive educational support including literacy programs, skill development, and career guidance to help women achieve their academic goals.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <ServiceIcon>
              <FaHandsHelping />
            </ServiceIcon>
            <ServiceTitle>Skills Development</ServiceTitle>
            <ServiceDescription>
              Practical training in fashion design, leather crafting, photography, and fitness to help women develop marketable skills and build sustainable livelihoods.
            </ServiceDescription>
          </ServiceCard>

          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <ServiceIcon>
              <FaHeart />
            </ServiceIcon>
            <ServiceTitle>Community Support</ServiceTitle>
            <ServiceDescription>
              Building strong support networks and providing mentorship opportunities to help women navigate challenges and achieve their personal and professional goals.
            </ServiceDescription>
          </ServiceCard>
        </ServicesGrid>
      </Container>
    </ServicesSection>

    <MissionSection>
      <Container>
        <ServicesLabel>Our Mission</ServicesLabel>
        <ServicesTitle style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Empowering women to <span className="highlight">thrive</span> and succeed
        </ServicesTitle>

        <MissionGrid>
          <MissionCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <MissionIcon>
              <FaUsers />
            </MissionIcon>
            <MissionTitle>Our Mission</MissionTitle>
            <MissionDescription>
              To empower women and girls through education, skills development, and community support, enabling them to realize their full potential and contribute meaningfully to society.
            </MissionDescription>
          </MissionCard>

          <MissionCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <MissionIcon>
              <FaStar />
            </MissionIcon>
            <MissionTitle>Our Vision</MissionTitle>
            <MissionDescription>
              A world where every woman and girl has the opportunity to thrive, where gender equality is achieved, and where women are empowered to lead and inspire positive change in their communities.
            </MissionDescription>
          </MissionCard>

          <MissionCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <MissionIcon>
              <FaHeart />
            </MissionIcon>
            <MissionTitle>Our Values</MissionTitle>
            <MissionDescription>
              We believe in equality, empowerment, community, education, and sustainable development. These values guide everything we do and shape our approach to supporting women and girls.
            </MissionDescription>
          </MissionCard>
        </MissionGrid>
      </Container>
    </MissionSection>
  </Page>
);

export default About;
