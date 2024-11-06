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
Type=oneshot
ExecStart=/bin/bash -c 'for script in /home/ubuntu/YLMProject/*.sh; do bash "$script"; done'

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
