import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { 
  FaHeart, 
  FaUsers, 
  FaHandshake, 
  FaCalendarAlt,
  FaArrowRight,
  FaDollarSign,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaStar,
  FaGift,
  FaHandHoldingHeart,
  FaLightbulb,
  FaRocket
} from 'react-icons/fa';

const GetInvolved = () => {
  const countersRef = useRef(null);
  const isInView = useInView(countersRef, { once: true });

  const volunteerStats = [
    { number: 150, label: 'Active Volunteers', icon: FaUsers },
    { number: 5000, label: 'Hours Donated', icon: FaClock },
    { number: 25, label: 'Volunteer Events', icon: FaCalendarAlt },
    { number: 95, label: 'Satisfaction Rate', icon: FaStar }
  ];

  const donationStats = [
    { number: 1000, label: 'Donors', icon: FaHeart },
    { number: 5000000, label: 'KES Raised', icon: FaDollarSign },
    { number: 50, label: 'Projects Funded', icon: FaRocket },
    { number: 100, label: 'Lives Changed', icon: FaHandHoldingHeart }
  ];

  const volunteerOpportunities = [
    {
      title: 'Education Support',
      description: 'Help teach literacy, computer skills, and life skills to women in our programs.',
      icon: FaUsers,
      time: '2-4 hours/week',
      location: 'Nairobi Center'
    },
    {
      title: 'Mentorship Program',
      description: 'Provide guidance and support to program participants as they build their careers.',
      icon: FaHandshake,
      time: '1-2 hours/week',
      location: 'Virtual/In-person'
    },
    {
      title: 'Event Coordination',
      description: 'Help organize workshops, fundraisers, and community events.',
      icon: FaCalendarAlt,
      time: 'Flexible',
      location: 'Various Locations'
    },
    {
      title: 'Administrative Support',
      description: 'Assist with office tasks, data entry, and program coordination.',
      icon: FaClock,
      time: '3-5 hours/week',
      location: 'Nairobi Office'
    }
  ];

  const donationOptions = [
    {
      title: 'Monthly Donor',
      amount: '1,000 KES',
      description: 'Support our ongoing programs with a monthly contribution.',
      icon: FaHeart,
      impact: 'Provides education for 1 woman per month'
    },
    {
      title: 'Program Sponsor',
      amount: '5,000 KES',
      description: 'Sponsor a specific program or workshop.',
      icon: FaStar,
      impact: 'Funds a complete skills training program'
    },
    {
      title: 'Community Builder',
      amount: '10,000 KES',
      description: 'Help build and expand our community centers.',
      icon: FaRocket,
      impact: 'Supports community infrastructure development'
    },
    {
      title: 'Life Changer',
      amount: '25,000 KES',
      description: 'Transform lives with a significant contribution.',
      icon: FaGift,
      impact: 'Provides comprehensive support for 5 women'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOverlay />
        <Container bg={false}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent>
              <Breadcrumb>
                <Link to="/">Home</Link>
                <FaArrowRight />
                <span>Get Involved</span>
              </Breadcrumb>
              <HeroTitle>Get Involved & Make a Difference</HeroTitle>
              <HeroSubtitle>
                Join our community of changemakers and help us empower more women and girls. 
                Every contribution, big or small, creates lasting positive change.
              </HeroSubtitle>
            </HeroContent>
          </motion.div>
        </Container>
      </HeroSection>

      <Container>
        {/* Impact Stats */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Your Impact in Numbers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              See how your involvement creates real change in communities across Kenya.
            </motion.p>
          </SectionHeader>

          <StatsTabs>
            <TabButtons>
              <TabButton active>Volunteer Impact</TabButton>
              <TabButton>Donation Impact</TabButton>
            </TabButtons>

            <TabContent>
              <StatsGrid ref={countersRef}>
                {volunteerStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <StatCard>
                      <StatIcon>
                        <stat.icon />
                      </StatIcon>
                      <StatNumber>
                        {isInView ? (
                          <CountUp 
                            end={stat.number} 
                            duration={2.5} 
                            suffix={stat.label === 'Satisfaction Rate' ? '%' : '+'}
                            useEasing={true}
                            start={0}
                          />
                        ) : '0'}
                      </StatNumber>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatCard>
                  </motion.div>
                ))}
              </StatsGrid>
            </TabContent>
          </StatsTabs>
        </Section>

        {/* Volunteer Opportunities */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Volunteer Opportunities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Share your skills, time, and passion to help empower women and transform communities.
            </motion.p>
          </SectionHeader>

          <OpportunitiesGrid>
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <OpportunityCard>
                  <OpportunityIcon>
                    <opportunity.icon />
                  </OpportunityIcon>
                  <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                  <OpportunityDescription>{opportunity.description}</OpportunityDescription>
                  <OpportunityDetails>
                    <DetailItem>
                      <FaClock />
                      <span>{opportunity.time}</span>
                    </DetailItem>
                    <DetailItem>
                      <FaMapMarkerAlt />
                      <span>{opportunity.location}</span>
                    </DetailItem>
                  </OpportunityDetails>
                  <VolunteerButton onClick={() => window.location.href = '/contact'}>
                    Apply Now <FaArrowRight />
                  </VolunteerButton>
                </OpportunityCard>
              </motion.div>
            ))}
          </OpportunitiesGrid>
        </Section>

        {/* Donation Options */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ways to Donate
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Choose how you want to make a difference. Every donation directly supports our programs.
            </motion.p>
          </SectionHeader>

          <DonationGrid>
            {donationOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DonationCard>
                  <DonationIcon>
                    <option.icon />
                  </DonationIcon>
                  <DonationTitle>{option.title}</DonationTitle>
                  <DonationAmount>{option.amount}</DonationAmount>
                  <DonationDescription>{option.description}</DonationDescription>
                  <DonationImpact>
                    <strong>Impact:</strong> {option.impact}
                  </DonationImpact>
                  <DonateButton to="/donate">
                    Donate Now <FaArrowRight />
                  </DonateButton>
                </DonationCard>
              </motion.div>
            ))}
          </DonationGrid>
        </Section>

        {/* Partnership Opportunities */}
        <Section>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Partnership Opportunities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join forces with us to create greater impact through strategic partnerships.
            </motion.p>
          </SectionHeader>

          <PartnershipGrid>
            <PartnershipCard>
              <PartnershipIcon>
                <FaHandshake />
              </PartnershipIcon>
              <PartnershipTitle>Corporate Partnerships</PartnershipTitle>
              <PartnershipDescription>
                Partner with your company to support our programs through funding, 
                employee volunteering, or in-kind donations.
              </PartnershipDescription>
              <PartnershipButton onClick={() => window.location.href = '/contact'}>
                Learn More <FaArrowRight />
              </PartnershipButton>
            </PartnershipCard>

            <PartnershipCard>
              <PartnershipIcon>
                <FaLightbulb />
              </PartnershipIcon>
              <PartnershipTitle>Skills Exchange</PartnershipTitle>
              <PartnershipDescription>
                Share your expertise through workshops, training sessions, or 
                mentorship programs for our participants.
              </PartnershipDescription>
              <PartnershipButton onClick={() => window.location.href = '/contact'}>
                Learn More <FaArrowRight />
              </PartnershipButton>
            </PartnershipCard>

            <PartnershipCard>
              <PartnershipIcon>
                <FaRocket />
              </PartnershipIcon>
              <PartnershipTitle>Program Sponsorship</PartnershipTitle>
              <PartnershipDescription>
                Sponsor specific programs or initiatives and see your impact 
                through detailed reporting and updates.
              </PartnershipDescription>
              <PartnershipButton onClick={() => window.location.href = '/contact'}>
                Learn More <FaArrowRight />
              </PartnershipButton>
            </PartnershipCard>
          </PartnershipGrid>
        </Section>

        {/* Contact Section */}
        <Section>
          <ContactSection>
            <ContactContent>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ContactTitle>Ready to Get Started?</ContactTitle>
                <ContactDescription>
                  We'd love to hear from you and discuss how you can get involved 
                  in our mission to empower women and transform communities.
                </ContactDescription>
                <ContactInfo>
                  <ContactItem>
                    <FaEnvelope />
                    <span>volunteer@rebirthofaqueen.org</span>
                  </ContactItem>
                  <ContactItem>
                    <FaPhone />
                    <span>+254 712 345 678</span>
                  </ContactItem>
                  <ContactItem>
                    <FaMapMarkerAlt />
                    <span>Nairobi, Kenya</span>
                  </ContactItem>
                </ContactInfo>
              </motion.div>
            </ContactContent>

            <ContactCTA>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <CTATitle>Take the First Step</CTATitle>
                <CTADescription>
                  Join our community of changemakers and start making a difference today.
                </CTADescription>
                <CTAButtons>
                  <PrimaryButton to="/donate">
                    Donate Now <FaArrowRight />
                  </PrimaryButton>
                  <SecondaryButton to="/contact">
                    Contact Us <FaArrowRight />
                  </SecondaryButton>
                </CTAButtons>
              </motion.div>
            </ContactCTA>
          </ContactSection>
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
  background: ${({ bg, theme }) => bg !== false ? theme.palette.background.default : 'transparent'};
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
    color: ${props => props.theme?.colors?.textLight || '#94A3B8'};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme?.colors?.primaryLight || '#A78BFA'};
    }
  }

  span {
    color: ${props => props.theme?.colors?.textLight || '#94A3B8'};
    opacity: 0.8;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: ${props => props.theme?.colors?.textLight || '#FFFFFF'};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: ${props => props.theme?.colors?.textLight || '#FFFFFF'};
  opacity: 0.95;
  line-height: 1.6;
`;

const Section = styled.section`
  padding: 3rem 0;
  background: ${({ theme }) => theme.palette.background.default};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
  }

  p {
    font-size: 1rem;
    color: ${props => props.theme?.colors?.textSecondary || '#475569'};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }
  h2, h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const StatsTabs = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme?.colors?.textLight || '#94A3B8'};
`;

const TabButton = styled.button`
  flex: 1;
  padding: 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? '#FFFFFF' : (props.theme?.colors?.textSecondary || '#475569')};
  background: ${props => props.active ? (props.theme?.colors?.primary || '#8B5CF6') : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid ${props => props.active ? (props.theme?.colors?.primary || '#8B5CF6') : 'transparent'};

  &:hover {
    color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
    background: rgba(139, 92, 246, 0.05);
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.palette.background.paper};
  h3, p {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  font-weight: 500;
`;

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const OpportunityCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const OpportunityIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.25rem;
`;

const OpportunityTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const OpportunityDescription = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const OpportunityDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  font-size: 0.9rem;

  svg {
    color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  }
`;

const VolunteerButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  }
`;

const DonationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const DonationCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DonationIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.25rem;
`;

const DonationTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const DonationAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  margin-bottom: 1rem;
`;

const DonationDescription = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.5;
  margin-bottom: 0.75rem;
`;

const DonationImpact = styled.div`
  background: ${({ theme }) => theme.palette.background.light};
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
`;

const DonateButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
    color: white;
  }
`;

const PartnershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const PartnershipCard = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PartnershipIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.25rem;
`;

const PartnershipTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const PartnershipDescription = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const PartnershipButton = styled.button`
  background: none;
  color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  border: 2px solid ${props => props.theme?.colors?.primary || '#8B5CF6'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme?.colors?.primary || '#8B5CF6'};
    color: white;
    transform: translateY(-2px);
  }
`;

const ContactSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactContent = styled.div``;

const ContactTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const ContactDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};

  svg {
    color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
    font-size: 1.1rem;
  }
`;

const ContactCTA = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const CTATitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${props => props.theme?.colors?.textPrimary || '#1e293b'};
`;

const CTADescription = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#475569'};
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#8B5CF6'} 0%, ${props => props.theme?.colors?.primaryDark || '#7C3AED'} 100%);
  color: white;
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
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
    color: white;
  }
`;

const SecondaryButton = styled(Link)`
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${props => props.theme?.colors?.primary || '#8B5CF6'};
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid ${props => props.theme?.colors?.primary || '#8B5CF6'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme?.colors?.primary || '#8B5CF6'};
    color: white;
    transform: translateY(-2px);
  }
`;

export default GetInvolved; 