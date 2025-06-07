/**
 * 直接调用GPTsAPI的Fetch模块 - 无代理版本
 */

// 直接调用GPT-4o API无代理版
export const callGPT4oDirectly = async (userInput, systemPrompt) => {
  const apiKey = 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
  const apiUrl = 'https://api.gptsapi.net/v1/chat/completions';
  
  console.log('开始直接调用GPTsAPI:', new Date().toISOString());
  
  try {
    const requestBody = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    };
    
    console.log('请求API:', apiUrl);
    console.log('使用模型:', requestBody.model);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0 TalkPro Direct/1.0'
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('API响应状态:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('响应解析成功');
    
    return {
      success: true,
      data: data,
      choices: data.choices
    };
  } catch (error) {
    console.error('直接API调用失败:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 