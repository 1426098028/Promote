const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// 使用cors中间件处理跨域
app.use(cors());
// 中间件解析JSON请求体
app.use(express.json());
// 引入静态资源
app.use(express.static('public'));

// 定义一个简单的GET请求处理程序
app.get('/api/NodeExpress', (req, res) => {
    res.json({
        "name": "PWA",
        "short_name": new Date(),
        "start_url": "/",
        "icons": [
            {
                "src": "images/logo.png",
                "sizes": "144x144",
                "type": "image/png"
            }
        ],
        "background_color": "#fff",
        "theme_color": "#fff",
        "display": "standalone"
    }
    );
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
