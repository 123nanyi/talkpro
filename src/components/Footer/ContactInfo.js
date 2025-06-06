import React from 'react';
import './Footer.css';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h3>联系我们</h3>
      <ul>
        <li>
          <i className="icon-mail"></i>
          <a href="mailto:contact@xianquai.com">contact@xianquai.com</a>
        </li>
        <li>
          <i className="icon-phone"></i>
          <a href="tel:+8610123456789">+86 (10) 1234-5678</a>
        </li>
        <li>
          <i className="icon-location"></i>
          <span>北京市朝阳区科技园区88号</span>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo; 