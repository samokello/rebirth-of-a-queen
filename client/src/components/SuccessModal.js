import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import confetti from "canvas-confetti";

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    // 🎉 Confetti burst when modal appears
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <Overlay>
      <Modal>
        <CheckmarkWrapper>
          <div className="checkmark-circle">
            <div className="background"></div>
            <div className="checkmark draw"></div>
          </div>
        </CheckmarkWrapper>
        <h2>🎉 Thank You!</h2>
        <p>Your donation was successful and will make a big impact. 💖</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Modal>
    </Overlay>
  );
}

// ✅ Styles
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 99999;
  backdrop-filter: blur(8px);
  padding-right: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    padding-right: 0;
  }
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: modalSlideIn 0.4s ease-out;
  margin-left: auto;
  margin-right: 20px;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-60px) scale(0.85);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    margin: 10px auto;
  }
`;

// ✅ Checkmark animation
const CheckmarkWrapper = styled.div`
  margin-bottom: 1rem;

  .checkmark-circle {
    width: 80px;
    height: 80px;
    position: relative;
    display: inline-block;
    vertical-align: top;

    .background {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #4CAF50;
      position: absolute;
    }

    .checkmark {
      border-radius: 5px;
    }

    .draw:after {
      animation-duration: 800ms;
      animation-timing-function: ease;
      animation-name: checkmark;
      transform: scaleX(-1) rotate(135deg);
      animation-fill-mode: forwards;
    }
    .draw:after {
      opacity: 1;
      height: 40px;
      width: 20px;
      transform-origin: left top;
      border-right: 4px solid #fff;
      border-top: 4px solid #fff;
      content: '';
      left: 26px;
      top: 30px;
      position: absolute;
    }

    @keyframes checkmark {
      0% {
        height: 0;
        width: 0;
        opacity: 1;
      }
      20% {
        height: 0;
        width: 20px;
        opacity: 1;
      }
      40% {
        height: 40px;
        width: 20px;
        opacity: 1;
      }
      100% {
        height: 40px;
        width: 20px;
        opacity: 1;
      }
    }
  }
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background: #ff4081;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

