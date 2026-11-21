# 用 GitHub Pages 发布网站

这个站点是纯静态网站，不需要构建工具。发布后，别人可以通过一个公开网址访问。

建议仓库名：`zhongqingyixing-studio`

发布后的网址通常是：

```text
https://<你的 GitHub 用户名>.github.io/zhongqingyixing-studio/
```

---

## 方式 A：网页上传（不用安装 Git，最快）

1. 注册 / 登录 GitHub。
2. 点右上角 `+` → **New repository**。
3. 填写：
   - Repository name：`zhongqingyixing-studio`
   - 选择 **Public**
   - 不要勾选 “Add a README file”
4. 点 **Create repository**。
5. 在空仓库页面点 **uploading an existing file**。
6. 解压 `知情意行-GitHub上传包.zip`，把解压后看到的**所有内容**拖进上传区：
   - `index.html`
   - `assets` 文件夹
   - `404.html`
   - 其他 `.html` 文件
   - `.nojekyll`、`robots.txt`、`README.md`、`GITHUB-PAGES.md`
7. 点 **Commit changes**。
8. 进入仓库的 **Settings → Pages**：
   - Build and deployment → Source：**Deploy from a branch**
   - Branch：**main**（如果仓库默认分支是 `master`，就选 `master`）
   - Folder：**/(root)**
   - 点 **Save**
9. 等 1—3 分钟，刷新 Pages 页面，会显示公开网址。
10. 打开网址后按 `Ctrl + F5` 强制刷新，检查首页、栏目页和图片。

### 最重要的检查

打开仓库首页，应该能直接看到：

```text
index.html
assets/
about.html
research.html
...
```

如果看到的是：

```text
website/index.html
website/assets/
```

说明多套了一层 `website` 文件夹，GitHub Pages 根目录会找不到首页。请把 `website` 里面的内容重新上传到仓库根目录。

---

## 方式 B：GitHub Desktop（适合后续经常更新）

1. 安装 GitHub Desktop 并登录 GitHub。
2. 点 **File → Add local repository…**
3. 选择本机的 `website` 文件夹。
4. 如果提示不是 Git 仓库，选择 **create a repository**，仓库名填 `zhongqingyixing-studio`。
5. 点 **Publish repository**。
6. 注意：免费版 GitHub Pages 需要仓库为 **Public**，不要勾选 “Keep this code private”。
7. 到 GitHub 网页端：**Settings → Pages → Deploy from a branch → main / (root) → Save**。
8. 以后修改内容后，在 GitHub Desktop 里：
   - 写一句 Summary
   - **Commit to main**
   - **Push origin**
   - GitHub Pages 会自动重新发布

---

## 更新网站

### 网页上传方式

仓库首页 → **Add file → Upload files** → 上传修改后的文件 → Commit changes。

### GitHub Desktop 方式

修改本地 `website` 文件夹 → GitHub Desktop 查看 Changes → Commit → Push。

---

## 常见问题

### 打开网址是 404

优先检查：

1. `index.html` 是否在仓库根目录，而不是 `website/index.html`。
2. Pages 的 Branch 是否选了 `main`，Folder 是否选了 `/(root)`。
3. 是否刚保存不到 1 分钟，稍等再刷新。

### 页面能打开，但样式或图片丢失

检查 `assets` 文件夹是否也在仓库根目录，并且大小写与 HTML 中的引用一致。GitHub Pages 所在环境区分大小写。

### 表单能填，但收不到内容

GitHub Pages 只能托管静态页面，不能处理表单。正式上线前需要把表单接到：

- Formspree
- 金数据 / 问卷星
- 学校或工作室自己的表单服务
- 自建后端接口

### 中国大陆访问不稳定

GitHub Pages 在中国大陆的访问速度可能不稳定。如果这是学校工作室的正式对外平台，建议后续迁移到学校服务器和学校域名；GitHub Pages 更适合演示、评审和临时展示。

---

## 自定义域名（以后再做）

如果学校提供了域名，例如：

```text
studio.example.edu.cn
```

可以在 **Settings → Pages → Custom domain** 填写域名，并按 GitHub 提示配置 DNS 的 `CNAME` 记录。

学校域名通常还涉及网络与备案管理，建议先和学校信息化部门确认。
