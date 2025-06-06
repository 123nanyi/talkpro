import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <h2>先驱AI TalkPro</h2>
            </Link>
            <p>生成式成交引擎 · 推演策略 · 拿下订单</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3>产品</h3>
              <ul>
                <li><Link to="/features">功能特性</Link></li>
                <li><Link to="/pricing">价格方案</Link></li>
                <li><Link to="/demo">申请演示</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>资源</h3>
              <ul>
                <li><Link to="/blog">博客</Link></li>
                <li><Link to="/guides">使用指南</Link></li>
                <li><Link to="/faq">常见问题</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3>公司</h3>
              <ul>
                <li><Link to="/about">关于我们</Link></li>
                <li><Link to="/contact">联系我们</Link></li>
                <li><Link to="/careers">加入我们</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 先驱AI TalkPro. 保留所有权利</p>
          <div className="footer-legal">
            <Link to="/privacy">隐私政策</Link>
            <Link to="/terms">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 