# 隐私保护更新说明 / Privacy Protection Update

## ✅ 已完成的更改 / Completed Changes

### 1. 移除 User ID 显示 / Removed User ID Display

- ❌ 从个人资料页面移除了 Firebase User ID 显示
- 原因：User ID 是内部标识符，不应该暴露给用户

### 2. 保留 AI 配置（仅本地存储）/ Kept AI Config (Local Storage Only)

- ✅ **保留** AI 模型配置功能
- ✅ API Key 存储在浏览器 localStorage（**不会**发送到服务器）
- ✅ 添加了隐私提示，明确告知用户数据仅存储在本地

## 🔒 数据存储说明 / Data Storage Explanation

### AI 配置数据 / AI Configuration Data

**存储位置**：浏览器 localStorage
**存储内容**：
- API Endpoint
- API Key
- Model Name

**安全性**：
- ✅ 仅存储在用户自己的浏览器中
- ✅ 不会同步到 Firebase
- ✅ 不会发送到我们的服务器
- ✅ 只有用户自己可以访问

**隐私提示**：
在 AI 配置部分添加了明显的隐私提示框：
> 🔒 隐私提示：您的 API 密钥仅存储在浏览器本地，不会发送到我们的服务器。

## 📊 数据存储对比 / Data Storage Comparison

| 数据类型 | 存储位置 | 是否同步 | 可见性 |
|---------|---------|---------|--------|
| 用户任务 | Firebase Firestore | ✅ 跨设备同步 | 仅用户自己 |
| 用户设置 | Firebase Firestore | ✅ 跨设备同步 | 仅用户自己 |
| 用户资料 | Firebase Firestore | ✅ 跨设备同步 | 仅用户自己 |
| 头像图片 | Firebase Storage | ✅ 跨设备同步 | 公开可读 |
| **AI 配置** | **localStorage** | ❌ 仅本地 | **仅当前浏览器** |
| ~~User ID~~ | ~~已移除~~ | - | - |

## 🎯 设计理念 / Design Philosophy

### 为什么 AI 配置存储在本地？

1. **用户控制**
   - API Key 是用户的私人凭证
   - 用户完全控制自己的密钥
   - 不依赖我们的服务器

2. **隐私保护**
   - 我们不收集用户的 API Keys
   - 不会有数据泄露风险
   - 符合隐私最佳实践

3. **灵活性**
   - 用户可以使用任何 AI 服务
   - 不限制特定的 API 提供商
   - 支持自定义端点

### 为什么不同步到 Firebase？

- ❌ API Keys 太敏感，不应该存储在云端
- ❌ 即使加密，也增加了安全风险
- ✅ 本地存储更安全、更私密
- ✅ 用户可以随时清除浏览器数据来删除

## 🔐 安全建议 / Security Recommendations

### 对用户的建议：

1. **不要在公共电脑上保存 API Key**
   - 使用完毕后清除浏览器数据

2. **定期更换 API Key**
   - 如果怀疑泄露，立即更换

3. **使用受限的 API Key**
   - 如果 API 提供商支持，使用权限受限的密钥

4. **不要分享截图**
   - 截图时注意不要暴露 API Key

## 📱 跨设备使用 / Cross-Device Usage

### AI 配置不会跨设备同步

如果您在多个设备上使用 FocusFlow：
- 需要在每个设备上分别配置 AI 设置
- 这是出于安全考虑的设计
- 您的任务、设置、资料会正常同步

### 如何在新设备上配置：

1. 登录您的账号
2. 进入 Settings > AI Model Configuration
3. 重新输入 API 配置
4. 点击保存

## 🛡️ 隐私保护总结 / Privacy Protection Summary

### ✅ 我们做到了：

1. **不收集敏感信息**
   - 不存储 User ID 在界面
   - 不上传 API Keys 到服务器

2. **透明告知**
   - 明确的隐私提示
   - 清楚说明数据存储位置

3. **用户控制**
   - 用户完全控制自己的 API Keys
   - 可以随时删除本地数据

### 🎉 最终效果：

- ✅ User ID 不再显示
- ✅ AI 配置功能保留
- ✅ API Key 仅存储在本地
- ✅ 添加了隐私提示
- ✅ 用户数据安全可控

## 📝 更新的文件 / Updated Files

1. **views/ProfileView.tsx**
   - 移除 User ID 显示

2. **views/Settings.tsx**
   - 保留 AI 配置部分
   - 添加隐私提示框

3. **locales.ts**
   - 添加 `privacyNotice` 和 `localStorageNote` 翻译
   - 保留所有 AI 配置相关翻译

## 🚀 使用方法 / How to Use

### 配置 AI 模型：

1. 进入 **Settings** 页面
2. 展开 **AI Model Configuration** 部分
3. 输入您的配置：
   - API Endpoint
   - API Key
   - Model Name
4. 点击 **Save Configuration**
5. 看到隐私提示，确认数据仅存储在本地

### 查看隐私提示：

在 AI 配置部分会看到黄色提示框：
> 🔒 隐私提示：您的 API 密钥仅存储在浏览器本地，不会发送到我们的服务器。

这确保用户清楚了解数据的存储方式。
