import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaHeart, FaHandsHelping, FaGraduationCap, FaBullhorn } from 'react-icons/fa';

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

const SectionContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 2rem;
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

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const EventCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const EventContent = styled.div`
  padding: 2rem;
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EventDate = styled.div`
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventLocation = styled.div`
  color: #666;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventTime = styled.div`
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventDescription = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const EventButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? 'white' : '#2d1a3a'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

const UpcomingEvents = styled.div`
  margin-bottom: 3rem;
`;

const PastEvents = styled.div`
  margin-bottom: 3rem;
`;

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: "Survivor Support Group Meeting",
      date: "March 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Nairobi, Kenya",
      description: "Join our monthly support group for survivors. A safe space to share experiences, receive support, and build connections with other survivors.",
      type: "support",
      icon: <FaHeart />
    },
    {
      id: 2,
      title: "Skills Training Workshop",
      date: "March 20, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Training Center, Nairobi",
      description: "Learn practical skills in tailoring, hairdressing, and digital literacy. Open to all survivors and community members.",
      type: "training",
      icon: <FaGraduationCap />
    },
    {
      id: 3,
      title: "Community Awareness Campaign",
      date: "March 25, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "City Center, Nairobi",
      description: "Join us in raising awareness about sexual violence and modern slavery. Help us educate the community and break the silence.",
      type: "awareness",
      icon: <FaBullhorn />
    },
    {
      id: 4,
      title: "Volunteer Orientation",
      date: "April 5, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Rebirth of a Queen Office",
      description: "New volunteer orientation session. Learn about our programs, policies, and how you can make a difference in survivors' lives.",
      type: "volunteer",
      icon: <FaHandsHelping />
    },
    {
      id: 5,
      title: "Fundraising Gala",
      date: "April 20, 2024",
      time: "6:00 PM - 10:00 PM",
      location: "Nairobi Hotel",
      description: "Join us for our annual fundraising gala. An evening of inspiration, stories, and celebration of our impact in the community.",
      type: "fundraising",
      icon: <FaUsers />
    },
    {
      id: 6,
      title: "Youth Empowerment Summit",
      date: "May 10, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "KICC, Nairobi",
      description: "A day-long summit focused on empowering young survivors and at-risk youth through education, mentorship, and skills development.",
      type: "youth",
      icon: <FaUsers />
    }
  ];

  const filteredEvents = events.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
          <Title>Events & Activities</Title>
          <Subtitle>
            Join us in creating positive change and supporting survivors
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaCalendarAlt style={{ color: '#667eea' }} />
            Upcoming Events
          </SectionTitle>
          
          <FilterButtons>
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
            >
              All Events
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'support'} 
              onClick={() => setActiveFilter('support')}
            >
              Support Groups
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'training'} 
              onClick={() => setActiveFilter('training')}
            >
              Training
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'awareness'} 
              onClick={() => setActiveFilter('awareness')}
            >
              Awareness
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'volunteer'} 
              onClick={() => setActiveFilter('volunteer')}
            >
              Volunteer
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'fundraising'} 
              onClick={() => setActiveFilter('fundraising')}
            >
              Fundraising
            </FilterButton>
          </FilterButtons>

          <EventsGrid>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <EventImage>
                  {event.icon}
                </EventImage>
                <EventContent>
                  <EventTitle>
                    {event.title}
                  </EventTitle>
                  <EventDate>
                    <FaCalendarAlt />
                    {event.date}
                  </EventDate>
                  <EventTime>
                    <FaClock />
                    {event.time}
                  </EventTime>
                  <EventLocation>
                    <FaMapMarkerAlt />
                    {event.location}
                  </EventLocation>
                  <EventDescription>
                    {event.description}
                  </EventDescription>
                  <EventButton>
                    Register Now
                  </EventButton>
                </EventContent>
              </EventCard>
            ))}
          </EventsGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHandsHelping style={{ color: '#667eea' }} />
            Get Involved
          </SectionTitle>
          <SectionContent>
            <p>
              Can't find an event that fits your schedule? We're always looking for volunteers, 
              speakers, and partners to help us expand our impact. Contact us to learn about 
              other ways to get involved.
            </p>
            <p>
              Follow us on social media for the latest updates on events, programs, and 
              opportunities to make a difference in survivors' lives.
            </p>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default Events;
