import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaGraduationCap, FaLightbulb, FaHandshake, FaChartLine, FaStar, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaBullseye, FaGlobe, FaTrophy, FaBook, FaLaptop, FaMicrophone, FaUsersCog, FaShieldAlt, FaRocket, FaPalette, FaDumbbell } from 'react-icons/fa';

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
    background: url('/images/education/orientation1 (2).jpg') center/cover;
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

  .highlight {
    color: #fbbf24;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
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

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProgramCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #e74c3c;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ProgramIcon = styled.div`
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

const ProgramTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
`;

const ProgramDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProgramDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 500;
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
  color: #fbbf24;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const TestimonialQuote = styled.div`
  font-style: italic;
  color: #4B5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const AuthorTitle = styled.div`
  color: #6B7280;
  font-size: 0.9rem;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  }
`;

export default function GirlsEmpowerment() {
  const programs = [
    {
      icon: <FaGraduationCap />,
      title: "Education & Skills Development",
      description: "Comprehensive educational support, STEM training, and life skills development to prepare girls for future success.",
      duration: "12 months"
    },
    {
      icon: <FaShieldAlt />,
      title: "Health & Wellness",
      description: "Reproductive health education, mental health support, and physical wellness programs designed specifically for girls.",
      duration: "6 months"
    },
    {
      icon: <FaRocket />,
      title: "Leadership & Confidence Building",
      description: "Public speaking, decision-making, and leadership training to help girls find their voice and become confident leaders.",
      duration: "8 months"
    },
    {
      icon: <FaPalette />,
      title: "Creative Expression",
      description: "Arts, crafts, music, and creative writing programs that allow girls to express themselves and build self-esteem.",
      duration: "4 months"
    },
    {
      icon: <FaDumbbell />,
      title: "Sports & Physical Activity",
      description: "Sports programs, fitness training, and physical activities to promote health, teamwork, and confidence.",
      duration: "Ongoing"
    },
    {
      icon: <FaHandshake />,
      title: "Mentorship & Role Models",
      description: "One-on-one mentoring with successful women professionals and community leaders who serve as positive role models.",
      duration: "10 months"
    }
  ];

  const stats = [
    { number: "1,200+", label: "Girls Empowered" },
    { number: "85%", label: "Academic Improvement" },
    { number: "92%", label: "Confidence Boost" },
    { number: "40+", label: "Community Projects" }
  ];

  const testimonials = [
    {
      quote: "The girls empowerment program gave me the confidence to pursue my dreams. I learned that my voice matters and that I can achieve anything I set my mind to.",
      name: "Amina Hassan",
      title: "Student Leader, Age 16"
    },
    {
      quote: "Through the mentorship program, I found my passion for science. My mentor showed me that women can excel in STEM fields, and now I want to become an engineer.",
      name: "Faith Wanjiku",
      title: "STEM Scholar, Age 15"
    },
    {
      quote: "The health and wellness sessions taught me to take care of myself and support other girls. I'm now a peer educator helping other girls in my community.",
      name: "Joy Akinyi",
      title: "Peer Educator, Age 17"
    }
  ];

  const impactAreas = [
    {
      icon: <FaChartLine />,
      title: "Academic Achievement",
      description: "Improved school performance, higher graduation rates, and increased interest in STEM subjects."
    },
    {
      icon: <FaHeart />,
      title: "Self-Confidence",
      description: "Enhanced self-esteem, better communication skills, and increased assertiveness in decision-making."
    },
    {
      icon: <FaBullseye />,
      title: "Leadership Skills",
      description: "Development of leadership qualities, community involvement, and peer mentoring abilities."
    },
    {
      icon: <FaStar />,
      title: "Health Awareness",
      description: "Better understanding of reproductive health, mental wellness, and healthy lifestyle choices."
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
            Girls <span className="highlight">Empowerment</span>
          </HeroTitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering girls to become confident, educated, and resilient leaders of tomorrow. We believe every girl deserves the opportunity to reach her full potential and create positive change in her community.
          </HeroDescription>
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
            Our Programs
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive empowerment programs designed specifically for girls to build confidence, skills, and leadership abilities
          </SectionSubtitle>
          <ProgramGrid>
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgramIcon>{program.icon}</ProgramIcon>
                <ProgramTitle>{program.title}</ProgramTitle>
                <ProgramDescription>{program.description}</ProgramDescription>
                <ProgramDuration>
                  <FaClock />
                  Duration: {program.duration}
                </ProgramDuration>
              </ProgramCard>
            ))}
          </ProgramGrid>
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
              Our Impact
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Transforming girls' lives through empowerment and education
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

        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Areas of Impact
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            How our girls empowerment programs create lasting positive change
          </SectionSubtitle>
          <Grid>
            {impactAreas.map((area, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardIcon>{area.icon}</CardIcon>
                <CardTitle>{area.title}</CardTitle>
                <CardText>{area.description}</CardText>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Success Stories
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hear from our empowered girls about their transformative journey
          </SectionSubtitle>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialQuote>"{testimonial.quote}"</TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorImage>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AuthorImage>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </Section>

        <Section>
          <Container style={{ textAlign: 'center' }}>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join Our Girls Empowerment Program
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to empower the next generation of female leaders? Enroll your daughter or support our programs today.
            </SectionSubtitle>
            <CTAButton
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now <FaArrowRight />
            </CTAButton>
          </Container>
        </Section>
      </Container>
    </Page>
  );
} 