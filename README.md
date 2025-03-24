# 任文浩的个人网站

这是一个使用HTML、CSS和JavaScript构建的个人网站项目，展示个人简历、摄影作品和智能体项目。

## 项目结构

- `index.html` - 网站主页
- `resume.html` - 个人简历页面
- `photos.html` - 摄影作品集主页
- `photos-*.html` - 各类摄影作品子页面
- `agents.html` - 智能体项目页面
- `styles/` - CSS样式文件
- `js/` - JavaScript脚本文件
- `images/` - 图片资源文件

## 部署说明

### 使用Git LFS管理大文件

本项目使用Git LFS (Large File Storage)来管理大型二进制文件，特别是图片文件。在克隆或上传项目前，请确保已安装Git LFS。

```bash
# 安装Git LFS
# Windows (使用Chocolatey)
choco install git-lfs

# macOS (使用Homebrew)
brew install git-lfs

# 在项目中启用Git LFS
git lfs install
```

### 上传到GitHub

1. 确保已安装Git和Git LFS
2. 初始化Git仓库（如果尚未初始化）
   ```bash
   git init
   git lfs install
   ```
3. 添加文件到暂存区
   ```bash
   git add .
   ```
4. 提交更改
   ```bash
   git commit -m "Initial commit"
   ```
5. 添加远程仓库
   ```bash
   git remote add origin <你的GitHub仓库URL>
   ```
6. 推送到GitHub
   ```bash
   git push -u origin main
   ```

### 常见问题解决

如果上传过程中遇到问题：

1. **文件过大**：确保使用Git LFS管理大文件，或考虑压缩图片
2. **上传超时**：尝试分批上传，或使用更稳定的网络连接
3. **权限问题**：检查GitHub仓库权限设置

## 本地开发

直接在浏览器中打开`index.html`文件即可预览网站。

## 许可

版权所有 © 任文浩