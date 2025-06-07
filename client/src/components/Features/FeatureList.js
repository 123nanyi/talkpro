import React from 'react';
import FeatureCard from './FeatureCard';
import './Features.css';

const FeatureList = ({ features }) => {
  return (
    <div className="feature-list">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};

export default FeatureList; 