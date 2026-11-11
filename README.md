# 陶思涵 · 个人主页（6 页站点）

新生实践课《WEB 设计进阶》结课作业。整站纯手写 HTML / CSS / JavaScript，不依赖任何框架、构建工具或外部 CDN，克隆下来双击就能打开。

- 线上地址：<https://jackt5418818845.github.io/>
- 源码仓库：<https://github.com/JACKT5418818845/JACKT5418818845.github.io>
- 主题：计算机 2603 班班长陶思涵的个人介绍，包含学习笔记、兴趣生活、班长日常与可交互的实验区。

## 页面一览（共 6 页，全部用相对路径互相链接）

| 文件 | 页面 | 主要内容 |
| --- | --- | --- |
| `index.html` | 主页 | 首屏介绍、全站五个入口、近期在做的事 |
| `about.html` | 关于我 | 自述、三个关键词、从高中到大学的成长时间线 |
| `study.html` | 学习笔记 | HTML 语义、CSS 盒模型、响应式布局，两个可交互实验，学习进度与参考资料 |
| `life.html` | 兴趣生活 | 足球、篮球、阅读书单、一周安排表 |
| `duty.html` | 班长日常 | 四步工作流、一学期大事记、常见问题 |
| `contact.html` | 联系我 | 联系方式、留言板（校验 + 渲染 + 本地存储） |

每页都有统一的页头导航、主题切换、页脚导航，以及「上一页 / 下一页」串联，任意页面都能一步回到主页。

## 目录结构

```
个人网页/
├─ index.html            主页
├─ about.html            关于我
├─ study.html            学习笔记
├─ life.html             兴趣生活
├─ duty.html             班长日常
├─ contact.html          联系我
├─ css/style.css         设计变量、布局、响应式、深色模式、子页面组件
├─ js/main.js            主题、导航、滚动入场、三个交互实验
├─ assets/
│  ├─ avatar.svg         首屏头像（「陶」字标识）
│  ├─ favicon.svg        浏览器标签图标
│  ├─ study-html.svg     HTML 语义结构示意图
│  ├─ study-box.svg      CSS 盒模型示意图
│  ├─ study-grid.svg     响应式 1 / 2 / 3 列示意图
│  ├─ life-football.svg  足球场俯视插画
│  ├─ life-books.svg     书堆插画
│  └─ duty-flow.svg      班长工作流示意图
├─ .nojekyll             让 GitHub Pages 跳过 Jekyll 处理
├─ publish.ps1           一键提交并推送
├─ .gitignore
└─ README.md
```

## 本地预览

直接双击 `index.html`。也可以在文件夹里起一个静态服务，避免某些浏览器对 `file://` 的限制：

```powershell
python -m http.server 8000
# 浏览器打开 http://127.0.0.1:8000
```

## 作业要求对照

| 要求（摘自课程考试要求） | 完成情况 |
| --- | --- |
| 使用 Dreamweaver / VS Code 等工具完成个人网页的设计与实现 | 手写 HTML / CSS / JS，全部源码在仓库中 |
| **网页总数量不得少于 5 个** | **共 6 个页面**，见上表 |
| 图文并茂、形式活泼、内容正面积极 | 6 幅自制 SVG 插图 + 图文混排；卡片、进度条、时间线、表格、翻页等版块 |
| 页面间链接使用相对路径 | 站内链接全部为 `about.html`、`css/style.css` 这类相对路径，无绝对路径 |
| 必须有 `index.html` 主页，并链接到其它分页面 | `index.html` 的「全站导航」卡片与页头/页脚导航指向全部 5 个分页面 |
| 不得抄袭、不得直接使用网上下载的页面 | 结构、文案、插图均为本次原创；仅引用 MDN 等公开文档作为学习资料链接 |
| 使用 GitHub Pages 发布到 Internet | 已发布：<https://jackt5418818845.github.io/> |

## 课程考点对照

| 课程内容 | 页面中的实现 |
| --- | --- |
| 语义化标签 | `header` / `nav` / `main` / `section` / `article` / `aside` / `figure` / `footer`，标题 `h1 → h3` 递减，图片有 `alt`，表单有 `label` |
| 选择器与优先级 | 标签、类、id、属性、伪类（`:hover`、`:focus-visible`、`:last-child`）混用 |
| 继承 | 「关于我」页的自述段落不设 `color`，颜色继承自外层 `.prose`；页脚继承 `body` |
| 盒模型 | 学习笔记页的实验二：宽 300px、内边距 20px、边框 2px，切换 `content-box` / `border-box`，外沿 344px / 300px |
| Flexbox | 页头、按钮组、统计条、页脚导航、留言表单 |
| Grid | 卡片区、技能面板、首页入口、工作流、联系卡片、笔记图文两栏 |
| 响应式 | 移动优先，`640px` 两列、`960px` 三列；`900px` 折叠导航；窄屏表格可横向滑动 |
| 媒体查询与变量 | `:root` 定义色板与间距，深色模式只覆盖变量；`prefers-color-scheme` 跟随系统，`prefers-reduced-motion` 关闭动效 |
| JavaScript 引入 | 6 个页面统一用 `<script src="js/main.js" defer>` 引入，与 HTML 分离 |
| DOM 查询与修改 | `getElementById` / `querySelector`、`textContent`、`setAttribute`、`classList.toggle`、`createElement` + `append`、`innerHTML` 清空列表 |
| 事件 | `click`、`input`、`submit`、`keydown`、`scroll`、`resize`、`IntersectionObserver` |
| 表单与校验 | 称呼 1–12 字、留言 1–60 字；非法时 `role="alert"` 提示、标 `aria-invalid`、焦点回到出错输入框 |
| 本地存储 | 主题与留言写入 `localStorage`，跨页面、刷新后保留 |
| 可访问性 | 跳转链接、`aria-current` / `aria-expanded` / `aria-live` / `aria-pressed`、可见焦点环、键盘可关闭导航、表格带 `caption` 与 `scope` |

## 三个互动实验

1. **点击改 DOM**（学习笔记页）：按钮监听 `click`，回调里改文字、设 `title` 属性、切换 `.highlight` 类并统计次数；「重置」恢复初始状态。
2. **盒模型换算**（学习笔记页）：在 `content-box` 与 `border-box` 之间切换，页面实时显示 `getBoundingClientRect()` 量到的外沿宽度与计算后的内容宽度。
3. **留言板**（联系我页）：先校验再渲染，新留言插入列表顶部并写入 `localStorage`，最多保留 8 条，刷新后仍在。

## 改成你自己的信息

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、班级、各页文案 | 6 个 HTML 文件（搜索「陶思涵」逐一替换） |
| 配色 | `css/style.css` 顶部 `:root` 的 `--accent`、`--solid`、`--bg` 等变量 |
| 头像 | 替换 `assets/avatar.svg`，或改各页 `<img>` 的 `src` |
| 学习进度条 | `study.html` 里 `.meter__bar` 的 `style="--value: 85%"` |
| 联系方式 | `contact.html` 的联系卡片；GitHub 链接目前指向 `JACKT5418818845` |
| 插图 | 替换 `assets/*.svg`，保持 SVG 或换成同比例的图片即可 |

## 发布与更新

### 方式一：命令行（推荐）

仓库已初始化 `origin`，改完内容后在 `个人网页` 目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\publish.ps1
# 或自定义提交信息
powershell -ExecutionPolicy Bypass -File .\publish.ps1 -Message "更新学习笔记"
```

### 方式二：网页上传

1. 打开 <https://github.com/JACKT5418818845/JACKT5418818845.github.io>
2. `Add file` → `Upload files`，拖入改好的文件，`Commit changes`
3. 等 1 分钟左右，访问 <https://jackt5418818845.github.io/>（`Ctrl + F5` 强制刷新）

### 首次发布的设置（已完成，留作记录）

1. 新建公开仓库，仓库名必须是 `JACKT5418818845.github.io`，站点地址才是 `https://jackt5418818845.github.io/`。
2. 推送到 `main` 分支。
3. `Settings` → `Pages` → `Build and deployment`：`Source` 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`。
4. 首次构建约 1–2 分钟；之后每次推送自动重新发布。

> 免费账号的 Pages 需要公开仓库。

## 自测记录

发布前用无头 Edge（Chromium 内核）对 6 个页面做过回归，全部通过：

- 1440px 与 390px 下均无横向溢出（表格横向滚动除外），无 404 资源
- 每页恰好 1 个 `h1`、`lang="zh-CN"`、6 个导航项且当前页高亮正确
- 点击问候按钮：文字、`title`、`.highlight`、计数同步正确
- 盒模型切换：外沿宽度 344.0px → 300.0px
- 留言板：空表单被拦截；合法留言渲染、写入 `localStorage`、刷新后仍在
- 主题切换跨页面保持；移动端导航可展开、Esc 可收起
- 站内链接全部存在，6 个页面都能从首页到达
- 无 JavaScript 运行时错误

## 参考

- MDN：HTML / CSS / JavaScript / DOM 文档
- Chrome DevTools 官方文档
- 课程课件《6-2 WEB 设计进阶》与授课演示文件
