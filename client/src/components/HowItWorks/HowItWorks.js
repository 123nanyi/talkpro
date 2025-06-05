import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: '输入客户对话',
      description: '将客户的问题或咨询内容复制到对话助手中',
      number: '01'
    },
    {
      id: 2,
      title: '生成AI回复',
      description: '系统会基于您的风格和客户需求，快速生成专业回复',
      number: '02'
    },
    {
      id: 3,
      title: '一键复制使用',
      description: '复制生成的回复内容，直接粘贴到您的客服系统中',
      number: '03'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <div className="hiw-header">
          <h2>如何使用</h2>
          <p>简单三步，立即提升您的客服效率</p>
        </div>
        
        <div className="steps-container">
          {steps.map(step => (
            <div className="step-card" key={step.id}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 