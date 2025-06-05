import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Benefits from '../../components/Benefits/Benefits';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home; 