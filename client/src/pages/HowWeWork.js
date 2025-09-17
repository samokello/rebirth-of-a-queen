import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaLightbulb, 
  FaUsers, 
  FaHandshake, 
  FaChartLine, 
  FaHeart, 
  FaGraduationCap,
  FaTools,
  FaGlobe,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaPlay,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBullseye
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

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ApproachCard = styled(motion.div)`
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

const ApproachIcon = styled.div`
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

const ApproachTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1F2937;
`;

const ApproachDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StepCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '${props => props.step}';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: #fbbf24;
    color: #000;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

const StepIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const StepTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1F2937;
`;

const StepDescription = styled.p`
  color: #6B7280;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const MethodologySection = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 3rem;
  margin-top: 3rem;
`;

const MethodologyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MethodologyCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const MethodologyIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const MethodologyTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1F2937;
`;

const MethodologyDescription = styled.p`
  color: #6B7280;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ImpactMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const MetricCard = styled(motion.div)`
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

const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
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

const HowWeWork = () => {
  const approaches = [
    {
      icon: <FaLightbulb />,
      title: "Innovation First",
      description: "We embrace innovative solutions and creative approaches to address complex social challenges, constantly evolving our methods to maximize impact."
    },
    {
      icon: <FaUsers />,
      title: "Community-Centered",
      description: "Our work is deeply rooted in community needs and aspirations. We listen, learn, and co-create solutions with the women and girls we serve."
    },
    {
      icon: <FaHandshake />,
      title: "Partnership Driven",
      description: "We believe in the power of collaboration. By working with diverse partners, we amplify our impact and create sustainable change."
    },
    {
      icon: <FaChartLine />,
      title: "Results Focused",
      description: "Every program is designed with clear outcomes in mind. We measure, evaluate, and continuously improve to ensure maximum effectiveness."
    }
  ];

  const processSteps = [
    {
      step: "1",
      icon: <FaBullseye />,
      title: "Assessment & Planning",
      description: "We begin by understanding community needs, identifying challenges, and developing comprehensive action plans."
    },
    {
      step: "2",
      icon: <FaUsers />,
      title: "Community Engagement",
      description: "We engage with local communities, build trust, and establish partnerships with key stakeholders."
    },
    {
      step: "3",
      icon: <FaTools />,
      title: "Program Implementation",
      description: "We deliver targeted programs and services, providing skills training, education, and support systems."
    },
    {
      step: "4",
      icon: <FaChartLine />,
      title: "Monitoring & Evaluation",
      description: "We continuously track progress, measure impact, and gather feedback to improve our programs."
    },
    {
      step: "5",
      icon: <FaGlobe />,
      title: "Scaling & Replication",
      description: "Successful programs are scaled up and replicated in other communities to maximize our reach and impact."
    }
  ];

  const methodologies = [
    {
      icon: <FaHeart />,
      title: "Holistic Approach",
      description: "We address the whole person - physical, emotional, social, and economic well-being - not just isolated issues."
    },
    {
      icon: <FaGraduationCap />,
      title: "Capacity Building",
      description: "We focus on building long-term skills and capabilities rather than providing short-term assistance."
    },
    {
      icon: <FaStar />,
      title: "Excellence Standards",
      description: "We maintain high standards in all our programs, ensuring quality delivery and measurable outcomes."
    },
    {
      icon: <FaCheckCircle />,
      title: "Sustainability Focus",
      description: "All our initiatives are designed to create lasting change and be sustainable beyond our direct involvement."
    }
  ];

  const impactMetrics = [
    { value: "500+", label: "Women Empowered" },
    { value: "15", label: "Communities Reached" },
    { value: "85%", label: "Success Rate" },
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
              How We <span className="highlight">Work</span>
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our approach combines innovation, community engagement, and proven methodologies 
              to create lasting positive change in the lives of women and girls across Kenya.
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
              Our Approach
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We follow a comprehensive approach that ensures sustainable impact and meaningful change
            </SectionSubtitle>
          </SectionHeader>

          <ApproachGrid>
            {approaches.map((approach, index) => (
              <ApproachCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <ApproachIcon>{approach.icon}</ApproachIcon>
                <ApproachTitle>{approach.title}</ApproachTitle>
                <ApproachDescription>{approach.description}</ApproachDescription>
              </ApproachCard>
            ))}
          </ApproachGrid>
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
              Our Process
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A systematic 5-step process that ensures effective program delivery and sustainable impact
            </SectionSubtitle>
          </SectionHeader>

          <ProcessSteps>
            {processSteps.map((step, index) => (
              <StepCard
                key={index}
                step={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <StepIcon>{step.icon}</StepIcon>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
            ))}
          </ProcessSteps>
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
              Our Methodology
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The core principles that guide our work and ensure we deliver maximum value to our communities
            </SectionSubtitle>
          </SectionHeader>

          <MethodologySection>
            <MethodologyGrid>
              {methodologies.map((methodology, index) => (
                <MethodologyCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <MethodologyIcon>{methodology.icon}</MethodologyIcon>
                  <MethodologyTitle>{methodology.title}</MethodologyTitle>
                  <MethodologyDescription>{methodology.description}</MethodologyDescription>
                </MethodologyCard>
              ))}
            </MethodologyGrid>
          </MethodologySection>
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
              Our Impact
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Measurable results that demonstrate the effectiveness of our approach and methodology
            </SectionSubtitle>
          </SectionHeader>

          <ImpactMetrics>
            {impactMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <MetricValue>{metric.value}</MetricValue>
                <MetricLabel>{metric.label}</MetricLabel>
              </MetricCard>
            ))}
          </ImpactMetrics>

          <CTAButton
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            Get Involved <FaArrowRight />
          </CTAButton>
        </Container>
      </Section>
    </Page>
  );
};

export default HowWeWork; 