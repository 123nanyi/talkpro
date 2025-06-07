import React from 'react';
import FeatureList from './FeatureList';
import './Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      title: '智能对话生成',
      description: '基于OpenAI技术，生成专业、自然的客服回复，满足各种客户咨询场景',
      icon: 'chat-icon'
    },
    {
      id: 2,
      title: '风格模仿',
      description: '学习您的对话风格，生成符合您个人特色的回复，保持品牌一致性',
      icon: 'style-icon'
    },
    {
      id: 3,
      title: '便捷操作',
      description: '一键复制回复内容，轻松应对客户咨询，提高工作效率',
      icon: 'copy-icon'
    },
    {
      id: 4,
      title: '持续学习',
      description: '系统持续学习新的对话模式，不断提升回复质量和准确性',
      icon: 'learning-icon'
    },
    {
      id: 5,
      title: '多场景适配',
      description: '适用于售前咨询、售后服务、投诉处理等多种客服场景',
      icon: 'scenario-icon'
    },
    {
      id: 6,
      title: '数据安全',
      description: '严格保护您的对话数据，确保信息安全和隐私保护',
      icon: 'security-icon'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <h2>核心功能</h2>
          <p>全方位提升您的客服体验，让AI成为您的得力助手</p>
        </div>
        <FeatureList features={features} />
      </div>
    </section>
  );
};

export default Features; 