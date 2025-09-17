import React, { useState } from 'react';
import { API_MAIN } from '../api';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUsers, FaBookOpen, FaHandsHelping, FaHistory, FaUserTie, FaTshirt, FaDumbbell, FaCamera, FaDonate, FaHandshake, FaBriefcase, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const bgUrl = process.env.REACT_APP_CLOUDINARY_FOOTER_BG_URL || (process.env.PUBLIC_URL + '/images/branding/footer-bg.jpg');

const FooterContainer = styled.footer`
  background: linear-gradient(rgba(34, 17, 51, 0.92), rgba(34, 17, 51, 0.92)), url(${bgUrl}) center/cover no-repeat;
  color: #fff;
  padding: 0;
  border-top: 1px solid #eee;
  position: relative;
  z-index: 1;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 3.5rem 2vw 2.2rem 2vw;
  position: relative;
  z-index: 1;
  @media (max-width: 900px) {
    gap: 2.2rem;
    padding: 2.5rem 4vw 1.5rem 4vw;
  }
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 2.5rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;

const LogoImg = styled.img`
  height: 52px;
  margin-bottom: 1.1rem;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13));
`;

const Intro = styled.p`
  font-size: 1.08rem;
  color: #f3eaff;
  margin-bottom: 1.1rem;
  line-height: 1.6;
  opacity: 0.93;
  max-width: 320px;
`;

const SocialLinks = styled.div`
  margin-top: 0.7rem;
  display: flex;
  gap: 1.1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.18rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.palette.primary.main}22;
  transition: background 0.2s, color 0.2s, transform 0.18s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    color: #fff;
    transform: translateY(-2px) scale(1.08);
  }
`;

const LinksSection = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.5rem;
  width: 100%;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
  }
`;

const LinkGroup = styled.div`
  min-width: 120px;
`;

const GroupTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.light};
  margin-bottom: 0.6rem;
  font-size: 1.09rem;
  letter-spacing: 0.01em;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #e6dfff;
  text-decoration: none;
  margin-bottom: 0.32rem;
  font-size: 1.01rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  border-radius: 3px;
  padding: 0.13rem 0.2rem;
  transition: background 0.18s, color 0.18s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.palette.primary.light}22;
    color: ${({ theme }) => theme.palette.primary.main};
    outline: none;
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
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    margin-top: 1.2rem;
  }
`;

const ContactTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.light};
  margin-bottom: 0.6rem;
  font-size: 1.09rem;
`;

const ContactDetail = styled.div`
  color: #e6dfff;
  font-size: 1.01rem;
  margin-bottom: 0.32rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContactLink = styled.a`
  color: #e6dfff;
  text-decoration: none;
  transition: color 0.18s;
  &:hover, &:focus {
    color: ${({ theme }) => theme.palette.primary.main};
    outline: none;
  }
`;

const BottomBar = styled.div`
  width: 100%;
  background: rgba(34, 17, 51, 0.98);
  border-top: 1px solid #3a2a4d;
  padding: 1.1rem 0 0.3rem 0;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.99rem;
  color: #e6dfff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const MadeInKenya = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.99rem;
  color: #e6dfff;
  opacity: 0.92;
`;

// Add icon styles for link icons
const LinkIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5em;
  font-size: 1.08em;
  color: ${({ theme }) => theme.palette.primary.light};
`;

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
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></SocialIcon>
          </SocialLinks>
        </LogoSection>
        <LinksSection as={motion.nav} aria-label="Footer navigation" custom={2} variants={fadeUp}>
          <LinkGroup>
            <GroupTitle>About</GroupTitle>
            <FooterLink to="/who-we-are">Who We Are</FooterLink>
            <FooterLink to="/team">Team</FooterLink>
            <FooterLink to="/history">History</FooterLink>
            <FooterLink to="/partners">Partners</FooterLink>
          </LinkGroup>
          <LinkGroup>
            <GroupTitle>Get Involved</GroupTitle>
            <FooterLink to="/volunteer">Volunteer</FooterLink>
            <FooterLink to="/donate">Donate</FooterLink>
            <FooterLink to="/partner">Partner</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
          </LinkGroup>
          <LinkGroup>
            <GroupTitle>Programs</GroupTitle>
            <FooterLink to="/education">Education</FooterLink>
            <FooterLink to="/fashion">Fashion</FooterLink>
            <FooterLink to="/fitness">Fitness</FooterLink>
            <FooterLink to="/leather">Leather</FooterLink>
            <FooterLink to="/photography">Photography</FooterLink>
          </LinkGroup>
        </LinksSection>
        <ContactSection as={motion.div} custom={3} variants={fadeUp}>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactDetail><FaMapMarkerAlt style={{marginRight: '0.5em'}} />Nairobi, Kenya</ContactDetail>
          <ContactDetail><FaPhoneAlt style={{marginRight: '0.5em'}} /><ContactLink href="tel:+254 720339204
">+254 720339204
</ContactLink></ContactDetail>
          <ContactDetail><FaEnvelope style={{marginRight: '0.5em'}} /><ContactLink href="mailto:info@rebirthofaqueen.org">info@rebirthofaqueen.org</ContactLink></ContactDetail>
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
      <div>&copy; {new Date().getFullYear()} Rebirth of a Queen. All rights reserved.</div>
      <MadeInKenya>
        Made in Kenya with <FaHeart style={{ color: 'red', fontSize: '1.1em', verticalAlign: '-2px' }} aria-label="love" />
      </MadeInKenya>
    </BottomBar>
  </FooterContainer>
)};

export default Footer; 




