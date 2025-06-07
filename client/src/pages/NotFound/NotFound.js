import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Header />
      <main className="not-found-content">
        <div className="container">
          <div className="not-found-container">
            <h1>404</h1>
            <h2>页面未找到</h2>
            <p>抱歉，您访问的页面不存在或已被移除</p>
            <Link to="/" className="back-home-button">
              返回首页
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound; 