import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const CallToAction = () => {
  return (
    <div className="cta-buttons">
      <Link to="/chat" className="cta-button primary">
        开始使用
      </Link>
      <Link to="/about" className="cta-button secondary">
        了解更多
      </Link>
    </div>
  );
};

export default CallToAction; 