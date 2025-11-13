. 创建第一个仓库（Repository）
仓库是代码的 “文件夹”，用于存储项目文件和版本历史。
登录 GitHub 后，点击右上角 “+” 号，选择 “New repository”。
填写信息：
仓库名称（如 my-first-project，用小写和连字符）；
描述（可选，简要说明项目用途）；
勾选 “Initialize this repository with a README”（自动生成说明文件）；
选择许可证（如 MIT，开源项目建议添加）。
点击 “Create repository”，仓库创建完成。
2. 克隆仓库到本地
仓库创建后，需拉取到本地编辑：
在仓库页面点击绿色 “Code” 按钮，复制 HTTPS 链接（如 https://github.com/你的用户名/my-first-project.git）。
打开终端，进入存放项目的文件夹（如 cd Documents/projects），执行：
bash
运行
git clone 复制的链接
此时本地会生成与仓库同名的文件夹，包含所有文件。
3. 提交与推送代码
在本地修改后，需同步到 GitHub 远程仓库，步骤如下：
修改文件：用编辑器（如 VS Code）打开本地仓库文件夹，编辑 README.md 或添加新文件（如 hello.py）。
查看变更：终端中进入仓库目录（cd my-first-project），输入 git status，红色文件为未跟踪的修改。
暂存文件：将需要提交的文件加入暂存区（“待提交清单”）：
bash
运行
git add 文件名  # 提交单个文件，如 git add hello.py
git add .      # 提交所有变更（推荐）
提交到本地仓库：添加提交信息（描述修改内容，必填）：
bash
运行
git commit -m "feat: 添加hello.py文件"  # 格式建议：类型: 描述（如fix: 修复登录bug）
推送到远程仓库：将本地提交同步到 GitHub：
bash
运行
git push origin main  # main是默认主分支名
首次推送可能需要输入 GitHub 账号密码（或使用令牌，见小贴士）。
三、协作核心：分支与 Pull Request
1. 分支管理（避免直接修改主分支）
分支是并行开发的关键，比如用分支开发新功能，完成后再合并到主分支：
创建并切换到新分支（如 feature/login）：
bash
运行
git checkout -b feature/login
在新分支上修改代码，完成后提交并推送：
bash
运行
git add .
git commit -m "完成登录功能开发"
git push origin feature/login  # 推送新分支到远程
2. 发起 Pull Request（PR，请求合并）
当分支功能完成，需请求合并到主分支：
打开 GitHub 仓库页面，会自动提示 “Compare & pull request”，点击进入。
填写 PR 标题和描述（说明修改内容、解决的问题），点击 “Create pull request”。
团队成员可在 PR 页面评论、审查代码，确认无误后点击 “Merge pull request” 完成合并。