# WebGL Hero Agent Docs

本目录把「抽象工业建筑 / WebGL 架构体 + 线框标注系统」拆成多个独立 Markdown 文件，供 coding agent 分阶段实现。

## 目标

将当前首页右侧的散落彩色 GLB 展示替换为一个可交互的 Three.js Hero 主视觉：

- 抽象工业建筑体块
- 五层信息架构：HOME / PROJECTS / RESUME / LIBRARY / NOTES
- 黑白灰混凝土材质
- 红色 active node
- EdgesGeometry 线框轮廓
- DOM annotation overlay
- hover / pointer parallax
- GSAP ScrollTrigger 分层拆解动画

## 建议读取顺序

1. [`00_design_brief.md`](./00_design_brief.md)
2. [`01_page_structure.md`](./01_page_structure.md)
3. [`02_threejs_module_architecture.md`](./02_threejs_module_architecture.md)
4. [`03_data_model_and_configs.md`](./03_data_model_and_configs.md)
5. [`04_threejs_core_implementation.md`](./04_threejs_core_implementation.md)
6. [`05_scene_controller_and_lifecycle.md`](./05_scene_controller_and_lifecycle.md)
7. [`06_interaction_and_scroll.md`](./06_interaction_and_scroll.md)
8. [`07_annotation_overlay.md`](./07_annotation_overlay.md)
9. [`08_react_components_and_css.md`](./08_react_components_and_css.md)
10. [`09_agent_task_plan.md`](./09_agent_task_plan.md)

## 最小 MVP

第一版只需要完成：

```text
- HeroCanvas
- HeroSceneController
- 5 slab layers
- EdgesGeometry
- red active node
- OrthographicCamera
- pointer parallax
- scroll explode
```

DOM annotation overlay 可以作为第二个 commit 实现。

## 风格约束

必须保持：

```text
industrial / brutalist / architectural blueprint / system dashboard
```

避免：

```text
neon cyberpunk
glassmorphism
colorful game asset
rounded soft UI
glossy sci-fi plastic
excessive particles
```
