import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="desktop-nav">
        <ul>
          <li><NavLink to="/" exact activeClassName="active">首页</NavLink></li>
          <li><NavLink to="/chat" activeClassName="active">对话助手</NavLink></li>
          <li><NavLink to="/about" activeClassName="active">关于我们</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active">联系我们</NavLink></li>
        </ul>
      </div>
      
      <div className="mobile-nav-toggle" onClick={toggleMobileMenu}>
        <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
      </div>
      
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" exact activeClassName="active" onClick={toggleMobileMenu}>首页</NavLink></li>
          <li><NavLink to="/chat" activeClassName="active" onClick={toggleMobileMenu}>对话助手</NavLink></li>
          <li><NavLink to="/about" activeClassName="active" onClick={toggleMobileMenu}>关于我们</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active" onClick={toggleMobileMenu}>联系我们</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 