import React from 'react';
import CallToAction from './CallToAction';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>先驱AI TalkPro 生成式成交引擎</h1>
          <p>推演策略，拿下订单，让AI成为您的销售得力助手</p>
          <CallToAction />
        </div>
        <div className="hero-image">
          <img src="/assets/images/hero-image.svg" alt="生成式成交引擎" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 