import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderInfo, setOrderInfo] = useState({
    orderId: searchParams.get('orderId') || '',
    amount: searchParams.get('amount') || '',
    paymentMethod: searchParams.get('method') || ''
  });

  useEffect(() => {
    // 可以在这里调用API验证支付状态
    // verifyPaymentStatus(orderInfo.orderId);
  }, [orderInfo.orderId]);

  return (
    <div className="payment-success-page">
      <Header />
      <main className="payment-success-content">
        <div className="container">
          <div className="success-container">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1>支付成功！</h1>
            <p className="success-message">恭喜您，订单支付已完成</p>
            
            {orderInfo.orderId && (
              <div className="order-details">
                <h3>订单信息</h3>
                <div className="detail-item">
                  <span className="label">订单号：</span>
                  <span className="value">{orderInfo.orderId}</span>
                </div>
                {orderInfo.amount && (
                  <div className="detail-item">
                    <span className="label">支付金额：</span>
                    <span className="value">¥{orderInfo.amount}</span>
                  </div>
                )}
                {orderInfo.paymentMethod && (
                  <div className="detail-item">
                    <span className="label">支付方式：</span>
                    <span className="value">{orderInfo.paymentMethod}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="action-buttons">
              <Link to="/chat" className="primary-button">
                开始使用
              </Link>
              <Link to="/" className="secondary-button">
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;