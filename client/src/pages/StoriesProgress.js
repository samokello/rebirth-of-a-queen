import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

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
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
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
  margin-bottom: 3rem;
  color: #1e1e2f;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StoryCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -15px;
  left: 20px;
  width: 30px;
  height: 30px;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const StoryText = styled.p`
  color: #333;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-size: 1.1rem;
`;

const StoryAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-weight: 600;
  color: #1e1e2f;
  margin-bottom: 0.25rem;
`;

const AuthorTitle = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #f39c12;
`;

export default function StoriesProgress() {
  const stories = [
    {
      text: "Through Rebirth of a Queen's education program, I was able to complete my studies and now I'm working as a teacher. I'm helping other girls in my community pursue their dreams.",
      author: "Sarah M.",
      title: "Education Graduate",
      rating: 5
    },
    {
      text: "The skills training program changed my life. I learned fashion design and now I have my own small business. I can support my family and inspire other women.",
      author: "Grace W.",
      title: "Fashion Entrepreneur",
      rating: 5
    },
    {
      text: "The fitness program not only improved my health but also gave me confidence. I'm now a fitness instructor helping other women stay healthy and strong.",
      author: "Mary K.",
      title: "Fitness Instructor",
      rating: 5
    },
    {
      text: "The leather-making skills I learned here helped me start my own business. I'm now able to provide for my children and send them to school.",
      author: "Jane N.",
      title: "Leather Artisan",
      rating: 5
    },
    {
      text: "Photography training opened up a whole new world for me. I'm now a professional photographer documenting important moments in my community.",
      author: "Alice O.",
      title: "Professional Photographer",
      rating: 5
    },
    {
      text: "The support and mentorship I received here gave me the courage to pursue my dreams. I'm now studying medicine and want to help other girls like me.",
      author: "Faith M.",
      title: "Medical Student",
      rating: 5
    }
  ];

  return (
    <Page>
      <Hero>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Stories of Progress
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Real stories from real women whose lives have been transformed through our programs and initiatives.
        </HeroSubtitle>
      </Hero>

      <Container>
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Success Stories
          </SectionTitle>
          <Grid>
            {stories.map((story, index) => (
              <StoryCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <QuoteIcon>
                  <FaQuoteLeft />
                </QuoteIcon>
                <StoryText>{story.text}</StoryText>
                <StoryAuthor>
                  <AuthorImage>
                    {story.author.split(' ').map(n => n[0]).join('')}
                  </AuthorImage>
                  <AuthorInfo>
                    <AuthorName>{story.author}</AuthorName>
                    <AuthorTitle>{story.title}</AuthorTitle>
                  </AuthorInfo>
                  <Rating>
                    {[...Array(story.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </Rating>
                </StoryAuthor>
              </StoryCard>
            ))}
          </Grid>
        </Section>
      </Container>
    </Page>
  );
} 