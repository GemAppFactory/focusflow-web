# FocusFlow Web 部署指南

## 📦 项目已准备就绪！

你的 FocusFlow Web 版本已经配置完成，包含：
- ✅ 纯 Web 代码（移除了桌面应用特定功能）
- ✅ PWA 支持（可安装到桌面）
- ✅ Vercel 优化配置
- ✅ 圆角图标和 Favicon
- ✅ Git 仓库已初始化

---

## 🚀 部署步骤（10分钟完成）

### 步骤 1：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名称：`focusflow-web`
3. 设置为 **Public**（公开）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

### 步骤 2：推送代码到 GitHub

在终端中运行（已经在 focusflow-web 目录）：

```bash
git remote add origin https://github.com/你的用户名/focusflow-web.git
git branch -M main
git push -u origin main
```

**替换 `你的用户名` 为你的 GitHub 用户名！**

### 步骤 3：部署到 Vercel

1. 打开 https://vercel.com/signup
2. 选择 "Continue with GitHub" 登录
3. 授权 Vercel 访问你的 GitHub
4. 点击 "Import Project"
5. 找到 `focusflow-web` 仓库，点击 "Import"
6. 保持默认设置，点击 "Deploy"
7. 等待 2-3 分钟，部署完成！

你会得到一个临时域名，类似：`focusflow-web.vercel.app`

### 步骤 4：绑定自定义域名 focusflow.io

#### 4.1 在域名注册商配置 DNS

1. 登录你购买 focusflow.io 的网站（Namecheap/GoDaddy/阿里云等）
2. 找到 DNS 设置
3. 添加以下记录：

**记录 1（A 记录）：**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `3600`

**记录 2（CNAME 记录）：**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `3600`

#### 4.2 在 Vercel 添加域名

1. 在 Vercel 项目页面，点击 "Settings"
2. 点击左侧 "Domains"
3. 输入 `focusflow.io`，点击 "Add"
4. 输入 `www.focusflow.io`，点击 "Add"
5. 等待 DNS 生效（5-30分钟）

完成后，你的网站就可以通过 https://focusflow.io 访问了！

---

## 🎉 部署完成后

### 自动部署

以后每次你修改代码并推送到 GitHub：

```bash
git add .
git commit -m "更新说明"
git push
```

Vercel 会自动检测并重新部署，无需手动操作！

### 测试 PWA 功能

1. 在 Chrome/Edge 浏览器打开你的网站
2. 地址栏右侧会出现"安装"图标
3. 点击安装，FocusFlow 就会像桌面应用一样运行！

---

## 📝 常见问题

### Q: 域名还没买怎么办？
A: 可以先用 Vercel 提供的免费域名（xxx.vercel.app），等买好域名再绑定。

### Q: 部署失败怎么办？
A: 检查 Vercel 的构建日志，通常是依赖安装问题。Vercel 会自动安装 package.json 中的依赖。

### Q: 如何更新网站？
A: 修改代码后，git push 到 GitHub，Vercel 会自动部署。

### Q: 国内访问慢怎么办？
A: Vercel 在国内可能较慢，可以考虑：
  - 使用 Cloudflare CDN 加速
  - 迁移到阿里云 OSS + CDN
  - 使用 Netlify（备选方案）

---

## 🔧 下一步优化建议

1. **添加 Google Analytics** - 了解用户使用情况
2. **配置环境变量** - 在 Vercel 设置 API Keys
3. **添加自定义 404 页面**
4. **优化 SEO** - 添加 meta 标签
5. **添加 sitemap.xml**

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Vercel 文档：https://vercel.com/docs
2. 查看构建日志找到错误信息
3. 检查 GitHub 仓库是否正确推送

---

**祝部署顺利！🎊**
