import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaPhone, FaEnvelope, FaHandsHelping, FaHeart, FaShieldAlt, FaGraduationCap } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #2d1a3a;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 2rem;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const FAQItem = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border-left: 5px solid #667eea;
`;

const FAQQuestion = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.5rem 2rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d1a3a;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 2rem 1.5rem 2rem;
  color: #555;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.5);
`;

const ContactSection = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  margin: 3rem 0;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ContactText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ContactButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  margin: 0 1rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "What services does Rebirth of a Queen Foundation provide?",
      answer: "We provide comprehensive support services including safe shelter, trauma counseling, skills training, education support, legal assistance, and economic empowerment programs. Our services are designed to help survivors of sexual violence and modern slavery heal, rebuild their lives, and achieve independence."
    },
    {
      question: "How can I access your services?",
      answer: "You can contact us through our 24/7 emergency hotline at +254 720 339 204, email us at info@rebirthofaqueen.org, or visit our office in Nairobi. We also work with referrals from other organizations, healthcare providers, and community members. All services are confidential and free of charge."
    },
    {
      question: "Is there a cost for your services?",
      answer: "All our services are provided free of charge to survivors and their families. We believe that access to support and healing should not be limited by financial constraints. Our programs are funded through donations, grants, and partnerships with organizations that share our mission."
    },
    {
      question: "How can I volunteer with your organization?",
      answer: "We welcome volunteers in various capacities including direct service support, administrative assistance, fundraising, event planning, and skills training. Volunteers must complete our orientation and training program. Contact us to learn about current volunteer opportunities and requirements."
    },
    {
      question: "How can I donate to support your work?",
      answer: "You can donate through our website, bank transfer, mobile money, or by contacting us directly. We accept one-time donations, monthly sponsorships, and program-specific funding. All donations are used to directly support survivors and our programs. We provide regular reports on how donations are used."
    },
    {
      question: "What is your approach to confidentiality and privacy?",
      answer: "We maintain strict confidentiality and privacy standards. All information shared with us is kept confidential unless there is a risk of harm to the individual or others. We follow trauma-informed practices and ensure that survivors have control over their information and how it is shared."
    },
    {
      question: "Do you provide services to men and boys?",
      answer: "While our primary focus is on supporting women and girls who are survivors of sexual violence and modern slavery, we recognize that men and boys can also be affected. We provide some services to male survivors and can refer to appropriate specialized services when needed."
    },
    {
      question: "How long do survivors typically stay in your programs?",
      answer: "The length of stay varies depending on individual needs and circumstances. Some survivors may need short-term emergency support, while others may benefit from longer-term programs. We work with each person to develop a personalized plan that meets their specific needs and goals."
    },
    {
      question: "What kind of training do your staff receive?",
      answer: "Our staff receive comprehensive training in trauma-informed care, crisis intervention, cultural sensitivity, and specialized skills related to their roles. We also provide ongoing professional development and support to ensure our team can provide the highest quality care to survivors."
    },
    {
      question: "How can I report a case of sexual violence or modern slavery?",
      answer: "If you or someone you know is experiencing sexual violence or modern slavery, please contact our emergency hotline at +254 720 339 204 immediately. You can also contact local law enforcement, child protection services, or other emergency services. We can provide support and guidance throughout the reporting process."
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Container>
      <Content>
        <Header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Title>Frequently Asked Questions</Title>
          <Subtitle>
            Find answers to common questions about our services and programs
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaQuestionCircle style={{ color: '#667eea' }} />
            Common Questions
          </SectionTitle>
          <SectionContent>
            <p>
              Below are answers to some of the most frequently asked questions about our services, 
              programs, and how to get involved. If you don't find the answer you're looking for, 
              please don't hesitate to contact us directly.
            </p>
          </SectionContent>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                variants={fadeUp}
              >
                <FAQQuestion onClick={() => toggleItem(index)}>
                  <span>{faq.question}</span>
                  {openItems[index] ? <FaChevronUp /> : <FaChevronDown />}
                </FAQQuestion>
                {openItems[index] && (
                  <FAQAnswer
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </FAQItem>
            ))}
          </FAQGrid>
        </Section>

        <ContactSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ContactTitle>
            <FaPhone />
            Still Have Questions?
          </ContactTitle>
          <ContactText>
            If you couldn't find the answer you were looking for, we're here to help. 
            Contact us directly and we'll be happy to assist you.
          </ContactText>
          <ContactButton>
            <FaPhone style={{ marginRight: '0.5rem' }} />
            Call Us: +254 720 339 204
          </ContactButton>
          <ContactButton>
            <FaEnvelope style={{ marginRight: '0.5rem' }} />
            Email Us
          </ContactButton>
        </ContactSection>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHandsHelping style={{ color: '#667eea' }} />
            Additional Resources
          </SectionTitle>
          <SectionContent>
            <p>
              For more information about our services, programs, and how to get involved, 
              please explore our other resources:
            </p>
            <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
              <li>Visit our <strong>Resources</strong> page for downloadable guides and materials</li>
              <li>Read our <strong>Blog</strong> for insights and stories from our community</li>
              <li>Check out our <strong>News & Stories</strong> for the latest updates</li>
              <li>Learn about <strong>Volunteer Opportunities</strong> and how to get involved</li>
              <li>Explore our <strong>Programs</strong> to understand our comprehensive approach</li>
            </ul>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default FAQ;
