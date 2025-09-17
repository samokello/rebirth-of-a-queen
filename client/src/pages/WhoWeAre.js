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
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
`;
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const SectionText = styled.p`
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
const Timeline = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;
  border-left: 3px solid ${({ theme }) => theme.palette.primary.main};
`;
const TimelineItem = styled.li`
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0.3rem;
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    border: 3px solid #fff;
    box-shadow: 0 2px 8px #0002;
  }
`;
const WhoWeAre = () => (
  <>
    <Hero as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <HeroTitle>Who We Are</HeroTitle>
    </Hero>
    <Section>
      <SectionTitle>Our Story</SectionTitle>
      <SectionText>
        Rebirth of a Queen was founded to empower women and girls in Kenya, providing opportunities for education, health, and economic growth. Our journey is marked by resilience, community, and a vision for a brighter future.
      </SectionText>
      <SectionTitle>Our Values</SectionTitle>
      <SectionText>
        Empowerment, Integrity, Community, Innovation, and Compassion guide everything we do.
      </SectionText>
      <SectionTitle>Milestones</SectionTitle>
      <Timeline>
        <TimelineItem>2008: Organization founded in Nairobi.</TimelineItem>
        <TimelineItem>2012: Launched first scholarship program.</TimelineItem>
        <TimelineItem>2016: Expanded to include health and leadership programs.</TimelineItem>
        <TimelineItem>2020: Reached 5,000+ women and girls.</TimelineItem>
        <TimelineItem>2023: Recognized for community impact and innovation.</TimelineItem>
      </Timeline>
    </Section>
  </>
);
export default WhoWeAre;
