# 品牌更新说明 / Rebranding Update

## 🎨 新品牌 / New Brand

### 名称变更 / Name Change
- **旧名称**: FocusFlow
- **新名称**: Nextly AI

### 新标语 / New Tagline
- **英文**: Your thoughts, organized instantly.
- **中文**: 你的想法，瞬间组织。

## 📝 更新内容 / Changes Made

### 1. 核心文件 / Core Files

#### package.json
```json
{
  "name": "nextly-ai"  // 从 focusflow-web 改为 nextly-ai
}
```

#### index.html
```html
<title>Nextly AI - Your thoughts, organized instantly</title>
```

#### metadata.json
```json
{
  "name": "Nextly AI",
  "description": "Your thoughts, organized instantly. A minimalist productivity app..."
}
```

### 2. 翻译文件 / Localization Files

#### locales.ts - 英文
- `welcome.tagline`: "Your thoughts, organized instantly."
- `assistant.initialMessage`: "Hello! I am your Nextly AI assistant..."
- `settings.about`: "About Nextly AI"
- `settings.aboutDesc`: "Nextly AI is a minimalist productivity app..."
- `settings.welcomeInfo`: "...show Nextly AI to someone new."
- `welcome.continue`: "Start Nextly AI"

#### locales.ts - 中文
- `welcome.tagline`: "你的想法，瞬间组织。"
- `assistant.initialMessage`: "你好！我是你的 Nextly AI 助手..."
- `settings.about`: "关于 Nextly AI"
- `settings.aboutDesc`: "Nextly AI 是一款极简主义生产力应用..."
- `settings.welcomeInfo`: "...向新用户展示 Nextly AI..."
- `welcome.continue`: "开始使用 Nextly AI"

### 3. 文档文件 / Documentation

#### README.md
```markdown
# Nextly AI

**Your thoughts, organized instantly.**
```

## 🔄 保持不变的内容 / Unchanged Content

### localStorage 键名
为了保护用户数据，localStorage 的键名保持不变：
- `focusflow_welcome_seen`
- `focusflow_tasks`
- `focusflow_current_task`
- `focusflow_timer`
- `focusflow_status`
- `focusflow_language`
- `focusflow_theme`

**原因**: 改变这些键名会导致用户丢失所有本地数据。

### Firebase 数据结构
Firebase 中的数据结构保持不变：
- `users/{userId}/tasks/`
- `users/{userId}/settings/`
- `users/{userId}/profile/`

**原因**: 已有用户的数据不受影响。

## 🎯 品牌理念 / Brand Philosophy

### 为什么改名？ / Why Rebrand?

**FocusFlow** → **Nextly AI**

1. **更现代**: "Nextly AI" 更符合 AI 时代的产品定位
2. **更直接**: "Your thoughts, organized instantly" 直接传达核心价值
3. **更国际化**: 简洁的名称更容易记忆和传播

### 新标语的含义 / Tagline Meaning

**"Your thoughts, organized instantly."**
- **Your thoughts**: 强调个人化、以用户为中心
- **organized**: 核心功能 - 组织和管理
- **instantly**: 强调效率和即时性

**"你的想法，瞬间组织。"**
- 简洁有力
- 突出速度和效率
- 符合中文表达习惯

## 📊 更新的文件列表 / Updated Files List

### 必须更新的文件 / Required Updates
- ✅ `package.json` - 项目名称
- ✅ `index.html` - 页面标题
- ✅ `metadata.json` - 应用元数据
- ✅ `locales.ts` - 所有品牌相关文本
- ✅ `README.md` - 项目文档

### 可选更新的文件 / Optional Updates
- 📄 `DEPLOYMENT_GUIDE.md`
- 📄 `QUICK_START.md`
- 📄 `IMPLEMENTATION_SUMMARY.md`
- 📄 其他文档文件

## 🚀 部署注意事项 / Deployment Notes

### Vercel 部署
1. 项目名称会自动从 `package.json` 读取
2. 页面标题会显示为 "Nextly AI - Your thoughts, organized instantly"
3. 无需修改环境变量

### 用户体验
- ✅ 现有用户数据完全保留
- ✅ 登录状态不受影响
- ✅ 所有功能正常工作
- ✅ 只是品牌名称和标语改变

## 🎨 视觉识别 / Visual Identity

### 品牌色彩（保持不变）
- 主色调: 蓝色/绿色系
- 深色模式: 终端绿色风格
- 浅色模式: 清新简洁

### 字体（保持不变）
- 主字体: IBM Plex Mono
- 中文字体: Noto Sans SC
- 等宽字体: Space Mono

## 📱 用户通知 / User Communication

### 建议的通知方式

如果需要通知用户品牌更新：

```markdown
🎉 我们更名了！

FocusFlow 现在是 Nextly AI

新标语：Your thoughts, organized instantly.
（你的想法，瞬间组织。）

✅ 您的所有数据和设置都已保留
✅ 所有功能正常工作
✅ 只是一个更好的名字！
```

## 🔍 SEO 更新 / SEO Updates

### 建议更新的内容
1. **网站标题**: Nextly AI - Your thoughts, organized instantly
2. **Meta 描述**: A minimalist productivity app featuring deep focus timers, AI-driven analytics, and seamless task management
3. **关键词**: Nextly AI, productivity, task management, AI assistant, focus timer

## ✅ 验证清单 / Verification Checklist

- [x] package.json 名称已更新
- [x] index.html 标题已更新
- [x] metadata.json 已更新
- [x] 英文翻译已更新
- [x] 中文翻译已更新
- [x] README.md 已更新
- [x] localStorage 键名保持不变（保护用户数据）
- [x] Firebase 结构保持不变（保护用户数据）

## 🎉 总结 / Summary

品牌更新已完成！从 **FocusFlow** 到 **Nextly AI**，我们保持了所有核心功能和用户数据，只是换了一个更现代、更直接的名字和标语。

**新的品牌标识**：
- 名称: Nextly AI
- 标语: Your thoughts, organized instantly. / 你的想法，瞬间组织。
- 定位: AI 驱动的极简生产力工具

欢迎来到 Nextly AI 时代！🚀
