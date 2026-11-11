# 陶思涵 · 个人主页

新生实践课《WEB 设计进阶》结课作业。整站纯手写 HTML / CSS / JavaScript，不依赖任何框架、构建工具或外部网络资源，克隆下来双击就能打开。

- 站点地址：<https://jackt5418818845.github.io/>
- 源仓库：<https://github.com/JACKT5418818845/JACKT5418818845.github.io>
- 页面主题：计算机 2603 班班长陶思涵的个人介绍，含学习计划、兴趣、班长日常与三个可交互的实验区。

## 目录结构

```
个人网页/
├─ index.html          页面结构与全部文案
├─ css/style.css       设计变量、布局、响应式、深色模式
├─ js/main.js          主题、导航、滚动入场、三个交互实验
├─ assets/
│  ├─ avatar.svg       首屏头像（「陶」字标识）
│  └─ favicon.svg      浏览器标签图标
├─ .nojekyll           告诉 GitHub Pages 不要走 Jekyll 处理
├─ publish.ps1         一键提交并推送到 GitHub
└─ README.md           本文件
```

## 本地预览

直接双击 `index.html` 即可；也可以在文件夹里起一个静态服务：

```powershell
python -m http.server 8000
# 然后浏览器打开 http://127.0.0.1:8000
```

## 课程考点对照

| 课程内容 | 页面中的实现 |
| --- | --- |
| 语义化标签 | `header` / `nav` / `main` / `section` / `article` / `aside` / `footer`，标题按 `h1 → h3` 递减，图片有 `alt`，表单有 `label` |
| 选择器与优先级 | 标签、类、id、属性、伪类（`:hover`、`:focus-visible`、`:nth-child`）混用；`.intro` 一类的类选择器可覆盖继承样式 |
| 继承 | 「我是谁」卡片里的段落不设 `color`，颜色继承自 `.card`；页脚文字继承 `body` |
| 盒模型 | 实验二：盒子宽 300px、内边距 20px、边框 2px，切换 `content-box` / `border-box`，外沿宽度在 344px / 300px 之间变化，数值由 JS 实测 |
| Flexbox | 页头、按钮组、统计条、留言表单 |
| Grid | 卡片区、技能面板、兴趣、联系卡片 |
| 响应式 | 移动优先，`640px` 两列、`960px` 三列；另在 `900px` 折叠导航 |
| 媒体查询与变量 | `:root` 定义色板与间距，深色模式只覆盖变量；`prefers-color-scheme` 跟随系统，`prefers-reduced-motion` 关闭动效 |
| JavaScript 引入 | `js/main.js` 以 `defer` 引入，与 HTML 分离 |
| DOM 查询与修改 | `querySelector` / `getElementById`、`textContent`、`setAttribute`、`classList.toggle`、`createElement` + `append` |
| 事件 | `click`、`input`、`submit`、`keydown`、`scroll`、`resize`，均用 `addEventListener` |
| 表单与校验 | 称呼 1–12 字、留言 1–60 字，非法时 `role="alert"` 提示并标 `aria-invalid` |
| 本地存储 | 主题与留言写入 `localStorage`，刷新后保留 |
| 可访问性 | 跳转链接、`aria-expanded` / `aria-live` / `aria-pressed`、可见焦点环、键盘可关闭导航 |

## 三个互动实验

1. **点击改 DOM**：按钮监听 `click`，回调里改文字、设 `title` 属性、切换 `.highlight` 类，并统计点击次数；「重置」恢复初始状态。
2. **盒模型换算**：点击按钮在 `content-box` 与 `border-box` 之间切换，页面下方实时显示 `getBoundingClientRect()` 量到的外沿宽度和计算后的内容宽度。
3. **留言板**：先校验再渲染，新留言插入列表顶部，同时写入 `localStorage`；刷新页面后仍在（最多保留 8 条）。

## 改成你自己的信息

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、班级、简介、各段文案 | `index.html`（搜索「陶思涵」逐一替换） |
| 配色 | `css/style.css` 顶部 `:root` 里的 `--accent`、`--solid`、`--bg` 等变量 |
| 头像 | 替换 `assets/avatar.svg`，或把 `index.html` 里 `<img class="portrait">` 的 `src` 指向自己的图片 |
| 学习进度条 | `index.html` 里 `.meter__bar` 的 `style="--value: 85%"` |
| 联系方式 | `index.html` 的 `#contact` 区块（GitHub 链接、留言板、班级卡片） |

## 发布与更新

### 方式一：命令行（推荐）

仓库已经初始化好 `origin`，改完内容后在 `个人网页` 目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\publish.ps1
# 或自定义提交信息
powershell -ExecutionPolicy Bypass -File .\publish.ps1 -Message "更新学习计划"
```

### 方式二：网页上传

1. 打开 <https://github.com/JACKT5418818845/JACKT5418818845.github.io>
2. `Add file` → `Upload files`，把改好的文件拖进去，`Commit changes`
3. 等 1 分钟左右，访问 <https://jackt5418818845.github.io/>（`Ctrl + F5` 强制刷新）

### 首次发布时的设置（已完成，留作记录）

1. 新建公开仓库，仓库名必须是 `JACKT5418818845.github.io`，这样站点地址才是 `https://jackt5418818845.github.io/`。
2. 推送到 `main` 分支。
3. 仓库 `Settings` → `Pages` → `Build and deployment`：`Source` 选 `Deploy from a branch`，分支选 `main`、目录选 `/ (root)`，保存。
4. 首次构建约 1–2 分钟；之后每次推送都会自动重新发布。

> 免费账号的 Pages 需要公开仓库；如果仓库是私有的，Pages 会发布失败。

## 自测记录

发布前用无头 Edge（Chromium 内核）在 1440px 与 390px 视口下做过一轮回归，全部通过：

- 点击问候按钮：文字、`title`、`.highlight`、计数同步正确
- 盒模型切换：外沿宽度 344.0px → 300.0px，内容宽度 300px → 256px
- 空表单被拦截并提示；合法留言渲染、写入 `localStorage`、刷新后仍在
- 主题切换写入 `data-theme` 与 `localStorage`，刷新后保持
- 1440px 与 390px 下均无横向溢出
- 页内锚点全部有落点，`h1` 唯一，图片加载成功，无 JS 运行时报错

## 参考

- MDN：HTML、CSS、JavaScript 与 DOM 文档
- 课程演示文件《WEB 设计进阶授课演示》与课件《6-2 WEB 设计进阶》
