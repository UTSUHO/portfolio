# 00 — Design Brief

## 任务

实现首页右侧 WebGL Hero 主视觉：

> 抽象工业建筑 / WebGL 架构体 + 线框标注系统

它不是普通 3D 模型展示，也不是游戏资产陈列，而是一个把个人网站结构可视化的「信息建筑」。

## 核心视觉定义

```text
信息建筑 = 建筑白模 + 系统架构图 + 工程标注 + 滚动拆解
```

右侧 Hero 需要承担以下职责：

1. 建立首页视觉重心
2. 暗示用户身份：indie game designer / full-stack developer / WebGL developer
3. 将网站 section 抽象为五层结构
4. 在滚动时拆解，和页面导航发生联动
5. 保持冷静、克制、工业、工程化的视觉语言

## 五个层级

```text
01 HOME      / IDENTITY CORE
02 PROJECTS  / PROJECT STACK
03 RESUME    / EXPERIENCE ARCHIVE
04 LIBRARY   / KNOWLEDGE GRID
05 NOTES     / NOTE TERMINAL
```

## 视觉元素

必须包含：

```text
- layered concrete slabs
- dark recessed voids
- thin wireframe edges
- one red active cube node
- vertical guide lines
- sparse annotation anchors
- orthographic architectural composition
```

可以包含：

```text
- floating frame canopy
- small modular boxes
- staircase/ramp-like shape
- shadowed cutaway
- subtle grid/dot texture
```

暂时不要做：

```text
- complex shader
- particle field
- colorful GLB models
- text-heavy labels
- game-like saturated assets
- aggressive camera movement
```

## 颜色

```text
background:     #f3f0e8 / #f5f2ea
text:           #11161a
concreteLight:  #e8e6df
concreteMid:    #b8b6ad
concreteDark:   #11161a
line:           #1b1f22 with opacity
accentRed:      #ff3b2f
```

## 相机建议

使用 `THREE.OrthographicCamera`。

原因：

- 更接近建筑图纸
- 更接近工业制图
- 更适合当前网页的平面网格美学
- 避免普通 3D 商品展示感

## 动画原则

动画应当克制：

```text
pointer move:
  root rotation x/y 只允许极小幅度变化

scroll:
  layers 轻微分离
  root 轻微改变角度
  active node 轻微位移或切换
```

不要：

```text
- 快速旋转
- 弹跳
- 大幅镜头推拉
- 炫技粒子
- 复杂变形
```

## 最终观感判断

合格结果应像：

```text
一个前端 / WebGL / 游戏开发者的个人系统，被抽象成工业建筑剖面图。
```
