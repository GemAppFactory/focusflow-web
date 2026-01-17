# 🚀 快速开始 - 3 步部署到线上

## 当前状态
✅ 项目已配置完成
✅ Git 仓库已初始化
✅ 代码已提交

## 接下来只需 3 步：

### 1️⃣ 创建 GitHub 仓库并推送代码（2分钟）

```bash
# 在终端运行（确保在 focusflow-web 目录）
git remote add origin https://github.com/你的GitHub用户名/focusflow-web.git
git push -u origin main
```

⚠️ **记得替换 `你的GitHub用户名`！**

如果还没有 GitHub 仓库：
1. 访问 https://github.com/new
2. 仓库名：`focusflow-web`
3. 设为 Public
4. 点击 Create

### 2️⃣ 部署到 Vercel（3分钟）

1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择 `focusflow-web` 仓库
5. 点击 "Deploy"

等待 2-3 分钟，完成！

你会得到一个网址：`https://focusflow-web.vercel.app`

### 3️⃣ 绑定域名 focusflow.io（可选，10分钟）

#### 在域名注册商（Namecheap/GoDaddy/阿里云）：

添加 DNS 记录：
- A 记录：`@` → `76.76.21.21`
- CNAME 记录：`www` → `cname.vercel-dns.com`

#### 在 Vercel：

1. 项目 → Settings → Domains
2. 添加 `focusflow.io`
3. 添加 `www.focusflow.io`
4. 等待 DNS 生效（5-30分钟）

---

## ✨ 完成！

你的网站现在可以通过以下方式访问：
- 🌐 Vercel 域名：`https://focusflow-web.vercel.app`
- 🎯 自定义域名：`https://focusflow.io`（配置后）

## 🔄 以后如何更新？

```bash
# 修改代码后
git add .
git commit -m "更新内容"
git push
```

Vercel 会自动重新部署！

---

详细说明请查看 `DEPLOYMENT_GUIDE.md`
