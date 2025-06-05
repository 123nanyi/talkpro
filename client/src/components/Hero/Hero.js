import React from 'react';
import CallToAction from './CallToAction';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>先驱AI TalkPro 智能客服对话助手</h1>
          <p>让AI为您提供专业的客户服务回复，提高工作效率</p>
          <CallToAction />
        </div>
        <div className="hero-image">
          <img src="/assets/images/hero-image.svg" alt="智能客服对话助手" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 