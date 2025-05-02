# MoveManifest/index.js

## 概述

该文件定义了一个 Vite 插件 `MoveManifest`，用于在构建过程中生成并移动 `manifest.json` 文件。

## 主要功能

- **Manifest 配置**: 定义了默认的 `manifest.json` 配置。
- **插件逻辑**: 在构建过程中动态生成 `manifest.json` 文件，并将其写入 `dist` 目录。
- **文件处理**: 动态读取 `assets` 和 `icons` 目录中的文件，并将其路径写入 `manifest.json`。
