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
const CTAButton = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  font-weight: 700;
  border-radius: 22px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  text-decoration: none;
  box-shadow: 0 2px 8px ${({ theme }) => theme.palette.primary.main}22;
  margin-top: 1.2rem;
  transition: background 0.18s, transform 0.15s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-2px) scale(1.04);
  }
`;
const Volunteer = () => (
  <>
    <Hero as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <HeroTitle>Volunteer</HeroTitle>
    </Hero>
    <Section>
      <SectionTitle>Make a Difference</SectionTitle>
      <SectionText>
        Join our team of passionate volunteers and help empower women and girls in Kenya. Gain valuable experience, make new friends, and create lasting impact.
      </SectionText>
      <SectionTitle>Benefits</SectionTitle>
      <ul>
        <li>Personal and professional growth</li>
        <li>Networking opportunities</li>
        <li>Meaningful community service</li>
      </ul>
      <CTAButton href="/contact">Apply to Volunteer</CTAButton>
    </Section>
  </>
);
export default Volunteer; 