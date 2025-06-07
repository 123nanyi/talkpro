const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 在开发环境中代理API请求到GPTsAPI
  app.use(
    '/api/openai-proxy',
    createProxyMiddleware({
      target: 'https://api.gptsapi.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api/openai-proxy': '/v1/chat/completions',
      },
      onProxyReq: function(proxyReq, req, res) {
        // 添加授权头
        proxyReq.setHeader('Authorization', 'Bearer sk-W02fb9fdf014fb8152fa2d61f083ba9b86bd5a9535c4c17W');
        
        // 如果请求体为空，则使用默认值
        if (!req.body || Object.keys(req.body).length === 0) {
          // 设置默认请求体
          const defaultBody = {
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: '你是一个有用的助手'
              },
              {
                role: 'user',
                content: '你好'
              }
            ],
            temperature: 0.7
          };
          
          // 转换为字符串
          const bodyData = JSON.stringify(defaultBody);
          
          // 设置内容长度
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          
          // 写入请求体
          proxyReq.write(bodyData);
        }
      },
      onProxyRes: function(proxyRes, req, res) {
        console.log('代理响应状态:', proxyRes.statusCode);
      },
      onError: function(err, req, res) {
        console.error('代理错误:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ error: '代理请求失败', message: err.message }));
      }
    })
  );
}; 