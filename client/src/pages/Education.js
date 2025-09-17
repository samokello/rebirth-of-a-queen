import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaArrowRight, FaQuestionCircle, FaUser, FaEnvelope, FaSchool, FaCheckCircle, FaLightbulb, FaStar, FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight, FaImage, FaStar as FaStarFilled, FaPlayCircle } from 'react-icons/fa';
import CountUp from 'react-countup';

// --- Hero Section ---
const heroGradient = 'linear-gradient(120deg, #8B5CF6 0%, #6D28D9 100%)';
const Hero = styled.section`
  position: relative;
  min-height: 60vh;
  width: 100vw;
  background: ${heroGradient}, url('/images/education/orientation1.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
`;
const AnimatedOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(34,17,51,0.82) 60%, rgba(139,92,246,0.55) 100%);
  z-index: 1;
`;
const HeroContent = styled(motion.div)`
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(18px);
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(30,16,60,0.13);
  padding: 3.2rem 2.5rem 2.5rem 2.5rem;
  max-width: 600px;
  margin: 3rem 2vw 2rem 2vw;
  text-align: center;
  color: #fff;
  z-index: 2;
  @media (max-width: 600px) {
    padding: 1.2rem 0.7rem;
    margin: 2rem 0.5rem 1rem 0.5rem;
  }
`;
const HeroIcon = styled(motion.div)`
  font-size: 3.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1.1rem;
`;
const HeroTitle = styled(motion.h1)`
  font-size: 2.9rem;
  font-weight: 900;
  margin-bottom: 1.1rem;
  letter-spacing: -1px;
  color: #fff;
`;
const HeroDesc = styled(motion.p)`
  font-size: 1.22rem;
  color: #f3eaff;
  margin-bottom: 0.7rem;
`;

// --- Multi-step Form ---
const FormContentSection = styled.section`
  max-width: 1100px;
  margin: 3rem auto 2rem auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2.5rem;
  align-items: flex-start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
const FormCard = styled.div`
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px rgba(139,92,246,0.10);
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 6px;
  margin-bottom: 1.2rem;
  overflow: hidden;
`;
const Progress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  width: ${({ step }) => (step * 33.33)}%;
  transition: width 0.3s;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;
const InputWrap = styled.div`
  position: relative;
`;
const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #b39ddb;
  font-size: 1.1rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.05rem;
  background: #fff;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.05rem;
  min-height: 100px;
  background: #fff;
`;
const FormNav = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 0.7rem;
`;
const FormButton = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px ${({ theme }) => theme.palette.primary.main}22;
  transition: background 0.18s, transform 0.15s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-2px) scale(1.04);
  }
  &:disabled {
    background: #ccc;
    color: #fff;
    cursor: not-allowed;
  }
`;

// --- Testimonials Carousel ---
const CarouselSection = styled.section`
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  position: relative;
`;
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const CarouselButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;
const TestimonialCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  max-width: 340px;
  min-width: 220px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const TestimonialStars = styled.div`
  display: flex;
  gap: 0.2em;
  margin-bottom: 0.5rem;
`;
const TestimonialQuote = styled.p`
  font-size: 1.08rem;
  color: #444;
  margin-bottom: 1.2rem;
`;
const TestimonialMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.1rem;
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
const TestimonialName = styled.div`
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

// --- Impact Counters ---
const CountersSection = styled.section`
  background: #f8f5ff;
  padding: 3rem 1rem 2.5rem 1rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px rgba(30,41,59,0.07);
  max-width: 1100px;
  margin: 3rem auto 2rem auto;
  position: relative;
  overflow: hidden;
`;
const SVGPattern = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.13;
`;
const CountersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.2rem;
  position: relative;
  z-index: 1;
`;
const CounterCard = styled(motion.div)`
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(12px);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(30,41,59,0.07);
  padding: 2rem 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CounterIcon = styled.div`
  font-size: 2.3rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.5rem;
  animation: bounce 1.8s infinite alternate;
  @keyframes bounce {
    0% { transform: translateY(0); }
    100% { transform: translateY(-8px); }
  }
`;
const CounterNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a237e;
`;
const CounterLabel = styled.div`
  font-size: 1.05rem;
  color: #5c6bc0;
`;

// --- Features Section ---
const FeaturesSection = styled.section`
  max-width: 1100px;
  margin: 3rem auto 2rem auto;
`;
const FeaturesGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;
const FeatureCard = styled(motion.div)`
  flex: 1 1 180px;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #0001;
  padding: 1.5rem 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.18s, transform 0.18s;
  &:hover {
    box-shadow: 0 8px 32px rgba(139,92,246,0.18);
    transform: translateY(-4px) scale(1.03);
  }
`;
const FeatureIcon = styled.div`
  font-size: 2.1rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.7rem;
`;
const FeatureTitle = styled.h3`
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;
const FeatureDesc = styled.p`
  font-size: 1rem;
  color: #444;
`;

// --- FAQ ---
const FAQSection = styled.section`
  background: #fff;
  padding: 2.5rem 1rem 2rem 1rem;
  max-width: 540px;
  margin: 2rem auto;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
`;
const FAQTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const FAQItem = styled.div`
  margin-bottom: 1.2rem;
`;
const FAQQuestion = styled.button`
  background: none;
  border: none;
  color: #1a237e;
  font-weight: 700;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
  gap: 0.7em;
  cursor: pointer;
  margin-bottom: 0.3rem;
`;
const FAQAnswer = styled(motion.div)`
  font-size: 1rem;
  color: #444;
  padding-left: 1.5rem;
`;

// --- Partners Carousel ---
const PartnersRow = styled.div`
  display: flex;
  gap: 2.2rem;
  overflow-x: auto;
  padding: 2rem 0 1rem 0;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
`;
const PartnerLogo = styled.img`
  height: 44px;
  width: auto;
  filter: grayscale(1) brightness(0.8);
  opacity: 0.8;
  transition: filter 0.2s, opacity 0.2s;
  &:hover {
    filter: none;
    opacity: 1;
  }
`;

// --- Floating Action Button ---
const Fab = styled.a`
  position: fixed;
  right: 2.2rem;
  bottom: 2.2rem;
  z-index: 200;
  background: linear-gradient(120deg, #8B5CF6 60%, #6D28D9 100%);
  color: #fff;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 4px 24px rgba(139,92,246,0.18);
  transition: background 0.2s, transform 0.18s;
  &:hover {
    background: #6D28D9;
    transform: scale(1.08);
  }
`;

const FormInfoTitle = styled.h3`
  font-size: 1.13rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const FormInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const FormInfoItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.7em;
  font-size: 1.01rem;
  color: #444;
  margin-bottom: 0.5rem;
`;
const FormInfoIcon = styled.span`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 1.1rem;
  margin-top: 0.2em;
`;

// Redefine section wrappers for a vertical, single-column layout
const SectionBlock = styled.section`
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2.5rem 1.5rem;
  margin-bottom: 2.5rem;
`;
const AltSectionBlock = styled(SectionBlock)`
  background: #f8f5ff;
`;

const TimelineSection = styled.section`
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2.5rem 1.5rem;
`;
const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1.2rem;
`;
const TimelineList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const TimelineItem = styled.li`
  position: relative;
  padding-left: 2.2rem;
  margin-bottom: 1.2rem;
  &:before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.7rem;
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    box-shadow: 0 2px 8px #8B5CF622;
  }
`;
const ResourcesSection = styled.section`
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  background: #f8f5ff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2.5rem 1.5rem;
  text-align: center;
`;
const ResourceLink = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  font-weight: 700;
  border-radius: 22px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  text-decoration: none;
  box-shadow: 0 2px 8px #8B5CF622;
  margin: 0.7rem 0.7rem 0 0;
  transition: background 0.18s, color 0.18s, transform 0.15s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    color: #fff;
    transform: translateY(-2px) scale(1.04);
  }
`;
const VideoSection = styled.section`
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2.5rem 1.5rem;
  text-align: center;
`;
const VideoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1.2rem;
`;
const VideoEmbed = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  margin-bottom: 1.2rem;
`;
const VideoIframe = styled.iframe`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border: none;
  border-radius: 1.2rem;
`;

// Add ProgramsGrid and ProgramCard styled components
const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.2rem;
  margin: 3rem auto 2rem auto;
  max-width: 1100px;
`;
const ProgramCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.18s, transform 0.18s;
  &:hover {
    box-shadow: 0 8px 32px rgba(139,92,246,0.18);
    transform: translateY(-4px) scale(1.03);
  }
`;
const ProgramIcon = styled.div`
  font-size: 2.3rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.7rem;
`;
const ProgramImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
  margin-bottom: 1rem;
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
// Add HowItWorksSection, Stepper, StepCard styled components
const HowItWorksSection = styled.section`
  max-width: 900px;
  margin: 3rem auto 2rem auto;
  background: #f8f5ff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 2.5rem 1.5rem;
`;
const Stepper = styled.div`
  display: flex;
  gap: 2.2rem;
  justify-content: center;
  flex-wrap: wrap;
`;
const StepCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 1.5rem 1.2rem;
  text-align: center;
  min-width: 180px;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StepIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.7rem;
`;
const StepTitle = styled.h4`
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;
const StepDesc = styled.p`
  font-size: 0.97rem;
  color: #444;
`;
// Add MentorsSection, MentorGrid, MentorCard styled components
const MentorsSection = styled.section`
  max-width: 1100px;
  margin: 3rem auto 2rem auto;
`;
const MentorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;
const MentorCard = styled(motion.div)`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
  padding: 1.5rem 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MentorAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.7rem;
`;
const MentorName = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
`;
const MentorRole = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
`;
const MentorBio = styled.p`
  font-size: 0.97rem;
  color: #444;
`;

const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 0.95rem;
  margin-bottom: -0.8rem;
`;

const features = [
  { icon: <FaBook />, title: 'Scholarships', desc: 'Over 1,200 scholarships awarded to deserving students.' },
  { icon: <FaChalkboardTeacher />, title: 'Mentorship', desc: 'Guidance and support from experienced mentors and role models.' },
  { icon: <FaLightbulb />, title: 'Innovation', desc: 'Digital skills, creative arts, and innovation labs.' },
  { icon: <FaStar />, title: 'Excellence', desc: 'Celebrating academic and personal achievements.' },
];

const formInfo = [
  { icon: <FaCheckCircle />, text: 'Open to girls and young women in Kenya.' },
  { icon: <FaCheckCircle />, text: 'Selection based on need and commitment.' },
  { icon: <FaCheckCircle />, text: 'Mentorship and support included.' },
  { icon: <FaCheckCircle />, text: 'Apply online or at our community events.' },
];

// Update the testimonials array to only include unique testimonials by name and quote.
const testimonials = [
  { quote: 'The scholarship changed my life. I am now in university and mentoring others!', name: 'Amina', role: 'Scholarship Recipient', avatar: '/images/team/team1 (1).jpg', rating: 5 },
  { quote: 'Mentoring girls has been the most rewarding experience of my career.', name: 'Simon', role: 'Mentor', avatar: '/images/team/team1 (2).jpg', rating: 5 },
  { quote: 'The support and encouragement I received was life-changing.', name: 'Elizabeth', role: 'Alumna', avatar: '/images/team/team1 (4).jpg', rating: 4 },
];

const counters = [
  { icon: <FaUserGraduate />, number: 1200, label: 'Scholarships Awarded' },
  { icon: <FaChalkboardTeacher />, number: 80, label: 'Mentors Engaged' },
  { icon: <FaUsers />, number: 5000, label: 'Girls Empowered' },
];

const faqs = [
  { q: 'Who can apply for a scholarship?', a: 'Girls and young women in Kenya who demonstrate need and commitment to education.' },
  { q: 'How do I become a mentor?', a: 'Fill out the application form and our team will contact you with next steps.' },
  { q: 'Are there community events?', a: 'Yes, we regularly host workshops and outreach events. Check our news section for updates.' },
];

const partners = [
  '/images/branding/logo-1.png',
  '/images/branding/footer-bg.jpg',
  '/logo.png',
];

const Education = () => {
  const [formData, setFormData] = useState({ name: '', email: '', school: '', story: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Testimonials carousel state
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  // FAQ
  const [faqOpen, setFaqOpen] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      formIsValid = false;
    }
    if (!formData.school) {
      newErrors.school = 'School/Institution is required';
      formIsValid = false;
    }
    if (!formData.story) {
      newErrors.story = 'Story/Goals is required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      setSubmitted(true);
      // In a real application, you would send formData to an API here
      console.log('Form submitted successfully:', formData);
    }
  };

  // Carousel navigation
  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      {/* Hero */}
      <Hero>
        <AnimatedOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <HeroContent
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
        >
          <HeroIcon initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ duration: 0.7, type: 'spring' }}><FaBook /></HeroIcon>
          <HeroTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>Education Program</HeroTitle>
          <HeroDesc initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
            Scholarships, mentorship, and literacy programs for girls and young women. We believe education is the key to unlocking potential and breaking the cycle of poverty.
          </HeroDesc>
        </HeroContent>
      </Hero>
      {/* Multi-step Form + Content */}
      <SectionBlock>
        <FormCard>
          <FormTitle>Apply for a Scholarship</FormTitle>
          <Form as={motion.form} onSubmit={handleSubmit} noValidate initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FaCheckCircle style={{ color: '#8B5CF6', fontSize: '2.2rem', marginBottom: '1rem' }} />
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Application Complete!</div>
                <div style={{ color: '#444', fontSize: '1rem' }}>Thank you for applying. Our team will contact you soon.</div>
              </motion.div>
            ) : (
              <>
                <InputWrap>
                  <InputIcon><FaUser /></InputIcon>
                  <Input type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required />
                </InputWrap>
                {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
                <InputWrap>
                  <InputIcon><FaEnvelope /></InputIcon>
                  <Input type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} required />
                </InputWrap>
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                <InputWrap>
                  <InputIcon><FaSchool /></InputIcon>
                  <Input type="text" placeholder="School/Institution" name="school" value={formData.school} onChange={handleChange} required />
                </InputWrap>
                {errors.school && <ErrorMsg>{errors.school}</ErrorMsg>}
                <InputWrap>
                  <InputIcon><FaBook /></InputIcon>
                  <Textarea placeholder="Tell us about your goals and why you need this scholarship" name="story" value={formData.story} onChange={handleChange} required />
                </InputWrap>
                {errors.story && <ErrorMsg>{errors.story}</ErrorMsg>}
                <FormButton type="submit">Apply Now</FormButton>
              </>
            )}
          </Form>
        </FormCard>
        <AltSectionBlock>
          <FeaturesSection>
            <FeaturesGrid>
              {features.map((f, i) => (
                <FeatureCard key={f.title} whileHover={{ scale: 1.04 }}>
                  <FeatureIcon>{f.icon}</FeatureIcon>
                  <FeatureTitle>{f.title}</FeatureTitle>
                  <FeatureDesc>{f.desc}</FeatureDesc>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </FeaturesSection>
          <FormInfoTitle>Why Apply?</FormInfoTitle>
          <FormInfoList>
            {formInfo.map((item, i) => (
              <FormInfoItem key={i}><FormInfoIcon>{item.icon}</FormInfoIcon>{item.text}</FormInfoItem>
            ))}
          </FormInfoList>
        </AltSectionBlock>
      </SectionBlock>
      {/* Testimonials Carousel */}
      <CarouselSection>
        <CarouselContainer>
          <CarouselButton aria-label="Previous" onClick={prevTestimonial}><FaChevronLeft /></CarouselButton>
          <AnimatePresence initial={false} mode="wait">
            <TestimonialCard
              key={testimonialIdx}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <TestimonialStars>
                {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => <FaStarFilled key={i} style={{ color: '#FBBF24' }} />)}
              </TestimonialStars>
              <FaQuoteLeft style={{ color: '#b39ddb', fontSize: '1.2rem', marginBottom: '0.3rem' }} />
              <TestimonialQuote>"{testimonials[testimonialIdx].quote}"</TestimonialQuote>
              <FaQuoteRight style={{ color: '#b39ddb', fontSize: '1.2rem', marginBottom: '0.3rem' }} />
              <TestimonialMeta>
                <TestimonialAvatar src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} />
                <TestimonialName>{testimonials[testimonialIdx].name}</TestimonialName>
                <TestimonialRole>{testimonials[testimonialIdx].role}</TestimonialRole>
              </TestimonialMeta>
            </TestimonialCard>
          </AnimatePresence>
          <CarouselButton aria-label="Next" onClick={nextTestimonial}><FaChevronRight /></CarouselButton>
        </CarouselContainer>
      </CarouselSection>
      {/* Impact Counters */}
      <CountersSection>
        <SVGPattern>
          <svg width="100%" height="100%" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="2" fill="#8B5CF6" />
            <circle cx="120" cy="80" r="2" fill="#8B5CF6" />
            <circle cx="300" cy="60" r="2" fill="#8B5CF6" />
            <circle cx="380" cy="20" r="2" fill="#8B5CF6" />
          </svg>
        </SVGPattern>
        <CountersGrid>
          {counters.map((c, i) => (
            <CounterCard
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6, type: 'spring', stiffness: 60 }}
            >
              <CounterIcon>{c.icon}</CounterIcon>
              <CounterNumber><CountUp end={c.number} duration={2.5} separator="," />+</CounterNumber>
              <CounterLabel>{c.label}</CounterLabel>
            </CounterCard>
          ))}
        </CountersGrid>
      </CountersSection>
      {/* Programs Grid */}
      <ProgramsGrid>
        <ProgramCard whileHover={{ scale: 1.04 }}>
          <ProgramIcon><FaBook /></ProgramIcon>
          <ProgramImage src="/images/education/scholarship.jpg" alt="Scholarship" />
          <ProgramTitle>Scholarships</ProgramTitle>
          <ProgramDesc>Financial assistance for deserving students to pursue higher education.</ProgramDesc>
        </ProgramCard>
        <ProgramCard whileHover={{ scale: 1.04 }}>
          <ProgramIcon><FaUserGraduate /></ProgramIcon>
          <ProgramImage src="/images/education/mentorship.jpg" alt="Mentorship" />
          <ProgramTitle>Mentorship</ProgramTitle>
          <ProgramDesc>Guidance and support from experienced mentors and role models.</ProgramDesc>
        </ProgramCard>
        <ProgramCard whileHover={{ scale: 1.04 }}>
          <ProgramIcon><FaChalkboardTeacher /></ProgramIcon>
          <ProgramImage src="/images/education/digital-skills.jpg" alt="Digital Skills" />
          <ProgramTitle>Digital Skills</ProgramTitle>
          <ProgramDesc>Enhance your digital literacy and creative skills.</ProgramDesc>
        </ProgramCard>
        <ProgramCard whileHover={{ scale: 1.04 }}>
          <ProgramIcon><FaUsers /></ProgramIcon>
          <ProgramImage src="/images/education/leadership.jpg" alt="Leadership" />
          <ProgramTitle>Leadership</ProgramTitle>
          <ProgramDesc>Develop your leadership skills and community impact.</ProgramDesc>
        </ProgramCard>
        <ProgramCard whileHover={{ scale: 1.04 }}>
          <ProgramIcon><FaLightbulb /></ProgramIcon>
          <ProgramImage src="/images/education/stem.jpg" alt="STEM" />
          <ProgramTitle>STEM</ProgramTitle>
          <ProgramDesc>Explore and excel in Science, Technology, Engineering, and Mathematics.</ProgramDesc>
        </ProgramCard>
        <ProgramCard whileHover={{ scale: 1.04 }}>
          <ProgramIcon><FaBook /></ProgramIcon>
          <ProgramImage src="/images/education/literacy.jpg" alt="Literacy" />
          <ProgramTitle>Literacy</ProgramTitle>
          <ProgramDesc>Improve your reading, writing, and comprehension skills.</ProgramDesc>
        </ProgramCard>
      </ProgramsGrid>
      {/* How It Works Section */}
      <HowItWorksSection>
        <Stepper>
          <StepCard whileHover={{ scale: 1.04 }}>
            <StepIcon><FaBook /></StepIcon>
            <StepTitle>Application</StepTitle>
            <StepDesc>Complete the online application form.</StepDesc>
          </StepCard>
          <StepCard whileHover={{ scale: 1.04 }}>
            <StepIcon><FaUserGraduate /></StepIcon>
            <StepTitle>Review</StepTitle>
            <StepDesc>Our team reviews applications based on criteria.</StepDesc>
          </StepCard>
          <StepCard whileHover={{ scale: 1.04 }}>
            <StepIcon><FaCheckCircle /></StepIcon>
            <StepTitle>Selection</StepTitle>
            <StepDesc>Successful applicants are notified and invited for interviews.</StepDesc>
          </StepCard>
          <StepCard whileHover={{ scale: 1.04 }}>
            <StepIcon><FaLightbulb /></StepIcon>
            <StepTitle>Orientation</StepTitle>
            <StepDesc>Attend an orientation session to learn about the program.</StepDesc>
          </StepCard>
          <StepCard whileHover={{ scale: 1.04 }}>
            <StepIcon><FaStar /></StepIcon>
            <StepTitle>Program Start</StepTitle>
            <StepDesc>Begin your journey towards academic and personal growth.</StepDesc>
          </StepCard>
        </Stepper>
      </HowItWorksSection>
      {/* Success Stories Carousel */}
      <CarouselSection>
        <CarouselContainer>
          <CarouselButton aria-label="Previous" onClick={prevTestimonial}><FaChevronLeft /></CarouselButton>
          <AnimatePresence initial={false} mode="wait">
            <TestimonialCard
              key={testimonialIdx}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <TestimonialStars>
                {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => <FaStarFilled key={i} style={{ color: '#FBBF24' }} />)}
              </TestimonialStars>
              <FaQuoteLeft style={{ color: '#b39ddb', fontSize: '1.2rem', marginBottom: '0.3rem' }} />
              <TestimonialQuote>"{testimonials[testimonialIdx].quote}"</TestimonialQuote>
              <FaQuoteRight style={{ color: '#b39ddb', fontSize: '1.2rem', marginBottom: '0.3rem' }} />
              <TestimonialMeta>
                <TestimonialAvatar src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} />
                <TestimonialName>{testimonials[testimonialIdx].name}</TestimonialName>
                <TestimonialRole>{testimonials[testimonialIdx].role}</TestimonialRole>
              </TestimonialMeta>
            </TestimonialCard>
          </AnimatePresence>
          <CarouselButton aria-label="Next" onClick={nextTestimonial}><FaChevronRight /></CarouselButton>
        </CarouselContainer>
      </CarouselSection>
      {/* Meet the Mentors Section */}
      <MentorsSection>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1a237e' }}>Meet Our Mentors</h2>
        <MentorGrid>
          <MentorCard whileHover={{ scale: 1.04 }}>
            <MentorAvatar src="/images/mentors/mentor1.jpg" alt="Mentor 1" />
            <MentorName>Dr. Sarah Johnson</MentorName>
            <MentorRole>Education Specialist</MentorRole>
            <MentorBio>With over 20 years of experience in education policy and research.</MentorBio>
          </MentorCard>
          <MentorCard whileHover={{ scale: 1.04 }}>
            <MentorAvatar src="/images/mentors/mentor2.jpg" alt="Mentor 2" />
            <MentorName>Mr. Michael Chen</MentorName>
            <MentorRole>Entrepreneur & Philanthropist</MentorRole>
            <MentorBio>Founder of a successful tech startup and dedicated to education equity.</MentorBio>
          </MentorCard>
          <MentorCard whileHover={{ scale: 1.04 }}>
            <MentorAvatar src="/images/mentors/mentor3.jpg" alt="Mentor 3" />
            <MentorName>Ms. Emma Davis</MentorName>
            <MentorRole>Educational Consultant</MentorRole>
            <MentorBio>Specializes in curriculum development and educational innovation.</MentorBio>
          </MentorCard>
        </MentorGrid>
      </MentorsSection>
      {/* FAQ */}
      <FAQSection>
        <FAQTitle><FaQuestionCircle style={{marginRight: '0.5em'}} />Frequently Asked Questions</FAQTitle>
        {faqs.map((faq, i) => (
          <FAQItem key={i}>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
              {faq.q}
              <FaArrowRight style={{ transform: faqOpen === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </FAQQuestion>
            <AnimatePresence initial={false}>
              {faqOpen === i && (
                <FAQAnswer
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.a}
                </FAQAnswer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </FAQSection>
      {/* Partners Carousel */}
      <PartnersRow>
        {partners.map((logo, i) => (
          <PartnerLogo key={i} src={logo} alt={`Partner ${i + 1}`} />
        ))}
      </PartnersRow>
      {/* Floating Action Button */}
      <Fab href="#form">
        <FaBook />
      </Fab>
    </>
  );
};
export default Education; 