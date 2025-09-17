// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body, html, #root {
    background: #FFFFFF;
    color: #1F2937;
    font-family: 'Poppins', 'Montserrat', Arial, sans-serif;
    transition: background 0.3s, color 0.3s;
    min-height: 100vh;
    line-height: 1.6;
  }
  
  main {
    background: #FFFFFF;
    color: #1F2937;
    transition: background 0.3s, color 0.3s;
  }
  
  a {
    color: #8B5CF6;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  a:hover {
    color: #7C3AED;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea, select {
    font-family: inherit;
    color: #1F2937;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    color: #1F2937;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4B5563;
    margin-bottom: 1rem;
  }

  /* Ensure form elements are visible */
  input::placeholder, textarea::placeholder {
    color: #9CA3AF;
  }

  /* Hero section text visibility */
  .hero-text, .hero-title, .hero-subtitle, .hero-content h1, .hero-content h2, .hero-content p {
    color: #FFFFFF !important;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.7) !important;
    opacity: 1 !important;
  }

  /* Card and section text visibility */
  .card-text, .card-title, .section-text, .program-card h3, .program-card p {
    color: #1F2937 !important;
    opacity: 1 !important;
  }

  /* Navigation text visibility */
  .nav-link, .navbar a, .dropdown-item {
    color: inherit !important;
    opacity: 1 !important;
  }

  /* Footer text visibility */
  .footer-text, .footer a, .footer p {
    color: #FFFFFF !important;
    opacity: 1 !important;
  }

  /* Button text visibility */
  button, .btn, .button {
    color: inherit !important;
    opacity: 1 !important;
  }

  /* Form text visibility */
  form label, form input, form textarea, form select {
    color: #1F2937 !important;
    opacity: 1 !important;
  }

  /* Testimonial text visibility */
  .testimonial-text, .testimonial-author {
    color: inherit !important;
    opacity: 1 !important;
  }

  /* Stats and numbers visibility */
  .stat-number, .stat-label {
    color: inherit !important;
    opacity: 1 !important;
  }

  /* Ensure proper contrast for all text */
  .text-white {
    color: #FFFFFF !important;
  }
  
  .text-dark {
    color: #1F2937 !important;
  }
  
  .text-muted {
    color: #6B7280 !important;
  }
  
  .bg-white {
    background-color: #FFFFFF !important;
  }
  
  .bg-light {
    background-color: #F9FAFB !important;
  }

  ::selection {
    background-color: #8B5CF6;
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #F3F4F6;
  }

  ::-webkit-scrollbar-thumb {
    background: #8B5CF6;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #7C3AED;
  }
`;
