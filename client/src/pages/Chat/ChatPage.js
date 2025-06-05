import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ChatPage.css';

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [customerThoughts, setCustomerThoughts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true);
  const [chatHistory] = useState([
    { id: 1, title: '今天你要谈成这笔单吗?', date: '今天' },
    { id: 2, title: '微信客服自动化实现', date: '前7天' },
    { id: 3, title: '产品价格咨询对话', date: '前7天' },
    { id: 4, title: '售后服务问题处理', date: '前30天' },
    { id: 5, title: '客户投诉解决方案', date: '前30天' },
  ]);
  const [tasks] = useState([
    { id: 1, title: '打动客户A，循环"你们真比别家"的卖点' },
    { id: 2, title: '1. 试讲八项卖点赢客户' },
    { id: 3, title: '2. 理顺客户价格' },
    { id: 4, title: '3. 提出定价策略' },
  ]);
  const [activeChat, setActiveChat] = useState(1);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerate = () => {
    // 模拟API调用
    setIsLoading(true);
    setTimeout(() => {
      setOutputText(`这不是问题，我们的产品确实物超所值。我们的产品采用高质量材料制造，经过严格的质量控制，使用寿命比同类产品长50%。此外，我们还提供2年的质保期，远超行业标准。关于价格问题，我们目前有促销活动，如果您现在下单，可以享受85折优惠，这是我们能提供的最好价格。`);
      
      setCustomerThoughts(`客户可能在考虑:
1. 产品价格是否确实合理
2. 是否有更多优惠可以争取
3. 同类产品的市场价格对比
4. 是否值得现在购买或等待更大折扣
5. 产品质量是否与价格相符`);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
      .then(() => {
        alert('已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTaskbar = () => {
    setIsTaskbarOpen(!isTaskbarOpen);
  };

  const selectChat = (id) => {
    setActiveChat(id);
    // 在实际应用中，这里会加载对应的聊天记录
  };

  return (
    <div className="chat-page">
      <Header />
      <main className="chat-content">
        {/* 左侧聊天记录边栏 */}
        <div className={`chat-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h3>聊天记录</h3>
            <button className="new-chat-btn">
              <span className="plus-icon">+</span> 新聊天
            </button>
          </div>
          
          <div className="chat-list">
            {chatHistory.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
                onClick={() => selectChat(chat.id)}
              >
                <div className="chat-item-title">{chat.title}</div>
                <div className="chat-item-date">{chat.date}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 中间主要内容区域 */}
        <div className="chat-main-container">
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '关闭边栏' : '打开边栏'}
          </button>
          
          {/* 当任务栏关闭时显示的打开按钮 */}
          {!isTaskbarOpen && (
            <button className="toggle-taskbar-open-btn" onClick={toggleTaskbar}>
              打开任务栏
            </button>
          )}
          
          <div className="container">
            <div className="chat-header">
              <h1>今天你要谈成这笔单吗?</h1>
              <p>TalkPro会陪你一起分析客户，拆解异议，优化话术，直到拿下单子</p>
            </div>
            
            <div className="chat-interface">
              <div className="input-output-container">
                {/* 左侧用户输入区域 */}
                <div className="user-input-section">
                  <h2>用户输入</h2>
                  <p className="section-subtitle">客户背景 & 场景描述</p>
                  <textarea 
                    placeholder="请输入客户背景和场景描述..." 
                    value={inputText}
                    onChange={handleInputChange}
                  />
                  <button 
                    className="generate-button"
                    onClick={handleGenerate}
                    disabled={!inputText.trim() || isLoading}
                  >
                    {isLoading ? '生成中...' : '生成回复'}
                  </button>
                </div>
                
                {/* 右侧AI输出区域 */}
                <div className="ai-output-section">
                  <div className="section-header">
                    <h2>AI生成输出</h2>
                    {outputText && (
                      <button className="copy-button" onClick={handleCopy}>
                        复制
                      </button>
                    )}
                  </div>
                  <div className="output-content">
                    {isLoading ? (
                      <div className="loading">生成中...</div>
                    ) : (
                      outputText || <div className="placeholder">AI生成的回复将显示在这里</div>
                    )}
                  </div>
                  
                  {/* 客户想法分析 */}
                  <div className="customer-thoughts">
                    <h3>客户想法分析</h3>
                    <div className="thoughts-content">
                      {isLoading ? (
                        <div className="loading">分析中...</div>
                      ) : (
                        customerThoughts || <div className="placeholder">AI分析的客户潜在想法将显示在这里</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧任务导向边栏 */}
        <div className={`task-sidebar ${isTaskbarOpen ? 'open' : 'closed'}`}>
          <div className="task-sidebar-header">
            <h3>任务导向</h3>
            <button className="toggle-taskbar-btn" onClick={toggleTaskbar}>
              {isTaskbarOpen ? '收起' : '展开'}
            </button>
          </div>
          
          <div className="task-list">
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-item-title">{task.title}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage; 