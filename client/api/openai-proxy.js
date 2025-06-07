// 代理API路由处理OpenAI请求
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' });
  }

  try {
    const apiKey = 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
    const response = await fetch('https://api.gptsapi.net/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // 将API响应状态码传递给客户端
    res.status(response.status).json(data);
  } catch (error) {
    console.error('代理API错误:', error);
    res.status(500).json({ error: '代理服务器错误', message: error.message });
  }
} 