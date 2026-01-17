# 用户个人资料功能更新 / User Profile Feature Update

## 新增功能 / New Features

### 1. 用户个人资料页面 / User Profile Page

现在用户可以：
- ✅ 上传和更换头像（最大 5MB）
- ✅ 修改显示名称
- ✅ 添加个人简介
- ✅ 所有更改自动同步到 Firebase

Now users can:
- ✅ Upload and change avatar (max 5MB)
- ✅ Edit display name
- ✅ Add personal bio
- ✅ All changes automatically sync to Firebase

### 2. 改进的登录界面 / Improved Login UI

- ✅ 下拉菜单显示用户信息
- ✅ 快速访问个人资料设置
- ✅ 更大的头像显示
- ✅ 优雅的退出登录选项

- ✅ Dropdown menu showing user info
- ✅ Quick access to profile settings
- ✅ Larger avatar display
- ✅ Elegant sign-out option

### 3. Firebase Storage 集成 / Firebase Storage Integration

- ✅ 头像存储在 Firebase Storage
- ✅ 安全规则确保用户只能上传自己的头像
- ✅ 自动文件大小和类型验证
- ✅ 所有人可以查看头像（公开访问）

- ✅ Avatars stored in Firebase Storage
- ✅ Security rules ensure users can only upload their own avatars
- ✅ Automatic file size and type validation
- ✅ Everyone can view avatars (public access)

## 数据同步 / Data Synchronization

### 用户资料数据结构 / User Profile Data Structure

```typescript
interface UserProfile {
  uid: string;              // 用户唯一 ID / User unique ID
  displayName: string;      // 显示名称 / Display name
  email: string;            // 邮箱 / Email
  photoURL: string;         // 头像 URL / Avatar URL
  bio?: string;             // 个人简介 / Bio
  updatedAt: number;        // 更新时间 / Update timestamp
}
```

### Firestore 路径 / Firestore Path

```
users/{userId}/profile/info
```

### Storage 路径 / Storage Path

```
avatars/{userId}/{timestamp}_{filename}
```

## 使用方法 / How to Use

### 访问个人资料 / Access Profile

1. 点击右上角的用户头像
2. 在下拉菜单中选择"Profile Settings"（个人资料）
3. 或者直接点击头像打开菜单

1. Click your avatar in the top-right corner
2. Select "Profile Settings" from the dropdown menu
3. Or click the avatar to open the menu

### 上传头像 / Upload Avatar

1. 在个人资料页面，点击头像
2. 选择图片文件（支持 JPG, PNG, GIF 等）
3. 文件会自动上传并更新

1. On the profile page, click your avatar
2. Select an image file (JPG, PNG, GIF, etc.)
3. File will automatically upload and update

### 编辑信息 / Edit Information

1. 修改显示名称或个人简介
2. 点击"Save Changes"（保存更改）按钮
3. 更改会立即同步到 Firebase

1. Edit display name or bio
2. Click "Save Changes" button
3. Changes sync to Firebase immediately

## 安全性 / Security

### Firestore 安全规则 / Firestore Security Rules

```javascript
match /users/{userId}/profile/info {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

### Storage 安全规则 / Storage Security Rules

```javascript
match /avatars/{userId}/{allPaths=**} {
  allow read: if true; // 公开可读 / Public read
  allow write: if request.auth != null
               && request.auth.uid == userId
               && request.resource.size < 5 * 1024 * 1024 // 最大 5MB / Max 5MB
               && request.resource.contentType.matches('image/.*'); // 仅图片 / Images only
}
```

## 技术实现 / Technical Implementation

### 新增文件 / New Files

1. **views/ProfileView.tsx** - 个人资料页面组件
2. **services/profileService.ts** - 个人资料服务（CRUD 操作）
3. **types.ts** - 添加 UserProfile 接口

### 更新文件 / Updated Files

1. **App.tsx** - 添加 profile 路由和初始化逻辑
2. **components/LoginButton.tsx** - 改进为下拉菜单
3. **firebase.ts** - 添加 Storage 导入
4. **locales.ts** - 添加个人资料翻译
5. **FIREBASE_SETUP.md** - 添加 Storage 配置说明

## 配置步骤 / Setup Steps

### 1. 启用 Firebase Storage

在 Firebase Console 中：
1. 进入 **Storage**
2. 点击"开始使用"
3. 选择存储位置
4. 配置安全规则（见上文）

In Firebase Console:
1. Go to **Storage**
2. Click "Get started"
3. Select storage location
4. Configure security rules (see above)

### 2. 更新代码

代码已经准备好，只需：
1. 安装 Firebase（如果还没有）：`npm install firebase`
2. 配置 `.env` 文件
3. 运行 `npm run dev`

Code is ready, just:
1. Install Firebase (if not yet): `npm install firebase`
2. Configure `.env` file
3. Run `npm run dev`

### 3. 部署到 Vercel

确保在 Vercel 环境变量中包含所有 Firebase 配置。

Make sure all Firebase config is in Vercel environment variables.

## 功能特点 / Features

- ✅ 实时头像预览
- ✅ 拖拽上传支持（点击上传）
- ✅ 文件大小和类型验证
- ✅ 加载状态指示器
- ✅ 保存成功/失败提示
- ✅ 响应式设计
- ✅ 中英文双语支持
- ✅ 优雅的动画效果

- ✅ Real-time avatar preview
- ✅ Click-to-upload support
- ✅ File size and type validation
- ✅ Loading state indicators
- ✅ Save success/error feedback
- ✅ Responsive design
- ✅ Bilingual support (EN/ZH)
- ✅ Smooth animations

## 常见问题 / FAQ

### Q: 头像上传失败怎么办？
A: 检查：
1. 文件大小是否小于 5MB
2. 文件是否为图片格式
3. Firebase Storage 是否已启用
4. Storage 安全规则是否正确配置

### Q: What if avatar upload fails?
A: Check:
1. File size is less than 5MB
2. File is an image format
3. Firebase Storage is enabled
4. Storage security rules are correctly configured

### Q: 个人资料数据存储在哪里？
A:
- 头像文件：Firebase Storage (`avatars/{userId}/`)
- 个人信息：Firestore (`users/{userId}/profile/info`)

### Q: Where is profile data stored?
A:
- Avatar files: Firebase Storage (`avatars/{userId}/`)
- Profile info: Firestore (`users/{userId}/profile/info`)

### Q: 未登录用户能看到个人资料页面吗？
A: 可以访问页面，但会显示"请登录"提示。

### Q: Can non-logged-in users see the profile page?
A: They can access the page but will see a "Please sign in" message.
