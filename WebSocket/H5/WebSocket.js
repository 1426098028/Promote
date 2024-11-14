class Socket extends EventTarget {
    // WebSocket 实例
    ws = null;
    // 是否主动关闭连接 主动不进行重新连接和心跳检测
    Passive = true;
    // 是否开启心跳检测
    StartJump = true;
    // wss 或者 ws
    Url = '';
    // 阈值
    Time = 1000

    HeartbeatMessage = '心跳检测'
    // 心跳检测频率
    HeartBeatTime = this.Time * 5
    ClearHeartBeatTime = null
    // 重新连接频率
    ReconnectTime = this.Time * 3
    ClearReconnectTime = null
    // 重新次数 默认无限次
    ReconnectFrequency = null

    constructor(Config) {
        super()
        this.Config = Config;
        this.Url = Config.Url
        this.HeartBeatTime = this.Time * Config.HeartBeatTime || this.HeartBeatTime
        this.ReconnectTime = this.Time * Config.ReconnectTime || this.ReconnectTime
        this.ReconnectFrequency = Config.ReconnectFrequency || this.ReconnectFrequency
        this.HeartbeatMessage = Config.HeartbeatMessage || this.HeartbeatMessage
        this.Passive = Config.Passive || this.Passive
        this.StartJump = Config.StartJump || this.StartJump
        this.Time = Config.Time || this.Time
        this.connectSocket()
    }
    // 开启连接
    connectSocket() {
        this.ReconnectFrequency == 0 && (this.ReconnectFrequency = this.Config.ReconnectFrequency)
        !this.Passive && (this.Passive = true)
        if (this.ws) return false
        try {
            this.ws = new WebSocket(this.Url)
            this.dispatchEvent(new CustomEvent('onConnect'));

        } catch (error) {
            console.log(error)
            this.StartReconnect()
        }
        // 连接成功后的回调函数
        this.ws.onopen = (event) => {
            this.Passive = true
            this.StartJump && this.StartHeartBeat()
            this.ReconnectFrequency = this.Config.ReconnectFrequency
            this.dispatchEvent(new CustomEvent('onOpen', { detail: event }));
        }
        //  接收服务器发送的信息
        this.ws.onmessage = (event) => {
            this.dispatchEvent(new CustomEvent('onMessage', { detail: event.data }));
        }
        // 连接关闭后的回调函数
        this.ws.onclose = (event) => {
            this.Passive && this.StartReconnect()
            this.ws = null
            this.dispatchEvent(new CustomEvent('onClose', { detail: event }));
        };
        // 连接失败后的回调函数
        this.ws.onerror = (error) => {
            this.ws = null
            this.dispatchEvent(new CustomEvent('onError', { detail: event }));
        };

    }

    // 连接中
    onConnect(callback) {
        this.addEventListener('onConnect', callback,)
    }
    // 重连中
    onReconnect(callback) {
        this.addEventListener('onReconnect', callback,)
    }

    // 连接成功
    onOpen(callback) {
        this.addEventListener('onOpen', callback,)
    }
    // 接收服务器发送的消息
    onMessage(callback) {
        this.addEventListener('onMessage', callback,)
    }
    // 客户端发送消息到服务器上
    onSend(data) {
        try {
            this.ws.readyState === WebSocket.OPEN && this.ws.send(data)
        } catch (error) {
            console.log('请连接')
        }
    }
    // 关闭当前链接
    onDisconnect(callback) {
        try {
            this.Passive = false
            this.StopHeartBeat()
            this.EndReconnect()
            this.ws.close()
            this.ws && this.close()
        } catch (error) {
            console.log('已关闭')
        }
    }
    //  连接关闭
    onClose(callback) {
        this.addEventListener('onClose', callback,)
    }
    //  连接失败
    onError(callback) {
        this.addEventListener('onError', callback,)
    }



    // 开始心跳检测
    StartHeartBeat(HeartbeatMessage = this.HeartbeatMessage) {
        this.StopHeartBeat()
        this.ClearHeartBeatTime = setInterval(() => {
            this.ws?.readyState === WebSocket.OPEN && this.onSend(HeartbeatMessage)
        }, this.HeartBeatTime)
    }
    // 停止心跳检测
    StopHeartBeat() {
        clearInterval(this.ClearHeartBeatTime)
    }

    // 开始重连
    StartReconnect() {
        this.EndReconnect()
        const ReconnectFrequency = this.ReconnectFrequency === null
        this.dispatchEvent(new CustomEvent('onReconnect', { detail: { ReconnectFrequency: this.ReconnectFrequency, msg: !ReconnectFrequency ? `重连剩余${this.ReconnectFrequency}次` : '重连中' } }));
        if (!ReconnectFrequency && --this.ReconnectFrequency < 1) return false;
        this.ClearReconnectTime = setTimeout(() => {
            this.connectSocket()
        }, this.ReconnectTime)
    }
    // 结束重连
    EndReconnect() {
        clearTimeout(this.ClearReconnectTime)
    }
}

export default Socket
