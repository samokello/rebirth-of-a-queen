import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaDumbbell, FaHeartbeat, FaUsers, FaStar, FaArrowRight, FaRunning, FaAppleAlt, FaChartLine, FaAward, FaUser, FaEnvelope, FaPhone, FaCommentDots } from 'react-icons/fa';

const fitnessStats = [
  { number: 1200, label: 'Participants', icon: FaUsers, description: 'Individuals who have joined our fitness and wellness programs', color: '#8B5CF6' },
  { number: 800, label: 'Active Members', icon: FaDumbbell, description: 'Current active members in our fitness community', color: '#3b82f6' },
  { number: 35, label: 'Communities Served', icon: FaHeartbeat, description: 'Communities across Kenya where we promote wellness', color: '#f59e0b' },
  { number: 98, label: 'Satisfaction Rate', icon: FaStar, description: 'Percentage of participants satisfied with our programs', color: '#ef4444' }
];

const programStats = [
  { program: 'Group Fitness', sessions: 300, successRate: 97, avgCalories: 500, icon: FaRunning },
  { program: 'Personal Training', sessions: 150, successRate: 95, avgCalories: 700, icon: FaDumbbell },
  { program: 'Nutrition Coaching', sessions: 100, successRate: 92, avgCalories: 350, icon: FaAppleAlt }
];

const yearlyImpact = [
  { year: '2019', participants: 200, communities: 5 },
  { year: '2020', participants: 400, communities: 12 },
  { year: '2021', participants: 700, communities: 20 },
  { year: '2022', participants: 1000, communities: 28 },
  { year: '2023', participants: 1200, communities: 35 }
];

const additionalMetrics = [
  { icon: FaChartLine, number: 85, label: 'Retention Rate', description: 'Percentage of members who continue after 1 year', suffix: '%' },
  { icon: FaAward, number: 15, label: 'Awards Won', description: 'Awards for excellence in fitness and wellness', suffix: '+' }
];

const Fitness = () => (
  <>
    <HeroSection>
      <HeroOverlay />
      <Container>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <HeroContent>
            <HeroTitle>Fitness & Wellness Impact</HeroTitle>
            <HeroSubtitle>
              Empowering individuals and communities through health, fitness, and wellness programs across Kenya.
            </HeroSubtitle>
          </HeroContent>
        </motion.div>
      </Container>
    </HeroSection>
    <Container>
      {/* Main Impact Stats */}
      <Section>
        <SectionHeader>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            Fitness at a Glance
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            Real results, real lives changed through our fitness and wellness initiatives.
          </motion.p>
        </SectionHeader>
        <ImpactGrid>
          {fitnessStats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }}>
              <ImpactCard>
                <ImpactIcon style={{ background: stat.color }}><stat.icon /></ImpactIcon>
                <ImpactNumber>
                  <CountUp end={stat.number} duration={2.5} suffix={stat.label === 'Satisfaction Rate' ? '%' : '+'} useEasing={true} start={0} />
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
            Our fitness programs deliver measurable results for all participants.
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
                    <MetricLabel>Sessions</MetricLabel>
                    <MetricValue><CountUp end={program.sessions} duration={2} useEasing={true} start={0} /></MetricValue>
                  </Metric>
                  <Metric>
                    <MetricLabel>Success Rate</MetricLabel>
                    <MetricValue><CountUp end={program.successRate} duration={2} suffix="%" useEasing={true} start={0} /></MetricValue>
                  </Metric>
                  <Metric>
                    <MetricLabel>Avg. Calories Burned</MetricLabel>
                    <MetricValue><CountUp end={program.avgCalories} duration={2} useEasing={true} start={0} /></MetricValue>
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
            Our fitness community continues to grow and inspire more people every year.
          </motion.p>
        </SectionHeader>
        <GrowthGrid>
          {yearlyImpact.map((year, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }}>
              <GrowthCard>
                <GrowthYear>{year.year}</GrowthYear>
                <GrowthMetrics>
                  <GrowthMetric>
                    <GrowthLabel>Participants</GrowthLabel>
                    <GrowthNumber><CountUp end={year.participants} duration={2} useEasing={true} start={0} /></GrowthNumber>
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
          {additionalMetrics.map((metric, index) => (
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
      {/* Application Form Section */}
      <Section>
        <SectionHeader>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            Apply to Join Our Fitness Program
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            Fill out the form below to become part of our vibrant fitness community.
          </motion.p>
        </SectionHeader>
        <FitnessApplicationForm />
      </Section>
      {/* Call to Action */}
      <Section>
        <CTASection>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <CTATitle>Join Our Fitness Community</CTATitle>
            <CTADescription>
              Ready to transform your health and wellness? Join us and be part of a supportive, inspiring community.
            </CTADescription>
            <CTAButton href="/get-involved">Get Involved</CTAButton>
          </motion.div>
        </CTASection>
      </Section>
    </Container>
  </>
);

// Styled Components (reuse from Impact.js or define as needed)
const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/gym/gym.jpg') center/cover;
  min-height: 60vh;
  display: flex;
  align-items: center;
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
  color: #fff;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;
const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #fff;
  opacity: 0.95;
  line-height: 1.6;
`;
const Section = styled.section`
  padding: 5rem 0;
  background: #fff;
`;
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  h2, h3, h4, h5, h6, p {
    color: #1e293b;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem;
    color: #475569;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;
const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;
const ImpactCard = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;
const ImpactIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;
const ImpactNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;
const ImpactLabel = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;
const ImpactDescription = styled.p`
  color: #475569;
  line-height: 1.6;
`;
const ProgramStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;
const ProgramStatCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;
const ProgramHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
const ProgramIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
`;
const ProgramName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
`;
const ProgramMetrics = styled.div`
  display: grid;
  gap: 1.5rem;
`;
const Metric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f5ff;
  border-radius: 8px;
`;
const MetricLabel = styled.div`
  color: #475569;
  font-weight: 500;
`;
const MetricValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #8B5CF6;
`;
const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;
const GrowthCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;
const GrowthYear = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8B5CF6;
  margin-bottom: 1.5rem;
`;
const GrowthMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const GrowthMetric = styled.div``;
const GrowthLabel = styled.div`
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 0.5rem;
`;
const GrowthNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
`;
const AdditionalMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;
const AdditionalMetricCard = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;
const AdditionalMetricIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;
const AdditionalMetricNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;
const AdditionalMetricLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;
const AdditionalMetricDescription = styled.p`
  color: #475569;
  line-height: 1.6;
`;
const CTASection = styled.div`
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  padding: 4rem;
  border-radius: 16px;
  text-align: center;
  color: white;
`;
const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;
const CTAButton = styled.a`
  display: inline-block;
  background: #fff;
  color: #8B5CF6;
  font-weight: 700;
  border-radius: 22px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  text-decoration: none;
  box-shadow: 0 2px 8px #8B5CF622;
  margin-top: 1.2rem;
  transition: background 0.18s, color 0.18s, transform 0.15s;
  &:hover {
    background: #f3eaff;
    color: #6D28D9;
    transform: translateY(-2px) scale(1.04);
  }
`;

const FitnessFormIcon = styled.div`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  margin: 0 auto 1.2rem auto;
`;
const FitnessForm = styled.form`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 2.5rem 2rem;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const FitnessInputWrap = styled.div`
  display: flex;
  align-items: center;
  background: #f3eaff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
`;
const FitnessInputIcon = styled.div`
  color: #8B5CF6;
  font-size: 1.2rem;
  margin-right: 0.7rem;
`;
const FitnessInput = styled.input`
  border: none;
  background: transparent;
  font-size: 1.08rem;
  flex: 1;
  padding: 0.7rem 0;
  outline: none;
`;
const FitnessSelect = styled.select`
  border: none;
  background: transparent;
  font-size: 1.08rem;
  flex: 1;
  padding: 0.7rem 0;
  outline: none;
`;
const FitnessTextArea = styled.textarea`
  border: none;
  background: transparent;
  font-size: 1.08rem;
  flex: 1;
  padding: 0.7rem 0;
  outline: none;
  min-height: 80px;
`;
const FitnessSubmitButton = styled.button`
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 0.7rem 2.2rem;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px #8B5CF622;
  margin-top: 1.2rem;
  transition: background 0.18s, transform 0.15s;
  &:hover {
    background: #6D28D9;
    transform: translateY(-2px) scale(1.04);
  }
`;
const FitnessErrorMsg = styled.div`
  color: #ef4444;
  font-size: 0.95rem;
  margin-bottom: -0.8rem;
`;

function FitnessApplicationForm() {
  const [fields, setFields] = React.useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

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
            program: 'fitness',
            age: 25, // Default age since not collected in this form
            location: 'Nairobi', // Default location since not collected in this form
            message: fields.message,
            source: 'fitness'
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
    <FitnessForm as={motion.form} onSubmit={handleSubmit} noValidate initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <FitnessFormIcon><FaDumbbell /></FitnessFormIcon>
      <FitnessInputWrap>
        <FitnessInputIcon><FaUser /></FitnessInputIcon>
        <FitnessInput name="name" placeholder="Full Name" value={fields.name} onChange={handleChange} />
      </FitnessInputWrap>
      {errors.name && <FitnessErrorMsg>{errors.name}</FitnessErrorMsg>}
      <FitnessInputWrap>
        <FitnessInputIcon><FaEnvelope /></FitnessInputIcon>
        <FitnessInput name="email" placeholder="Email Address" value={fields.email} onChange={handleChange} />
      </FitnessInputWrap>
      {errors.email && <FitnessErrorMsg>{errors.email}</FitnessErrorMsg>}
      <FitnessInputWrap>
        <FitnessInputIcon><FaPhone /></FitnessInputIcon>
        <FitnessInput name="phone" placeholder="Phone Number" value={fields.phone} onChange={handleChange} />
      </FitnessInputWrap>
      {errors.phone && <FitnessErrorMsg>{errors.phone}</FitnessErrorMsg>}
      <FitnessInputWrap>
        <FitnessInputIcon><FaHeartbeat /></FitnessInputIcon>
        <FitnessSelect name="interest" value={fields.interest} onChange={handleChange}>
          <option value="">Area of Interest</option>
          <option value="Group Fitness">Group Fitness</option>
          <option value="Personal Training">Personal Training</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Wellness">Wellness</option>
          <option value="Other">Other</option>
        </FitnessSelect>
      </FitnessInputWrap>
      {errors.interest && <FitnessErrorMsg>{errors.interest}</FitnessErrorMsg>}
      <FitnessInputWrap>
        <FitnessInputIcon><FaCommentDots /></FitnessInputIcon>
        <FitnessTextArea name="message" placeholder="Tell us why you're interested..." value={fields.message} onChange={handleChange} />
      </FitnessInputWrap>
      {errors.message && <FitnessErrorMsg>{errors.message}</FitnessErrorMsg>}
      <FitnessSubmitButton type="submit">Apply Now</FitnessSubmitButton>
    </FitnessForm>
  );
}

export default Fitness; 