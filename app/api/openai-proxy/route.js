import { NextResponse } from 'next/server';

// 允许所有来源的访问（解决CORS问题）
export async function OPTIONS() {
  return new NextResponse(null, {
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
    // 直接使用硬编码的API密钥，避免环境变量问题
    const apiKey = 'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
    
    // 获取请求体
    const requestData = await request.json();
    
    console.log('API代理接收到请求:', {
      timestamp: new Date().toISOString(),
      model: requestData.model,
      messageCount: requestData.messages?.length || 0
    });
    
    // 准备API请求
    const apiUrl = 'https://api.gptsapi.net/v1/chat/completions';
    
    // 记录请求详情
    console.log('发送请求到:', apiUrl);
    console.log('使用API密钥:', apiKey.substring(0, 10) + '...');
    
    // 发送请求到OpenAI API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0 TalkPro/1.0'
      },
      body: JSON.stringify(requestData),
      cache: 'no-store'
    });
    
    // 获取原始响应内容
    const responseText = await response.text();
    
    // 记录API响应
    console.log('API响应状态:', response.status);
    console.log('API响应头:', JSON.stringify(Object.fromEntries([...response.headers])));
    console.log('API响应内容:', responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''));
    
    // 尝试解析JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('解析响应JSON失败:', e);
      return NextResponse.json(
        { error: '无法解析API响应', message: responseText.substring(0, 500) }, 
        { status: 500, headers }
      );
    }
    
    // 成功返回
    return NextResponse.json(data, { status: response.status, headers });
  } catch (error) {
    // 详细记录错误
    console.error('API代理错误:', error);
    console.error('错误堆栈:', error.stack);
    
    return NextResponse.json(
      { 
        error: '代理API错误', 
        message: error.message,
        stack: error.stack
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