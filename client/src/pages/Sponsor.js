import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaHeart, FaUsers, FaGraduationCap, FaHome, FaChartLine, FaGift, FaCheckCircle } from 'react-icons/fa';

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

const ProgramCost = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 1rem;
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

const SponsorshipTiers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TierCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
  }
`;

const TierTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const TierAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const TierDescription = styled.p`
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const TierFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const TierFeature = styled.li`
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #4ecdc4;
    font-weight: bold;
  }
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

const Sponsor = () => {
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
          <Title>Sponsor a Program</Title>
          <Subtitle>
            Make a lasting impact by sponsoring our life-changing programs
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHandsHelping style={{ color: '#667eea' }} />
            Why Sponsor a Program?
          </SectionTitle>
          <SectionContent>
            <p>
              Program sponsorship provides direct, measurable impact on the lives of survivors. 
              Your sponsorship ensures that our programs can continue to operate, expand, 
              and reach more people in need of support and empowerment.
            </p>
            <p>
              As a program sponsor, you'll receive regular updates on the impact of your 
              contribution, including stories from participants and detailed reports on 
              program outcomes.
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
            Programs Available for Sponsorship
          </SectionTitle>
          <ProgramsGrid>
            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaGraduationCap style={{ color: '#667eea' }} />
                Education & Mentorship
              </ProgramTitle>
              <ProgramCost>$5,000/month</ProgramCost>
              <ProgramDescription>
                Support educational programs that provide survivors with access to 
                quality education, mentorship, and academic support.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>School fees and supplies for 20 students</Feature>
                <Feature>Mentorship program coordination</Feature>
                <Feature>Academic support and tutoring</Feature>
                <Feature>Career guidance and counseling</Feature>
              </ProgramFeatures>
            </ProgramCard>

            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaUsers style={{ color: '#667eea' }} />
                Skills Training
              </ProgramTitle>
              <ProgramCost>$8,000/month</ProgramCost>
              <ProgramDescription>
                Fund vocational training programs that equip survivors with marketable 
                skills for economic independence.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>Training for 30 participants</Feature>
                <Feature>Equipment and materials</Feature>
                <Feature>Certification programs</Feature>
                <Feature>Job placement assistance</Feature>
              </ProgramFeatures>
            </ProgramCard>

            <ProgramCard variants={fadeUp}>
              <ProgramTitle>
                <FaHome style={{ color: '#667eea' }} />
                Women's Shelter
              </ProgramTitle>
              <ProgramCost>$12,000/month</ProgramCost>
              <ProgramDescription>
                Support our safe haven that provides shelter, counseling, and 
                comprehensive support for survivors and their children.
              </ProgramDescription>
              <ProgramFeatures>
                <Feature>Accommodation for 15 families</Feature>
                <Feature>24/7 staff and security</Feature>
                <Feature>Counseling and therapy services</Feature>
                <Feature>Life skills training</Feature>
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
            <FaGift style={{ color: '#667eea' }} />
            Sponsorship Tiers
          </SectionTitle>
          <SponsorshipTiers>
            <TierCard variants={fadeUp}>
              <TierTitle>
                <FaHeart />
                Bronze Sponsor
              </TierTitle>
              <TierAmount>$1,000</TierAmount>
              <TierDescription>
                Support a specific program component for one month
              </TierDescription>
              <TierFeatures>
                <TierFeature>Monthly impact report</TierFeature>
                <TierFeature>Recognition on our website</TierFeature>
                <TierFeature>Thank you letter from participants</TierFeature>
                <TierFeature>Quarterly update calls</TierFeature>
              </TierFeatures>
            </TierCard>

            <TierCard variants={fadeUp}>
              <TierTitle>
                <FaCheckCircle />
                Silver Sponsor
              </TierTitle>
              <TierAmount>$5,000</TierAmount>
              <TierDescription>
                Sponsor a complete program for one month
              </TierDescription>
              <TierFeatures>
                <TierFeature>All Bronze benefits</TierFeature>
                <TierFeature>Program naming rights</TierFeature>
                <TierFeature>Site visit opportunities</TierFeature>
                <TierFeature>Annual impact report</TierFeature>
              </TierFeatures>
            </TierCard>

            <TierCard variants={fadeUp}>
              <TierTitle>
                <FaChartLine />
                Gold Sponsor
              </TierTitle>
              <TierAmount>$10,000+</TierAmount>
              <TierDescription>
                Major program sponsorship with maximum impact
              </TierDescription>
              <TierFeatures>
                <TierFeature>All Silver benefits</TierFeature>
                <TierFeature>Executive briefings</TierFeature>
                <TierFeature>Event speaking opportunities</TierFeature>
                <TierFeature>Custom impact measurement</TierFeature>
              </TierFeatures>
            </TierCard>
          </SponsorshipTiers>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaChartLine style={{ color: '#667eea' }} />
            Impact & Recognition
          </SectionTitle>
          <SectionContent>
            <p>
              As a program sponsor, you'll be part of a community of change-makers who are 
              directly transforming lives. We provide comprehensive reporting and recognition 
              to ensure you can see the impact of your investment.
            </p>
            <p>
              Your sponsorship will be recognized through our website, annual reports, 
              and at our events. Most importantly, you'll receive regular updates on the 
              lives you're helping to transform.
            </p>
          </SectionContent>
          <CTA
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <CTAButton>
              Become a Sponsor
            </CTAButton>
            <CTAButton>
              Download Sponsorship Guide
            </CTAButton>
          </CTA>
        </Section>
      </Content>
    </Container>
  );
};

export default Sponsor;
