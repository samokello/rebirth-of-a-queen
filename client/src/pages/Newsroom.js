import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaNewspaper, FaCalendar, FaUser } from 'react-icons/fa';

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

const NewsCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const NewsImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const NewsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e1e2f;
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReadMore = styled.a`
  color: #e74c3c;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #c0392b;
  }
`;

export default function Newsroom() {
  const news = [
    {
      title: "New Education Center Opens in Kibera",
      excerpt: "We're excited to announce the opening of our new education center in Kibera, providing quality education to over 200 girls in the community.",
      date: "July 15, 2024",
      author: "Rebirth of a Queen Team",
      icon: "📚"
    },
    {
      title: "Fashion Program Graduates 50 New Entrepreneurs",
      excerpt: "Our fashion design program celebrated the graduation of 50 women who are now starting their own businesses in the fashion industry.",
      date: "July 10, 2024",
      author: "Rebirth of a Queen Team",
      icon: "👗"
    },
    {
      title: "Partnership with Local Health Clinic Announced",
      excerpt: "We're partnering with a local health clinic to provide free health services to women and girls in our community programs.",
      date: "July 5, 2024",
      author: "Rebirth of a Queen Team",
      icon: "🏥"
    },
    {
      title: "Photography Workshop Series Launched",
      excerpt: "Our new photography workshop series is helping women develop professional skills and document their communities through art.",
      date: "June 28, 2024",
      author: "Rebirth of a Queen Team",
      icon: "📷"
    },
    {
      title: "Annual Impact Report Released",
      excerpt: "Our 2023 annual impact report shows significant progress in empowering women and girls across Nairobi's communities.",
      date: "June 20, 2024",
      author: "Rebirth of a Queen Team",
      icon: "📊"
    },
    {
      title: "Volunteer Recognition Event",
      excerpt: "We celebrated our amazing volunteers who dedicate their time and skills to support our programs and initiatives.",
      date: "June 15, 2024",
      author: "Rebirth of a Queen Team",
      icon: "🤝"
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
          Newsroom
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay updated with the latest news, events, and stories from Rebirth of a Queen.
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
            Latest News & Updates
          </SectionTitle>
          <Grid>
            {news.map((item, index) => (
              <NewsCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <NewsImage>
                  <span>{item.icon}</span>
                </NewsImage>
                <NewsContent>
                  <NewsMeta>
                    <span><FaCalendar /> {item.date}</span>
                    <span><FaUser /> {item.author}</span>
                  </NewsMeta>
                  <NewsTitle>{item.title}</NewsTitle>
                  <NewsExcerpt>{item.excerpt}</NewsExcerpt>
                  <ReadMore href="#">Read More →</ReadMore>
                </NewsContent>
              </NewsCard>
            ))}
          </Grid>
        </Section>
      </Container>
    </Page>
  );
} 