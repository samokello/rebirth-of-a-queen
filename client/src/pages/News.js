import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendarAlt, FaUser, FaHeart, FaHandsHelping, FaGraduationCap, FaBullhorn } from 'react-icons/fa';

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

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StoryCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StoryImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const StoryContent = styled.div`
  padding: 2rem;
`;

const StoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const StoryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const StoryExcerpt = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled.button`
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

const News = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const stories = [
    {
      id: 1,
      title: "Sarah's Journey: From Survivor to Advocate",
      excerpt: "After years of healing and support from Rebirth of a Queen, Sarah has become a powerful advocate for other survivors, sharing her story to inspire hope and change.",
      date: "March 10, 2024",
      author: "Sarah M.",
      category: "survivor",
      icon: <FaHeart />
    },
    {
      id: 2,
      title: "New Skills Training Program Launches",
      excerpt: "We're excited to announce the launch of our expanded skills training program, offering digital literacy, entrepreneurship, and vocational training to 50 new participants.",
      date: "March 8, 2024",
      author: "Program Team",
      category: "programs",
      icon: <FaGraduationCap />
    },
    {
      id: 3,
      title: "Community Awareness Campaign Reaches 10,000 People",
      excerpt: "Our latest awareness campaign on sexual violence prevention has reached over 10,000 community members through workshops, social media, and community events.",
      date: "March 5, 2024",
      author: "Advocacy Team",
      category: "awareness",
      icon: <FaBullhorn />
    },
    {
      id: 4,
      title: "Volunteer Spotlight: Meet Our Amazing Volunteers",
      excerpt: "This month we're highlighting the incredible work of our volunteers who dedicate their time and skills to support survivors and advance our mission.",
      date: "March 3, 2024",
      author: "Volunteer Team",
      category: "volunteer",
      icon: <FaHandsHelping />
    },
    {
      id: 5,
      title: "Partnership with Local Businesses Creates Job Opportunities",
      excerpt: "Our new partnership with local businesses has created 25 job opportunities for program graduates, helping them achieve economic independence.",
      date: "February 28, 2024",
      author: "Partnership Team",
      category: "partnerships",
      icon: <FaHandsHelping />
    },
    {
      id: 6,
      title: "Annual Impact Report: Transforming Lives in 2023",
      excerpt: "Our 2023 impact report shows significant progress in supporting survivors, with 95% of program participants reporting improved well-being and life satisfaction.",
      date: "February 25, 2024",
      author: "Impact Team",
      category: "impact",
      icon: <FaNewspaper />
    }
  ];

  const filteredStories = stories.filter(story => 
    activeFilter === 'all' || story.category === activeFilter
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
          <Title>News & Stories</Title>
          <Subtitle>
            Stay updated with our latest news, success stories, and impact
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaNewspaper style={{ color: '#667eea' }} />
            Latest Stories
          </SectionTitle>
          
          <FilterButtons>
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
            >
              All Stories
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'survivor'} 
              onClick={() => setActiveFilter('survivor')}
            >
              Survivor Stories
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'programs'} 
              onClick={() => setActiveFilter('programs')}
            >
              Program Updates
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
              Volunteer Stories
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'impact'} 
              onClick={() => setActiveFilter('impact')}
            >
              Impact Reports
            </FilterButton>
          </FilterButtons>

          <StoriesGrid>
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <StoryImage>
                  {story.icon}
                </StoryImage>
                <StoryContent>
                  <StoryTitle>
                    {story.title}
                  </StoryTitle>
                  <StoryMeta>
                    <span>
                      <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                      {story.date}
                    </span>
                    <span>
                      <FaUser style={{ marginRight: '0.5rem' }} />
                      {story.author}
                    </span>
                  </StoryMeta>
                  <StoryExcerpt>
                    {story.excerpt}
                  </StoryExcerpt>
                  <ReadMoreButton>
                    Read Full Story
                  </ReadMoreButton>
                </StoryContent>
              </StoryCard>
            ))}
          </StoriesGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHeart style={{ color: '#667eea' }} />
            Share Your Story
          </SectionTitle>
          <SectionContent>
            <p>
              Do you have a story of resilience, healing, or transformation that you'd like to share? 
              We believe that sharing stories can inspire hope and create connections within our community.
            </p>
            <p>
              Whether you're a survivor, volunteer, supporter, or community member, your story matters. 
              Contact us to learn about opportunities to share your experience and inspire others.
            </p>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default News;
