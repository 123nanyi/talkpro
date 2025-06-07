/**
 * 直接调用GPTsAPI的模块
 */

// 直接调用GPT-4o API
export const callGPT4o = async (prompt, systemPrompt) => {
  try {
    const apiKey = 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
    const apiUrl = 'https://api.gptsapi.net/v1/chat/completions';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt || '你是一位有帮助的助手'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('直接API调用失败:', error);
    throw error;
  }
}; 