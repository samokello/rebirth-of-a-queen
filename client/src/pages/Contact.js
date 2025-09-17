// ContactUs.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight, FaPaperPlane, FaUser, FaComments, FaBuilding, FaGlobe, FaMobile, FaFax, FaHeart, FaStar, FaCheckCircle, FaWhatsapp, FaYoutube, FaCalendarAlt, FaUserTie, FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  background: #fff;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  color: white;
  padding: 120px 20px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/education/orientation1 (7).jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: white;

  .highlight {
    color: #fbbf24;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: white;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Section = styled.section`
  padding: 80px 0;

  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e1e2f;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1e1e2f;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e74c3c;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e74c3c;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e1e2f;
`;

const InfoText = styled.p`
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const InfoLink = styled.a`
  color: #e74c3c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #c0392b;
  }
`;

const InfoSecondary = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const SocialSection = styled.div`
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  color: white;
  padding: 60px 0;
  margin: 60px 0;
  border-radius: 12px;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SocialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SocialIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const SocialTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const SocialDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialFollowers = styled.div`
  color: #fbbf24;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SocialButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const MapSection = styled.div`
  margin: 60px 0;
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const MapWrapper = styled.div`
  height: 400px;
  position: relative;
`;

const MapInfo = styled.div`
  padding: 2rem;
  background: #f8f9fa;
`;

const LocationTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
`;

const LocationAddress = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const LocationDescription = styled.p`
  color: #4B5563;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #c3e6cb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
`;

const CardText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert(result.message || 'Failed to submit contact form. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('Failed to submit contact form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Phone",
      text: "Main Office",
      link: "+254 700 000 000",
      href: "tel:+254700000000",
      secondary: "+254 711 000 000"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      text: "Quick Support",
      link: "+254 700 000 000",
      href: "https://wa.me/254700000000"
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      text: "General Inquiries",
      link: "info@rebirthofaqueen.org",
      href: "mailto:info@rebirthofaqueen.org",
      secondary: "support@rebirthofaqueen.org"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      text: "Meridian Hospital, Kiserian",
      link: "Magadi Road, Kenya",
      href: "#"
    },
    {
      icon: <FaClock />,
      title: "Office Hours",
      text: "Monday - Friday",
      link: "8:00 AM - 6:00 PM",
      href: "#",
      secondary: "Saturday: 9:00 AM - 2:00 PM"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Appointments",
      text: "Schedule a Visit",
      link: "Book Online",
      href: "#"
    }
  ];

  const socialPlatforms = [
    {
      icon: <FaFacebook />,
      title: "Facebook",
      description: "Follow us on Facebook for updates, stories, and community engagement.",
      buttonText: "Follow Us",
      href: "https://facebook.com/rebirthofaqueen",
      followers: "2.5K+"
    },
    {
      icon: <FaTwitter />,
      title: "Twitter",
      description: "Stay connected with our latest news, events, and impact stories.",
      buttonText: "Follow Us",
      href: "https://twitter.com/rebirthofaqueen",
      followers: "1.8K+"
    },
    {
      icon: <FaInstagram />,
      title: "Instagram",
      description: "See our work in action through photos and videos of our programs.",
      buttonText: "Follow Us",
      href: "https://instagram.com/rebirthofaqueen",
      followers: "3.2K+"
    },
    {
      icon: <FaYoutube />,
      title: "YouTube",
      description: "Watch our impact videos, program highlights, and community stories.",
      buttonText: "Subscribe",
      href: "https://youtube.com/rebirthofaqueen",
      followers: "1.2K+"
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      description: "Connect with us professionally and learn about career opportunities.",
      buttonText: "Connect",
      href: "https://linkedin.com/company/rebirthofaqueen",
      followers: "850+"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "Join our WhatsApp community for instant updates and direct support.",
      buttonText: "Join Group",
      href: "https://wa.me/254700000000",
      followers: "500+"
    }
  ];

  return (
    <Page>
      <Hero>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in <span className="highlight">Touch</span>
          </HeroTitle>
          <HeroDescription
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you! Whether you have questions about our programs, want to volunteer, or are interested in partnering with us, we're here to help.
          </HeroDescription>
        </HeroContent>
      </Hero>

      <Container>
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contact Us
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Reach out to us through any of these channels. We're here to help and answer your questions.
          </SectionSubtitle>
          
          <ContactGrid>
            <ContactForm
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FormTitle>Send us a Message</FormTitle>
              
              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaCheckCircle />
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </SuccessMessage>
              )}

              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Message *</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us how we can help you..."
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <FaPaperPlane />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </SubmitButton>
              </form>
            </ContactForm>

            <ContactInfo
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {contactInfo.map((info, index) => (
                <InfoCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <InfoIcon>{info.icon}</InfoIcon>
                  <InfoContent>
                    <InfoTitle>{info.title}</InfoTitle>
                    <InfoText>{info.text}</InfoText>
                    <InfoLink href={info.href}>{info.link}</InfoLink>
                    {info.secondary && (
                      <InfoSecondary>{info.secondary}</InfoSecondary>
                    )}
                  </InfoContent>
                </InfoCard>
              ))}
            </ContactInfo>
          </ContactGrid>
        </Section>

        <SocialSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ color: 'white' }}
            >
              Connect With Us
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Follow us on social media to stay updated with our latest news, events, and impact stories
            </SectionSubtitle>
            <SocialGrid>
              {socialPlatforms.map((platform, index) => (
                <SocialCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <SocialIcon>{platform.icon}</SocialIcon>
                  <SocialTitle>{platform.title}</SocialTitle>
                  <SocialDescription>{platform.description}</SocialDescription>
                  <SocialFollowers>{platform.followers} followers</SocialFollowers>
                  <SocialButton href={platform.href} target="_blank" rel="noopener noreferrer">
                    {platform.buttonText} <FaArrowRight />
                  </SocialButton>
                </SocialCard>
              ))}
            </SocialGrid>
          </Container>
        </SocialSection>

        <Section>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Quick Contact Options
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Choose the most convenient way to reach us based on your needs
            </SectionSubtitle>
            
            <Grid>
              <Card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <CardIcon style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
                  <FaWhatsapp />
                </CardIcon>
                <CardTitle>WhatsApp Support</CardTitle>
                <CardText>Get instant help and quick responses to your questions through WhatsApp.</CardText>
                <CTAButton
                  as="a"
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat Now <FaWhatsapp />
                </CTAButton>
              </Card>

              <Card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <CardIcon style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}>
                  <FaPhone />
                </CardIcon>
                <CardTitle>Call Us</CardTitle>
                <CardText>Speak directly with our team for immediate assistance and detailed information.</CardText>
                <CTAButton
                  as="a"
                  href="tel:+254700000000"
                  style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now <FaPhone />
                </CTAButton>
              </Card>

              <Card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <CardIcon style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}>
                  <FaCalendarAlt />
                </CardIcon>
                <CardTitle>Schedule Visit</CardTitle>
                <CardText>Book an appointment to visit our facility and meet our team in person.</CardText>
                <CTAButton
                  as="a"
                  href="#"
                  style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Appointment <FaCalendarAlt />
                </CTAButton>
              </Card>
            </Grid>
          </Container>
        </Section>

        <MapSection>
          <Container>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Visit Our Location
            </SectionTitle>
            <SectionSubtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Find us at Meridian Hospital in Kiserian along Magadi Road
            </SectionSubtitle>
            <MapContainer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <MapWrapper>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819123456789!2d36.8167!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScwMC4xIkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </MapWrapper>
              <MapInfo>
                <LocationTitle>Meridian Hospital</LocationTitle>
                <LocationAddress>📍 Kiserian, Magadi Road, Kenya</LocationAddress>
                <LocationDescription>
                  Our main office is located at Meridian Hospital in Kiserian, providing easy access for visitors and community members. We're open Monday through Friday from 8:00 AM to 6:00 PM. Feel free to drop by or schedule an appointment in advance.
                </LocationDescription>
              </MapInfo>
            </MapContainer>
          </Container>
        </MapSection>
      </Container>
    </Page>
  );
}

