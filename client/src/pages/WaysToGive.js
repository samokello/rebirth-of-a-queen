import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaGraduationCap, 
  FaUsers, 
  FaHandsHelping, 
  FaCalendarAlt,
  FaGift,
  FaArrowRight,
  FaChartLine,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';

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

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
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
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #c0392b);
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

const CardButton = styled(Link)`
  background: #e74c3c;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
`;

const ImpactSection = styled.div`
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  color: white;
  padding: 80px 0;
  margin: 60px 0;
  border-radius: 12px;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ImpactCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const ImpactNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #e74c3c;
`;

const ImpactLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const BenefitsSection = styled.div`
  background: white;
  padding: 80px 0;
  margin: 60px 0;
  border-radius: 12px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BenefitCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border-left: 4px solid #e74c3c;
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const BenefitTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
`;

const BenefitDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  border-radius: 12px;
  margin: 60px 0;
`;

const CTATitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAText = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  background: white;
  color: #e74c3c;
  text-decoration: none;
  padding: 18px 36px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

export default function WaysToGive() {
  const givingOptions = [
    {
      icon: <FaHeart />,
      title: "One-Time Donation",
      description: "Make a single donation to support our programs and help create immediate impact in communities across Kenya.",
      link: "/donate"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Monthly Giving",
      description: "Join our monthly giving program to provide consistent support and help us plan long-term sustainable programs.",
      link: "/donate"
    },
    {
      icon: <FaGraduationCap />,
      title: "Sponsor a Student",
      description: "Directly support a student's education journey with monthly contributions that cover tuition, books, and supplies.",
      link: "/donate"
    },
    {
      icon: <FaGift />,
      title: "Legacy Giving",
      description: "Leave a lasting impact by including Rebirth of a Queen in your estate planning or creating a named fund.",
      link: "/donate"
    },
    {
      icon: <FaUsers />,
      title: "Corporate Partnership",
      description: "Partner with us to create meaningful corporate social responsibility programs and employee engagement opportunities.",
      link: "/contact"
    },
    {
      icon: <FaHandsHelping />,
      title: "Volunteer Your Time",
      description: "Share your skills and expertise by volunteering with our programs or serving on our advisory committees.",
      link: "/contact"
    }
  ];

  const impactStats = [
    { number: "10,000+", label: "Lives Impacted" },
    { number: "95%", label: "Program Success Rate" },
    { number: "15", label: "Years of Service" },
    { number: "50+", label: "Communities Served" }
  ];

  const benefits = [
    {
      icon: <FaCheckCircle />,
      title: "Transparency",
      description: "Receive regular updates on how your donation is being used and the impact it's creating."
    },
    {
      icon: <FaChartLine />,
      title: "Measurable Impact",
      description: "See the direct results of your contribution through our detailed impact reports and success stories."
    },
    {
      icon: <FaStar />,
      title: "Tax Benefits",
      description: "All donations are tax-deductible and you'll receive official receipts for your records."
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
            Ways to Give
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every contribution, no matter the size, makes a real difference in the lives of women and girls across Kenya. Choose the giving option that works best for you.
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
            Choose Your Impact
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From one-time donations to long-term partnerships, there are many ways you can support our mission and create lasting change.
          </SectionSubtitle>
          <Grid>
            {givingOptions.map((option, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardIcon>{option.icon}</CardIcon>
                <CardTitle>{option.title}</CardTitle>
                <CardText>{option.description}</CardText>
                <CardButton to={option.link}>
                  Get Started <FaArrowRight />
                </CardButton>
              </Card>
            ))}
          </Grid>
        </Section>

        <ImpactSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ color: 'white' }}
            >
              Your Impact in Numbers
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              See how your generosity is creating real change in communities across Kenya
            </SectionSubtitle>
            <ImpactGrid>
              {impactStats.map((stat, index) => (
                <ImpactCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ImpactNumber>{stat.number}</ImpactNumber>
                  <ImpactLabel>{stat.label}</ImpactLabel>
                </ImpactCard>
              ))}
            </ImpactGrid>
          </Container>
        </ImpactSection>

        <BenefitsSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Give With Us
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We're committed to transparency, accountability, and maximizing the impact of every dollar donated.
            </SectionSubtitle>
            <BenefitsGrid>
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BenefitIcon>{benefit.icon}</BenefitIcon>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitDescription>{benefit.description}</BenefitDescription>
                </BenefitCard>
              ))}
            </BenefitsGrid>
          </Container>
        </BenefitsSection>

        <CTASection>
          <Container>
            <CTATitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Make a Difference?
            </CTATitle>
            <CTAText
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of donors who are already creating positive change in communities across Kenya. Every gift matters.
            </CTAText>
            <CTAButton to="/donate">
              <FaHeart />
              Donate Now
            </CTAButton>
          </Container>
        </CTASection>
      </Container>
    </Page>
  );
} 