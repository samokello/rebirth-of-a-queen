import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaHandshake, 
  FaHeart, 
  FaGraduationCap, 
  FaUsers, 
  FaGlobe, 
  FaBuilding,
  FaStar,
  FaQuoteLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMapMarkerAlt
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

const PartnerCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CategoryCard = styled(motion.div)`
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

const CategoryIcon = styled.div`
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

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1F2937;
`;

const CategoryDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CategoryStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FeaturedPartners = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const PartnerCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PartnerLogo = styled.div`
  width: 120px;
  height: 80px;
  background: ${props => props.bg || '#f3f4f6'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6B7280;
`;

const PartnerName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1F2937;
`;

const PartnerType = styled.p`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`;

const PartnerDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PartnerLink = styled.a`
  color: #fbbf24;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f59e0b;
  }
`;

const PartnershipOpportunities = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 3rem;
  margin-top: 3rem;
`;

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const OpportunityCard = styled(motion.div)`
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

const OpportunityIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const OpportunityTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1F2937;
`;

const OpportunityDescription = styled.p`
  color: #6B7280;
  font-size: 0.9rem;
  line-height: 1.5;
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 4rem;
    color: #fbbf24;
    font-family: serif;
    opacity: 0.3;
  }
`;

const TestimonialQuote = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4B5563;
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.bg || '#f3f4f6'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6B7280;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1F2937;
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 0.25rem;
`;

const AuthorCompany = styled.p`
  font-size: 0.8rem;
  color: #fbbf24;
  font-weight: 600;
`;

const OurPartners = () => {
  const partnerCategories = [
    {
      icon: <FaHeart />,
      title: "Donors & Funders",
      description: "Organizations and individuals who provide financial support to our programs and initiatives.",
      stats: { count: "50+", impact: "High" }
    },
    {
      icon: <FaGraduationCap />,
      title: "Educational Partners",
      description: "Universities, schools, and training institutions that support our educational programs.",
      stats: { count: "25+", impact: "Medium" }
    },
    {
      icon: <FaBuilding />,
      title: "Corporate Partners",
      description: "Businesses and corporations that provide resources, expertise, and employment opportunities.",
      stats: { count: "30+", impact: "High" }
    },
    {
      icon: <FaGlobe />,
      title: "International NGOs",
      description: "Global organizations that collaborate with us on international development projects.",
      stats: { count: "15+", impact: "Medium" }
    }
  ];

  const featuredPartners = [
    {
      name: "UN Women",
      type: "International Partner",
      description: "Leading global organization dedicated to gender equality and women's empowerment.",
      logo: "UN Women",
      bg: "#C41E3A"
    },
    {
      name: "Mastercard Foundation",
      type: "Funding Partner",
      description: "Supporting our financial inclusion and entrepreneurship programs for young women.",
      logo: "MC",
      bg: "#FF5F00"
    },
    {
      name: "Kenya Women's Trust",
      type: "Local Partner",
      description: "Collaborating on community-based women's empowerment initiatives.",
      logo: "KWT",
      bg: "#8B5CF6"
    },
    {
      name: "Microsoft",
      type: "Technology Partner",
      description: "Providing digital skills training and technology resources for our programs.",
      logo: "MS",
      bg: "#00A4EF"
    },
    {
      name: "African Development Bank",
      type: "Development Partner",
      description: "Supporting our economic empowerment and sustainable development projects.",
      logo: "ADB",
      bg: "#00A651"
    },
    {
      name: "Plan International",
      type: "NGO Partner",
      description: "Working together on girls' education and youth development programs.",
      logo: "PI",
      bg: "#E31837"
    }
  ];

  const partnershipOpportunities = [
    {
      icon: <FaGraduationCap />,
      title: "Educational Sponsorship",
      description: "Sponsor a girl's education and provide mentorship opportunities."
    },
    {
      icon: <FaUsers />,
      title: "Skills Training",
      description: "Provide vocational training and professional development programs."
    },
    {
      icon: <FaHeart />,
      title: "Health & Wellness",
      description: "Support our health education and wellness programs for women."
    },
    {
      icon: <FaGlobe />,
      title: "Technology Access",
      description: "Help bridge the digital divide with technology and internet access."
    }
  ];

  const partnerTestimonials = [
    {
      quote: "Working with Rebirth of A Queen has been transformative. Their commitment to women's empowerment aligns perfectly with our mission, and the impact we've seen together is remarkable.",
      name: "Sarah Johnson",
      title: "Program Director",
      company: "UN Women Kenya",
      bg: "#C41E3A"
    },
    {
      quote: "The partnership with Rebirth of A Queen has enabled us to reach more young women with our financial inclusion programs. Their community-based approach is truly effective.",
      name: "David Mwangi",
      title: "Country Director",
      company: "Mastercard Foundation",
      bg: "#FF5F00"
    },
    {
      quote: "We've seen incredible results from our collaboration. The women in our programs have gained confidence, skills, and opportunities they never thought possible.",
      name: "Grace Ochieng",
      title: "Executive Director",
      company: "Kenya Women's Trust",
      bg: "#8B5CF6"
    }
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
              Our <span className="highlight">Partners</span>
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Together with our valued partners, we're creating lasting change in communities across Kenya. 
              Our collaborations span education, healthcare, technology, and economic empowerment.
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
              Partner Categories
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We work with diverse partners across different sectors to maximize our impact and reach
            </SectionSubtitle>
          </SectionHeader>

          <PartnerCategories>
            {partnerCategories.map((category, index) => (
              <CategoryCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <CategoryStats>
                  <StatItem>
                    <StatValue>{category.stats.count}</StatValue>
                    <StatLabel>Partners</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{category.stats.impact}</StatValue>
                    <StatLabel>Impact</StatLabel>
                  </StatItem>
                </CategoryStats>
              </CategoryCard>
            ))}
          </PartnerCategories>
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
              Featured Partners
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Meet some of our key partners who are making a difference alongside us
            </SectionSubtitle>
          </SectionHeader>

          <FeaturedPartners>
            {featuredPartners.map((partner, index) => (
              <PartnerCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <PartnerLogo bg={partner.bg}>{partner.logo}</PartnerLogo>
                <PartnerName>{partner.name}</PartnerName>
                <PartnerType>{partner.type}</PartnerType>
                <PartnerDescription>{partner.description}</PartnerDescription>
                <PartnerLink href="#" target="_blank">
                  Visit Website <FaExternalLinkAlt />
                </PartnerLink>
              </PartnerCard>
            ))}
          </FeaturedPartners>
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
              Partnership Opportunities
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join us in our mission to empower women and girls. There are many ways to partner with us
            </SectionSubtitle>
          </SectionHeader>

          <PartnershipOpportunities>
            <OpportunitiesGrid>
              {partnershipOpportunities.map((opportunity, index) => (
                <OpportunityCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <OpportunityIcon>{opportunity.icon}</OpportunityIcon>
                  <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                  <OpportunityDescription>{opportunity.description}</OpportunityDescription>
                </OpportunityCard>
              ))}
            </OpportunitiesGrid>

            <CTAButton
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Become a Partner <FaArrowRight />
            </CTAButton>
          </PartnershipOpportunities>
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
              Partner Testimonials
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hear from our partners about the impact of our collaboration
            </SectionSubtitle>
          </SectionHeader>

          <TestimonialsGrid>
            {partnerTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <TestimonialQuote>{testimonial.quote}</TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorImage bg={testimonial.bg}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AuthorImage>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                    <AuthorCompany>{testimonial.company}</AuthorCompany>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </Container>
      </Section>
    </Page>
  );
};

export default OurPartners; 