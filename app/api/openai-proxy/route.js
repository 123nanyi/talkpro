import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 解析请求体
    const requestData = await request.json();
    
    // API密钥
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || 
                  process.env.REACT_APP_OPENAI_API_KEY || 
                  'sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W';
    
    console.log('代理API收到请求:', {
      url: 'https://api.gptsapi.net/v1/chat/completions',
      model: requestData.model,
      messageCount: requestData.messages?.length || 0
    });
    
    // 发送请求到OpenAI API
    const response = await fetch('https://api.gptsapi.net/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'TalkPro/1.0'
      },
      body: JSON.stringify(requestData)
    });

    // 记录API响应状态
    console.log('OpenAI API响应状态码:', response.status);
    
    // 获取响应数据
    const data = await response.json();
    console.log('OpenAI API响应数据:', 
      data.error ? { error: data.error } : { success: true, choices: data.choices?.length || 0 }
    );
    
    // 返回响应
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('代理API错误:', error);
    return NextResponse.json(
      { error: '代理服务器错误', message: error.message },
      { status: 500 }
    );
  }
}

// 设置CORS头
export const config = {
  api: {
    bodyParser: true,
  },
}; 