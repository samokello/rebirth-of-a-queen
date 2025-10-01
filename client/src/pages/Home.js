import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart, FaUsers, FaGraduationCap, FaStar, FaBook, FaHandsHelping, FaFutbol, FaLightbulb, FaQuoteLeft, FaQuoteRight, FaBullseye, FaEye, FaFlagCheckered, FaHandshake, FaDonate, FaArrowRight, FaArrowUp, FaChevronLeft, FaChevronRight, FaEnvelope, FaCalendarAlt, FaClock, FaUserFriends, FaGift, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import Chatbot from '../components/Chatbot';

// --- Hero Section with Video Background ---
const heroContent = {
  title: 'Rebirth of a queen',
  subtitle: 'Empowering survivors through dignity, opportunity, and voice.',
  desc: '',
  desc2: '',
  cta: 'Join Our Movement',
  ctaSecondary: 'Learn Our Story',
  to: '/about',
  toSecondary: '/who-we-are'
};

// --- Latest News Data ---
const latestNews = [
  
  {
  id: 1,
  title: 'Raising Authentic Voices: 700+ Teenagers Mentored',
  excerpt: 'Our community-centered program has successfully mentored over 700 teenagers through advocacy, mentorship, and education. We raise voices to raise a generation of empowered youth.',
  date: '2024-03-15',
  category: 'Mentorship',
  image: 'https://res.cloudinary.com/samokello/image/upload/v1758121594/rebirth-of-a-queen/images/orientation1_j9fvmd.jpg', // ✅ Cloudinary URL
  readTime: '4 min read'
},
  {
    id: 2,
    title: 'The Susan Village Women\'s Shelter: 250+ Women Supported',
    excerpt: 'Our healing space for survivors of sexual abuse and human trafficking has rescued and supported over 250 women, providing safe shelter, psychosocial support, and economic empowerment.',
    date: '2024-03-10',
    category: 'Shelter',
  image: 'https://res.cloudinary.com/samokello/image/upload/v1758121439/rebirth-of-a-queen/images/orientation1_10_kwho40.jpg', // ✅ Cloudinary URL
    readTime: '5 min read'
  },
  {
    id: 3,
    title: 'Rebirth Empowerment Hub: 450+ Youth Trained',
    excerpt: 'Our 3-month training program has successfully trained 450 young people in leather crafting, fashion design, IT, graphics, branding, storytelling, and filmmaking skills.',
    date: '2024-03-05',
    category: 'Skills Training',
  image: 'https://res.cloudinary.com/samokello/image/upload/v1758121424/rebirth-of-a-queen/images/orientation1_2_gqbuyl.jpg', // ✅ Cloudinary URL
    readTime: '6 min read'
  }
];

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  @media (max-width: 900px) {
    min-height: 100vh;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
    z-index: 2;
  }
  
  /* Fallback background image */
  background-image: url('https://res.cloudinary.com/samokello/image/upload/v1758121594/rebirth-of-a-queen/images/orientation1_j9fvmd.jpg');
  background-size: cover;
  background-position: 50% 20%;
  background-repeat: no-repeat;
`;

const HeroVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  min-width: 100%;
  min-height: 100%;
  max-width: none;
  max-height: none;
  transform: scale(1);
  
  /* Ensure video covers full container */
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: 50% 15%;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 540px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  padding: 0 1rem;
  @media (max-width: 900px) {
    max-width: 98vw;
    text-align: center;
    padding: 0 0.5rem;
  }
`;


const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  line-height: 1.1;
  
  span {
    color: #FFD700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }
  
  @media (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #FFD700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.9;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const HeroDesc = styled.p`
  font-size: 1.15rem;
  margin-bottom: 1rem;
  max-width: 520px;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  line-height: 1.6;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 1rem;
    max-width: 98vw;
  }
`;

const HeroDesc2 = styled.p`
  font-size: 1.05rem;
  margin-bottom: 2.5rem;
  max-width: 520px;
  color: #e0e7ff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  line-height: 1.6;
  font-weight: 300;
  font-style: italic;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    max-width: 98vw;
  }
`;

const CTAButton = styled(Link)`
  background: transparent;
  color: #ffffff;
  padding: 0.9rem 2rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1rem;
  margin: 0 0.7rem 0.7rem 0;
  text-decoration: none;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s, transform 0.2s;
  display: inline-block;
  &:hover {
    background: #ffffff;
    color: ${({ theme }) => theme.palette.primary.main || '#fff'};
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
`;

const CTAButtonSecondary = styled(Link)`
  background: transparent;
  color: #ffffff;
  padding: 0.9rem 2rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1rem;
  margin: 0 0.7rem 0.7rem 0;
  text-decoration: none;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s, transform 0.2s;
  display: inline-block;
  &:hover {
    background: #ffffff;
    color: ${({ theme }) => theme.palette.primary.main || '#fff'};
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
`;
// --- Floating Scroll to Top Button ---
const ScrollToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark || '#FFF'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
  }
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
`;

// --- Enhanced Newsletter Section ---
const NewsletterSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 0;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://res.cloudinary.com/samokello/image/upload/v1758121594/rebirth-of-a-queen/images/orientation1_j9fvmd.jpg') center/cover no-repeat;
    opacity: 0.15;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: float 20s infinite linear;
    z-index: 1;
  }

  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(-50px, -50px) rotate(360deg); }
  }
`;

const NewsletterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const NewsletterTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NewsletterSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const NewsletterForm = styled(motion.form)`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  gap: 1rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NewsletterInput = styled(motion.input)`
  flex: 1;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NewsletterButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  color: #000;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
    z-index: 1;
  }

  /* Ensure text and icons are above the shimmer effect */
  & > * {
    position: relative;
    z-index: 2;
  }

  &:hover {
    background: linear-gradient(45deg, #f59e0b, #d97706);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(251, 191, 36, 0.5);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

// --- Floating Animation Elements ---
const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.1);
  z-index: 1;
`;

// --- Enhanced Blog Posts Section ---
const BlogSection = styled.section`
  padding: 100px 0;
  background: #f8fafc;
`;

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BlogSectionTitle = styled.h2`
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

const BlogSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const BlogCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: url(${props => props.image}) center/cover no-repeat;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${BlogCard}:hover &::after {
    opacity: 1;
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #64748b;
`;

const BlogCategory = styled.span`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const BlogDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const BlogCardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1e293b;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BlogReadMore = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #764ba2;
    gap: 0.75rem;
  }
`;

// --- Success Stories Section ---
const SuccessStoriesSection = styled.section`
  padding: 100px 0;
  background: radial-gradient(1200px 500px at 10% 0%, #eef2ff 0%, #f8fafc 40%, #eef2ff 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: -10%;
    background: radial-gradient(800px 300px at 90% 20%, rgba(102, 126, 234, 0.12), transparent 60%),
                radial-gradient(700px 250px at 0% 80%, rgba(118, 75, 162, 0.1), transparent 60%);
    pointer-events: none;
    z-index: 0;
  }
`;

const SuccessContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SuccessTitle = styled.h2`
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

const SuccessSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const SuccessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SuccessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.65);
  border-radius: 20px;
  padding: 1.5rem 1.5rem 1.2rem 1.5rem;
  box-shadow: 0 20px 50px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(226, 232, 240, 0.7);
  text-align: left;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at -10% -10%, rgba(102,126,234,0.18), transparent 40%),
                radial-gradient(circle at 110% 110%, rgba(118,75,162,0.16), transparent 40%);
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 30px 70px rgba(31, 38, 135, 0.18);
  }
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #fff;
  box-shadow: 0 10px 20px rgba(102,126,234,0.25);
`;

const StoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const StoryBody = styled.div`
  position: relative;
  z-index: 1;
`;

const SuccessName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const SuccessRole = styled.p`
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SuccessQuote = styled.p`
  font-style: italic;
  color: #374151;
  line-height: 1.7;
  margin: 0.75rem 0 1.25rem 0;
  position: relative;
  padding-left: 1.25rem;
  border-left: 3px solid rgba(102, 126, 234, 0.35);
`;

const SuccessStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.75rem;
`;

//

const SuccessStatNumber = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #334155;
`;

const SuccessStatLabel = styled.div`
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 999px;
  background: rgba(102, 126, 234, 0.12);
  color: #1f2937;
  border: 1px solid rgba(102, 126, 234, 0.25);
`;

// --- About Section ---
const Section = styled.section`
  padding: 3rem 1rem 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  
  &:first-of-type {
    margin-top: 0;
  }
`;
const SectionTitle = styled.h2`
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  text-align: center;
`;
const SectionText = styled.p`
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;


// --- Programs Grid ---
const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;
const ProgramCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  text-align: center;
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 6px 24px rgba(139,92,246,0.13);
  }
`;
const ProgramTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const ProgramDesc = styled.p`
  font-size: 1rem;
  color: #444;
`;
const ProgramImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
`;
const ProgramCardContent = styled.div`
  padding: 0 1rem 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProgramButton = styled(Link)`
  background: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 0.7rem;
  box-shadow: 0 2px 8px rgba(139,92,246,0.13);
  transition: background 0.2s, transform 0.2s;
  display: inline-block;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark || '#6D28D9'};
    transform: translateY(-2px) scale(1.04);
  }
`;

// --- Enhanced Testimonials Section ---
const TestimonialsSection = styled.section`
  background: #f8f5ff;
  padding: 3rem 1rem 2.5rem 1rem;
  text-align: center;
  position: relative;
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0 1rem;
`;

const TestimonialsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  margin-bottom: 2rem;
`;

const TestimonialsCarousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  flex-wrap: nowrap;
  overflow: hidden;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  width: calc(33.333% - 1.33rem);
  min-width: 280px;
  max-width: 340px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: calc(33.333% - 0.67rem);
    min-width: 200px;
    padding: 1.5rem 1rem 1rem 1rem;
  }
`;

const TestimonialMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.1rem;
`;

const QuoteIcon = styled.span`
  color: ${({ theme }) => theme.palette.primary.light || '#b39ddb'};
  font-size: 1.08rem;
  margin-bottom: 0.3rem;
`;

const TestimonialText = styled.p`
  font-size: 1.08rem;
  color: #444;
  margin-bottom: 1.2rem;
`;

const TestimonialAuthor = styled.div`
  font-weight: 700;
  color: #1a237e;
  font-size: 1.07rem;
  margin-bottom: 0.1rem;
  text-align: center;
`;

const TestimonialRole = styled.div`
  font-size: 0.98rem;
  color: #6D28D9;
  font-weight: 500;
  margin-bottom: 0.7rem;
  text-align: center;
`;

const TestimonialAvatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.3rem;
  margin-top: 0.7rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.10);
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialNav = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const TestimonialDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => active ? (theme.palette.primary.main || '#8B5CF6') : '#d1c4e9'};
  opacity: ${({ active }) => active ? 1 : 0.5};
  transition: background 0.2s, opacity 0.2s;
  cursor: pointer;
  outline: none;
`;

const TestimonialArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark || '#6D28D9'};
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &.prev {
    left: -20px;
  }
  
  &.next {
    right: -20px;
  }
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
    
    &.prev {
      left: -10px;
    }
    
    &.next {
      right: -10px;
    }
  }
`;

// --- Latest News Section ---
const LatestNewsSection = styled.section`
  background: #fff;
  padding: 3rem 1rem 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const NewsCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  overflow: hidden;
  transition: transform 0.18s, box-shadow 0.18s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 24px rgba(139,92,246,0.13);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #666;
`;

const NewsCategory = styled.span`
  background: ${({ theme }) => theme.palette.primary.light || '#b39ddb'};
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const NewsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #1a237e;
  line-height: 1.3;
`;

const NewsExcerpt = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const NewsReadMore = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark || '#6D28D9'};
  }
`;

// --- Partners Section ---
const PartnersSection = styled.section`
  background: #f8f5ff;
  padding: 3.5rem 1rem 2.5rem 1rem;
  text-align: center;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(30,41,59,0.07);
  max-width: 1100px;
  margin: 2rem auto 2rem auto;
`;
const PartnersTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  margin-bottom: 1.2rem;
`;
const PartnersText = styled.p`
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 2.2rem;
`;
const PartnersGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
`;
const PartnerLogoCard = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: scale(1.07);
    box-shadow: 0 6px 24px rgba(139,92,246,0.13);
  }
`;
const PartnerText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  }
`;
const PartnersCTA = styled.a`
  display: inline-block;
  margin-top: 2rem;
  background: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  color: #fff;
  font-weight: 600;
  border-radius: 2rem;
  padding: 0.7rem 2.2rem;
  text-decoration: none;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px rgba(139,92,246,0.13);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark || '#6D28D9'};
    transform: translateY(-2px) scale(1.04);
  }
`;

// --- Stories/News Section ---
const StoriesSection = styled.section`
  background: #f5faff;
  padding: 3rem 1rem 2rem 1rem;
`;
const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
`;
const StoryCard = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 1.5rem 1.2rem;
  text-align: left;
  transition: box-shadow 0.18s;
  &:hover {
    box-shadow: 0 6px 24px rgba(139,92,246,0.13);
  }
`;
const StoryTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const StoryText = styled.p`
  font-size: 0.98rem;
  color: #444;
`;
const StoryLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  font-weight: 600;
  text-decoration: underline;
  font-size: 0.98rem;
  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark || '#6D28D9'};
  }
`;

// --- Get Involved Section ---
const GetInvolvedSection = styled.section`
  background: linear-gradient(135deg, #f8f5ff 60%, #e0e7ff 100%);
  position: relative;
  padding: 3.5rem 1rem 3.5rem 1rem;
  text-align: center;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(30,16,60,0.10);
  max-width: 1100px;
  margin: 2rem auto 2rem auto;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="2" fill="%238B5CF6" fill-opacity="0.08"/><circle cx="60" cy="60" r="2" fill="%238B5CF6" fill-opacity="0.08"/></svg>');
    opacity: 0.5;
    z-index: 0;
    pointer-events: none;
  }
`;
const GetInvolvedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 2.2rem;
  position: relative;
  z-index: 1;
  justify-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.2rem;
  }
`;
const GetInvolvedCard = styled(motion.div)`
  background: rgba(255,255,255,0.92);
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(139,92,246,0.10);
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  min-width: 220px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: visible;
  border: 2px solid transparent;
  transition: transform 0.18s, box-shadow 0.18s, border 0.18s;
  &:hover, &:focus-within {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 12px 32px rgba(139,92,246,0.18);
    border: 2px solid ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  }
`;
const GetInvolvedIconWrap = styled(motion.div)`
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  color: #fff;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(139,92,246,0.13);
  font-size: 2rem;
  z-index: 2;
`;
const GetInvolvedTitleCard = styled.h3`
  font-size: 1.18rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1a237e;
`;
const GetInvolvedDesc = styled.p`
  font-size: 1.05rem;
  color: #444;
`;
const GetInvolvedButton = styled(Link)`
  background: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 1.2rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 0.7rem;
  box-shadow: 0 2px 8px rgba(139,92,246,0.13);
  transition: background 0.2s, transform 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  outline: none;
  border: none;
  &:hover, &:focus {
    background: ${({ theme }) => theme.palette.primary.dark || '#6D28D9'};
    transform: translateY(-2px) scale(1.04);
  }
  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.primary.light || '#b39ddb'};
  }
`;

const AboutSection = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2.5rem;
  align-items: center;
  background: #f8f5ff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(30,41,59,0.07);
  padding: 3.5rem 2vw 2.5rem 2vw;
  max-width: 1100px;
  margin: 2rem auto 2rem auto;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 2.2rem 1vw 1.5rem 1vw;
    gap: 1.5rem;
  }
`;
const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;
const AboutImage = styled.img`
  width: 100%;
  max-width: 480px;
  min-height: 340px;
  object-fit: cover;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(30,41,59,0.10);
  @media (max-width: 900px) {
    margin: 0 auto;
    max-width: 98vw;
    min-height: 220px;
  }
`;

const ImpactSection = styled.section`
  background: #f8f5ff;
  padding: 3.5rem 1rem 2.5rem 1rem;
  text-align: center;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(30,41,59,0.07);
  max-width: 1100px;
  margin: 2rem auto 2rem auto;
`;
const ImpactTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  margin-bottom: 2rem;
`;
const ImpactText = styled.p`
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;
const ImpactGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
`;
const ImpactCard = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2rem 1.5rem 1.2rem 1.5rem;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s, box-shadow 0.18s;
  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 6px 24px rgba(139,92,246,0.13);
  }
`;
const ImpactIcon = styled.div`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  margin-bottom: 0.5rem;
`;
const ImpactNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #1a237e;
`;
const ImpactLabel = styled.div`
  font-size: 1rem;
  color: #5c6bc0;
`;

const PurposeSection = styled.section`
  background: #fff;
  padding: 3.5rem 1rem 2.5rem 1rem;
  text-align: center;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(30,41,59,0.07);
  max-width: 1100px;
  margin: 2rem auto 2rem auto;
`;
const PurposeCard = styled.div`
  background: #f8f5ff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(139,92,246,0.07);
  padding: 2.5rem 2vw 2rem 2vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem 1vw 1.2rem 1vw;
  }
`;
const PurposeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  max-width: 300px;
`;
const PurposeIcon = styled.div`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.palette.primary.main || '#8B5CF6'};
  margin-bottom: 0.7rem;
`;
const PurposeTitle = styled.h3`
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a237e;
`;
const PurposeDesc = styled.p`
  font-size: 1.05rem;
  color: #444;
`;


const Home = () => {
  const stats = [
    { icon: <FaUsers />, number: '250+', label: 'Women Supported Through Shelter' },
    { icon: <FaGraduationCap />, number: '450+', label: 'Youth Trained in Skills' },
    { icon: <FaHeart />, number: '700+', label: 'Teenagers Mentored' },
    { icon: <FaStar />, number: '6+', label: 'Years of Impact' },
  ];
  const programs = [
    { icon: <FaBook />, title: 'Raising Authentic Voices (RAV)', desc: 'Community-centered program fostering advocacy, mentorship, and education. Includes mentorship for vulnerable youth, scholarships, community advocacy forums, and literacy circles.' },
    { icon: <FaHandsHelping />, title: 'Rebirth Empowerment & Wellness Hub', desc: '3-month training program bridging vulnerability and opportunity. Skills development in leather crafting, fashion design, IT, graphics, branding, storytelling, and filmmaking.' },
    { icon: <FaFutbol />, title: 'Fitness for Therapy', desc: 'Wellness program integrating fitness as therapy, offering survivors access to sponsored gym memberships and wellness coaching for holistic healing.' },
    { icon: <FaLightbulb />, title: 'The Susan Village Women\'s Shelter', desc: 'A healing space for survivors of sexual abuse and human trafficking, offering safe shelter, psychosocial support, and economic empowerment.' },
  ];
  const stories = [
    { title: 'Amina’s Journey', text: 'From a small village to university graduate, Amina’s story is one of resilience and hope.', link: '/impact' },
    { title: 'Empowering Communities', text: 'How our programs are transforming entire communities in Kajiado County.', link: '/programs' },
    { title: 'Volunteer Spotlight', text: 'Meet our dedicated volunteers making a difference every day.', link: '/volunteer' },
  ];


 const testimonials = [
  { 
    text: "As a survivor of childhood sexual violence and modern slavery, I founded Rebirth of a Queen Foundation in 2019 to create a space where other survivors can rise, heal, and lead. This is not just an organization—it's a movement built on courage, faith, and justice.", 
    author: "Akinyi Juma – Founder & Executive Director", 
    avatar: "https://res.cloudinary.com/samokello/image/upload/v1758125547/rebirth-of-a-queen/images/akinyi_dyvfao.jpg",
    role: "Founder & Executive Director",
    experience: "Survivor-led organization since 2019",
    focus: "Survivor advocacy and community healing"
  },
  { 
    text: "Our programs empower women and girls to become leaders and changemakers. Through innovative approaches and community partnerships, we are building a future where every girl has the opportunity to thrive and succeed.", 
    author: "Simon Shitabule – Programs Manager", 
    avatar: "https://res.cloudinary.com/samokello/image/upload/v1758125517/rebirth-of-a-queen/images/leadership_dv2wan.jpg",
    role: "Programs Manager",
    experience: "10+ years in program management",
    focus: "Educational programs and skills development"
  },
  { 
    text: "We are committed to growth, strategy, and sustainable impact for every girl and woman. Our data-driven approach ensures that every initiative creates measurable positive change in the communities we serve.", 
    author: "Walter Musoda – Growth & Strategy Lead", 
    avatar: "https://res.cloudinary.com/samokello/image/upload/v1758121424/rebirth-of-a-queen/images/orientation1_2_gqbuyl.jpg",
    role: "Growth & Strategy Lead",
    experience: "12+ years in strategic planning",
    focus: "Organizational growth and impact measurement"
  },
  { 
    text: "Communication is at the heart of gender equality and empowerment. Through effective storytelling and community engagement, we amplify the voices of women and girls, creating awareness and driving positive change.", 
    author: "Elizabeth Akinyi – Communication & Gender", 
    avatar: "https://res.cloudinary.com/samokello/image/upload/v1758125553/rebirth-of-a-queen/images/liz_weavbn.jpg",
    role: "Communication & Gender Specialist",
    experience: "8+ years in communications",
    focus: "Gender advocacy and community outreach"
  },
  { 
    text: "Monitoring and evaluation help us ensure every program makes a difference. By tracking our impact and learning from our experiences, we continuously improve our services and maximize our positive influence.", 
    author: "Zipora Naeku – Monitoring & Evaluation", 
    avatar: "https://res.cloudinary.com/samokello/image/upload/v1758125551/rebirth-of-a-queen/images/Naeku_qhnife.jpg",
    role: "Monitoring & Evaluation Officer",
    experience: "7+ years in M&E",
    focus: "Impact assessment and program optimization"
  },
  { 
    text: "Supporting our team and beneficiaries is my greatest joy. Through effective human resource management and community support, we create an environment where everyone can thrive and reach their full potential.", 
    author: "Felisha Dacha – Human Resource", 
    avatar: "https://res.cloudinary.com/samokello/image/upload/v1758125549/rebirth-of-a-queen/images/dacha_s161hz.jpg",
    role: "Human Resource Manager",
    experience: "9+ years in HR management",
    focus: "Team development and community support"
  }
];

  const partners = [
    'Talitha Kum International',
    'Women First Fund',
    'New Africa Fund',
    'Mastercard Foundation',
    'Local Communities',
    'Individual Champions'
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const testimonialsToShow = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsToShow);
  const currentSlide = Math.floor(testimonialIndex / testimonialsToShow);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Auto-slide testimonials
  useEffect(() => {
    const timer = setTimeout(() => setTestimonialIndex((i) => (i + testimonialsToShow) % testimonials.length), 7000);
    return () => clearTimeout(timer);
  }, [testimonialIndex, testimonials.length]);

  // Navigation functions
  const nextTestimonial = () => {
    setTestimonialIndex((i) => (i + testimonialsToShow) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((i) => (i - testimonialsToShow + testimonials.length) % testimonials.length);
  };

  //
  const stagger = {
    animate: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
  };
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring', stiffness: 60 } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.4 } }
  };

  return (
    <>
      {/* Hero */}
      <HeroSection id="hero">
        <HeroBg>
          <HeroVideo 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
            poster=""
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onError={(e) => console.log('Video error:', e)}
          >
            <source src="https://res.cloudinary.com/samokello/video/upload/v1758125459/rebirth-of-a-queen/videos/Meet_Pauline_Akini_Zuma_Fighting_Human_Traff_2_tvfupm.mp4" 
            type="video/mp4" />
            Your browser does not support the video tag.
          </HeroVideo>
        </HeroBg>
        <HeroContent
          as={motion.div}
          variants={stagger}
          initial="initial"
          animate="animate"
        >

          <motion.div variants={fadeUp}>
            <HeroTitle>
              <span>Rebirth of a Queen</span> Foundation
            </HeroTitle>
          </motion.div>
          <motion.div variants={fadeUp}>
            <HeroSubtitle>{heroContent.subtitle}</HeroSubtitle>
          </motion.div>
          <motion.div variants={fadeUp}>
            <HeroDesc>{heroContent.desc}</HeroDesc>
          </motion.div>
          <motion.div variants={fadeUp}>
            <HeroDesc2>{heroContent.desc2}</HeroDesc2>
          </motion.div>
          <motion.div 
            variants={fadeUp}
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}
          >
            <CTAButton to={heroContent.to}>{heroContent.cta}</CTAButton>
            <CTAButtonSecondary to={heroContent.toSecondary}>{heroContent.ctaSecondary}</CTAButtonSecondary>
          </motion.div>
        </HeroContent>
      </HeroSection>
      {/* Our Purpose */}
      <PurposeSection>
        <SectionTitle>Our Core Values</SectionTitle>
        <SectionText>
          Rebirth of a Queen Foundation is built on four fundamental values that guide everything we do.
        </SectionText>
        <PurposeCard>
          <PurposeBlock>
            <PurposeIcon><FaBullseye /></PurposeIcon>
            <PurposeTitle>Integrity</PurposeTitle>
            <PurposeDesc>
              We uphold strong moral principles in everything we do, ensuring transparency and ethical practices in all our programs and interactions.
            </PurposeDesc>
          </PurposeBlock>
          <PurposeBlock>
            <PurposeIcon><FaEye /></PurposeIcon>
            <PurposeTitle>Authenticity</PurposeTitle>
            <PurposeDesc>
              We lead with truth, transparency, and lived experience, creating genuine connections and meaningful impact through our survivor-led approach.
            </PurposeDesc>
          </PurposeBlock>
          <PurposeBlock>
            <PurposeIcon><FaFlagCheckered /></PurposeIcon>
            <PurposeTitle>Safeguarding</PurposeTitle>
            <PurposeDesc>
              We prioritize safety, dignity, and trauma-informed care, ensuring that every survivor and vulnerable person feels protected and supported.
            </PurposeDesc>
          </PurposeBlock>
         
        </PurposeCard>
      </PurposeSection>
      {/* About */}
      <AboutSection>
  <AboutText>
    <SectionTitle>About Rebirth of a Queen Foundation</SectionTitle>
    <SectionText>
      <strong>Rebirth of a Queen Foundation</strong> is a survivor-led, feminist, and community-based organization founded in 2019 by Akinyi Juma, a survivor of childhood sexual violence and modern slavery. Born from a deeply personal journey of healing, we advocate for the rights and dignity of survivors through holistic empowerment, storytelling, education, fitness, and voice agency.
      <br /><br />
      <span style={{ color: '#6D28D9', fontWeight: 600 }}>
        Our vision
      </span>{" "}
      is bold and clear: "A community free of sexual violence and human trafficking."
    </SectionText>
   
  </AboutText>

  {/* ✅ Use Cloudinary image directly */}
  <AboutImage 
    src="https://res.cloudinary.com/samokello/image/upload/v1758121594/rebirth-of-a-queen/images/orientation1_j9fvmd.jpg" 
    alt="Empowered girls in education" 
  />
</AboutSection>

      {/* Programs */}
<Section id="programs">
  <SectionTitle>Our Programs</SectionTitle>
  <SectionText>
    We offer a range of holistic programs designed to empower women and girls in Kenya. From education and skills training to wellness and innovation, our programs open doors to opportunity, confidence, and leadership.
  </SectionText>

  <ProgramsGrid>
    {/* Education */}
    <ProgramCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * 0, duration: 0.6, type: 'spring', stiffness: 60 }}
    >
      <ProgramImage 
        src="https://res.cloudinary.com/samokello/image/upload/v1758125601/rebirth-of-a-queen/images/2_lyj9qw.jpg" 
        alt="Education program" 
      />
      <ProgramCardContent>
        <ProgramTitle>Education</ProgramTitle>
        <ProgramDesc>Scholarships, mentorship, and literacy programs for girls and young women.</ProgramDesc>
        <ProgramButton to="/education">Learn More</ProgramButton>
      </ProgramCardContent>
    </ProgramCard>

    {/* Empowerment */}
     <ProgramCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * 1, duration: 0.6, type: 'spring', stiffness: 60 }}
    >
      <ProgramImage 
        src="https://res.cloudinary.com/samokello/image/upload/v1758125515/rebirth-of-a-queen/images/fashion_w02nw6.jpg" 
        alt="Empowerment program" 
      />
      <ProgramCardContent>
        <ProgramTitle>Empowerment</ProgramTitle>
        <ProgramDesc>Entrepreneurship, leadership, and life skills training for lasting change.</ProgramDesc>
        <ProgramButton to="/volunteer">Learn More</ProgramButton>
      </ProgramCardContent>
    </ProgramCard>

    {/* Sports & Wellness */}
    <ProgramCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * 2, duration: 0.6, type: 'spring', stiffness: 60 }}
    >
      <ProgramImage 
        src="https://res.cloudinary.com/samokello/image/upload/v1758125620/rebirth-of-a-queen/images/6_jasfae.jpg" 
        alt="Sports & Wellness program" 
      />
      <ProgramCardContent>
        <ProgramTitle>Sports & Wellness</ProgramTitle>
        <ProgramDesc>Physical fitness, sports, and mental health support for holistic well-being.</ProgramDesc>
        <ProgramButton to="/fitness">Learn More</ProgramButton>
      </ProgramCardContent>
    </ProgramCard>

    {/* Innovation */}
    <ProgramCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * 3, duration: 0.6, type: 'spring', stiffness: 60 }}
    >
      <ProgramImage 
        src="https://res.cloudinary.com/samokello/image/upload/v1758121424/rebirth-of-a-queen/images/orientation1_2_gqbuyl.jpg" 
        alt="Innovation program" 
      />
      <ProgramCardContent>
        <ProgramTitle>Innovation</ProgramTitle>
        <ProgramDesc>Creative arts, digital skills, and innovation labs for the next generation.</ProgramDesc>
        <ProgramButton to="/innovation">Learn More</ProgramButton>
      </ProgramCardContent>
    </ProgramCard>
  </ProgramsGrid>
</Section>

      {/* Testimonials */}
      <TestimonialsSection id="testimonials">
        <TestimonialsTitle>What People Are Saying</TestimonialsTitle>
        <SectionText>
          Hear from women, girls, and partners whose lives have been transformed by Rebirth of a Queen. Their stories inspire us every day.
        </SectionText>
        <TestimonialsContainer>
          <TestimonialArrow 
            className="prev" 
            onClick={prevTestimonial}
            aria-label="Previous testimonials"
          >
            <FaChevronLeft />
          </TestimonialArrow>
          
          <AnimatePresence initial={false} mode="wait">
            <TestimonialsCarousel
              key={currentSlide}
              as={motion.div}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
            >
              {testimonials.slice(currentSlide * testimonialsToShow, currentSlide * testimonialsToShow + testimonialsToShow).map((t) => {
                // Split author into name and role
                const [name, ...roleParts] = t.author.split('–');
                const role = roleParts.join('–').trim();
                return (
                  <TestimonialCard
                    key={t.author}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <QuoteIcon><FaQuoteLeft /></QuoteIcon>
                    <TestimonialText>{t.text}</TestimonialText>
                    <QuoteIcon style={{ alignSelf: 'flex-end', marginBottom: 0 }}><FaQuoteRight /></QuoteIcon>
                    <TestimonialMeta>
                      <TestimonialAvatar src={process.env.PUBLIC_URL + t.avatar} alt={name.trim()} />
                      <TestimonialAuthor>{name.trim()}</TestimonialAuthor>
                      <TestimonialRole>{role}</TestimonialRole>
                    </TestimonialMeta>
                  </TestimonialCard>
                );
              })}
            </TestimonialsCarousel>
          </AnimatePresence>
          
          <TestimonialArrow 
            className="next" 
            onClick={nextTestimonial}
            aria-label="Next testimonials"
          >
            <FaChevronRight />
          </TestimonialArrow>
          
          <TestimonialNav>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <TestimonialDot
                key={i}
                active={i === currentSlide}
                onClick={() => setTestimonialIndex(i * testimonialsToShow)}
                aria-label={`Show testimonials group ${i + 1}`}
              />
            ))}
          </TestimonialNav>
        </TestimonialsContainer>
      </TestimonialsSection>
      {/* Latest News */}
      <LatestNewsSection>
        <SectionTitle>Latest News</SectionTitle>
        <SectionText>
          Stay updated with our latest initiatives, success stories, and community impact.
        </SectionText>
        <NewsGrid>
          {latestNews.map((news) => (
            <NewsCard
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 60 }}
            >
              <NewsImage src={process.env.PUBLIC_URL + news.image} alt={news.title} />
              <NewsContent>
                <NewsMeta>
                  <NewsCategory>{news.category}</NewsCategory>
                  <span>{news.readTime}</span>
                </NewsMeta>
                <NewsTitle>{news.title}</NewsTitle>
                <NewsExcerpt>{news.excerpt}</NewsExcerpt>
                <NewsReadMore to={`/news/${news.id}`}>Read More <FaArrowRight /></NewsReadMore>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </LatestNewsSection>
      {/* Impact */}
      <ImpactSection>
        <ImpactTitle>Our Impact</ImpactTitle>
        <ImpactText>
          Together with our partners and supporters, we are making a measurable difference in the lives of women and girls across Kenya.
        </ImpactText>
        <ImpactGrid>
          <ImpactCard>
            <ImpactIcon><FaUsers /></ImpactIcon>
            <ImpactNumber><CountUp end={250} duration={2.5} separator="," />+</ImpactNumber>
            <ImpactLabel>Women Supported Through Shelter</ImpactLabel>
          </ImpactCard>
          <ImpactCard>
            <ImpactIcon><FaGraduationCap /></ImpactIcon>
            <ImpactNumber><CountUp end={450} duration={2.5} separator="," />+</ImpactNumber>
            <ImpactLabel>Youth Trained in Skills</ImpactLabel>
          </ImpactCard>
          <ImpactCard>
            <ImpactIcon><FaHeart /></ImpactIcon>
            <ImpactNumber><CountUp end={700} duration={2.5} />+</ImpactNumber>
            <ImpactLabel>Teenagers Mentored</ImpactLabel>
          </ImpactCard>
          <ImpactCard>
            <ImpactIcon><FaStar /></ImpactIcon>
            <ImpactNumber><CountUp end={6} duration={2.5} />+</ImpactNumber>
            <ImpactLabel>Years of Impact</ImpactLabel>
          </ImpactCard>
        </ImpactGrid>
      </ImpactSection>
      {/* Partners */}
      <PartnersSection>
        <PartnersTitle>Our Partners</PartnersTitle>
        <PartnersText>
          We are grateful for the support of our partners who help us empower women and girls across Kenya. Interested in joining us? Reach out to become a partner!
        </PartnersText>
        <PartnersGrid>
          {partners.map((partner, i) => (
            <PartnerLogoCard key={i}>
              <PartnerText>{partner}</PartnerText>
            </PartnerLogoCard>
          ))}
        </PartnersGrid>
        <PartnersCTA href="#contact">Become a Partner</PartnersCTA>
      </PartnersSection>
      {/* Stories/News */}
      <StoriesSection>
        <SectionTitle>Stories & News</SectionTitle>
        <StoriesGrid>
          {stories.map((s, i) => (
            <StoryCard key={i}>
              <StoryTitle>{s.title}</StoryTitle>
              <StoryText>{s.text}</StoryText>
              <StoryLink to={s.link}>Read More</StoryLink>
            </StoryCard>
          ))}
        </StoriesGrid>
      </StoriesSection>

      {/* Enhanced Blog Posts Section */}
      <BlogSection>
        <BlogContainer>
          <BlogSectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Latest News & Updates
          </BlogSectionTitle>
          <BlogSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stay informed about our latest programs, success stories, and impact in the community.
          </BlogSubtitle>
          <BlogGrid>
            {latestNews.map((post, index) => (
              <BlogCard
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <BlogImage image={post.image} />
                <BlogContent>
                  <BlogMeta>
                    <BlogCategory>{post.category}</BlogCategory>
                    <BlogDate>
                      <FaCalendarAlt />
                      {new Date(post.date).toLocaleDateString()}
                    </BlogDate>
                    <BlogDate>
                      <FaClock />
                      {post.readTime}
                    </BlogDate>
                  </BlogMeta>
                  <BlogCardTitle>{post.title}</BlogCardTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <BlogReadMore to={post.link}>
                    Read More <FaArrowRight />
                  </BlogReadMore>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        </BlogContainer>
      </BlogSection>

      {/* Success Stories Section */}
      <SuccessStoriesSection>
        <SuccessContainer>
          <SuccessTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Success Stories
          </SuccessTitle>
          <SuccessSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real stories of transformation and empowerment from our beneficiaries who have overcome challenges and built successful futures.
          </SuccessSubtitle>
          <SuccessGrid>
            {[
              {
                id: 1,
                name: 'Grace Mwangi',
                role: 'Leather Craft Entrepreneur',
                quote: 'Through Rebirth of A Queen, I learned leather crafting skills and now run my own business. I employ 5 other women and we export our products internationally.',
                icon: <FaGift />,
                stats: {
                  business: '3 years',
                  employees: '5 women',
                  exports: '5 countries'
                }
              },
              {
                id: 2,
                name: 'Mary Wanjiku',
                role: 'Digital Marketing Specialist',
                quote: 'The digital skills training changed my life completely. I now work remotely for international clients and earn more than I ever dreamed possible.',
                icon: <FaChartLine />,
                stats: {
                  clients: '12+',
                  income: '3x increase',
                  skills: '8 courses'
                }
              },
              {
                id: 3,
                name: 'Jane Akinyi',
                role: 'Community Mentor',
                quote: 'After my own healing journey, I now mentor other survivors. Seeing them transform and find their voice is the most rewarding experience of my life.',
                icon: <FaUserFriends />,
                stats: {
                  mentees: '25+',
                  years: '2 years',
                  impact: '100% success'
                }
              }
            ].map((story, index) => (
              <SuccessCard
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <StoryHeader>
                  <SuccessIcon>{story.icon}</SuccessIcon>
                  <div>
                    <SuccessName>{story.name}</SuccessName>
                    <SuccessRole>{story.role}</SuccessRole>
                  </div>
                </StoryHeader>
                <StoryBody>
                  <SuccessQuote>{story.quote}</SuccessQuote>
                  <SuccessStats>
                    {Object.entries(story.stats).map(([key, value]) => (
                      <StatChip key={key}>
                        <SuccessStatNumber>{value}</SuccessStatNumber>
                        <SuccessStatLabel>{key}</SuccessStatLabel>
                      </StatChip>
                    ))}
                  </SuccessStats>
                </StoryBody>
              </SuccessCard>
            ))}
          </SuccessGrid>
        </SuccessContainer>
      </SuccessStoriesSection>

      {/* Newsletter Signup Section */}
      <NewsletterSection>
        {/* Floating Animation Elements */}
        <FloatingElement
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <FloatingElement
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ top: '60%', right: '15%' }}
        />
        <FloatingElement
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ top: '40%', left: '80%' }}
        />
        <FloatingIcon
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '30%', left: '5%' }}
        >
          <FaHeart />
        </FloatingIcon>
        <FloatingIcon
          animate={{
            y: [0, -20, 0],
            rotate: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          style={{ top: '70%', right: '10%' }}
        >
          <FaStar />
        </FloatingIcon>

        <NewsletterContainer>
          <NewsletterTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Stay Connected
          </NewsletterTitle>
          <NewsletterSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
          >
            Get the latest updates on our programs, success stories, and ways you can make a difference in women's empowerment.
          </NewsletterSubtitle>
          <NewsletterForm
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <NewsletterInput 
              type="email" 
              placeholder="Enter your email address"
              required
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
            <NewsletterButton 
              type="submit"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaEnvelope />
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </NewsletterContainer>
      </NewsletterSection>

      {/* Get Involved */}
      <GetInvolvedSection id="contact">
        <SectionTitle>Get Involved</SectionTitle>
        <SectionText>
          Whether you want to volunteer, partner, or support us financially, your involvement makes a difference. Join our movement for change!
        </SectionText>
        <GetInvolvedGrid>
          <GetInvolvedCard
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * 0, duration: 0.7, type: 'spring', stiffness: 60 }}
            whileHover={{ scale: 1.04 }}
          >
            <GetInvolvedIconWrap
              whileHover={{ scale: 1.18, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaHandsHelping />
            </GetInvolvedIconWrap>
            <GetInvolvedTitleCard>Volunteer</GetInvolvedTitleCard>
            <GetInvolvedDesc>Make a direct impact by sharing your time, skills, and passion with our community.</GetInvolvedDesc>
            <GetInvolvedButton to="/volunteer">
              Volunteer <FaArrowRight style={{ fontSize: '1em' }} />
            </GetInvolvedButton>
          </GetInvolvedCard>
          <GetInvolvedCard
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * 1, duration: 0.7, type: 'spring', stiffness: 60 }}
            whileHover={{ scale: 1.04 }}
          >
            <GetInvolvedIconWrap
              whileHover={{ scale: 1.18, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaHandshake />
            </GetInvolvedIconWrap>
            <GetInvolvedTitleCard>Partner</GetInvolvedTitleCard>
            <GetInvolvedDesc>Collaborate with us to create sustainable change and empower more women and girls.</GetInvolvedDesc>
            <GetInvolvedButton to="/partner">
              Partner <FaArrowRight style={{ fontSize: '1em' }} />
            </GetInvolvedButton>
          </GetInvolvedCard>
          <GetInvolvedCard
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * 2, duration: 0.7, type: 'spring', stiffness: 60 }}
            whileHover={{ scale: 1.04 }}
          >
            <GetInvolvedIconWrap
              whileHover={{ scale: 1.18, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaDonate />
            </GetInvolvedIconWrap>
            <GetInvolvedTitleCard>Donate</GetInvolvedTitleCard>
            <GetInvolvedDesc>Your financial support helps us reach more communities and transform more lives.</GetInvolvedDesc>
            <GetInvolvedButton to="/donate">
              Donate <FaArrowRight style={{ fontSize: '1em' }} />
            </GetInvolvedButton>
          </GetInvolvedCard>
        </GetInvolvedGrid>
      </GetInvolvedSection>
      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <ScrollToTopButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </ScrollToTopButton>
        )}
      </AnimatePresence>
      

      {/* Chatbot */}
      <Chatbot />
    </>
  );
};
export default Home; 