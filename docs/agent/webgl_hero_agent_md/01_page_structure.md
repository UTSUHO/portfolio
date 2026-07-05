# 01 — Page Structure

## 页面结构总览

```text
HomePage
├── SystemFrame
│   ├── TopSystemBar
│   │   ├── LeftMeta
│   │   ├── CenterCoords
│   │   └── RightStatus
│   │
│   ├── MainHeroSection
│   │   ├── LeftIdentityPanel
│   │   │   ├── Label
│   │   │   ├── Name
│   │   │   ├── Role
│   │   │   ├── Description
│   │   │   └── StatusLine
│   │   │
│   │   └── RightHeroStage
│   │       ├── HeroCanvas
│   │       └── AnnotationOverlay
│   │
│   └── BottomNavigation
│       ├── 01 HOME
│       ├── 02 PROJECTS
│       ├── 03 RESUME
│       ├── 04 LIBRARY
│       ├── 05 NOTES
│       └── MenuGridIcon
│
├── ProjectsSection
├── ResumeSection
├── LibrarySection
└── NotesSection
```

## DOM 与 WebGL 职责划分

### DOM 负责

```text
- 页面网格
- 左侧身份信息
- 顶部系统栏
- 底部导航
- section 内容
- annotation label 文字
- leader line overlay
```

### WebGL 负责

```text
- 抽象建筑体
- 体块层级
- 边缘线框
- red active node
- guide lines
- parallax
- scroll-driven explode
```

## 主区域布局

```text
MainHeroSection
├── LeftIdentityPanel: 约 32% - 38% 宽度
└── RightHeroStage:   约 62% - 68% 宽度
```

右侧 `RightHeroStage` 必须是一个 `position: relative` 容器。

内部层级：

```text
RightHeroStage
├── canvas.hero-canvas        z-index: 1
├── annotation overlay        z-index: 3
├── corner metadata           z-index: 4
└── optional subtle grid      z-index: 0
```

## 右侧 Hero Stage 尺寸建议

桌面端：

```css
.right-hero-stage {
  min-height: 620px;
}
```

较大屏幕：

```css
.right-hero-stage {
  min-height: clamp(560px, 72vh, 820px);
}
```

## 当前页面替换点

将现有右侧 GLB 模型展示逻辑移除或暂时注释，只保留 canvas 容器位置。

需要保留：

```text
- 左侧 identity
- 顶部系统文字
- 底部 nav
- 右侧大面积留白结构
```

需要替换：

```text
- 当前散落彩色 GLB 模型
```

替换为：

```text
- HeroCanvas + Abstract Architecture
```
