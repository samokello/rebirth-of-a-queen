import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Hero = styled.section`
  background: url('/images/branding/about-hero.jpg') center/cover no-repeat;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 2px 8px #0008;
`;
const HeroTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
`;
const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
`;
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const TeamGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;
const TeamCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 1.5rem 1rem;
  text-align: center;
  width: 200px;
`;
const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.7rem;
`;
const Name = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
`;
const Bio = styled.p`
  font-size: 0.97rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
const team = [
  { name: 'Pauline Akinyi', role: 'Founder & Executive Director', image: "https://res.cloudinary.com/samokello/image/upload/v1758125547/rebirth-of-a-queen/images/akinyi_dyvfao.jpg",
    alt: "Portrait of Pauline Akinyi - Founder & Executive Director of Rebirth of a Queen", bio: 'Visionary leader and advocate for women’s empowerment.' },
  { name: 'Simon Shitabule', role: 'Programs Manager', image: "https://res.cloudinary.com/samokello/image/upload/v1758125517/rebirth-of-a-queen/images/leadership_dv2wan.jpg",
    alt: "Portrait of Simon Shitabule - Programs Manager", bio: 'Expert in program design and community engagement.' },
  { name: 'Walter Musoda', role: 'Growth & Strategy Lead', image: "https://res.cloudinary.com/samokello/image/upload/v1758121424/rebirth-of-a-queen/images/orientation1_2_gqbuyl.jpg",
    alt: "Portrait of Walter Musoda - Growth & Strategy Lead", bio: 'Strategist driving organizational growth and impact.' },
  { name: 'Elizabeth Akinyi', role: 'Communication & Gender', img: '/images/team/team1 (4).jpg', bio: 'Champion for gender equality and effective communication.' },
  { name: 'Zipora Naeku', role: 'Monitoring & Evaluation', img: '/images/team/team1 (5).jpg', bio: 'Ensures program quality and measurable results.' },
  { name: 'Felisha Dacha', role: 'Human Resource',     image: "https://res.cloudinary.com/samokello/image/upload/v1758125549/rebirth-of-a-queen/images/dacha_s161hz.jpg",
    alt: "Portrait of Felisha Dacha - Human Resource Manager",
 bio: 'Fosters a positive and inclusive team culture.' },
];
const Team = () => (
  <>
    <Hero as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <HeroTitle>Our Team</HeroTitle>
    </Hero>
    <Section>
      <SectionTitle>Meet the Team</SectionTitle>
      <TeamGrid>
        {team.map((member, i) => (
          <TeamCard as={motion.div} key={member.name} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <Avatar src={member.img} alt={member.name} />
            <Name>{member.name}</Name>
            <Role>{member.role}</Role>
            <Bio>{member.bio}</Bio>
          </TeamCard>
        ))}
      </TeamGrid>
    </Section>
  </>
);
export default Team; 