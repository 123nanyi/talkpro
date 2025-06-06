import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <h1>先驱AI TalkPro</h1>
        <span className="logo-tagline">生成式成交引擎 · 推演策略 · 拿下订单</span>
      </Link>
    </div>
  );
};

export default Logo; 