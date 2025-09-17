import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { 
  FaHeart, 
  FaUsers, 
  FaGraduationCap, 
  FaStar,
  FaArrowRight,
  FaChild,
  FaGlobeAfrica,
  FaHandshake,
  FaBook,
  FaHome,
  FaChartLine,
  FaAward
} from 'react-icons/fa';

const Impact = () => {
  const countersRef = useRef(null);
  const isInView = useInView(countersRef, { once: true });

  const impactStats = [
    { 
      number: 500, 
      label: 'Women Empowered', 
      icon: FaHeart,
      description: 'Women who have completed our programs and are now leading in their communities',
      color: '#8B5CF6'
    },
    { 
      number: 1000, 
      label: 'Lives Impacted', 
      icon: FaUsers,
      description: 'Total number of lives touched through our various programs and initiatives',
      color: '#3b82f6'
    },
    { 
      number: 50, 
      label: 'Communities Served', 
      icon: FaGlobeAfrica,
      description: 'Communities across Kenya where we\'ve implemented our programs',
      color: '#f59e0b'
    },
    { 
      number: 95, 
      label: 'Success Rate', 
      icon: FaStar,
      description: 'Success rate of our programs in achieving their intended outcomes',
      color: '#ef4444'
    }
  ];

  const programStats = [
    { 
      program: 'Education & Skills',
      graduates: 150,
      successRate: 98,
      avgSalary: 45000,
      icon: FaBook
    },
    { 
      program: 'Fashion Design',
      graduates: 120,
      successRate: 95,
      avgSalary: 52000,
      icon: FaStar
    },
    { 
      program: 'Leather Making',
      graduates: 80,
      successRate: 92,
      avgSalary: 48000,
      icon: FaHandshake
    },
    { 
      program: 'Fitness & Wellness',
      graduates: 100,
      successRate: 96,
      avgSalary: 38000,
      icon: FaHeart
    },
    { 
      program: 'Photography & Media',
      graduates: 50,
      successRate: 94,
      avgSalary: 55000,
      icon: FaGraduationCap
    }
  ];

  const yearlyImpact = [
    { year: '2019', women: 50, communities: 5 },
    { year: '2020', women: 120, communities: 12 },
    { year: '2021', women: 200, communities: 20 },
    { year: '2022', women: 350, communities: 35 },
    { year: '2023', women: 500, communities: 50 }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOverlay />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent>
              <Breadcrumb>
                <Link to="/">Home</Link>
                <FaArrowRight />
                <span>Our Impact</span>
              </Breadcrumb>
              <HeroTitle>Our Impact & Achievements</HeroTitle>
              <HeroSubtitle>
                Discover the real numbers behind our mission to empower women and transform communities 
                across Kenya through education, skills development, and sustainable programs.
              </HeroSubtitle>
            </HeroContent>
          </motion.div>
        </Container>
      </HeroSection>

      <Container>
        {/* Main Impact Stats */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Impact at a Glance
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              These numbers represent real lives changed, communities transformed, and futures brightened.
            </motion.p>
          </SectionHeader>

          <ImpactGrid ref={countersRef}>
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ImpactCard>
                  <ImpactIcon style={{ background: stat.color }}>
                    <stat.icon />
                  </ImpactIcon>
                  <ImpactNumber>
                    {isInView ? (
                      <CountUp 
                        end={stat.number} 
                        duration={2.5} 
                        suffix={stat.label === 'Success Rate' ? '%' : '+'}
                        useEasing={true}
                        start={0}
                      />
                    ) : '0'}
                  </ImpactNumber>
                  <ImpactLabel>{stat.label}</ImpactLabel>
                  <ImpactDescription>{stat.description}</ImpactDescription>
                </ImpactCard>
              </motion.div>
            ))}
          </ImpactGrid>
        </Section>

        {/* Program Performance */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Program Performance
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Detailed breakdown of our programs' success rates and outcomes.
            </motion.p>
          </SectionHeader>

          <ProgramStatsGrid>
            {programStats.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgramStatCard>
                  <ProgramHeader>
                    <ProgramIcon>
                      <program.icon />
                    </ProgramIcon>
                    <ProgramName>{program.program}</ProgramName>
                  </ProgramHeader>
                  <ProgramMetrics>
                    <Metric>
                      <MetricLabel>Graduates</MetricLabel>
                      <MetricValue>
                        <CountUp 
                          end={program.graduates} 
                          duration={2} 
                          useEasing={true}
                          start={0}
                        />
                      </MetricValue>
                    </Metric>
                    <Metric>
                      <MetricLabel>Success Rate</MetricLabel>
                      <MetricValue>
                        <CountUp 
                          end={program.successRate} 
                          duration={2} 
                          suffix="%" 
                          useEasing={true}
                          start={0}
                        />
                      </MetricValue>
                    </Metric>
                    <Metric>
                      <MetricLabel>Avg. Salary (KES)</MetricLabel>
                      <MetricValue>
                        <CountUp 
                          end={program.avgSalary} 
                          duration={2} 
                          useEasing={true}
                          start={0}
                        />
                      </MetricValue>
                    </Metric>
                  </ProgramMetrics>
                </ProgramStatCard>
              </motion.div>
            ))}
          </ProgramStatsGrid>
        </Section>

        {/* Yearly Growth */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Yearly Growth
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our steady growth over the years reflects the increasing demand for our programs.
            </motion.p>
          </SectionHeader>

          <GrowthGrid>
            {yearlyImpact.map((year, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GrowthCard>
                  <GrowthYear>{year.year}</GrowthYear>
                  <GrowthMetrics>
                    <GrowthMetric>
                      <GrowthLabel>Women Empowered</GrowthLabel>
                      <GrowthNumber>
                        <CountUp 
                          end={year.women} 
                          duration={2} 
                          useEasing={true}
                          start={0}
                        />
                      </GrowthNumber>
                    </GrowthMetric>
                    <GrowthMetric>
                      <GrowthLabel>Communities</GrowthLabel>
                      <GrowthNumber>
                        <CountUp 
                          end={year.communities} 
                          duration={2} 
                          useEasing={true}
                          start={0}
                        />
                      </GrowthNumber>
                    </GrowthMetric>
                  </GrowthMetrics>
                </GrowthCard>
              </motion.div>
            ))}
          </GrowthGrid>
        </Section>

        {/* Additional Impact Metrics */}
        <Section>
          <AdditionalMetricsGrid>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AdditionalMetricCard>
                <AdditionalMetricIcon>
                  <FaChild />
                </AdditionalMetricIcon>
                <AdditionalMetricNumber>
                  <CountUp 
                    end={2000} 
                    duration={2.5} 
                    suffix="+" 
                    useEasing={true}
                    start={0}
                  />
                </AdditionalMetricNumber>
                <AdditionalMetricLabel>Children Supported</AdditionalMetricLabel>
                <AdditionalMetricDescription>
                  Children who have received education, healthcare, and support through our programs
                </AdditionalMetricDescription>
              </AdditionalMetricCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AdditionalMetricCard>
                <AdditionalMetricIcon>
                  <FaHome />
                </AdditionalMetricIcon>
                <AdditionalMetricNumber>
                  <CountUp 
                    end={100} 
                    duration={2.5} 
                    suffix="+" 
                    useEasing={true}
                    start={0}
                  />
                </AdditionalMetricNumber>
                <AdditionalMetricLabel>Homes Built</AdditionalMetricLabel>
                <AdditionalMetricDescription>
                  Homes and shelters built for families in need through our community programs
                </AdditionalMetricDescription>
              </AdditionalMetricCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AdditionalMetricCard>
                <AdditionalMetricIcon>
                  <FaChartLine />
                </AdditionalMetricIcon>
                <AdditionalMetricNumber>
                  <CountUp 
                    end={85} 
                    duration={2.5} 
                    suffix="%" 
                    useEasing={true}
                    start={0}
                  />
                </AdditionalMetricNumber>
                <AdditionalMetricLabel>Employment Rate</AdditionalMetricLabel>
                <AdditionalMetricDescription>
                  Percentage of our graduates who are employed or running their own businesses
                </AdditionalMetricDescription>
              </AdditionalMetricCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <AdditionalMetricCard>
                <AdditionalMetricIcon>
                  <FaAward />
                </AdditionalMetricIcon>
                <AdditionalMetricNumber>
                  <CountUp 
                    end={25} 
                    duration={2.5} 
                    suffix="+" 
                    useEasing={true}
                    start={0}
                  />
                </AdditionalMetricNumber>
                <AdditionalMetricLabel>Awards & Recognition</AdditionalMetricLabel>
                <AdditionalMetricDescription>
                  Awards and recognition received for our community development work
                </AdditionalMetricDescription>
              </AdditionalMetricCard>
            </motion.div>
          </AdditionalMetricsGrid>
        </Section>

        {/* Call to Action */}
        <Section>
          <CTASection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <CTATitle>Join Us in Creating More Impact</CTATitle>
              <CTADescription>
                Your support helps us reach more women and communities. Together, we can create 
                even greater positive change across Kenya.
              </CTADescription>
              <CTAButtons>
                <PrimaryButton to="/donate">
                  Donate Now <FaArrowRight />
                </PrimaryButton>
                <SecondaryButton to="/programs">
                  Explore Programs <FaArrowRight />
                </SecondaryButton>
              </CTAButtons>
            </motion.div>
          </CTASection>
        </Section>
      </Container>
    </>
  );
};

// Styled Components
const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/welcome.jpg') center/cover;
  min-height: 60vh;
  display: flex;
  align-items: center;
  color: white;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  background: ${({ theme }) => theme.palette.background.default};
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;

  a {
    color: ${props => props.theme?.colors?.textPrimary || '#F8FAFC'};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme?.colors?.primaryLight || '#A78BFA'};
    }
  }

  span {
    color: ${props => props.theme?.colors?.textPrimary || '#F8FAFC'};
    opacity: 0.8;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: ${props => props.theme?.colors?.textPrimary || '#FFFFFF'};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: ${props => props.theme?.colors?.textSecondary || '#FFFFFF'};
  opacity: 0.95;
  line-height: 1.6;
`;

const Section = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.palette.background.default};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2, h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: ${props => props.theme?.colors?.textSecondary || '#475569'};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ImpactCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3, h4, p {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const ImpactIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const ImpactNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
  margin-bottom: 0.5rem;
`;

const ImpactLabel = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
  margin-bottom: 1rem;
`;

const ImpactDescription = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.6;
`;

const ProgramStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProgramStatCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProgramHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProgramIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;

const ProgramName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const ProgramMetrics = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Metric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.palette.background.light};
  border-radius: 8px;
`;

const MetricLabel = styled.div`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  font-weight: 500;
`;

const MetricValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
`;

const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const GrowthCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GrowthYear = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  margin-bottom: 1.5rem;
`;

const GrowthMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GrowthMetric = styled.div``;

const GrowthLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  margin-bottom: 0.5rem;
`;

const GrowthNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const AdditionalMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const AdditionalMetricCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdditionalMetricIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const AdditionalMetricNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
  margin-bottom: 0.5rem;
`;

const AdditionalMetricLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
  margin-bottom: 1rem;
`;

const AdditionalMetricDescription = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.6;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  padding: 4rem;
  border-radius: 16px;
  text-align: center;
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: white;
  color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid white;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
    transform: translateY(-2px);
  }
`;

export default Impact; 