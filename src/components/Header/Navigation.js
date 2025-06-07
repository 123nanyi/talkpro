import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // 定义激活样式的函数
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "active" : "";
  };

  return (
    <nav className="navigation">
      <div className="desktop-nav">
        <ul>
          <li><NavLink to="/" className={navLinkStyles} end>首页</NavLink></li>
          <li><NavLink to="/chat" className={navLinkStyles}>对话助手</NavLink></li>
          <li><NavLink to="/about" className={navLinkStyles}>关于我们</NavLink></li>
          <li><NavLink to="/contact" className={navLinkStyles}>联系我们</NavLink></li>
        </ul>
      </div>
      
      <div className="mobile-nav-toggle" onClick={toggleMobileMenu}>
        <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
      </div>
      
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><NavLink to="/" className={navLinkStyles} end onClick={toggleMobileMenu}>首页</NavLink></li>
          <li><NavLink to="/chat" className={navLinkStyles} onClick={toggleMobileMenu}>对话助手</NavLink></li>
          <li><NavLink to="/about" className={navLinkStyles} onClick={toggleMobileMenu}>关于我们</NavLink></li>
          <li><NavLink to="/contact" className={navLinkStyles} onClick={toggleMobileMenu}>联系我们</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 