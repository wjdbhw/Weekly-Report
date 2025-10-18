# Git 使用指南

## 1. 前期准备

### 安装 Git
- **Windows**: 下载 [Git for Windows](https://gitforwindows.org/)
- **Mac**: `brew install git` 或下载 [Git for Mac](https://git-scm.com/download/mac)
- **Linux**: `sudo apt install git` (Ubuntu/Debian) 或 `sudo yum install git` (CentOS)

### 配置 Git（第一次使用）
```bash
# 设置用户名和邮箱
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"

# 检查配置
git config --list
```

## 2. Fork 仓库到自己的账户

### 网页端操作步骤：
1. 登录 GitHub，找到想要贡献的仓库
2. 点击右上角的 **"Fork"** 按钮
3. 选择你的账户作为目标位置
4. 等待几秒钟，完成 Fork

## 3. 克隆到本地

```bash
# 克隆你 fork 的仓库到本地
git clone https://github.com/你的用户名/仓库名.git

# 进入项目文件夹
cd 仓库名

# 添加上游仓库（原始仓库，用于同步更新）
git remote add upstream https://github.com/原始作者/仓库名.git

# 查看远程仓库连接
git remote -v
# 应该显示：
# origin    https://github.com/你的用户名/仓库名.git (fetch)
# origin    https://github.com/你的用户名/仓库名.git (push)
# upstream  https://github.com/原始作者/仓库名.git (fetch)
# upstream  https://github.com/原始作者/仓库名.git (push)
```

## 4. 上传新文件到仓库

### 方法一：通过命令行
```bash
# 1. 创建新文件或编辑现有文件
echo "Hello World" > README.md

# 2. 检查当前状态
git status

# 3. 添加文件到暂存区
git add README.md
# 或者添加所有文件
git add .

# 4. 提交更改
git commit -m "添加README文件"

# 5. 推送到GitHub
git push origin main
# 如果默认分支是 master，则使用：
# git push origin master
```

### 方法二：通过 GitHub 网页端
1. 在你的仓库页面点击 **"Add file"** → **"Create new file"**
2. 输入文件名和内容
3. 滚动到页面底部，填写提交信息
4. 选择 **"Commit directly to the main branch"**
5. 点击 **"Commit new file"**

## 5. 完整工作流程示例

```bash
# 场景：想要为某个项目贡献代码

# 1. Fork 仓库（在GitHub网页完成）

# 2. 克隆到本地
git clone https://github.com/你的用户名/项目名.git
cd 项目名

# 3. 创建新分支进行开发
git checkout -b my-new-feature

# 4. 创建或修改文件
echo "# 我的新功能" > new-feature.md

# 5. 查看更改
git status
git diff

# 6. 提交更改
git add new-feature.md
git commit -m "添加新功能文档"

# 7. 推送到你的GitHub仓库
git push origin my-new-feature

# 8. 在GitHub网页创建Pull Request
```

## 6. Git 常用命令大全

### 基础命令
```bash
git init                    # 初始化新仓库
git clone [url]            # 克隆远程仓库
git status                 # 查看状态
git add [file]             # 添加文件到暂存区
git commit -m "消息"       # 提交更改
git push origin [分支名]    # 推送到远程仓库
```

### 分支管理
```bash
git branch                 # 查看分支
git branch [分支名]         # 创建新分支
git checkout [分支名]       # 切换分支
git checkout -b [分支名]    # 创建并切换分支
git merge [分支名]          # 合并分支
git branch -d [分支名]      # 删除分支
```

### 查看信息
```bash
git log                    # 查看提交历史
git log --oneline          # 简洁版历史
git show [commit]          # 显示某次提交的详情
git diff                   # 显示未暂存的更改
git diff --staged          # 显示已暂存的更改
```

### 撤销操作
```bash
git restore [file]         # 撤销工作区的修改
git restore --staged [file] # 撤销暂存区的修改
git reset [commit]         # 回退到指定提交
git commit --amend         # 修改最后一次提交
```

### 同步与更新
```bash
git pull origin [分支名]    # 拉取远程更新
git fetch upstream         # 获取上游仓库更新
git merge upstream/main    # 合并上游更新
```

## 7. 解决常见问题

### 第一次推送时可能需要的设置
```bash
# 如果提示需要设置上游分支
git push --set-upstream origin main

# 或者使用 -u 参数
git push -u origin main
```

### 处理文件冲突
```bash
# 当 git pull 产生冲突时
git status                 # 查看冲突文件
# 手动编辑文件解决冲突
git add [解决后的文件]
git commit -m "解决冲突"
git push
```

## 8. 最佳实践建议

1. **每次开发新功能都创建新分支**
2. **提交信息要清晰明确**
3. **频繁提交，小步前进**
4. **推送前先拉取最新代码**
5. **定期同步上游仓库**

## 9. 快速参考卡片

```
日常开发流程：
1. git pull origin main          # 拉取最新代码
2. git checkout -b feature-xxx   # 创建功能分支
3. 编写代码...                   # 开发功能
4. git add .                     # 添加更改
5. git commit -m "描述"          # 提交更改
6. git push origin feature-xxx   # 推送到远程
7. 在GitHub创建Pull Request      # 请求合并
```

记住这些命令和流程，你就能熟练使用 Git 和 GitHub 进行项目开发了！