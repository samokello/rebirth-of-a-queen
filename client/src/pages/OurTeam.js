import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope, FaPlay, FaChevronLeft, FaChevronRight, FaInstagram, FaFacebook } from 'react-icons/fa';

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
  background: url('/images/team/team1 (1).jpg') center/cover no-repeat;
  opacity: 0.3;
  filter: blur(2px);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const VideoLabel = styled.div`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroLeft = styled.div``;

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
  max-width: 500px;

  .highlight {
    color: #fbbf24;
  }
`;

const CTAButton = styled(motion.button)`
  background: #fbbf24;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f59e0b;
    transform: translateY(-2px);
  }
`;

const HeroRight = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: #fbbf24;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(251, 191, 36, 0.4);
  }

  svg {
    color: #000;
    font-size: 1.5rem;
    margin-left: 4px;
  }
`;

const TeamSection = styled.section`
  padding: 80px 0;
  background: #fff;
`;

const TeamLabel = styled.div`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const TeamIntro = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TeamIntroText = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  opacity: 0.9;

  .highlight {
    color: #fbbf24;
  }
`;

const MainTeamMember = styled.div`
  text-align: center;
`;

const MainMemberImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: url('/images/team/akinyi.jpg') center/cover no-repeat;
  margin: 0 auto 1rem;
  border: 4px solid #fbbf24;
`;

const MainMemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const MainMemberTitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const LinkedInLink = styled.a`
  color: #fbbf24;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #f59e0b;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.8rem;

  &:hover {
    background: #fbbf24;
    color: #000;
    transform: translateY(-2px);
  }

  &.linkedin:hover {
    background: #0077b5;
    color: white;
  }

  &.twitter:hover {
    background: #1da1f2;
    color: white;
  }

  &.instagram:hover {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
  }

  &.facebook:hover {
    background: #1877f2;
    color: white;
  }
`;

const TestimonialGrid = styled.div`
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
    background: #f9fafb;
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

const TestimonialContent = styled.div`
  margin-bottom: 2rem;
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
  background: url(${props => props.image}) center/cover no-repeat;
  border: 3px solid #fbbf24;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
`;

const AuthorLocation = styled.p`
  font-size: 0.8rem;
  color: #fbbf24;
`;

const TestimonialStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding: 0 2rem;
`;

const PageIndicator = styled.div`
  font-size: 0.9rem;
  color: #6B7280;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fbbf24;
    color: #000;
  }
`;

const OurTeam = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  const teamTestimonials = [
    {
      name: "Pauline Akinyi",
      title: "Founder & Executive Director",
      location: "Nairobi, Kenya",
      image: "/images/team/akinyi.jpg",
             quote: "As the Founder and Executive Director, I am proud to witness the transformation in our community every day. Every woman has the power to transform her life and her community. At Rebirth of A Queen, we're not just providing skills – we're building confidence, creating opportunities, and fostering a sisterhood that lasts a lifetime.",
      social: {
        linkedin: "pauline-akinyi-rebirth",
        twitter: "@pauline_akinyi",
        instagram: "@pauline_akinyi",
        facebook: "pauline.akinyi.rebirth"
      }
    },
    {
      name: "Simon Shitabule",
      title: "Programs Manager",
      location: "Mombasa, Kenya",
      image: "/images/team/Simon.jpg",
             quote: "Our programs empower women and girls to become leaders and changemakers. I've seen firsthand how education and skills training can break the cycle of poverty. Our programs don't just teach skills – they build sustainable livelihoods and create lasting change in communities.",
      social: {
        linkedin: "simon-shitabule",
        twitter: "@simon_shitabule",
        instagram: "@simon_shitabule",
        facebook: "simon.shitabule"
      }
    },
    {
      name: "Walter Musoda",
      title: "Growth & Strategy Lead",
      location: "Kisumu, Kenya",
      image: "/images/team/walter.jpg",
             quote: "We are committed to growth, strategy, and sustainable impact for every girl and woman. Strategic growth is essential for sustainable impact. We're committed to expanding our reach and creating more opportunities for women and girls across Kenya and beyond.",
      social: {
        linkedin: "walter-musoda",
        twitter: "@walter_musoda",
        instagram: "@walter_musoda",
        facebook: "walter.musoda"
      }
    },
    {
      name: "Elizabeth Akinyi",
      title: "Communication & Gender",
      location: "Nakuru, Kenya",
      image: "/images/team/liz.jpg",
             quote: "Communication is at the heart of gender equality and empowerment. We're breaking down barriers and amplifying women's voices in our communities. Through effective communication, we ensure that every woman's story is heard and valued.",
      social: {
        linkedin: "elizabeth-akinyi",
        twitter: "@elizabeth_akinyi",
        instagram: "@elizabeth_akinyi",
        facebook: "elizabeth.akinyi"
      }
    },
    {
      name: "Zipora Naeku",
      title: "Monitoring & Evaluation",
      location: "Eldoret, Kenya",
      image: "/images/team/Naeku.jpg",
             quote: "Monitoring and evaluation help us ensure every program makes a difference. We measure our impact to continuously improve and maximize our positive influence on women's lives. Data-driven decisions lead to better outcomes for our community.",
      social: {
        linkedin: "zipora-naeku",
        twitter: "@zipora_naeku",
        instagram: "@zipora_naeku",
        facebook: "zipora.naeku"
      }
    },
    {
      name: "Felisha Dacha",
      title: "Human Resource",
      location: "Thika, Kenya",
      image: "/images/team/dacha.jpg",
             quote: "Supporting our team and beneficiaries is my greatest joy. We create an environment where everyone can thrive and contribute to our mission of women's empowerment. Our people are our greatest asset in driving positive change.",
      social: {
        linkedin: "felisha-dacha",
        twitter: "@felisha_dacha",
        instagram: "@felisha_dacha",
        facebook: "felisha.dacha"
      }
    }
  ];

  const handlePrevPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev < totalPages ? prev + 1 : 1);
  };

  const getSocialUrl = (platform, handle) => {
    const urls = {
      linkedin: `https://linkedin.com/in/${handle}`,
      twitter: `https://twitter.com/${handle.replace('@', '')}`,
      instagram: `https://instagram.com/${handle.replace('@', '')}`,
      facebook: `https://facebook.com/${handle}`
    };
    return urls[platform];
  };

  return (
    <Page>
      <Hero>
        <HeroBackground />
        <Container>
          <VideoLabel>Video</VideoLabel>
          <HeroContent>
            <HeroLeft>
              <HeroTitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Empowering women to <span className="highlight">thrive</span>.
              </HeroTitle>
              <HeroDescription
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We help women realize meaningful transformations so that they can deliver substantial value to their communities today and tomorrow.
              </HeroDescription>
              <CTAButton
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                Start collaborating +
              </CTAButton>
            </HeroLeft>
            <HeroRight>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </HeroRight>
          </HeroContent>
        </Container>
      </Hero>

      <TeamSection>
        <Container>
          <TeamLabel>Team</TeamLabel>
          <TeamIntro>
            <TeamIntroText>
              Rebirth of A Queen is led globally by our <span className="highlight">passionate team of women empowerment advocates</span>; our dedicated board of directors and community leaders.
            </TeamIntroText>
            <MainTeamMember>
              <MainMemberImage />
              <MainMemberName>Pauline Akinyi</MainMemberName>
              <MainMemberTitle>Founder & Executive Director, Nairobi</MainMemberTitle>
              <SocialLinks>
                <SocialLink 
                  href={getSocialUrl('linkedin', 'pauline-akinyi-rebirth')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  <FaLinkedin />
                </SocialLink>
                <SocialLink 
                  href={getSocialUrl('twitter', '@pauline_akinyi')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <FaTwitter />
                </SocialLink>
                <SocialLink 
                  href={getSocialUrl('instagram', '@pauline_akinyi')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <FaInstagram />
                </SocialLink>
                <SocialLink 
                  href={getSocialUrl('facebook', 'pauline.akinyi.rebirth')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <FaFacebook />
                </SocialLink>
              </SocialLinks>
            </MainTeamMember>
          </TeamIntro>

          <TestimonialGrid>
            {teamTestimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <TestimonialContent>
                  <TestimonialQuote>
                    {testimonial.quote}
                  </TestimonialQuote>
                  <TestimonialAuthor>
                    <AuthorImage image={testimonial.image} />
                    <AuthorInfo>
                      <AuthorName>{testimonial.name}</AuthorName>
                      <AuthorTitle>{testimonial.title}</AuthorTitle>
                      <AuthorLocation>{testimonial.location}</AuthorLocation>
                      <SocialLinks>
                        <SocialLink 
                          href={getSocialUrl('linkedin', testimonial.social.linkedin)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="linkedin"
                          title="LinkedIn"
                        >
                          <FaLinkedin />
                        </SocialLink>
                        <SocialLink 
                          href={getSocialUrl('twitter', testimonial.social.twitter)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="twitter"
                          title="X (Twitter)"
                        >
                          <FaTwitter />
                        </SocialLink>
                        <SocialLink 
                          href={getSocialUrl('instagram', testimonial.social.instagram)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="instagram"
                          title="Instagram"
                        >
                          <FaInstagram />
                        </SocialLink>
                        <SocialLink 
                          href={getSocialUrl('facebook', testimonial.social.facebook)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="facebook"
                          title="Facebook"
                        >
                          <FaFacebook />
                        </SocialLink>
                      </SocialLinks>
                    </AuthorInfo>
                  </TestimonialAuthor>
                </TestimonialContent>
                
                                 <TestimonialStats>
                   <StatItem>
                     <StatValue>🌟</StatValue>
                     <StatLabel>Passion</StatLabel>
                   </StatItem>
                   <StatItem>
                     <StatValue>💪</StatValue>
                     <StatLabel>Empowerment</StatLabel>
                   </StatItem>
                   <StatItem>
                     <StatValue>❤️</StatValue>
                     <StatLabel>Community</StatLabel>
                   </StatItem>
                 </TestimonialStats>
              </TestimonialCard>
            ))}
          </TestimonialGrid>

          <Pagination>
            <PageIndicator>{currentPage}/{totalPages}</PageIndicator>
            <NavigationButtons>
              <NavButton onClick={handlePrevPage}>
                <FaChevronLeft />
              </NavButton>
              <NavButton onClick={handleNextPage}>
                <FaChevronRight />
              </NavButton>
            </NavigationButtons>
          </Pagination>
        </Container>
      </TeamSection>
    </Page>
  );
};

export default OurTeam; 