const WebSocket = require('ws');

// 创建 WebSocket 服务器，监听端口 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('客户端连接成功');

    // 监听客户端消息
    ws.on('message', (message) => {
        console.log(`收到的消息: ${message}`);

        // 发送消息给客户端
        ws.send(`你发送的消息是：${message}`);
    });

    // 处理连接关闭
    ws.on('close', () => {
        console.log('客户端断开连接');
    });

    // 处理错误
    ws.on('error', (error) => {
        console.error(`WebSocket 错误: ${error}`);
    });

    // 向客户端发送欢迎消息
    ws.send('欢迎连接到 WebSocket 服务器');
});

console.log('WebSocket 服务器已启动，监听端口 8080');
