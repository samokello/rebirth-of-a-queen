import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaUsers, FaHeart, FaGraduationCap, FaHandsHelping, FaChartLine, FaArrowRight } from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  background: #fff;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  color: white;
  padding: 120px 20px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/welcome.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: white;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: white;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 80px 0;

  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e1e2f;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
`;

const CardText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  color: white;
  padding: 60px 0;
  margin: 60px 0;
  border-radius: 12px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #e74c3c;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const MapSection = styled.div`
  background: #f8f9fa;
  padding: 60px 0;
  margin: 60px 0;
  border-radius: 12px;
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const MapWrapper = styled.div`
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  margin: 2rem 0;
`;

const MapInfo = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: left;
`;

const LocationTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const LocationAddress = styled.p`
  color: #6B7280;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const LocationDescription = styled.p`
  color: #4B5563;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ImpactSection = styled.div`
  background: white;
  padding: 60px 0;
  margin: 60px 0;
  border-radius: 12px;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ImpactCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border-left: 4px solid #e74c3c;
`;

const ImpactTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
`;

const ImpactDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

export default function WhereWeWork() {
  const locations = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Nairobi Slums",
      description: "Working in Kibera, Mathare, and other informal settlements to provide education, healthcare, and economic opportunities for vulnerable communities."
    },
    {
      icon: <FaUsers />,
      title: "Rural Communities",
      description: "Supporting rural areas across Kenya with agricultural training, clean water projects, and community health initiatives."
    },
    {
      icon: <FaHeart />,
      title: "Community Centers",
      description: "Operating centers in major cities that serve as hubs for education, skills training, and community development programs."
    },
    {
      icon: <FaGraduationCap />,
      title: "Schools & Universities",
      description: "Partnering with educational institutions to provide scholarships, mentorship programs, and career development opportunities."
    }
  ];

  const stats = [
    { number: "50+", label: "Communities Served" },
    { number: "25", label: "Counties Reached" },
    { number: "100+", label: "Partner Organizations" },
    { number: "15", label: "Years of Service" }
  ];

  const impacts = [
    {
      title: "Education Access",
      description: "Providing quality education to over 5,000 children and youth in underserved communities."
    },
    {
      title: "Healthcare Services",
      description: "Delivering essential healthcare services to more than 10,000 individuals annually."
    },
    {
      title: "Economic Empowerment",
      description: "Supporting 2,000+ women and youth with skills training and microfinance opportunities."
    },
    {
      title: "Community Leadership",
      description: "Training 500+ community leaders to drive sustainable development initiatives."
    }
  ];

  return (
    <Page>
      <Hero>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Where We Work
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From urban slums to rural villages, we're making a difference across Kenya through community-driven development programs.
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      <Container>
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Geographic Reach
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We operate across diverse communities in Kenya, adapting our programs to meet the unique needs and challenges of each location.
          </SectionSubtitle>
          <Grid>
            {locations.map((location, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardIcon>{location.icon}</CardIcon>
                <CardTitle>{location.title}</CardTitle>
                <CardText>{location.description}</CardText>
              </Card>
            ))}
          </Grid>
        </Section>

        <StatsSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ color: 'white' }}
            >
              Our Reach in Numbers
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              The scale of our impact across Kenya
            </SectionSubtitle>
            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>
          </Container>
        </StatsSection>

        <MapSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Presence Across Kenya
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore our network of programs and partnerships across the country
            </SectionSubtitle>
            <MapContainer>
              <MapWrapper>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819123456789!2d36.8167!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScwMC4xIkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Meridian Hospital Location"
                ></iframe>
              </MapWrapper>
              
              <MapInfo>
                <LocationTitle>Meridian Hospital</LocationTitle>
                <LocationAddress>📍 Kiserian, Magadi Road, Kenya</LocationAddress>
                <LocationDescription>
                  Our flagship healthcare facility providing comprehensive medical services, community health programs, and emergency care to the local community. Located along the scenic Magadi Road, we serve as a vital healthcare hub for the Kiserian region.
                </LocationDescription>
              </MapInfo>
            </MapContainer>
          </Container>
        </MapSection>

        <ImpactSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Impact by Region
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              How our programs are creating positive change in different communities
            </SectionSubtitle>
            <ImpactGrid>
              {impacts.map((impact, index) => (
                <ImpactCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ImpactTitle>{impact.title}</ImpactTitle>
                  <ImpactDescription>{impact.description}</ImpactDescription>
                </ImpactCard>
              ))}
            </ImpactGrid>
          </Container>
        </ImpactSection>
      </Container>
    </Page>
  );
} 