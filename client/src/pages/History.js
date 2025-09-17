import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaHeart, 
  FaGraduationCap,
  FaTrophy,
  FaStar,
  FaArrowRight,
  FaPlay,
  FaQuoteLeft,
  FaLightbulb,
  FaHandshake,
  FaGlobe,
  FaChartLine,
  FaAward,
  FaSeedling
} from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  background: #fff;
  color: #1F2937;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
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
  background: url('/images/welcome.jpg') center/cover no-repeat;
  opacity: 0.2;
  filter: blur(2px);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: white;

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
  color: white;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  padding: 80px 0;
  background: ${props => props.bg || '#fff'};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1F2937;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #fbbf24, #f59e0b);
    transform: translateX(-50%);
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    flex-direction: row;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 40px;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 40px;
    }
  }
`;

const TimelineContent = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  width: 45%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #fbbf24;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #fbbf24;
  border: 4px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #fbbf24;
  z-index: 2;

  @media (max-width: 768px) {
    left: 20px;
    transform: translate(-50%, -50%);
  }
`;

const TimelineYear = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1F2937;
`;

const TimelineDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TimelineStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const TimelineStat = styled.div`
  background: #f9fafb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #6B7280;
  font-weight: 600;
`;

const MilestonesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const MilestoneCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #fbbf24;
  }
`;

const MilestoneIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const MilestoneTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1F2937;
`;

const MilestoneDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const MilestoneYear = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fbbf24;
`;

const FoundersSection = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 3rem;
  margin-top: 3rem;
`;

const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FounderCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FounderImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.bg || '#f3f4f6'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #6B7280;
  border: 4px solid #fbbf24;
`;

const FounderName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1F2937;
`;

const FounderTitle = styled.p`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`;

const FounderQuote = styled.p`
  color: #6B7280;
  font-style: italic;
  line-height: 1.6;
  font-size: 0.9rem;
`;

const ImpactSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ImpactCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImpactValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.5rem;
`;

const ImpactLabel = styled.div`
  font-size: 1rem;
  color: #6B7280;
  font-weight: 600;
`;

const CTAButton = styled(motion.button)`
  background: #fbbf24;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  transition: all 0.3s ease;

  &:hover {
    background: #f59e0b;
    transform: translateY(-2px);
  }
`;

const History = () => {
  const timelineEvents = [
    {
      year: "2015",
      title: "The Beginning",
      description: "Rebirth of A Queen was founded by Pauline Akinyi with a vision to empower women and girls in Kenya. Starting with just a small community group in Nairobi.",
      stats: ["5 women", "1 community"]
    },
    {
      year: "2017",
      title: "First Major Program",
      description: "Launched our first comprehensive skills training program, reaching 50 women across three communities. Established partnerships with local businesses.",
      stats: ["50 women", "3 communities"]
    },
    {
      year: "2019",
      title: "Expansion & Recognition",
      description: "Expanded to 10 communities across Kenya. Received our first major grant and established partnerships with international organizations.",
      stats: ["200 women", "10 communities"]
    },
    {
      year: "2021",
      title: "Digital Transformation",
      description: "Launched digital skills programs and online learning platforms. Reached women in remote areas through technology.",
      stats: ["350 women", "15 communities"]
    },
    {
      year: "2023",
      title: "National Impact",
      description: "Celebrated 8 years of impact with programs across 20+ communities. Launched new initiatives in education, health, and economic empowerment.",
      stats: ["500+ women", "20+ communities"]
    }
  ];

  const milestones = [
    {
      icon: <FaSeedling />,
      title: "Foundation",
      description: "Started with a vision to transform women's lives through empowerment and education.",
      year: "2015"
    },
    {
      icon: <FaHandshake />,
      title: "First Partnership",
      description: "Established our first major partnership with a local business for skills training.",
      year: "2017"
    },
    {
      icon: <FaAward />,
      title: "Recognition",
      description: "Received our first award for community impact and women's empowerment.",
      year: "2019"
    },
    {
      icon: <FaGlobe />,
      title: "International Reach",
      description: "Expanded our programs internationally and established global partnerships.",
      year: "2021"
    },
    {
      icon: <FaTrophy />,
      title: "Excellence Award",
      description: "Won the National Excellence Award for Women's Empowerment Programs.",
      year: "2022"
    },
    {
      icon: <FaStar />,
      title: "8 Years Strong",
      description: "Celebrated 8 years of continuous impact and growth in women's empowerment.",
      year: "2023"
    }
  ];

  const founders = [
    {
      name: "Pauline Akinyi",
      title: "Founder & Executive Director",
      quote: "I founded Rebirth of A Queen with a simple belief: every woman has the power to transform her life and her community. What started as a small dream has grown into a movement that has touched thousands of lives.",
      bg: "#C41E3A"
    },
    {
      name: "Community Leaders",
      title: "Board of Directors",
      quote: "Our board represents the diverse voices and experiences of the communities we serve. Together, we ensure that our programs remain relevant, effective, and truly transformative.",
      bg: "#8B5CF6"
    }
  ];

  const impactMetrics = [
    { value: "8+", label: "Years of Impact" },
    { value: "500+", label: "Women Empowered" },
    { value: "20+", label: "Communities Reached" },
    { value: "50+", label: "Partners" }
  ];

  return (
    <Page>
      <Hero>
        <HeroBackground />
        <Container>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="highlight">History</span>
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From a small community initiative to a national movement, discover the journey 
              that has transformed thousands of women's lives across Kenya.
            </HeroDescription>
          </HeroContent>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Journey
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A timeline of key moments that shaped our organization and expanded our impact
            </SectionSubtitle>
          </SectionHeader>

          <TimelineContainer>
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <TimelineContent>
                  <TimelineYear>{event.year}</TimelineYear>
                  <TimelineTitle>{event.title}</TimelineTitle>
                  <TimelineDescription>{event.description}</TimelineDescription>
                  <TimelineStats>
                    {event.stats.map((stat, statIndex) => (
                      <TimelineStat key={statIndex}>{stat}</TimelineStat>
                    ))}
                  </TimelineStats>
                </TimelineContent>
                <TimelineDot />
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Container>
      </Section>

      <Section bg="#f9fafb">
        <Container>
          <SectionHeader>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Key Milestones
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Important achievements and turning points in our organization's growth
            </SectionSubtitle>
          </SectionHeader>

          <MilestonesGrid>
            {milestones.map((milestone, index) => (
              <MilestoneCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <MilestoneIcon>{milestone.icon}</MilestoneIcon>
                <MilestoneTitle>{milestone.title}</MilestoneTitle>
                <MilestoneDescription>{milestone.description}</MilestoneDescription>
                <MilestoneYear>{milestone.year}</MilestoneYear>
              </MilestoneCard>
            ))}
          </MilestonesGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Founders
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Meet the visionary leaders who started this journey and continue to guide our mission
            </SectionSubtitle>
          </SectionHeader>

          <FoundersSection>
            <FoundersGrid>
              {founders.map((founder, index) => (
                <FounderCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <FounderImage bg={founder.bg}>
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </FounderImage>
                  <FounderName>{founder.name}</FounderName>
                  <FounderTitle>{founder.title}</FounderTitle>
                  <FounderQuote>"{founder.quote}"</FounderQuote>
                </FounderCard>
              ))}
            </FoundersGrid>
          </FoundersSection>
        </Container>
      </Section>

      <Section bg="#f9fafb">
        <Container>
          <SectionHeader>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Legacy
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The cumulative impact of our work over the years
            </SectionSubtitle>
          </SectionHeader>

          <ImpactSection>
            {impactMetrics.map((metric, index) => (
              <ImpactCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <ImpactValue>{metric.value}</ImpactValue>
                <ImpactLabel>{metric.label}</ImpactLabel>
              </ImpactCard>
            ))}
          </ImpactSection>

          <CTAButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            Join Our Story <FaArrowRight />
          </CTAButton>
        </Container>
      </Section>
    </Page>
  );
};

export default History; 