export const runtime = 'edge'; // 使用Edge运行时获得更好的性能

// 允许所有来源的访问（解决CORS问题）
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export async function POST(request) {
  // 添加CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    // 使用GPTsAPI的密钥
    const apiKey = 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
    
    // 获取请求体
    const requestData = await request.json();
    console.log('API代理收到请求:', {
      timestamp: new Date().toISOString(),
      model: requestData.model || 'gpt-3.5-turbo'
    });
    
    // 确保使用正确的模型和参数
    if (!requestData.model) {
      requestData.model = 'gpt-3.5-turbo';
    }
    
    // 确保使用适当的温度参数，保持自然感
    if (!requestData.temperature) {
      requestData.temperature = 0.7;
    }
    
    // 确保回复简洁
    if (!requestData.max_tokens || requestData.max_tokens > 1000) {
      requestData.max_tokens = 800;
    }
    
    // 打印请求信息
    console.log('代理请求内容:', {
      model: requestData.model,
      temperature: requestData.temperature,
      message_count: requestData.messages?.length || 0
    });
    
    // 使用GPTsAPI的URL
    const apiUrl = 'https://api.gptsapi.net/v1/chat/completions';
    console.log('转发请求到:', apiUrl);
    
    // 发送请求到GPTsAPI
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0 TalkPro/1.0'
      },
      body: JSON.stringify(requestData)
    });
    
    // 记录API响应状态
    console.log('GPTsAPI响应状态:', response.status);
    
    // 获取响应内容
    const responseText = await response.text();
    console.log('GPTsAPI响应长度:', responseText.length);
    
    // 尝试解析响应
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('GPTsAPI响应解析成功');
    } catch (e) {
      console.error('解析GPTsAPI响应失败:', e);
      return Response.json(
        { error: '无法解析API响应', message: responseText.substring(0, 500) }, 
        { status: 500, headers }
      );
    }
    
    // 返回响应
    return Response.json(data, { status: response.status, headers });
  } catch (error) {
    // 记录错误
    console.error('API代理错误:', error);
    
    return Response.json(
      { 
        error: '代理API错误', 
        message: error.message
      },
      { status: 500, headers }
    );
  }
}

// 设置CORS头
export const config = {
  api: {
    bodyParser: true,
  },
}; 