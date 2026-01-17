# Firebase 配置指南 / Firebase Setup Guide

## 中文说明

### 1. 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"或选择现有项目
3. 按照向导完成项目创建

### 2. 启用 Google 登录

1. 在 Firebase Console 中，进入 **Authentication** > **Sign-in method**
2. 点击 **Google** 提供商
3. 启用开关并保存
4. 记下你的项目支持邮箱

### 3. 创建 Firestore 数据库

1. 在 Firebase Console 中，进入 **Firestore Database**
2. 点击"创建数据库"
3. 选择"生产模式"或"测试模式"（建议先用测试模式）
4. 选择数据库位置（建议选择离用户最近的区域）

### 4. 配置 Firestore 安全规则

在 Firestore Database > 规则 中，粘贴以下规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户只能访问自己的数据
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. 启用 Firebase Storage（用于头像上传）

1. 在 Firebase Console 中，进入 **Storage**
2. 点击"开始使用"
3. 选择"生产模式"或"测试模式"
4. 选择存储位置（与 Firestore 相同区域）

### 6. 配置 Storage 安全规则

在 Storage > 规则 中，粘贴以下规则：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 用户头像：只能上传自己的头像
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true; // 所有人可以查看头像
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // 最大 5MB
                   && request.resource.contentType.matches('image/.*'); // 只允许图片
    }
  }
}
```

### 7. 获取 Firebase 配置

1. 在 Firebase Console 中，点击项目设置（齿轮图标）
2. 滚动到"您的应用"部分
3. 如果还没有 Web 应用，点击 **</>** 图标添加
4. 复制配置对象中的值

### 6. 配置环境变量

1. 在项目根目录创建 `.env` 文件
2. 复制 `.env.example` 的内容到 `.env`
3. 填入从 Firebase 获取的配置值：

```env
VITE_FIREBASE_API_KEY=你的_api_key
VITE_FIREBASE_AUTH_DOMAIN=你的项目id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=你的项目id
VITE_FIREBASE_STORAGE_BUCKET=你的项目id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=你的_sender_id
VITE_FIREBASE_APP_ID=你的_app_id
```

### 7. 安装依赖并运行

```bash
# 修复 npm 权限问题（如果需要）
sudo chown -R $(whoami) ~/.npm

# 安装 Firebase
npm install firebase

# 运行开发服务器
npm run dev
```

### 8. 部署到 Vercel

1. 在 Vercel 项目设置中，进入 **Environment Variables**
2. 添加所有 `VITE_FIREBASE_*` 环境变量
3. 重新部署项目

---

## English Instructions

### 1. Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing one
3. Follow the wizard to complete project creation

### 2. Enable Google Sign-In

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Enable the toggle and save
4. Note your project support email

### 3. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Production mode" or "Test mode" (test mode recommended for start)
4. Select database location (choose closest to your users)

### 4. Configure Firestore Security Rules

In Firestore Database > Rules, paste these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Enable Firebase Storage (for avatar uploads)

1. In Firebase Console, go to **Storage**
2. Click "Get started"
3. Choose "Production mode" or "Test mode"
4. Select storage location (same region as Firestore)

### 6. Configure Storage Security Rules

In Storage > Rules, paste these rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User avatars: users can only upload their own avatars
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true; // Everyone can view avatars
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches('image/.*'); // Images only
    }
  }
}
```

### 7. Get Firebase Configuration

1. In Firebase Console, click project settings (gear icon)
2. Scroll to "Your apps" section
3. If you don't have a Web app yet, click **</>** icon to add one
4. Copy the values from the config object

### 6. Configure Environment Variables

1. Create a `.env` file in project root
2. Copy contents from `.env.example` to `.env`
3. Fill in the values from Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 7. Install Dependencies and Run

```bash
# Fix npm permissions if needed
sudo chown -R $(whoami) ~/.npm

# Install Firebase
npm install firebase

# Run development server
npm run dev
```

### 8. Deploy to Vercel

1. In Vercel project settings, go to **Environment Variables**
2. Add all `VITE_FIREBASE_*` environment variables
3. Redeploy the project

---

## 数据结构 / Data Structure

### Users Collection

```
users/{userId}/
  ├── tasks/{taskId}
  │   ├── id: string
  │   ├── name: string
  │   ├── tag: string
  │   ├── tagColor: string
  │   ├── duration: number
  │   ├── lastActive: Timestamp
  │   ├── priority: 'low' | 'medium' | 'high'
  │   ├── completed: boolean
  │   └── userId: string
  │
  ├── settings/preferences
  │   ├── language: 'en' | 'zh'
  │   ├── theme: 'light' | 'dark'
  │   └── updatedAt: Timestamp
  │
  └── profile/info
      ├── uid: string
      ├── email: string
      ├── displayName: string
      ├── photoURL: string
      ├── bio: string
      └── updatedAt: Timestamp
```

### Storage Structure

```
avatars/{userId}/
  └── {timestamp}_{filename}.jpg/png/etc
```

## 常见问题 / FAQ

### Q: 为什么需要 Google 登录？
A: Google 登录提供安全的用户认证，确保每个用户只能访问自己的数据。

### Q: 数据存储在哪里？
A: 数据存储在 Google Cloud Firestore 中，这是一个安全、可扩展的 NoSQL 数据库。

### Q: 未登录时数据会丢失吗？
A: 不会。未登录时数据保存在浏览器的 localStorage 中。登录后会自动同步到云端。

### Q: Why do I need Google Sign-In?
A: Google Sign-In provides secure user authentication and ensures each user can only access their own data.

### Q: Where is the data stored?
A: Data is stored in Google Cloud Firestore, a secure and scalable NoSQL database.

### Q: Will I lose data when not logged in?
A: No. When not logged in, data is saved in browser localStorage. After login, it syncs to the cloud.
