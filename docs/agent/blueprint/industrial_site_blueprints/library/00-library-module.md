# Library 模块蓝图

## 模块定位

Library 是正式工程实践归档区。  
它不等同于 Notes，也不等同于普通 Projects 页面。

Library 应收纳：

- 工程项目复盘
- 系统设计案例
- WebGL / shader / frontend 实验归档
- 内部工具记录
- 架构模式整理
- 性能优化手册
- 可复用实现经验

## 视觉原则

Library 的关键词：

```txt
formal / archival / catalog / engineering / rigorous / structured
```

视觉表现：

- 卡片结构更规整。
- 信息密度更高。
- 缩略图偏系统图、线框图、工程图。
- 元信息、标签、状态、编号更明显。
- 布局像工程档案库或技术文献索引。

## 页面

Library 包含两个页面：

```txt
/library               Library Index
/library/[slug]        Library Detail
```

## 与 Projects 的区别

如果网站已有 Projects 页面，则：

| 页面     | 用途                                   |
| -------- | -------------------------------------- |
| Projects | 对外展示成果，强调亮点、视觉和演示     |
| Library  | 内部式归档，强调过程、架构、决策、复盘 |

一个 Project 可以对应一个 Library 归档。  
Projects 负责“看起来做了什么”，Library 负责“系统是怎么构成的”。

## 内容分类

建议初始分类：

```txt
All
Systems
WebGL
Frontend Engineering
Tools
Infrastructure
Research Notes
Case Study
```

状态：

```txt
Published
In Progress
Archived
```

类型：

```txt
Project
Case Study
Experiment
Documentation
Tool
Research
```

## Library 信息层级

Library entry 至少包括：

1. 编号：`01 /`
2. 标题
3. 日期 / 年份
4. 一句话摘要
5. 技术栈
6. 分类
7. 状态
8. 缩略图
9. 详情页链接

可选字段：

- `link?: string` — 项目主页 / 公开文档 / 演示地址；存在时会在详情页元信息表中渲染为 `LINK` 行，点击在新标签页打开。

## Agent 开发提示

开发 Library 时优先保证结构，不要先追求复杂动画。

首版目标：

- 页面骨架完整
- 数据驱动渲染
- 筛选、排序、分页静态可用
- 详情页可通过 slug 进入
- 视觉上与 Notes 明显区分
