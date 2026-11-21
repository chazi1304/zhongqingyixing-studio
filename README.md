# 知情意行青春实践师生工作室 · 对外平台（框架版 v0.1）

这是一个不依赖构建工具的静态多页网站，按照《知情意行青春实践师生工作室对外平台基本框架》搭建：

**首页 / 科研创新 / 实践项目 / 成果专题 / 关于知情意行 / 加入我们**

当前只搭主要框架，案例、团队姓名、荣誉、联系方式、真实日期和图片均为占位内容，后续直接替换即可。

---

## 1. 本地预览

在 `website` 目录下启动任意静态服务器，例如：

```bash
cd website
python -m http.server 4173
```

然后打开：

```text
http://127.0.0.1:4173/
```

也可以直接双击 `index.html` 打开，但建议用本地服务器，避免部分浏览器对本地文件的安全限制。

---

## 2. 页面清单

| 文件 | 页面 | 说明 |
|---|---|---|
| `index.html` | 首页 | 首屏、我们是谁、动态、代表案例、三条主线、加入入口 |
| `research.html` | 科研创新 | 竞赛风采、技术博客、大创项目、开源贡献，带筛选 |
| `practice.html` | 实践项目 | 实践地图、项目/故事/档案筛选、项目详情入口 |
| `outcomes.html` | 成果专题 | 乡土诗集旗舰位、专题列表、专题原则 |
| `about.html` | 关于知情意行 | 概况、工作方式、团队、荣誉、知芽 IP、动态、联系 |
| `join.html` | 加入我们 | 当前机会、角色、参与路径、投稿表单、合作、FAQ |
| `project-detail.html` | 项目详情模板 | 背景—行动—留下—故事—成果—参与 |
| `special-detail.html` | 专题详情模板 | 策展前言—章节—致谢版权—分享 |
| `article-detail.html` | 文章详情模板 | 技术博客 / 竞赛故事 / 支教日记通用 |
| `404.html` | 404 页 | 静态托管时的兜底页面 |

`assets/` 下是共享样式、脚本、标志与 favicon。没有外部 CDN、字体或图片依赖。

---

## 3. 内容替换位置

全站搜索以下关键词，可以快速找到占位内容：

```text
待补充
示例
待接入
待替换
```

### 首页

- 首屏文案：`index.html` 中的 `.hero__title`、`.hero__lead`。
- 代表案例：`#featured` 区块，替换标题、三段式说明、图片/插画和两个按钮链接。
- 动态：`.notes` 区块，建议只在有真实更新时保留。
- 数字：`.hero__meta` 中的 `06 / 03 / 01`，可改成真实项目数、实践地数等。

### 科研创新

- 卡片在 `#research-grid` 中，每张卡有 `data-category`：
  - `competition` 竞赛风采
  - `blog` 技术博客
  - `project` 大创项目
  - `oss` 开源贡献
- 新增卡片时，复制一个 `<article class="entry-card ...">`，修改 `data-category`、标题、摘要和链接。
- 同时更新 `.filter-bar` 中按钮后面的数量，以及 `assets/js/site.js` 顶部 `searchIndex` 的搜索条目。

### 实践项目

- 项目 / 故事 / 档案卡片在 `#practice-grid` 中，`data-category` 分别为 `project`、`story`、`archive`。
- 项目详情统一使用 `project-detail.html` 作为模板；复制该文件，改名为具体项目（如 `project-poetry.html`），再替换内容。
- 实践地图目前是 SVG 示意；接入真实地点后，可把 `practice.html` 里的 `map-panel` 替换为地图组件。

### 成果专题

- 旗舰位在 `#poetry`。
- 专题卡片在 `#outcome-grid`，`data-category` 为 `poem`、`film`、`3d`、`ip`、`exhibition`。
- 专题详情统一使用 `special-detail.html`；如果“乡土诗集”要独立成站，建议保留统一导航和“回到相关实践”入口。

### 关于知情意行

- 团队姓名、角色、简介：`#people` 的 `.person-card`。
- 荣誉：`#honors` 的 `.honor-row`，按年份增加或删除整行。
- 知芽 IP：`#ip` 区块。
- 联系方式：`#contact` 以及所有页面页脚的“邮箱 / 地址 / 公众号”。

### 加入我们

- 当前机会：`#opportunities` 的 `.opportunity-card`，状态用 `status--soon`、`status--closed` 控制。
- 角色：`#roles` 的 `.role-card`。
- 投稿表单：`#submit`，目前是演示表单，不会发送数据。
- 合作：`#cooperation`。
- FAQ：`#faq` 的 `.accordion__item`。

---

## 4. 接入真实表单

当前表单只做前端校验，并在提交后显示“演示模式”提示。

正式上线时任选一种方式：

1. 使用学校/工作室已有的表单服务：
   - 把 `<form class="form" data-demo-form>` 改成 `<form class="form" action="你的表单地址" method="post">`；
   - 删除 `data-demo-form`；
   - 按服务要求补充 `name` 字段。
2. 使用第三方表单服务：
   - 把 `action` 指向服务地址；
   - 删除 `data-demo-form`；
   - 在服务后台配置必填项、通知邮箱和隐私说明。
3. 自己写后端：
   - 保留前端字段；
   - 在 `assets/js/site.js` 的 `data-demo-form` 逻辑里改为 `fetch` 提交；
   - 补充 CSRF、防刷、隐私与数据留存策略。

上线前请补充隐私说明，并确保投稿素材有公开授权。

---

## 5. 修改导航与页脚

为了不依赖 JavaScript 渲染，导航和页脚在 10 个 HTML 文件中各有一份。修改栏目名称时，需要同步这些文件：

```text
index.html
research.html
practice.html
outcomes.html
about.html
join.html
project-detail.html
special-detail.html
article-detail.html
404.html
```

如果后续要频繁改导航，建议迁移到 Eleventy / Astro / Next.js 等带布局系统的静态站框架。

---

## 6. 设计系统

主要变量在 `assets/css/style.css` 顶部：

```css
:root {
  --paper: #f6f1e7;     /* 纸张底色 */
  --ink: #2b1a17;       /* 正文墨色 */
  --teal: #a31c24;      /* 主品牌红（沿用旧变量名） */
  --teal-deep: #6d1117; /* 深红区块 */
  --gold: #c09a52;      /* 暖金强调色 */
  --serif: ...;         /* 标题宋体 */
  --sans: ...;          /* 正文黑体 */
}
```

视觉方向：党建红 + 暖金 + 纸张质感，宋体大标题、细线框和克制的留白。科研创新页单独使用蓝紫科技主题（深靛蓝底、网格、紫色光晕、蓝紫卡片），但页头与页脚仍保留红色主品牌框架。

品牌图片位于 `assets/img/`：

- `hitsz-logo-transparent.png`：哈尔滨工业大学（深圳）校徽与校名，用于页头。
- `hitsz-mark.png`：校徽单独版本，用于移动端。
- `studio-mark.png`：从完整标识中裁切的完整图标（齿轮、心形、书页、水纹），用于页头、页脚。
- `studio-logo-circle.png`：完整圆形标识（含“知情意行 / 青春实践 师生工作室”字样），用于关于页。
- `studio-logo-source.jpg`：原始完整标识图，保留作为源文件。
- `studio-favicon.png`：浏览器标签页图标，由完整图标生成。
- `studio-lockup.png`：早期品牌组合图，可作为横版宣传物料参考。

校徽与工作室标识仅用于工作室官方页面；对外使用请遵循学校视觉识别规范，并确认工作室标识的使用授权。

没有使用外部字体，避免加载失败和版权问题。

---

## 7. 交互与可访问性

- 移动端菜单：右上角菜单按钮，支持 Esc 关闭。
- 站内搜索：右上角搜索按钮，或 `Ctrl / ⌘ + K`；搜索 `searchIndex` 中的栏目与页面。
- 筛选：科研、实践、成果三个页面的分类筛选。
- 表单：前端校验 + 演示提示。
- 标题与正文默认可见，不依赖滚动动画；即使脚本加载失败，`h1` 也不会被隐藏。
- 支持 `prefers-reduced-motion`。
- 页面有 skip link、focus-visible、aria 属性和语义化标题。

---

## 8. 部署

这是纯静态站点，直接把 `website/` 目录上传到任意静态托管即可：

- 学校服务器 / Nginx
- GitHub Pages
- Cloudflare Pages
- Vercel / Netlify
- 阿里云 OSS / 腾讯云 COS

无需构建命令。若托管平台支持自定义 404，把 `404.html` 设为错误页。

GitHub Pages 的逐步操作见 [GITHUB-PAGES.md](GITHUB-PAGES.md)。

上线后记得：

1. 替换所有 `待补充`、`示例` 内容；
2. 接入真实表单；
3. 补充隐私与授权说明；
4. 配置域名、HTTPS、统计与站点地图；
5. 用真实内容做一次手机端检查。

---

## 9. 当前已知占位项

- 代表案例的具体项目内容与图片
- 科研创新的竞赛、博客、大创、开源条目
- 实践项目、实践故事、实践地档案
- 乡土诗集、影像、3D、知芽 IP 的具体内容
- 团队姓名、简介、照片
- 荣誉名称、年份、颁发机构
- 联系方式、地址、公众号
- 招新与活动的真实时间、截止日期
- 表单后端
- 分享卡、二维码、统计代码
