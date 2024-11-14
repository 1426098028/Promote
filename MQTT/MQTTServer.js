const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
import { createServer } from "http";
import { Server } from "socket.io";

// 获取本机网络
const os = require('os')
const Ip = os.networkInterfaces()
console.log(Ip)



const httpServer = createServer();
const port = 1883

server.listen(port, function () {
    console.log('server started and listening on port ', port)
});

// 身份验证
aedes.authenticate = function (client, username, password, callback) {
    callback(null, (username === 'user' && password.toString() === '123456'));
}

// 客户端连接
aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
});

// 客户端断开
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
});









const io = new Server(httpServer, {
    // options
});

io.on("connection", (socket) => {
    console.log('Socket连接成功', socket)
});

httpServer.listen(3000);
