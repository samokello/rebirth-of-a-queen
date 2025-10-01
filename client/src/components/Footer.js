import React, { useState } from 'react';
import { API_MAIN } from '../api';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const bgUrl = process.env.REACT_APP_CLOUDINARY_FOOTER_BG_URL || (process.env.PUBLIC_URL + '/images/branding/footer-bg.jpg');

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    rgba(20, 10, 40, 0.95) 0%, 
    rgba(40, 20, 80, 0.9) 25%, 
    rgba(60, 30, 120, 0.85) 50%, 
    rgba(80, 40, 160, 0.9) 75%, 
    rgba(100, 50, 200, 0.95) 100%
  ), url(${bgUrl}) center/cover no-repeat;
  color: #fff;
  padding: 0;
  border-top: 3px solid transparent;
  background-clip: padding-box;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff
    );
    background-size: 300% 100%;
    animation: gradientShift 8s ease infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 60, 240, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(240, 120, 60, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(60, 240, 120, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 2vw 2.5rem 2vw;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  @media (max-width: 900px) {
    gap: 2.5rem;
    padding: 3rem 4vw 2rem 4vw;
  }
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2.5fr 1fr;
  gap: 3rem;
  align-items: start;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 2fr 1fr;
    gap: 2.5rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    padding: 1.5rem;
  }
`;

const LogoImg = styled.img`
  height: 60px;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 16px rgba(0,0,0,0.4));
  }
`;

const Intro = styled.p`
  font-size: 1.1rem;
  color: #e6dfff;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  opacity: 0.95;
  max-width: 350px;
  font-weight: 400;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1.2rem;
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: #e6dfff;
  font-size: 1.5rem;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:nth-child(1):hover { background: linear-gradient(135deg, #3b5998 0%, #2d4373 100%); }
  &:nth-child(2):hover { background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%); }
  &:nth-child(3):hover { background: linear-gradient(135deg, #e4405f 0%, #c13584 100%); }
  &:nth-child(4):hover { background: linear-gradient(135deg, #0077b5 0%, #005885 100%); }
  &:nth-child(5):hover { background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%); }
`;

const LinksSection = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 1200px) {
    gap: 1.2rem;
    padding: 2rem;
  }
  @media (max-width: 900px) {
    gap: 1rem;
    padding: 1.8rem;
  }
  @media (max-width: 768px) {
    gap: 0.8rem;
    padding: 1.5rem;
  }
  @media (max-width: 600px) {
    gap: 0.6rem;
    padding: 1.2rem;
  }
  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const LinkGroup = styled.div`
  min-width: 120px;
  
  @media (max-width: 768px) {
    min-width: 100px;
  }
  @media (max-width: 600px) {
    min-width: 90px;
  }
  @media (max-width: 480px) {
    min-width: 80px;
  }
`;

const GroupTitle = styled.div`
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.7rem;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #e6dfff;
  text-decoration: none;
  margin-bottom: 0.7rem;
  font-size: 1.05rem;
  padding: 0.3rem 0;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #fff;
    transform: translateX(6px);
    background: rgba(255, 255, 255, 0.1);
    padding-left: 0.5rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }
  
  &:hover::before {
    width: 6px;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
`;

const NewsletterSection = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 0.5rem;
  background: rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 2.2rem 2vw 1.5rem 2vw;
  box-shadow: 0 4px 24px rgba(60,30,90,0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  @media (max-width: 768px) {
    padding: 1.8rem 3vw 1.3rem 3vw;
    max-width: 90%;
  }
  @media (max-width: 600px) {
    padding: 1.5rem 4vw 1.2rem 4vw;
    max-width: 100%;
    border-radius: 12px;
  }
  @media (max-width: 480px) {
    padding: 1.2rem 5vw 1rem 5vw;
    margin-top: 0.3rem;
  }
`;

const NewsletterTitle = styled.h3`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.7rem;
  font-size: 1.25rem;
  letter-spacing: 0.01em;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
  @media (max-width: 480px) {
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
  }
`;

const NewsletterDesc = styled.div`
  color: #e6dfff;
  font-size: 1.04rem;
  margin-bottom: 1.1rem;
  opacity: 0.92;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.9rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 420px;
  gap: 0;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(60,30,90,0.07);
  @media (max-width: 768px) {
    max-width: 380px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    max-width: 100%;
    box-shadow: none;
    border-radius: 6px;
  }
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const NewsletterInput = styled.input`
  flex: 1 1 220px;
  padding: 0.8rem 1.2rem;
  border: none;
  font-size: 1.08rem;
  outline: none;
  background: #fff;
  color: #2d1a3a;
  border-radius: 0;
  &::placeholder {
    color: #bbaed1;
    opacity: 1;
  }
  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    border-radius: 6px 6px 0 0;
    border-bottom: 1px solid #eee;
    padding: 0.8rem 1.2rem;
  }
  @media (max-width: 480px) {
    padding: 0.7rem 1rem;
    font-size: 0.95rem;
  }
`;

const NewsletterButton = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  border: none;
  padding: 0 2.2rem;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0 6px 6px 0;
  transition: background 0.2s, transform 0.18s;
  box-shadow: none;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-2px) scale(1.04);
  }
  @media (max-width: 768px) {
    padding: 0 1.8rem;
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    border-radius: 0 0 6px 6px;
    padding: 0.8rem 0;
    width: 100%;
    font-size: 1.05rem;
  }
  @media (max-width: 480px) {
    padding: 0.7rem 0;
    font-size: 1rem;
  }
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    margin-top: 1.2rem;
    padding: 1.5rem;
  }
`;

const ContactTitle = styled.div`
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const ContactDetail = styled.div`
  color: #e6dfff;
  font-size: 1.05rem;
  margin-bottom: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    transform: translateX(5px);
  }
  
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const ContactLink = styled.a`
  color: #e6dfff;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  
  &:hover, &:focus {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const BottomBar = styled.div`
  width: 100%;
  background: rgba(34, 17, 51, 0.98);
  border-top: 1px solid #3a2a4d;
  padding: 1.5rem 2vw 1rem 2vw;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.99rem;
  color: #e6dfff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const CopyrightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const CopyrightText = styled.div`
  font-size: 0.95rem;
  color: #e6dfff;
  font-weight: 500;
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const LegalLink = styled.a`
  color: #e6dfff;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.9;
  
  &:hover {
    color: ${({ theme }) => theme.palette.primary.light};
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
  }
`;

const OrganizationInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #e6dfff;
  opacity: 0.85;
  margin-top: 0.5rem;
`;

const MadeInKenya = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.99rem;
  color: #e6dfff;
  opacity: 0.92;
  margin-top: 0.5rem;
`;

//

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, type: 'spring', stiffness: 60 }
  })
};

const Footer = () => {
  const [nlStatus, setNlStatus] = useState({ type: '', message: '' });
  return (
  <FooterContainer>
    <FooterContent>
      <TopRow as={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <LogoSection as={motion.div} custom={1} variants={fadeUp}>
          <LogoImg src={process.env.PUBLIC_URL + '/logo.png'} alt="Rebirth of a Queen Logo" />
          <Intro>

Rebirth of a Queen Foundation is a survivor-led, feminist, and community-based organization founded in 2019 by Akinyi Juma, a survivor of childhood sexual violence and modern slavery.
 </Intro>
          <SocialLinks>
            <SocialIcon href="https://facebook.com/rebirthofaqueen" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></SocialIcon>
            <SocialIcon href="https://twitter.com/rebirthofaqueen" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></SocialIcon>
            <SocialIcon href="https://www.instagram.com/rebirthofa.queen/" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/rebirth-of-a-queen-organization-856b04220/" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></SocialIcon>
            <SocialIcon href="https://www.youtube.com/@rebirthofaqueenstories" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></SocialIcon>
          </SocialLinks>
        </LogoSection>
        <LinksSection as={motion.nav} aria-label="Footer navigation" custom={2} variants={fadeUp}>
          <LinkGroup>
            <GroupTitle>About Us</GroupTitle>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/who-we-are">Our Story</FooterLink>
            <FooterLink to="/team">Our Team</FooterLink>
            <FooterLink to="/mission-vision">Mission & Vision</FooterLink>
            <FooterLink to="/impact">Our Impact</FooterLink>
            <FooterLink to="/partners">Partners</FooterLink>
          </LinkGroup>
          <LinkGroup>
            <GroupTitle>Programs</GroupTitle>
            <FooterLink to="/programs">All Programs</FooterLink>
            <FooterLink to="/education">Education & Mentorship</FooterLink>
            <FooterLink to="/empowerment">Skills Training</FooterLink>
            <FooterLink to="/shelter">Women's Shelter</FooterLink>
            <FooterLink to="/fitness">Fitness for Therapy</FooterLink>
            <FooterLink to="/advocacy">Advocacy & Voice</FooterLink>
          </LinkGroup>
          <LinkGroup>
            <GroupTitle>Get Involved</GroupTitle>
            <FooterLink to="/volunteer">Volunteer</FooterLink>
            <FooterLink to="/donate">Donate</FooterLink>
            <FooterLink to="/partner">Partner With Us</FooterLink>
            <FooterLink to="/sponsor">Sponsor a Program</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
            <FooterLink to="/newsletter">Newsletter</FooterLink>
          </LinkGroup>
          <LinkGroup>
            <GroupTitle>Resources</GroupTitle>
            <FooterLink to="/news">News & Stories</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/resources">Resources</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/support">Get Support</FooterLink>
          </LinkGroup>
        </LinksSection>
        <ContactSection as={motion.div} custom={3} variants={fadeUp}>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactDetail><FaMapMarkerAlt style={{marginRight: '0.5em'}} />Nairobi, Kenya</ContactDetail>
          <ContactDetail><FaPhoneAlt style={{marginRight: '0.5em'}} /><ContactLink href="tel:+254720339204">+254 720 339 204</ContactLink></ContactDetail>
          <ContactDetail><FaEnvelope style={{marginRight: '0.5em'}} /><ContactLink href="mailto:info@rebirthofaqueen.org">info@rebirthofaqueen.org</ContactLink></ContactDetail>
          <ContactDetail><FaEnvelope style={{marginRight: '0.5em'}} /><ContactLink href="mailto:support@rebirthofaqueen.org">support@rebirthofaqueen.org</ContactLink></ContactDetail>
        </ContactSection>
      </TopRow>
      <NewsletterSection as={motion.div} custom={4} variants={fadeUp}>
        <NewsletterTitle>Subscribe to our Newsletter</NewsletterTitle>
        <NewsletterDesc>
          Get the latest news, events, and stories from Rebirth of a Queen.
        </NewsletterDesc>
        <NewsletterForm onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = form.querySelector('input[type="email"]').value.trim();
          if (!email) return;
          try {
            const { data } = await API_MAIN.post('/newsletter/subscribe', { email });
            if (data?.success) {
              setNlStatus({ type: 'success', message: data?.message || 'Subscribed!' });
              form.reset();
            } else {
              setNlStatus({ type: 'error', message: data?.message || 'Failed to subscribe' });
            }
          } catch (_) {
            setNlStatus({ type: 'error', message: 'Network error. Please try again.' });
          }
        }}>
          <NewsletterInput type="email" placeholder="Your email address" aria-label="Email address" required />
          <NewsletterButton type="submit">
            Subscribe
          </NewsletterButton>
        </NewsletterForm>
        {nlStatus.message && (
          <div style={{
            marginTop: '10px',
            color: nlStatus.type === 'success' ? '#bbf7d0' : '#fee2e2',
            background: nlStatus.type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${nlStatus.type === 'success' ? '#34d399' : '#ef4444'}`,
            padding: '8px 12px',
            borderRadius: 8,
            fontSize: '0.95rem'
          }}>
            {nlStatus.message}
          </div>
        )}
      </NewsletterSection>
    </FooterContent>
    <BottomBar as={motion.div} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
      <CopyrightSection>
        <CopyrightText>
          © {new Date().getFullYear()} Rebirth of a Queen Foundation. All rights reserved.
        </CopyrightText>
        
        <LegalLinks>
          <LegalLink href="/privacy-policy">Privacy Policy</LegalLink>
          <LegalLink href="/terms-of-service">Terms of Service</LegalLink>
          <LegalLink href="/cookie-policy">Cookie Policy</LegalLink>
          <LegalLink href="/accessibility">Accessibility</LegalLink>
        </LegalLinks>
        
        <OrganizationInfo>
          <span>Registered in Kenya</span>
          <span>•</span>
          <span>Tax Exempt Organization</span>
          <span>•</span>
          <span>NGO Registration: OP.218/051/19-033/11320</span>
        </OrganizationInfo>
      </CopyrightSection>
      
      <MadeInKenya>
        Made in Kenya with <FaHeart style={{ color: 'red', fontSize: '1.1em', verticalAlign: '-2px' }} aria-label="love" />
      </MadeInKenya>
    </BottomBar>
  </FooterContainer>
)};

export default Footer; 




