import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { callGPT4o } from '../../api/direct'; // 导入直接API调用
import { callGPT4oDirectly } from '../../api/directFetch'; // 导入最直接的API调用
import './ChatPage.css';

// 安全地获取API密钥
const getApiKey = () => {
  // 使用GPTsAPI的API密钥
  return 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
};

// 安全地获取API URL
const getApiUrl = () => {
  // 检查是否在生产环境中
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // 在生产环境中使用API代理
    return '/api/openai-proxy';
  }
  
  // 在开发环境中，先尝试代理，如果不行则直接使用GPTsAPI
  return '/api/openai-proxy';
};

// 直接获取GPTsAPI URL（当代理失败时使用）
const getDirectApiUrl = () => {
  return 'https://api.gptsapi.net/v1/chat/completions';
};

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const [responseOptions, setResponseOptions] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState('');
  const [customerThoughts, setCustomerThoughts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
  
  // 将API参数存储在状态中，以便在需要时更新
  const [apiConfig] = useState({
    apiKey: getApiKey(),
    apiUrl: getApiUrl(),
    model: 'gpt-4o' // 使用GPT-4o模型
  });
  
  // 添加组件挂载时的日志
  useEffect(() => {
    console.log('ChatPage组件已加载');
    console.log('API URL:', apiConfig.apiUrl);
    console.log('使用的模型:', apiConfig.model);
    // 不要在日志中输出完整的API密钥
    console.log('API密钥已配置:', !!apiConfig.apiKey);
  }, [apiConfig]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setResponseOptions([]);
    setSelectedResponse('');
    setCustomerThoughts('');
    setError('');
    
    const requestBody = {
      model: 'gpt-4o', // 使用GPT-4o模型
      messages: [
        {
          role: 'system',
          content: `你是一位自然、真实且专业的客服，像普通人一样与客户交流，不要过度热情或夸张。

语气特点：
- 可以使用"宝""亲"等昵称，但不要过度使用
- 用"好的""可以"等自然表达，避免过多使用"嘿嘿""好滴"等过于卖萌的词语
- 语气友好但不夸张："我来帮你处理""稍等我查一下""有问题随时问我"
- 回复简短直接，像真实的人在对话

服务态度：
- 自然提及服务承诺，不要过度强调
- 清晰确认时间："这个时间可以吗"
- 根据需要提供帮助，不要过度殷勤
- 表现出专业和负责任的态度

专业能力：
- 展示专业理解："我理解你的需求"
- 清楚说明服务内容和价格
- 关注细节："我会按照要求完成"

请分析用户输入的客户对话，然后：
1. 提供三种不同的回复方案，体现上述自然真实的风格
2. 简单分析客户可能的想法和需求

回复必须使用以下JSON格式：
{
  "responses": ["回复1", "回复2", "回复3"],
  "customerThoughts": "客户想法分析内容"
}`
        },
        {
          role: 'user',
          content: inputText
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    };
    
    try {
      console.log('正在调用GPTsAPI...');
      console.log('请求模型:', requestBody.model);
      
      let data;
      
      // 使用最直接的方式调用API
      console.log('尝试直接调用GPTsAPI(directFetch)...');
      const result = await callGPT4oDirectly(
        inputText,
        requestBody.messages[0].content
      );
      
      if (!result.success) {
        setError(`API调用失败: ${result.error}`);
        setIsLoading(false);
        return;
      }
      
      data = result.data;
      console.log('GPTsAPI响应数据:', data);
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        try {
          // 尝试解析返回的JSON
          const content = data.choices[0].message.content;
          console.log('解析AI返回内容:', content);
          
          let parsedContent;
          
          // 检查内容是否已经是JSON字符串
          if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
            try {
              parsedContent = JSON.parse(content);
            } catch (jsonError) {
              console.error('JSON解析失败，尝试手动提取:', jsonError);
              // 尝试手动提取JSON内容
              const jsonMatch = content.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                try {
                  parsedContent = JSON.parse(jsonMatch[0]);
                } catch (e) {
                  throw new Error('无法解析返回的JSON格式');
                }
              } else {
                throw new Error('无法识别返回内容中的JSON格式');
              }
            }
          } else {
            throw new Error('API返回内容不是有效的JSON格式');
          }
          
          if (parsedContent.responses && Array.isArray(parsedContent.responses) && parsedContent.responses.length > 0) {
            // 确保只有三种回复
            const validResponses = parsedContent.responses.slice(0, 3);
            
            // 如果回复少于3个，添加占位符
            while (validResponses.length < 3) {
              validResponses.push("暂无更多回复建议");
            }
            
            // 处理每个回复，确保符合"网感学姐"风格
            const enhancedResponses = validResponses.map(response => {
              // 简化回复，调整为更自然的风格
              let enhancedResponse = response;
              
              // 去掉过于正式的开头
              if (enhancedResponse.startsWith("尊敬的") || enhancedResponse.startsWith("亲爱的")) {
                enhancedResponse = enhancedResponse.replace(/^(尊敬的|亲爱的)[^，,]*[，,]\s*/, "");
              }
              
              // 替换正式表达为更自然的表达
              enhancedResponse = enhancedResponse
                .replace(/非常感谢您的咨询/, "谢谢你的咨询")
                .replace(/我们将竭诚为您服务/, "我会帮你处理")
                .replace(/如果您有任何其他问题，请随时告诉我/, "有问题随时问我")
                .replace(/期待与您的再次交流/, "")
                .replace(/您好/, "你好")
                .replace(/请问/, "")
                .replace(/可以为您/, "可以帮你")
                .replace(/您需要/, "你需要")
                .replace(/我们的服务/, "我这边")
                .replace(/为您提供/, "给你提供")
                .replace(/我们会/, "我会")
                .replace(/谢谢您/, "谢谢你")
                .replace(/欢迎您/, "欢迎你")
                .replace(/麻烦您/, "麻烦你")
                .replace(/请您/, "请你");
              
              // 添加自然的结束方式，避免过度亲昵
              if (Math.random() > 0.7 && enhancedResponse.endsWith("。")) {
                // 有30%的概率添加简单的结束语
                const endings = ["", "希望能帮到你。", "仅供参考。", "有需要随时联系。"];
                const randomEnding = endings[Math.floor(Math.random() * endings.length)];
                enhancedResponse = enhancedResponse.replace(/。$/, randomEnding ? `。${randomEnding}` : "。");
              }
              
              return enhancedResponse;
            });
            
            setResponseOptions(enhancedResponses);
            setSelectedResponse(enhancedResponses[0]);
          } else {
            throw new Error('API返回格式不符合预期，缺少回复选项');
          }
          
          if (parsedContent.customerThoughts) {
            // 格式化客户想法内容
            let formattedThoughts = parsedContent.customerThoughts;
            
            // 使用更客观的表达方式
            if (!formattedThoughts.trim().startsWith('客户') && 
                !formattedThoughts.trim().startsWith('用户') &&
                !formattedThoughts.trim().startsWith('分析')) {
              // 客观的引导语
              formattedThoughts = `客户需求分析：\n${formattedThoughts}`;
            }
            
            // 处理格式，保持简洁专业
            if (!formattedThoughts.includes('\n•') && 
                !formattedThoughts.includes('\n-') &&
                !formattedThoughts.includes('\n1.') &&
                !formattedThoughts.includes('\n💭')) {
              // 分点整理
              const points = formattedThoughts.split('。')
                .filter(point => point.trim().length > 0)
                .map(point => point.trim() + (point.endsWith('。') ? '' : '。'));
              
              if (points.length > 1) {
                // 提取第一行作为标题
                const title = points[0];
                // 剩余内容分点呈现，使用简洁的符号
                const listItems = points.slice(1)
                  .map((point, index) => `• ${point}`)
                  .join('\n');
                
                formattedThoughts = `${title}\n${listItems}`;
              }
            }
            
            setCustomerThoughts(formattedThoughts);
          } else {
            setCustomerThoughts("未能获取客户想法分析");
          }
        } catch (parseError) {
          console.error('解析API响应失败:', parseError);
          
          // 如果解析失败，检查是否有明显的回复内容
          const content = data.choices[0].message.content;
          
          if (content) {
            // 尝试提取可能的回复和想法
            const lines = content.split('\n').filter(line => line.trim());
            
            if (lines.length > 0) {
              // 尝试找出可能的回复
              const possibleResponses = [];
              
              for (const line of lines) {
                // 查找类似回复的行
                if (line.includes('回复') || line.includes('建议') || line.startsWith('"') || line.startsWith('「')) {
                  possibleResponses.push(line.replace(/^[「"]*|[」"]*$/g, ''));
                  if (possibleResponses.length >= 3) break;
                }
              }
              
              if (possibleResponses.length > 0) {
                // 如果找到可能的回复，使用它们
                setResponseOptions(possibleResponses);
                setSelectedResponse(possibleResponses[0]);
                
                // 尝试提取可能的客户想法
                const thoughtsStartIndex = lines.findIndex(line => 
                  line.includes('客户想法') || line.includes('客户可能') || 
                  line.includes('客户思考') || line.includes('customerThoughts')
                );
                
                if (thoughtsStartIndex > -1) {
                  let thoughtsText = '';
                  
                  // 检查是否是JSON格式中的customerThoughts
                  if (lines[thoughtsStartIndex].includes('customerThoughts')) {
                    // 尝试提取JSON中的想法内容
                    const match = lines.slice(thoughtsStartIndex).join(' ').match(/"customerThoughts"\s*:\s*"([^"]*)"/);
                    if (match && match[1]) {
                      thoughtsText = match[1].replace(/\\n/g, '\n');
                    } else {
                      // 如果不能提取JSON，则使用后续行
                      thoughtsText = lines.slice(thoughtsStartIndex + 1).join('\n');
                    }
                  } else {
                    // 非JSON格式，直接使用从该行开始的内容
                    thoughtsText = lines.slice(thoughtsStartIndex).join('\n');
                  }
                  
                  // 格式化客户想法
                  if (thoughtsText) {
                    // 如果没有明显的列表格式，尝试创建列表
                    if (!thoughtsText.includes('\n1.') && 
                        !thoughtsText.includes('\n•') && 
                        !thoughtsText.includes('\n-')) {
                      
                      const points = thoughtsText.split('。')
                        .filter(point => point.trim().length > 0)
                        .map(point => point.trim() + (point.endsWith('。') ? '' : '。'));
                      
                      if (points.length > 1) {
                        // 第一行作为标题
                        const title = points[0].includes('客户想法') ? points[0] : '客户想法分析：';
                        // 剩余内容作为列表项
                        const listItems = points.slice(points[0].includes('客户想法') ? 1 : 0)
                          .map((point, index) => `${index + 1}. ${point}`)
                          .join('\n');
                        
                        thoughtsText = `${title}\n${listItems}`;
                      }
                    }
                    
                    setCustomerThoughts(thoughtsText);
                  } else {
                    setCustomerThoughts("无法提取客户想法分析内容");
                  }
                } else {
                  setCustomerThoughts("无法解析客户想法分析");
                }
              } else {
                setError('API返回内容无法解析为有效回复');
              }
            } else {
              setError('API返回内容无法解析为有效回复');
            }
          } else {
            setError('API返回的内容为空');
          }
        }
      } else {
        setError('API返回数据不完整，请重试');
      }
    } catch (error) {
      console.error('API调用过程发生错误:', error);
      setError(`调用AI服务时出错: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!selectedResponse) return;
    
    navigator.clipboard.writeText(selectedResponse)
      .then(() => {
        alert('已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };

  const selectResponse = (response) => {
    setSelectedResponse(response);
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
            
            {/* 错误提示 */}
            {error && (
              <div className="error-message">
                <p>
                  <strong>哎呀，出了点小问题~</strong><br/>
                  {error.includes('404') ? 
                    'API接口连接失败，请检查以下可能的原因：' : 
                    error}
                </p>
                {error.includes('404') && (
                  <ul style={{textAlign: 'left', margin: '10px 0'}}>
                    <li>确保开发服务器已启动</li>
                    <li>检查setupProxy.js文件配置正确</li>
                    <li>尝试关闭浏览器缓存</li>
                    <li>重新启动开发服务器</li>
                  </ul>
                )}
                <div className="error-actions">
                  <button onClick={handleGenerate} className="retry-button">
                    重试
                  </button>
                  <button onClick={() => setError('')} className="close-button">
                    关闭
                  </button>
                </div>
              </div>
            )}
            
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
                    {selectedResponse && (
                      <button className="copy-button" onClick={handleCopy}>
                        复制
                      </button>
                    )}
                  </div>
                  
                  {/* 回复选项 - 确保只显示三个 */}
                  {responseOptions.length > 0 && !isLoading && (
                    <div className="response-options">
                      {responseOptions.slice(0, 3).map((response, index) => (
                        <div 
                          key={index}
                          className={`response-option ${selectedResponse === response ? 'selected' : ''}`}
                          onClick={() => selectResponse(response)}
                        >
                          <div className="response-number">{index + 1}</div>
                          <div className="response-preview">
                            {response.length > 40 ? `${response.substring(0, 40)}...` : response}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* 选中的回复内容 */}
                  <div className="output-content">
                    {isLoading ? (
                      <div className="loading">生成中...</div>
                    ) : (
                      selectedResponse || <div className="placeholder">AI生成的回复将显示在这里</div>
                    )}
                  </div>
                  
                  {/* 客户想法分析 */}
                  <div className="customer-thoughts">
                    <h3>客户想法分析</h3>
                    <div className="thoughts-content">
                      {isLoading ? (
                        <div className="loading">分析中...</div>
                      ) : (
                        customerThoughts ? (
                          <div className="formatted-thoughts">
                            {customerThoughts}
                          </div>
                        ) : (
                          <div className="placeholder">AI分析的客户潜在想法将显示在这里</div>
                        )
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