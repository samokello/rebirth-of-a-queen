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
const PartnersGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;
const PartnerLogo = styled.img`
  width: 120px;
  height: auto;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
  padding: 1rem;
`;
const Partners = () => (
  <>
    <Hero as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <HeroTitle>Our Partners</HeroTitle>
    </Hero>
    <Section>
      <SectionTitle>Partners</SectionTitle>
      <PartnersGrid>
        <PartnerLogo src={'/images/branding/logo-1.png'} alt="Partner 1" />
        <PartnerLogo src={'/images/branding/logo-1.png'} alt="Partner 2" />
        <PartnerLogo src={'/images/branding/logo-1.png'} alt="Partner 3" />
      </PartnersGrid>
      <SectionTitle>Why Partner With Us?</SectionTitle>
      <ul>
        <li>Make a lasting impact in communities</li>
        <li>Enhance your brand’s social responsibility</li>
        <li>Collaborate on innovative programs</li>
      </ul>
    </Section>
  </>
);
export default Partners; 