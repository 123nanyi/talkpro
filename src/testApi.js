/**
 * GPTsAPI测试脚本
 * 用于测试GPTsAPI是否可以正常访问
 */

// 全局fetch测试函数
async function testGPTsAPIConnection() {
  const apiKey = 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
  const apiUrl = 'https://api.gptsapi.net/v1/chat/completions';
  
  console.log('开始测试GPTsAPI连接...');
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0 TalkPro Test/1.0'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: '你是一个简单的测试助手。'
          },
          {
            role: 'user',
            content: '测试连接是否正常'
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      })
    });
    
    console.log('API响应状态:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API请求失败: ${response.status} - ${errorText}`);
      return {
        success: false,
        status: response.status,
        error: errorText
      };
    }
    
    const data = await response.json();
    console.log('测试成功! 响应数据:', data);
    
    return {
      success: true,
      status: response.status,
      data: data
    };
  } catch (error) {
    console.error('测试失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 导出测试函数
export { testGPTsAPIConnection }; 