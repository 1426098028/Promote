# 配置

## 创建 systemd 服务文件
###  ProjectStart 任意名字

```bash
sudo vim /etc/systemd/system/ProjectStart.service

```


## 编辑服务文件
### /home/ubuntu/YLMProject/*.sh 需要执行的文件
```bash

[Unit]
Description=Run all .sh scripts at startup

[Service]

Type=simple
# 获取 nvm 安装路径
Environment="NVM_DIR=/home/ubuntu/.nvm"
# 启动 nvm 后，启动.sh文件
ExecStartPre=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh'
# 执行所有 .sh 文件
ExecStart=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh && find /home/ubuntu/YLMProject -type f -name "*.sh" -exec bash {} \;'

Restart=on-failure
[Install]

WantedBy=multi-user.target

```









## 重新加载 systemd 服务配置


```bash
sudo systemctl daemon-reload

```

## 启用 开启开机启动服务
```bash
sudo systemctl enable ProjectStart.service
sudo systemctl start ProjectStart.service

```

## 重新启动服务
```bash
sudo systemctl restart ProjectStart.service
```

## 查看服务情况
```bash
journalctl -u ProjectStart.service

```

## 清除日志 
```bash
sudo journalctl --rotate && sudo journalctl --vacuum-time=1s
```
