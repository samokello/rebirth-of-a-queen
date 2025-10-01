import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBlog, FaCalendarAlt, FaUser, FaTag, FaHeart, FaHandsHelping, FaGraduationCap, FaBullhorn, FaHome } from 'react-icons/fa';

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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f0ff 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const BlogContent = styled.div`
  padding: 2rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d1a3a;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

const BlogExcerpt = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const BlogTags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
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

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Trauma-Informed Care: A Guide for Supporters",
      excerpt: "Learn about the principles of trauma-informed care and how to provide effective support to survivors of sexual violence and modern slavery.",
      date: "March 12, 2024",
      author: "Dr. Sarah Johnson",
      category: "education",
      tags: ["trauma", "care", "support", "education"],
      icon: <FaHeart />
    },
    {
      id: 2,
      title: "The Power of Community in Healing: Building Support Networks",
      excerpt: "Explore how community support plays a crucial role in the healing process and how we can build stronger support networks for survivors.",
      date: "March 10, 2024",
      author: "Maria Santos",
      category: "healing",
      tags: ["community", "healing", "support", "networks"],
      icon: <FaHandsHelping />
    },
    {
      id: 3,
      title: "Economic Empowerment: Creating Pathways to Independence",
      excerpt: "Discover how skills training and economic empowerment programs are helping survivors build sustainable livelihoods and achieve independence.",
      date: "March 8, 2024",
      author: "James Mwangi",
      category: "empowerment",
      tags: ["empowerment", "skills", "training", "independence"],
      icon: <FaGraduationCap />
    },
    {
      id: 4,
      title: "Breaking the Silence: The Importance of Speaking Out",
      excerpt: "Learn about the importance of breaking the silence around sexual violence and how speaking out can lead to healing and change.",
      date: "March 5, 2024",
      author: "Akinyi Juma",
      category: "advocacy",
      tags: ["advocacy", "speaking out", "awareness", "change"],
      icon: <FaBullhorn />
    },
    {
      id: 5,
      title: "Creating Safe Spaces: The Role of Shelters in Recovery",
      excerpt: "Understand how safe spaces and shelters provide crucial support for survivors during their recovery journey and transition to independence.",
      date: "March 3, 2024",
      author: "Grace Wanjiku",
      category: "shelter",
      tags: ["shelter", "safe spaces", "recovery", "support"],
      icon: <FaHome />
    },
    {
      id: 6,
      title: "Mental Health and Healing: Addressing the Invisible Wounds",
      excerpt: "Explore the mental health aspects of healing from trauma and the importance of comprehensive mental health support for survivors.",
      date: "March 1, 2024",
      author: "Dr. Peter Kimani",
      category: "mental health",
      tags: ["mental health", "healing", "trauma", "therapy"],
      icon: <FaHeart />
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    activeFilter === 'all' || post.category === activeFilter
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
          <Title>Blog</Title>
          <Subtitle>
            Insights, stories, and resources from our community
          </Subtitle>
        </Header>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaBlog style={{ color: '#667eea' }} />
            Latest Posts
          </SectionTitle>
          
          <FilterButtons>
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
            >
              All Posts
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'education'} 
              onClick={() => setActiveFilter('education')}
            >
              Education
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'healing'} 
              onClick={() => setActiveFilter('healing')}
            >
              Healing
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'empowerment'} 
              onClick={() => setActiveFilter('empowerment')}
            >
              Empowerment
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'advocacy'} 
              onClick={() => setActiveFilter('advocacy')}
            >
              Advocacy
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'mental health'} 
              onClick={() => setActiveFilter('mental health')}
            >
              Mental Health
            </FilterButton>
          </FilterButtons>

          <BlogGrid>
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <BlogImage>
                  {post.icon}
                </BlogImage>
                <BlogContent>
                  <BlogTitle>
                    {post.title}
                  </BlogTitle>
                  <BlogMeta>
                    <span>
                      <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                      {post.date}
                    </span>
                    <span>
                      <FaUser style={{ marginRight: '0.5rem' }} />
                      {post.author}
                    </span>
                  </BlogMeta>
                  <BlogExcerpt>
                    {post.excerpt}
                  </BlogExcerpt>
                  <BlogTags>
                    {post.tags.map((tag, index) => (
                      <Tag key={index}>
                        <FaTag style={{ marginRight: '0.3rem' }} />
                        {tag}
                      </Tag>
                    ))}
                  </BlogTags>
                  <ReadMoreButton>
                    Read Full Post
                  </ReadMoreButton>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
        </Section>

        <Section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <SectionTitle>
            <FaHeart style={{ color: '#667eea' }} />
            Contribute to Our Blog
          </SectionTitle>
          <SectionContent>
            <p>
              We welcome contributions from survivors, supporters, professionals, and community members 
              who want to share their insights, experiences, and expertise. Our blog is a platform for 
              education, inspiration, and community building.
            </p>
            <p>
              If you have a story to share, expertise to offer, or insights that could help others, 
              we'd love to hear from you. Contact us to learn about our guest posting guidelines 
              and how you can contribute to our community blog.
            </p>
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default Blog;
