# 配置

## 创建 systemd 服务文件
###  ProjectStart 任意名字

```bash
sudo vim /etc/systemd/system/ProjectStart.service

```

### 开始辅助测试
## 设置文件权限
```bash
sudo find /home/ubuntu/YLMProject/ -path "*/.git" -prune -o -exec sudo chmod 777 {} + ;
```

## 去除 Windows 换行符
```bash
sed -i 's/\r//' ./start.sh
```

## 查找并且执行.sh文件
```bash
find /home/ubuntu/YLMProject -type f -name "*.sh" ! -path "*/node_modules/*" ! -path "*/.git/*" | while read -r script_file; do sed -i "s/\r//" "$script_file"; echo "正在执行: $script_file"; bash "$script_file" & done
```
### 结束辅助测试

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
ExecStartPre=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh && sudo find /home/ubuntu/YLMProject/ -path "*/.git" -prune -o -exec sudo chmod 777 {} + ;'
# 执行所有 .sh 文件

# 无执行记录
# ExecStart=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh; TARGET_DIR="/home/ubuntu/YLMProject"; mkdir -p "$TARGET_DIR/logs"; find "$TARGET_DIR" -type f -name "*.sh" ! -path "*/node_modules/*" ! -path "*/.git/*" | while read -r script_file; do sed -i "s/\r//" "$script_file"; echo "正在执行: $script_file"; bash "$script_file" >> "$TARGET_DIR/logs/$(basename "$script_file").log" 2>&1 & done'

# 有执行记录
ExecStart=/bin/bash -c 'source /home/ubuntu/.nvm/nvm.sh; TARGET_DIR="/home/ubuntu/YLMProject"; find "$TARGET_DIR" -type f -name "*.sh" ! -path "*/node_modules/*" ! -path "*/.git/*" | while read -r script_file; do sed -i "s/\r//" "$script_file"; echo "正在执行: $script_file"; bash "$script_file" & done'



# 保持服务在后台运行
RemainAfterExit=true
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

## 检查服务状态
```bash
sudo systemctl status ProjectStart.service
```

## 查看服务情况
```bash
journalctl -u ProjectStart.service

```

## 清除日志 
```bash
sudo journalctl --rotate && sudo journalctl --vacuum-time=1s
```
