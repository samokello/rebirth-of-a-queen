import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaTshirt, FaChalkboardTeacher, FaGem, FaUsers, FaStar, FaArrowRight, FaPalette, FaAward, FaChartLine, FaCut, FaRegLightbulb, FaChevronDown, FaChevronUp, FaUser, FaEnvelope, FaPhone, FaCommentDots } from 'react-icons/fa';
import { useState } from 'react';

const fashionStats = [
  { number: 800, label: 'Graduates', icon: FaUsers, description: 'Women and girls who have completed our fashion programs', color: '#8B5CF6' },
  { number: 120, label: 'Fashion Shows', icon: FaTshirt, description: 'Fashion shows and exhibitions held', color: '#3b82f6' },
  { number: 30, label: 'Communities Served', icon: FaPalette, description: 'Communities across Kenya reached by our fashion initiatives', color: '#f59e0b' },
  { number: 97, label: 'Success Rate', icon: FaStar, description: 'Success rate of our graduates in the fashion industry', color: '#ef4444' }
];

const programStats = [
  { program: 'Design & Tailoring', graduates: 400, successRate: 98, avgIncome: 35000, icon: FaCut },
  { program: 'Jewelry & Accessories', graduates: 200, successRate: 95, avgIncome: 25000, icon: FaGem },
  { program: 'Fashion Business', graduates: 200, successRate: 96, avgIncome: 40000, icon: FaChartLine }
];

const yearlyImpact = [
  { year: '2019', graduates: 100, communities: 5 },
  { year: '2020', graduates: 200, communities: 10 },
  { year: '2021', graduates: 400, communities: 18 },
  { year: '2022', graduates: 650, communities: 25 },
  { year: '2023', graduates: 800, communities: 30 }
];

const additionalMetrics = [
  { icon: FaAward, number: 12, label: 'Awards Won', description: 'Awards for excellence in fashion and design', suffix: '+' },
  { icon: FaChartLine, number: 85, label: 'Employment Rate', description: 'Percentage of graduates employed or running businesses', suffix: '%' }
];

const features = [
  { icon: FaTshirt, title: 'Design Training', desc: 'Learn the latest trends and techniques in fashion design from industry experts.' },
  { icon: FaCut, title: 'Tailoring Workshops', desc: 'Hands-on workshops in tailoring and garment making for all skill levels.' },
  { icon: FaGem, title: 'Jewelry & Accessories', desc: 'Create unique jewelry and accessories to complement fashion pieces.' },
  { icon: FaPalette, title: 'Fashion Shows', desc: 'Showcase your creations in local and national fashion shows.' },
  { icon: FaRegLightbulb, title: 'Business Skills', desc: 'Entrepreneurship and marketing training to launch your own brand.' }
];

const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/fashion/fashion1.jpg') center/cover;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;
const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;
const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  color: #FFFFFF;
  text-align: center;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;
const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #FFFFFF;
  opacity: 0.95;
  line-height: 1.6;
  text-align: center;
  z-index: 1;
`;
const Section = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
`;
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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
const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
`;
const ImpactCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 1.5rem 1.2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;
const ImpactIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ color }) => color};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  z-index: 1;
`;
const ImpactNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.5rem;
`;
const ImpactLabel = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 0.5rem;
`;
const ImpactDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;
const ProgramStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
`;
const ProgramStatCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 1.5rem 1.2rem;
  text-align: center;
`;
const ProgramHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;
const ProgramIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 0.8rem;
`;
const ProgramName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
`;
const ProgramMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;
const Metric = styled.div`
  text-align: center;
`;
const MetricLabel = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 0.3rem;
`;
const MetricValue = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
`;
const GrowthCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 1.5rem 1.2rem;
  text-align: center;
`;
const GrowthYear = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1rem;
`;
const GrowthMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.8rem;
`;
const GrowthMetric = styled.div`
  text-align: center;
`;
const GrowthLabel = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 0.3rem;
`;
const GrowthNumber = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const AdditionalMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
`;
const AdditionalMetricCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 1.5rem 1.2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;
const AdditionalMetricIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ color }) => color};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  z-index: 1;
`;
const AdditionalMetricNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 0.5rem;
`;
const AdditionalMetricLabel = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 0.5rem;
`;
const AdditionalMetricDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.text.primary};
`;
const CTASection = styled.div`
  text-align: center;
  margin-top: 3rem;
`;
const CTATitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const CTADescription = styled.p`
  font-size: 1.08rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 2rem;
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
  transition: background 0.18s, transform 0.15s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-2px) scale(1.04);
  }
`;

const FeaturesSection = styled.section`
  max-width: 1100px;
  margin: 0 auto 3rem auto;
  padding: 2.5rem 1.5rem;
`;
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;
const FeatureCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 2rem 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1rem;
`;
const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const FeatureDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const FormSection = styled.section`
  max-width: 600px;
  margin: 0 auto 3rem auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 2.5rem 1.5rem;
`;
const FormTitle = styled.h2`
  text-align: center;
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 2rem;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const Input = styled.input`
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;
const Select = styled.select`
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  min-height: 100px;
`;
const SubmitButton = styled.button`
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`;
const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 0.95rem;
  margin-bottom: -0.8rem;
`;

const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.primary.light}22;
  }
`;

const InputIcon = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const FormIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1.5rem;
  text-align: center;
`;

function ApplicationForm() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!fields.name) errs.name = 'Name is required.';
    if (!fields.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email)) errs.email = 'Valid email required.';
    if (!fields.phone) errs.phone = 'Phone is required.';
    if (!fields.interest) errs.interest = 'Please select an area of interest.';
    if (!fields.message) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: fields.name.split(' ')[0] || fields.name,
            lastName: fields.name.split(' ').slice(1).join(' ') || '',
            email: fields.email,
            phone: fields.phone,
            program: 'fashion',
            age: 25, // Default age since not collected in this form
            location: 'Nairobi', // Default location since not collected in this form
            message: fields.message,
            source: 'fashion'
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setSubmitted(true);
        } else {
          alert(result.message || 'Failed to submit application. Please try again.');
        }
      } catch (error) {
        console.error('Application submission error:', error);
        alert('Failed to submit application. Please try again.');
      }
    }
  };

  if (submitted) return <div style={{textAlign:'center', color:'#16a34a', fontWeight:600, fontSize:'1.2rem', margin:'2rem 0'}}>Thank you for applying! We will contact you soon.</div>;

  return (
    <StyledForm as={motion.form} onSubmit={handleSubmit} noValidate initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <FormIcon><FaCut /></FormIcon>
      <InputWrap>
        <InputIcon><FaUser /></InputIcon>
        <Input name="name" placeholder="Full Name" value={fields.name} onChange={handleChange} />
      </InputWrap>
      {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
      <InputWrap>
        <InputIcon><FaEnvelope /></InputIcon>
        <Input name="email" placeholder="Email Address" value={fields.email} onChange={handleChange} />
      </InputWrap>
      {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
      <InputWrap>
        <InputIcon><FaPhone /></InputIcon>
        <Input name="phone" placeholder="Phone Number" value={fields.phone} onChange={handleChange} />
      </InputWrap>
      {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
      <InputWrap>
        <InputIcon><FaTshirt /></InputIcon>
        <Select name="interest" value={fields.interest} onChange={handleChange}>
          <option value="">Area of Interest</option>
          <option value="Design">Design</option>
          <option value="Tailoring">Tailoring</option>
          <option value="Jewelry">Jewelry & Accessories</option>
          <option value="Business">Business Skills</option>
          <option value="Other">Other</option>
        </Select>
      </InputWrap>
      {errors.interest && <ErrorMsg>{errors.interest}</ErrorMsg>}
      <InputWrap>
        <InputIcon><FaCommentDots /></InputIcon>
        <TextArea name="message" placeholder="Tell us why you're interested..." value={fields.message} onChange={handleChange} />
      </InputWrap>
      {errors.message && <ErrorMsg>{errors.message}</ErrorMsg>}
      <SubmitButton type="submit">Apply Now</SubmitButton>
    </StyledForm>
  );
}

const EndResultsSection = styled.section`
  max-width: 1100px;
  margin: 0 auto 3rem auto;
  padding: 2.5rem 1.5rem;
`;
const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;
const ResultCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  padding: 2rem 1.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ResultIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 1rem;
`;
const ResultTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const ResultDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
const results = [
  { icon: FaUsers, title: 'Career Opportunities', desc: 'Many graduates secure jobs in the fashion industry or start their own businesses.' },
  { icon: FaStar, title: 'Award Winners', desc: 'Our students have won local and national fashion awards.' },
  { icon: FaGem, title: 'Entrepreneurship', desc: 'Alumni have launched successful jewelry and accessory brands.' },
  { icon: FaPalette, title: 'Creative Skills', desc: 'Participants master design, tailoring, and creative arts.' }
];

const FAQSection = styled.section`
  max-width: 800px;
  margin: 0 auto 3rem auto;
  padding: 2.5rem 1.5rem;
`;
const FAQTitle = styled.h2`
  text-align: center;
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 2rem;
`;
const FAQItem = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  margin-bottom: 1rem;
  overflow: hidden;
`;
const FAQQuestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1.2rem 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  background: ${({ theme }) => theme.palette.primary.light};
`;
const FAQAnswer = styled.div`
  padding: 1.2rem 1.5rem;
  background: #f9f9f9;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
const faqs = [
  { q: 'Who can apply for the Fashion Program?', a: 'Anyone passionate about fashion, design, or tailoring is welcome to apply. No prior experience required.' },
  { q: 'Are there scholarships or financial aid?', a: 'Yes, we offer scholarships and financial aid to eligible applicants. Please indicate your interest in the application form.' },
  { q: 'What is the duration of the program?', a: 'Programs typically run for 6-12 months, depending on the track and specialization.' },
  { q: 'Will I get a certificate?', a: 'Yes, all graduates receive a certificate upon successful completion.' }
];

function FAQAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <FAQSection>
      <FAQTitle>Frequently Asked Questions</FAQTitle>
      {faqs.map((f, i) => (
        <FAQItem key={i}>
          <FAQQuestion onClick={() => setOpen(open === i ? null : i)}>
            {f.q}
            {open === i ? <FaChevronUp /> : <FaChevronDown />}
          </FAQQuestion>
          {open === i && <FAQAnswer>{f.a}</FAQAnswer>}
        </FAQItem>
      ))}
    </FAQSection>
  );
}

const PartnersSection = styled.section`
  max-width: 1100px;
  margin: 0 auto 3rem auto;
  padding: 2.5rem 1.5rem;
  text-align: center;
`;
const PartnersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;
const PartnerLogo = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: grayscale(1) contrast(1.2);
  opacity: 0.8;
`;
const partnerLogos = [
  '/images/branding/logo.jpg',
  '/images/logo-1.png',
  '/images/logo.png',
  '/images/branding/logo.jpg'
];

const FashionCTASection = styled.section`
  max-width: 1100px;
  margin: 0 auto 3rem auto;
  padding: 2.5rem 1.5rem;
  text-align: center;
`;
const FashionCTATitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;
const FashionCTADesc = styled.p`
  font-size: 1.08rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-bottom: 2rem;
`;
const FashionCTAButtonLarge = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  font-weight: 700;
  border-radius: 22px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  text-decoration: none;
  box-shadow: 0 2px 8px ${({ theme }) => theme.palette.primary.main}22;
  transition: background 0.18s, transform 0.15s;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
    transform: translateY(-2px) scale(1.04);
  }
`;

const FashionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;
const FashionHeroSection = styled.section`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/fashion/fashion1.jpg') center/cover;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
const FashionHeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;
const FashionHeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;
const FashionYearlyImpact = [
  { year: '2019', graduates: 100, communities: 5 },
  { year: '2020', graduates: 200, communities: 10 },
  { year: '2021', graduates: 400, communities: 18 },
  { year: '2022', graduates: 650, communities: 25 },
  { year: '2023', graduates: 800, communities: 30 }
];
const FashionAdditionalMetrics = [
  { icon: FaAward, number: 12, label: 'Awards Won', description: 'Awards for excellence in fashion and design', suffix: '+' },
  { icon: FaChartLine, number: 85, label: 'Employment Rate', description: 'Percentage of graduates employed or running businesses', suffix: '%' }
];

const Fashion = () => (
  <>
    <FashionHeroSection>
      <FashionHeroOverlay />
      <FashionHeroContent>
        <HeroTitle>Fashion Program Impact</HeroTitle>
        <HeroSubtitle>
          Empowering women and girls through fashion, design, and entrepreneurship across Kenya.
        </HeroSubtitle>
        <CTAButton href="/get-involved">Get Involved</CTAButton>
      </FashionHeroContent>
    </FashionHeroSection>
    <FeaturesSection>
      <h2 style={{textAlign:'center', fontWeight:800, fontSize:'2rem', marginBottom:'2rem'}}>Features & Activities</h2>
      <FeaturesGrid>
        {features.map((f, i) => (
          <FeatureCard key={i}>
            <FeatureIcon as={f.icon} />
            <FeatureTitle>{f.title}</FeatureTitle>
            <FeatureDesc>{f.desc}</FeatureDesc>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
    <FormSection>
      <FormTitle>Apply to Join the Fashion Program</FormTitle>
      <ApplicationForm />
    </FormSection>
    <EndResultsSection>
      <h2 style={{textAlign:'center', fontWeight:800, fontSize:'2rem', marginBottom:'2rem'}}>End Results & Outcomes</h2>
      <ResultsGrid>
        {results.map((r, i) => (
          <ResultCard key={i}>
            <ResultIcon as={r.icon} />
            <ResultTitle>{r.title}</ResultTitle>
            <ResultDesc>{r.desc}</ResultDesc>
          </ResultCard>
        ))}
      </ResultsGrid>
    </EndResultsSection>
    <FAQAccordion />
    <PartnersSection>
      <h2 style={{fontWeight:800, fontSize:'2rem', marginBottom:'2rem'}}>Our Partners</h2>
      <PartnersGrid>
        {partnerLogos.map((src, i) => (
          <PartnerLogo src={src} alt={`Partner ${i+1}`} key={i} />
        ))}
      </PartnersGrid>
    </PartnersSection>
    <FashionCTASection>
      <FashionCTATitle>Ready to Start Your Fashion Journey?</FashionCTATitle>
      <FashionCTADesc>Apply now or contact us to learn more about the Fashion Program. Your future in fashion begins here!</FashionCTADesc>
      <FashionCTAButtonLarge href="/contact">Contact Us</FashionCTAButtonLarge>
    </FashionCTASection>
    <FashionContainer>
      {/* Main Impact Stats */}
      <Section>
        <SectionHeader>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            Fashion at a Glance
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            Real stories, real transformation through our fashion and design programs.
          </motion.p>
        </SectionHeader>
        <ImpactGrid>
          {fashionStats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }}>
              <ImpactCard>
                <ImpactIcon style={{ background: stat.color }}><stat.icon /></ImpactIcon>
                <ImpactNumber>
                  <CountUp end={stat.number} duration={2.5} suffix={stat.label === 'Success Rate' ? '%' : '+'} useEasing={true} start={0} />
                </ImpactNumber>
                <ImpactLabel>{stat.label}</ImpactLabel>
                <ImpactDescription>{stat.description}</ImpactDescription>
              </ImpactCard>
            </motion.div>
          ))}
        </ImpactGrid>
      </Section>
      {/* Program Performance */}
      <Section>
        <SectionHeader>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            Program Performance
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            Our fashion programs deliver measurable results for all participants.
          </motion.p>
        </SectionHeader>
        <ProgramStatsGrid>
          {programStats.map((program, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }}>
              <ProgramStatCard>
                <ProgramHeader>
                  <ProgramIcon><program.icon /></ProgramIcon>
                  <ProgramName>{program.program}</ProgramName>
                </ProgramHeader>
                <ProgramMetrics>
                  <Metric>
                    <MetricLabel>Graduates</MetricLabel>
                    <MetricValue><CountUp end={program.graduates} duration={2} useEasing={true} start={0} /></MetricValue>
                  </Metric>
                  <Metric>
                    <MetricLabel>Success Rate</MetricLabel>
                    <MetricValue><CountUp end={program.successRate} duration={2} suffix="%" useEasing={true} start={0} /></MetricValue>
                  </Metric>
                  <Metric>
                    <MetricLabel>Avg. Income (KES)</MetricLabel>
                    <MetricValue><CountUp end={program.avgIncome} duration={2} useEasing={true} start={0} /></MetricValue>
                  </Metric>
                </ProgramMetrics>
              </ProgramStatCard>
            </motion.div>
          ))}
        </ProgramStatsGrid>
      </Section>
      {/* Yearly Growth */}
      <Section>
        <SectionHeader>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            Yearly Growth
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            Our fashion community continues to grow and inspire more women every year.
          </motion.p>
        </SectionHeader>
        <GrowthGrid>
          {FashionYearlyImpact.map((year, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }}>
              <GrowthCard>
                <GrowthYear>{year.year}</GrowthYear>
                <GrowthMetrics>
                  <GrowthMetric>
                    <GrowthLabel>Graduates</GrowthLabel>
                    <GrowthNumber><CountUp end={year.graduates} duration={2} useEasing={true} start={0} /></GrowthNumber>
                  </GrowthMetric>
                  <GrowthMetric>
                    <GrowthLabel>Communities</GrowthLabel>
                    <GrowthNumber><CountUp end={year.communities} duration={2} useEasing={true} start={0} /></GrowthNumber>
                  </GrowthMetric>
                </GrowthMetrics>
              </GrowthCard>
            </motion.div>
          ))}
        </GrowthGrid>
      </Section>
      {/* Additional Metrics */}
      <Section>
        <AdditionalMetricsGrid>
          {FashionAdditionalMetrics.map((metric, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <AdditionalMetricCard>
                <AdditionalMetricIcon><metric.icon /></AdditionalMetricIcon>
                <AdditionalMetricNumber><CountUp end={metric.number} duration={2.5} suffix={metric.suffix} useEasing={true} start={0} /></AdditionalMetricNumber>
                <AdditionalMetricLabel>{metric.label}</AdditionalMetricLabel>
                <AdditionalMetricDescription>{metric.description}</AdditionalMetricDescription>
              </AdditionalMetricCard>
            </motion.div>
          ))}
        </AdditionalMetricsGrid>
      </Section>
      {/* Call to Action */}
      <Section>
        <CTASection>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <CTATitle>Join Our Fashion Community</CTATitle>
            <CTADescription>
              Ready to transform your future through fashion? Join us and be part of a creative, supportive community.
            </CTADescription>
            <CTAButton href="/get-involved">Get Involved</CTAButton>
          </motion.div>
        </CTASection>
      </Section>
    </FashionContainer>
  </>
);

export default Fashion; 