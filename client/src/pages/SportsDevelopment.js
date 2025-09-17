import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFutbol, FaUsers, FaTrophy, FaHeart, FaHandshake, FaChartLine, FaStar, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaBullseye, FaGlobe, FaMedal, FaBook, FaLaptop, FaMicrophone, FaUsersCog, FaShieldAlt, FaRocket, FaPalette, FaDumbbell, FaRunning, FaBasketballBall, FaVolleyballBall } from 'react-icons/fa';

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
    background: url('/images/gym/gym.jpg') center/cover;
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

export default function SportsDevelopment() {
  const programs = [
    {
      icon: <FaFutbol />,
      title: "Football Development",
      description: "Comprehensive football training programs for all skill levels, from beginners to advanced players, focusing on technique, teamwork, and sportsmanship.",
      duration: "Year-round"
    },
    {
      icon: <FaBasketballBall />,
      title: "Basketball Academy",
      description: "Professional basketball coaching, skill development, and competitive training for youth and young adults interested in the sport.",
      duration: "8 months"
    },
    {
      icon: <FaVolleyballBall />,
      title: "Volleyball Training",
      description: "Volleyball programs emphasizing teamwork, coordination, and strategic thinking for players of all ages and skill levels.",
      duration: "6 months"
    },
    {
      icon: <FaRunning />,
      title: "Athletics & Track",
      description: "Track and field training, running programs, and athletic development focusing on speed, endurance, and overall fitness.",
      duration: "10 months"
    },
    {
      icon: <FaDumbbell />,
      title: "Fitness & Conditioning",
      description: "General fitness programs, strength training, and conditioning sessions to improve overall health and athletic performance.",
      duration: "Ongoing"
    },
    {
      icon: <FaTrophy />,
      title: "Competitive Sports",
      description: "Preparation for local, regional, and national competitions with specialized coaching and tournament participation.",
      duration: "12 months"
    }
  ];

  const stats = [
    { number: "800+", label: "Athletes Trained" },
    { number: "15", label: "Sports Disciplines" },
    { number: "25+", label: "Tournaments Won" },
    { number: "95%", label: "Fitness Improvement" }
  ];

  const testimonials = [
    {
      quote: "The sports development program transformed my life. I went from being a shy kid to a confident athlete who now represents my school in regional competitions.",
      name: "Michael Ochieng",
      title: "Football Captain, Age 17"
    },
    {
      quote: "Through the basketball academy, I learned discipline, teamwork, and leadership. The coaches are amazing and really care about our development both on and off the court.",
      name: "Sarah Wanjiku",
      title: "Basketball Player, Age 16"
    },
    {
      quote: "The fitness program helped me stay healthy and active. I've made great friends and learned the importance of regular exercise and proper nutrition.",
      name: "David Mwangi",
      title: "Fitness Enthusiast, Age 18"
    }
  ];

  const impactAreas = [
    {
      icon: <FaHeart />,
      title: "Physical Health",
      description: "Improved fitness levels, better coordination, and enhanced overall physical well-being among participants."
    },
    {
      icon: <FaUsers />,
      title: "Teamwork Skills",
      description: "Development of collaboration, communication, and leadership abilities through team sports."
    },
    {
      icon: <FaBullseye />,
      title: "Discipline & Focus",
      description: "Enhanced concentration, goal-setting abilities, and commitment to personal improvement."
    },
    {
      icon: <FaStar />,
      title: "Confidence Building",
      description: "Increased self-esteem, resilience, and mental toughness through sports achievements."
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
            Sports <span className="highlight">Development</span>
          </HeroTitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Developing champions through comprehensive sports programs that build physical fitness, teamwork, discipline, and character. We believe sports have the power to transform lives and create strong, healthy communities.
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
            Our Sports Programs
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive sports development programs designed to nurture talent, build character, and promote healthy lifestyles
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
              Building champions and healthy communities through sports
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
            How our sports development programs create lasting positive change
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
            Hear from our athletes about their transformative journey
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
              Join Our Sports Programs
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to develop your athletic potential? Join our sports programs and become part of a winning team.
            </SectionSubtitle>
            <CTAButton
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now <FaArrowRight />
            </CTAButton>
          </Container>
        </Section>
      </Container>
    </Page>
  );
} 