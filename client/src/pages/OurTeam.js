import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  color: #1F2937;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://res.cloudinary.com/samokello/image/upload/v1758125551/rebirth-of-a-queen/images/team1_3_b2axdt.jpg') center/cover no-repeat;
  opacity: 0.2;
  filter: blur(1px);
`;

const Container = styled.div`
  max-width: 1200px;
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
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: white;

  .highlight {
    background: linear-gradient(45deg, #fbbf24, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  color: white;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  color: #000;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(251, 191, 36, 0.4);
  }
`;

const StatsSection = styled.div`
  background: white;
  padding: 80px 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 600;
`;

const TeamSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  text-align: center;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const TeamCard = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, #667eea, #764ba2);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

const MemberImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(${props => props.image}) center/cover no-repeat;
  margin: 0 auto 1.5rem;
  border: 4px solid #f1f5f9;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2);
    z-index: -1;
  }
`;

const MemberName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const MemberTitle = styled.p`
  font-size: 1rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const MemberLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const MemberQuote = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #475569;
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;

  &::before {
    content: '"';
    font-size: 2rem;
    color: #667eea;
    position: absolute;
    top: -10px;
    left: -10px;
    font-family: serif;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &.linkedin:hover {
    background: #0077b5;
    color: white;
    border-color: #0077b5;
  }

  &.twitter:hover {
    background: #1da1f2;
    color: white;
    border-color: #1da1f2;
  }

  &.instagram:hover {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
    border-color: transparent;
  }

  &.facebook:hover {
    background: #1877f2;
    color: white;
    border-color: #1877f2;
  }
`;


const OurTeam = () => {

  const teamMembers = [
    {
      name: "Pauline Akinyi",
      title: "Founder & Executive Director",
      location: "Nairobi, Kenya",
      image: "https://res.cloudinary.com/samokello/image/upload/v1758125547/rebirth-of-a-queen/images/akinyi_dyvfao.jpg",
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
      image: "https://res.cloudinary.com/samokello/image/upload/v1758125517/rebirth-of-a-queen/images/leadership_dv2wan.jpg",
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
      image: "https://res.cloudinary.com/samokello/image/upload/v1758121424/rebirth-of-a-queen/images/orientation1_2_gqbuyl.jpg",
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
      title: "Communication & Gender Officer",
      location: "Nakuru, Kenya",
      image: "https://res.cloudinary.com/samokello/image/upload/v1758125553/rebirth-of-a-queen/images/liz_weavbn.jpg",
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
      title: "Monitoring & Evaluation Lead",
      location: "Eldoret, Kenya",
      image: "https://res.cloudinary.com/samokello/image/upload/v1758125551/rebirth-of-a-queen/images/Naeku_qhnife.jpg",
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
      title: "Human Resource Manager",
      location: "Thika, Kenya",
      image: "https://res.cloudinary.com/samokello/image/upload/v1758125549/rebirth-of-a-queen/images/dacha_s161hz.jpg",
      quote: "Supporting our team and beneficiaries is my greatest joy. We create an environment where everyone can thrive and contribute to our mission of women's empowerment. Our people are our greatest asset in driving positive change.",
      social: {
        linkedin: "felisha-dacha",
        twitter: "@felisha_dacha",
        instagram: "@felisha_dacha",
        facebook: "felisha.dacha"
      }
    }
  ];


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
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our <span className="highlight">Amazing Team</span>
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Passionate leaders dedicated to empowering women and creating lasting change in communities across Kenya and beyond.
            </HeroDescription>
            <CTAButton
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              Join Our Mission
            </CTAButton>
          </HeroContent>
        </Container>
      </Hero>

      <StatsSection>
        <Container>
          <StatsGrid>
            <StatCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <StatNumber>6+</StatNumber>
              <StatLabel>Team Members</StatLabel>
            </StatCard>
            <StatCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <StatNumber>500+</StatNumber>
              <StatLabel>Women Empowered</StatLabel>
            </StatCard>
            <StatCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <StatNumber>15+</StatNumber>
              <StatLabel>Programs Delivered</StatLabel>
            </StatCard>
            <StatCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <StatNumber>5</StatNumber>
              <StatLabel>Counties Reached</StatLabel>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>

      <TeamSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Leadership Team
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the passionate individuals who drive our mission forward, each bringing unique expertise and unwavering commitment to women's empowerment.
          </SectionSubtitle>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <MemberImage image={member.image} />
                <MemberName>{member.name}</MemberName>
                <MemberTitle>{member.title}</MemberTitle>
                <MemberLocation>
                  <FaMapMarkerAlt />
                  {member.location}
                </MemberLocation>
                <MemberQuote>{member.quote}</MemberQuote>
                <SocialLinks>
                  <SocialLink 
                    href={getSocialUrl('linkedin', member.social.linkedin)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="linkedin"
                    title="LinkedIn"
                  >
                    <FaLinkedin />
                  </SocialLink>
                  <SocialLink 
                    href={getSocialUrl('twitter', member.social.twitter)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="twitter"
                    title="X (Twitter)"
                  >
                    <FaTwitter />
                  </SocialLink>
                  <SocialLink 
                    href={getSocialUrl('instagram', member.social.instagram)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="instagram"
                    title="Instagram"
                  >
                    <FaInstagram />
                  </SocialLink>
                  <SocialLink 
                    href={getSocialUrl('facebook', member.social.facebook)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="facebook"
                    title="Facebook"
                  >
                    <FaFacebook />
                  </SocialLink>
                </SocialLinks>
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>
    </Page>
  );
};

export default OurTeam; 