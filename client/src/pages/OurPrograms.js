import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FaBook, FaHandsHelping, FaFutbol, FaLightbulb, FaCamera, FaShoePrints,
  FaGraduationCap, FaUsers, FaClock, FaMapMarkerAlt, FaPhoneAlt, 
  FaEnvelope, FaUser, FaCalendarAlt, FaFileAlt, FaCheckCircle,
  FaArrowRight, FaStar, FaHeart, FaShieldAlt, FaRocket, FaAward
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

// Hero Section
const HeroSection = styled.section`
  min-height: 60vh;
  background: linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.7)), 
              url('/images/photograpy/photo-1.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
  color: #FFFFFF !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 1;
  line-height: 1.6;
  color: #FFFFFF !important;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Programs Overview Section
const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #FFFFFF !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

// Programs Grid
const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
`;

const ProgramCard = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
  }
`;

const ProgramImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ProgramContent = styled.div`
  padding: 2rem;
`;

const ProgramIcon = styled.div`
  font-size: 2.5rem;
  color: #8B5CF6;
  margin-bottom: 1rem;
`;

const ProgramTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const ProgramDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProgramFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const ProgramFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #555;
  
  svg {
    color: #8B5CF6;
    margin-right: 0.5rem;
    font-size: 0.8rem;
  }
`;

const ProgramStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f5ff;
  border-radius: 0.8rem;
`;

const Stat = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #8B5CF6;
  }
  
  .label {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.2rem;
  }
`;

const ApplyButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #8B5CF6;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.8rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6D28D9;
    transform: translateY(-2px);
  }
`;

// Application Form Section
const FormSection = styled.section`
  background: linear-gradient(135deg, #f8f5ff 0%, #e0e7ff 100%);
  padding: 4rem 2rem;
  border-radius: 2rem;
  margin: 4rem auto;
  max-width: 1200px;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FormHeader = styled.div`
  background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #FFFFFF !important;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
`;

const FormSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 1;
  color: #FFFFFF !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

const FormContent = styled.div`
  padding: 2.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  
  svg {
    color: #8B5CF6;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.8rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.8rem;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.8rem;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: 0.8rem;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

// Stats Section
const StatsSection = styled.section`
  background: #1a1a1a;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  padding: 2rem 1rem;
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #8B5CF6;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #ccc;
`;

const OurPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    age: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const programs = [
  {
    id: 'education',
    title: 'Education Program',
    icon: <FaBook />,
    image: 'https://res.cloudinary.com/samokello/image/upload/v1758125602/rebirth-of-a-queen/images/3_w9l4dm.jpg',
    alt: 'Girls in mentorship session under education program',
    description:
      'Comprehensive education support including scholarships, mentorship, and literacy programs designed to empower girls and young women to achieve their academic dreams.',
    features: [
      'Full scholarship opportunities',
      'One-on-one mentorship',
      'Academic support and tutoring',
      'Career guidance and counseling',
      'Leadership development workshops'
    ],
    stats: {
      participants: 1200,
      successRate: 95,
      communities: 15
    },
    cta: {
      text: 'Explore Education',
      link: '/programs/education'
    },
    category: 'education',
    themeColor: '#7c3aed'
  },
  {
    id: 'fashion',
    title: 'Fashion & Design',
    icon: <FaHandsHelping />,
    image: 'https://res.cloudinary.com/samokello/image/upload/v1758125515/rebirth-of-a-queen/images/fashion_w02nw6.jpg',
    alt: 'Fashion design training for young women',
    description:
      'Creative fashion and design training that teaches practical skills in garment making, design principles, and entrepreneurship in the fashion industry.',
    features: [
      'Design and pattern making',
      'Sewing and garment construction',
      'Fashion business management',
      'Market access and networking',
      'Sustainable fashion practices'
    ],
    stats: {
      participants: 800,
      successRate: 88,
      communities: 12
    },
    cta: {
      text: 'Join Fashion Program',
      link: '/programs/fashion'
    },
    category: 'skills',
    themeColor: '#ec4899'
  },
  {
    id: 'fitness',
    title: 'Fitness & Wellness',
    icon: <FaFutbol />,
    image: 'https://res.cloudinary.com/samokello/image/upload/v1758125617/rebirth-of-a-queen/images/9_cixkxc.jpg',
    alt: 'Youth engaging in physical fitness training',
    description:
      'Holistic wellness programs focusing on physical fitness, mental health, and overall well-being through sports, exercise, and wellness education.',
    features: [
      'Physical fitness training',
      'Sports and team activities',
      'Mental health support',
      'Nutrition education',
      'Wellness coaching'
    ],
    stats: {
      participants: 950,
      successRate: 92,
      communities: 18
    },
    cta: {
      text: 'Explore Wellness',
      link: '/programs/fitness'
    },
    category: 'wellness',
    themeColor: '#10b981'
  },
  {
    id: 'leather',
    title: 'Leather Making',
    icon: <FaShoePrints />,
    image: 'https://res.cloudinary.com/samokello/image/upload/v1757619979/rebirth-of-a-queen/dneq7svtbrb1cspx7rum.jpg',
    alt: 'Leather crafting skills training',
    description:
      'Traditional and modern leather crafting skills training, from basic techniques to advanced product development and business management.',
    features: [
      'Leather crafting techniques',
      'Product design and development',
      'Quality control and finishing',
      'Business and marketing skills',
      'Market access support'
    ],
    stats: {
      participants: 600,
      successRate: 90,
      communities: 10
    },
    cta: {
      text: 'Join Leather Program',
      link: '/programs/leather'
    },
    category: 'skills',
    themeColor: '#f59e0b'
  },
  {
    id: 'photography',
    title: 'Photography',
    icon: <FaCamera />,
    image: 'https://res.cloudinary.com/samokello/image/upload/v1758125519/rebirth-of-a-queen/images/photography_cvy4uk.jpg',
    alt: 'Photography training session with camera gear',
    description:
      'Professional photography training covering technical skills, artistic expression, and business development in the photography industry.',
    features: [
      'Technical photography skills',
      'Digital editing and post-processing',
      'Portfolio development',
      'Business and marketing',
      'Professional networking'
    ],
    stats: {
      participants: 400,
      successRate: 85,
      communities: 8
    },
    cta: {
      text: 'Explore Photography',
      link: '/programs/photography'
    },
    category: 'creative',
    themeColor: '#3b82f6'
  },
  {
    id: 'innovation',
    title: 'Innovation & Technology',
    icon: <FaLightbulb />,
    image: 'https://res.cloudinary.com/samokello/image/upload/v1758121424/rebirth-of-a-queen/images/orientation1_2_gqbuyl.jpg',
    alt: 'Innovation and technology workshop with laptops',
    description:
      'Cutting-edge technology and innovation training, including digital skills, coding, and creative problem-solving for the modern workforce.',
    features: [
      'Digital literacy training',
      'Coding and programming',
      'Creative problem-solving',
      'Innovation workshops',
      'Technology entrepreneurship'
    ],
    stats: {
      participants: 300,
      successRate: 87,
      communities: 6
    },
    cta: {
      text: 'Join Innovation Program',
      link: '/programs/innovation'
    },
    category: 'technology',
    themeColor: '#f43f5e'
  }
];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          program: '',
          age: '',
          location: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(result.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { icon: <FaUsers />, number: 4250, label: 'Total Participants' },
    { icon: <FaGraduationCap />, number: 89, label: 'Success Rate (%)' },
    { icon: <FaMapMarkerAlt />, number: 69, label: 'Communities Reached' },
    { icon: <FaAward />, number: 15, label: 'Years of Excellence' }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Our Programs</HeroTitle>
          <HeroSubtitle>
            Discover our comprehensive range of empowerment programs designed to transform lives and build stronger communities. 
            Each program is carefully crafted to provide practical skills, knowledge, and support for women and girls across Kenya.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Programs Overview */}
      <Section>
        <SectionTitle>Program Overview</SectionTitle>
        <SectionSubtitle>
          Our programs are designed to be holistic, practical, and transformative. We focus on both skill development and personal growth, 
          ensuring that every participant has the tools they need to succeed.
        </SectionSubtitle>
        
        <ProgramsGrid>
          {programs.map((program, index) => (
            <ProgramCard
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProgramImage src={process.env.PUBLIC_URL + program.image} alt={program.title} />
              <ProgramContent>
                <ProgramIcon>{program.icon}</ProgramIcon>
                <ProgramTitle>{program.title}</ProgramTitle>
                <ProgramDescription>{program.description}</ProgramDescription>
                
                <ProgramFeatures>
                  {program.features.map((feature, i) => (
                    <ProgramFeature key={i}>
                      <FaCheckCircle />
                      {feature}
                    </ProgramFeature>
                  ))}
                </ProgramFeatures>
                
                <ProgramStats>
                  <Stat>
                    <div className="number"><CountUp end={program.stats.participants} duration={2} separator="," /></div>
                    <div className="label">Participants</div>
                  </Stat>
                  <Stat>
                    <div className="number">{program.stats.successRate}%</div>
                    <div className="label">Success Rate</div>
                  </Stat>
                  <Stat>
                    <div className="number">{program.stats.communities}</div>
                    <div className="label">Communities</div>
                  </Stat>
                </ProgramStats>
                
                <ApplyButton to={`/${program.id}`}>
                  Learn More <FaArrowRight />
                </ApplyButton>
              </ProgramContent>
            </ProgramCard>
          ))}
        </ProgramsGrid>
      </Section>

      {/* Application Form */}
      <FormSection>
        <FormContainer>
          <FormHeader>
            <FormTitle>Apply for a Program</FormTitle>
            <FormSubtitle>
              Ready to transform your life? Fill out the form below to apply for any of our programs. 
              Our team will get back to you within 48 hours.
            </FormSubtitle>
          </FormHeader>
          
          <FormContent>
            {isSubmitted && (
              <SuccessMessage>
                <FaCheckCircle />
                Thank you! Your application has been submitted successfully. We'll contact you soon!
              </SuccessMessage>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <FormLabel>
                    <FaUser />
                    First Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your first name"
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>
                    <FaUser />
                    Last Name
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>
                    <FaEnvelope />
                    Email Address
                  </FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>
                    <FaPhoneAlt />
                    Phone Number
                  </FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>
                    <FaCalendarAlt />
                    Age
                  </FormLabel>
                  <FormInput
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="12"
                    max="65"
                    placeholder="Enter your age"
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>
                    <FaMapMarkerAlt />
                    Location
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your location"
                  />
                </FormGroup>
                
                <FormGroup className="full-width">
                  <FormLabel>
                    <FaFileAlt />
                    Program of Interest
                  </FormLabel>
                  <FormSelect
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a program</option>
                    {programs.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.title}
                      </option>
                    ))}
                  </FormSelect>
                </FormGroup>
                
                <FormGroup className="full-width">
                  <FormLabel>
                    <FaFileAlt />
                    Why do you want to join this program?
                  </FormLabel>
                  <FormTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your motivation, goals, and what you hope to achieve through this program..."
                  />
                </FormGroup>
              </FormGrid>
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <FaArrowRight />
                    </>
                  )}
                </SubmitButton>
              </div>
            </form>
          </FormContent>
        </FormContainer>
      </FormSection>

      {/* Stats Section */}
      <StatsSection>
        <SectionTitle style={{ color: 'white', marginBottom: '3rem' }}>Our Impact in Numbers</SectionTitle>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatIcon>{stat.icon}</StatIcon>
              <StatNumber>
                <CountUp end={stat.number} duration={2.5} separator="," />
                {stat.label.includes('%') && '%'}
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default OurPrograms; 