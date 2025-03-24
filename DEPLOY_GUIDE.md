# GitHub Pages 部署指南

## 解决部署权限问题

当前部署失败是由于GitHub Actions没有足够的权限来推送到仓库。要解决这个问题，您需要设置部署密钥（Deploy Key）：

### 步骤1：生成SSH密钥对

1. 在本地计算机上打开终端或命令提示符
2. 运行以下命令生成SSH密钥对：
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f github-deploy-key
   ```
   (不要添加密码，直接按Enter)
3. 这将生成两个文件：
   - `github-deploy-key`（私钥）
   - `github-deploy-key.pub`（公钥）

### 步骤2：在GitHub仓库中添加部署密钥

1. 在GitHub上导航到您的仓库
2. 点击 **Settings** > **Deploy keys** > **Add deploy key**
3. 在"Title"字段中输入一个描述性名称，如"GitHub Actions Deploy Key"
4. 在"Key"字段中粘贴`github-deploy-key.pub`文件的内容
5. 勾选"Allow write access"选项
6. 点击"Add key"保存

### 步骤3：在GitHub仓库中添加密钥

1. 在GitHub上导航到您的仓库
2. 点击 **Settings** > **Secrets and variables** > **Actions**
3. 点击"New repository secret"
4. 在"Name"字段中输入`DEPLOY_KEY`
5. 在"Value"字段中粘贴`github-deploy-key`私钥文件的全部内容
6. 点击"Add secret"保存

完成这些步骤后，GitHub Actions将能够使用这个部署密钥来推送到gh-pages分支，从而成功部署您的网站。

## 其他可能的问题

如果设置部署密钥后仍然遇到问题，请检查以下几点：

1. 确保仓库设置中已启用GitHub Pages，并且选择了正确的分支（gh-pages）
2. 检查是否有任何文件超过GitHub的文件大小限制
3. 确保工作流文件中的分支名称与您的实际分支名称匹配

## 参考资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [JamesIves/github-pages-deploy-action 文档](https://github.com/JamesIves/github-pages-deploy-action)