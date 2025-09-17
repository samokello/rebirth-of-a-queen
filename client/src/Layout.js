import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { GlobalStyle } from './styles/GlobalStyle';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
} 