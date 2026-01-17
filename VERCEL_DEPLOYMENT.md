# Vercel 部署更新指南 / Vercel Deployment Update Guide

## 🚀 快速部署步骤 / Quick Deployment Steps

### 1. 提交代码到 Git

```bash
# 1. 添加所有更改
git add .

# 2. 提交更改
git commit -m "Update to Nextly with Firebase authentication

- Rebrand from FocusFlow to Nextly
- Add Firebase authentication with Google Sign-In
- Add user profile management with avatar upload
- Add Firestore data sync for tasks and settings
- Optimize Analytics page with 2-hour AI insight cache
- Update time distribution chart to use task names
- Add privacy protections (remove User ID display)
- Keep AI config in localStorage only

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 3. 推送到远程仓库
git push origin main
```

### 2. 配置 Vercel 环境变量

在 Vercel 项目设置中添加 Firebase 环境变量：

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 进入 **Settings** > **Environment Variables**
4. 添加以下变量：

```
VITE_FIREBASE_API_KEY=你的_api_key
VITE_FIREBASE_AUTH_DOMAIN=你的项目id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=你的项目id
VITE_FIREBASE_STORAGE_BUCKET=你的项目id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=你的_sender_id
VITE_FIREBASE_APP_ID=你的_app_id
```

**重要**:
- 所有变量都要添加到 **Production**, **Preview**, 和 **Development** 环境
- 点击 **Save** 保存每个变量

### 3. 触发重新部署

#### 方法 A: 自动部署（推荐）
推送代码后，Vercel 会自动检测并部署：
```bash
git push origin main
```

#### 方法 B: 手动触发
1. 访问 Vercel Dashboard
2. 进入您的项目
3. 点击 **Deployments** 标签
4. 点击右上角的 **Redeploy** 按钮
5. 选择 **Use existing Build Cache** 或 **Rebuild**

#### 方法 C: 使用 Vercel CLI
```bash
# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 登录
vercel login

# 部署到生产环境
vercel --prod
```

## 📋 详细步骤说明 / Detailed Instructions

### 步骤 1: 准备 Firebase 配置

#### 1.1 获取 Firebase 配置
1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 选择您的项目
3. 点击项目设置（齿轮图标）
4. 滚动到 "您的应用" 部分
5. 复制配置值

#### 1.2 创建本地 .env 文件（用于本地测试）
```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件，填入您的 Firebase 配置
```

**注意**: `.env` 文件已在 `.gitignore` 中，不会被提交到 Git

### 步骤 2: 提交代码

#### 2.1 检查更改
```bash
git status
```

#### 2.2 添加文件
```bash
# 添加所有更改
git add .

# 或者选择性添加
git add App.tsx
git add components/
git add services/
git add firebase.ts
# ... 等等
```

#### 2.3 提交
```bash
git commit -m "Update to Nextly with Firebase authentication

Major updates:
- Rebrand to Nextly
- Add Firebase authentication
- Add user profile management
- Add Firestore data sync
- Optimize Analytics page
- Privacy improvements

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

#### 2.4 推送
```bash
git push origin main
```

### 步骤 3: 配置 Vercel

#### 3.1 添加环境变量

访问: `https://vercel.com/[你的用户名]/[项目名]/settings/environment-variables`

对于每个环境变量：
1. **Key**: 输入变量名（如 `VITE_FIREBASE_API_KEY`）
2. **Value**: 输入对应的值
3. **Environments**: 选择所有环境（Production, Preview, Development）
4. 点击 **Save**

**必需的环境变量**:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

#### 3.2 验证配置
在 Environment Variables 页面，您应该看到所有 6 个变量都已添加。

### 步骤 4: 部署

#### 4.1 自动部署
推送代码后，Vercel 会自动：
1. 检测到新的提交
2. 开始构建
3. 运行 `npm install`
4. 运行 `npm run build`
5. 部署到生产环境

#### 4.2 监控部署
1. 访问 Vercel Dashboard
2. 进入 **Deployments** 标签
3. 查看最新的部署状态

部署状态：
- 🟡 **Building** - 正在构建
- 🟢 **Ready** - 部署成功
- 🔴 **Error** - 部署失败

#### 4.3 查看部署日志
如果部署失败：
1. 点击失败的部署
2. 查看 **Build Logs**
3. 检查错误信息

### 步骤 5: 验证部署

#### 5.1 访问网站
```
https://你的项目名.vercel.app
```

#### 5.2 测试功能
- [ ] 页面正常加载
- [ ] 标题显示 "Nextly"
- [ ] 欢迎屏幕显示正确的标语
- [ ] Google 登录按钮显示
- [ ] 点击登录可以正常登录
- [ ] 登录后可以看到个人资料
- [ ] 任务可以正常创建和同步
- [ ] Analytics 页面正常显示

## 🔧 常见问题 / Troubleshooting

### 问题 1: 构建失败 - Firebase 未定义

**错误信息**:
```
ReferenceError: firebase is not defined
```

**解决方案**:
1. 确认 `firebase` 已在 `package.json` 中
2. 运行 `npm install firebase`
3. 重新提交并推送

### 问题 2: 环境变量未生效

**症状**:
- Firebase 初始化失败
- 控制台显示 "undefined" 错误

**解决方案**:
1. 检查环境变量名称是否正确（必须以 `VITE_` 开头）
2. 确认所有环境变量都已添加
3. 在 Vercel 中重新部署（Redeploy）

### 问题 3: 登录后白屏

**可能原因**:
- Firebase 配置错误
- Firestore 规则未设置

**解决方案**:
1. 检查 Firebase Console 中的配置
2. 确认 Firestore 安全规则已设置
3. 检查浏览器控制台的错误信息

### 问题 4: 部署成功但功能异常

**检查清单**:
- [ ] 清除浏览器缓存
- [ ] 检查 Firebase 配置是否正确
- [ ] 检查 Firestore 规则
- [ ] 检查 Storage 规则
- [ ] 查看浏览器控制台错误

## 📊 部署后检查清单 / Post-Deployment Checklist

### 基本功能
- [ ] 网站可以访问
- [ ] 页面标题正确（Nextly）
- [ ] 欢迎屏幕显示正确
- [ ] 深色/浅色主题切换正常
- [ ] 中英文切换正常

### 认证功能
- [ ] Google 登录按钮显示
- [ ] 可以正常登录
- [ ] 登录后显示用户头像
- [ ] 可以访问个人资料页面
- [ ] 可以上传头像
- [ ] 可以修改显示名称

### 数据同步
- [ ] 创建任务后刷新页面，任务仍在
- [ ] 在另一个设备登录，可以看到相同的任务
- [ ] 修改任务后，其他设备可以看到更新
- [ ] 设置（语言、主题）可以跨设备同步

### Analytics 功能
- [ ] Analytics 页面正常显示
- [ ] 环形图显示任务名称（不是标签）
- [ ] AI 洞察显示
- [ ] 刷新页面，AI 洞察保持不变（2小时内）

## 🔄 更新流程 / Update Workflow

### 日常更新流程
```bash
# 1. 修改代码
# 2. 本地测试
npm run dev

# 3. 提交更改
git add .
git commit -m "描述更改内容"

# 4. 推送到 GitHub
git push origin main

# 5. Vercel 自动部署
# 等待几分钟，部署完成
```

### 紧急回滚
如果新部署有问题：
1. 访问 Vercel Dashboard
2. 进入 **Deployments**
3. 找到之前正常的部署
4. 点击 **...** > **Promote to Production**

## 📱 自定义域名（可选）

### 添加自定义域名
1. 访问 Vercel Dashboard
2. 进入 **Settings** > **Domains**
3. 点击 **Add**
4. 输入您的域名
5. 按照指示配置 DNS

### DNS 配置
在您的域名提供商处添加：
```
Type: CNAME
Name: www (或 @)
Value: cname.vercel-dns.com
```

## 🎉 完成！

部署完成后，您的 Nextly 应用将在以下地址可用：
- **Vercel 域名**: `https://你的项目名.vercel.app`
- **自定义域名**（如果配置）: `https://你的域名.com`

所有用户都可以：
- ✅ 使用 Google 登录
- ✅ 管理个人资料
- ✅ 创建和同步任务
- ✅ 查看 Analytics
- ✅ 跨设备访问数据

## 📞 需要帮助？

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台
3. 查看 Firebase Console 的使用情况
4. 参考 `FIREBASE_SETUP.md` 文档
