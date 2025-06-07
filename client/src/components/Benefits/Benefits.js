import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefitsList = [
    {
      id: 1,
      title: '提高客服效率',
      description: '减少回复时间，提高客户满意度，让每位客服人员能够同时处理更多客户咨询',
      icon: '⚡'
    },
    {
      id: 2,
      title: '个性化回复',
      description: '基于您的风格和品牌语调，生成符合企业形象的专业回复',
      icon: '🎯'
    },
    {
      id: 3,
      title: '持续学习',
      description: '系统会不断学习和改进，随着使用越多，回复质量越高',
      icon: '📈'
    }
  ];

  return (
    <section className="benefits">
      <div className="container">
        <div className="benefits-header">
          <h2>为什么选择先驱AI TalkPro</h2>
          <p>我们的生成式成交引擎能为您的业务带来显著优势</p>
        </div>
        
        <div className="benefits-list">
          {benefitsList.map(benefit => (
            <div className="benefit-card" key={benefit.id}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits; 