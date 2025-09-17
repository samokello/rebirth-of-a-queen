import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaBullseye, FaHeart, FaLightbulb } from "react-icons/fa";

export default function Mission() {
  return (
    <Container>
      {/* ✅ HERO */}
      <Hero>
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1>Our Mission</h1>
          <p>Creating a sustainable future where women thrive and lead change.</p>
        </motion.div>
      </Hero>

      {/* ✅ MISSION STATEMENTS */}
      <MissionWrapper>
        <MissionCard whileHover={{ scale: 1.05 }}>
          <FaBullseye size={40} color="#ff66a3" />
          <h3>Empower</h3>
          <p>We empower women with education, mentorship, and resources to succeed.</p>
        </MissionCard>

        <MissionCard whileHover={{ scale: 1.05 }}>
          <FaHeart size={40} color="#ff66a3" />
          <h3>Support</h3>
          <p>We provide healthcare, counseling, and community support to uplift families.</p>
        </MissionCard>

        <MissionCard whileHover={{ scale: 1.05 }}>
          <FaLightbulb size={40} color="#ff66a3" />
          <h3>Innovate</h3>
          <p>We create sustainable projects that improve lives and inspire change.</p>
        </MissionCard>
      </MissionWrapper>
    </Container>
  );
}

/* ✅ STYLED COMPONENTS */
const Container = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
`;

const Hero = styled.div`
  height: 50vh;
  background: url("/images/mission-bg.jpg") center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;

  h1 {
    font-size: 3rem;
    font-weight: bold;
  }
  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`;

const MissionWrapper = styled.div`
  max-width: 1000px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const MissionCard = styled(motion.div)`
  background: ${({ theme }) => theme.palette.background.paper};
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);

  h3 {
    margin-top: 1rem;
    color: #ff66a3;
  }
  p {
    margin-top: 0.5rem;
    color: #555;
  }
  h3, h4, h5, h6, p {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
