# 项目 MD → Project 模块转换指南

## 1. 文件位置与命名

| 项目 | 要求 |
|------|------|
| 文件路径 | `content/projects/{id}.md` |
| 文件名 | 使用项目 ID，例如 `14.md`、`15.md` |
| 文件内容 | 必须包含 YAML frontmatter，body 当前可留空 |

## 2. Frontmatter 完整字段

```yaml
---
id: "14"                          # 字符串，项目唯一标识
title: "项目名称"                  # 字符串，详情页主标题
subtitle: "一句话副标题"           # 字符串，列表与卡片展示
category: "AI / Frontend"          # 字符串，项目分类
year: "2026"                       # 字符串，用于按年份分组

meta:                              # 元信息对象
  type: "AI Frontend Platform"     # 项目类型
  role: "Architect / Frontend Lead" # 你的角色
  status: "Ongoing"                # 项目状态
  date: "2026"                     # 日期/时间段
  duration: "Ongoing"              # 持续时长
  tech: "Vue 3 / Vite / ..."       # 主要技术栈

visualType: "network"              # 可选: wireframe | network | voxel | shader
tags: [0, 2, 4]                    # 数字数组，对应 ProjectTag 0-6

overview: "项目概述..."             # 字符串
problem: "解决了什么问题..."         # 字符串
solution: "如何解决的..."            # 字符串

architecture:                      # 架构对象
  title: "Frontend Architecture"   # 架构图标题
  blocks:                          # 2-4 个架构块
    - label: "Views"
      value: "Detail / Sessions / ..."
    - label: "Components"
      value: "Chat / Skill / ..."
    - label: "Stores"
      value: "chat / user / ..."
    - label: "Gateway"
      value: "GatewayBrowserClient over WebSocket"
  flow: |
    flowchart TD
      Auth["OAuth2 / Ticket Auth"] --> Poll["Instance Polling"]
      Poll --> Gateway["Gateway Connect"]
      Gateway --> Chat["Stream Chat"]
      Gateway --> VNC["VNC Panel"]

techStack:                         # 技术栈数组
  - "Vue 3"
  - "Vite 8"
  - "Pinia 3"

challenges:                        # 挑战数组
  - "流式消息增量合并..."
  - "实例状态轮询..."

outcome: "最终成果..."              # 字符串

relatedIds:                        # 关联项目 ID 数组
  - "15"
---
```

## 3. 字段约束

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 唯一，决定 URL `/projects/{id}` |
| `title` | string | 是 | |
| `subtitle` | string | 是 | |
| `category` | string | 是 | |
| `year` | string | 是 | 用于首页 PROJECT_LOGS 按年分组 |
| `meta` | object | 是 | 必须包含 `type/role/status/date/duration/tech` |
| `visualType` | string | 否 | 默认 `wireframe`，可选见上 |
| `tags` | number[] | 否 | 0=work, 1=interest, 2=ai, 3=gamedesign, 4=frontend, 5=fullstack, 6=design |
| `overview/problem/solution` | string | 是 | |
| `architecture.blocks` | object[] | 是 | 每个 block 有 `label` 和 `value` |
| `architecture.flow` | `string`（Mermaid 文本） | 否 | 完整 Mermaid 语法透传，直接交给 Mermaid 渲染 |
| `techStack` | string[] | 否 | |
| `challenges` | string[] | 否 | |
| `outcome` | string | 否 | |
| `relatedIds` | string[] | 否 | 关联项目 ID，用于底部 RELATED PROJECTS |

## 4. Tags 映射

```yaml
0: work        # 工作项目
1: interest    # 兴趣项目
2: ai          # AI 相关
3: gamedesign  # 游戏设计
4: frontend    # 前端
5: fullstack   # 全栈
6: design      # 设计
```

## 5. 快速转换步骤

1. 在 `content/projects/` 下新建 `{id}.md`
2. 复制上方模板
3. 按归档文档的「项目概述 / 技术栈 / 架构设计 / 功能模块 / 关键设计决策 / 注意事项」提炼内容
4. 填写 `relatedIds` 建立项目关联
5. 运行 `npm run build` 验证

## 6. 常见注意事项

- **字符串引号**：包含冒号 `:`、斜杠 `/`、中文标点或特殊字符时，建议用双引号包裹
- **YAML 缩进**：统一使用 2 个空格，列表项 `-` 后与父级对齐
- **id 排序**：`lib/data/projects.server.ts` 会按 ID 自然排序生成 `projects` 数组
- **新增项目无需改代码**：只要文件放对位置、frontmatter 格式正确，构建时自动加载

## 7. FLOW：完整 Mermaid 语法透传

`architecture.flow` 接受任意合法 Mermaid 文本，组件会原样透传给 Mermaid 渲染引擎，不做关键字白名单或语法限制。具体语法请参考 Mermaid 官方文档：https://mermaid.js.org/intro/

### 7.1 示例

```yaml
architecture:
  flow: |
    flowchart TD
      Frontend["agent-interface Frontend"] --> K8s["K8s Business Backend"]
      Frontend --> WSG["WebSocket Gateway"]
      K8s --> Scheduler["Container Scheduling"]
      Scheduler --> Container["Target Docker Container"]
```

- `flow: |` 表示 YAML 多行字符串。
- 节点文本包含特殊字符时用引号包裹。

### 7.2 注意事项

- Mermaid 在浏览器端渲染，首次加载时可能会有短暂空白。
- 渲染组件会自动匹配站点主题色。
- 当 Mermaid 解析失败时，页面会直接显示原始 Mermaid 源代码，便于排查语法问题。

## 8. 示例：从归档文档提取内容

以 `AGENT_INTERFACE.md` 为例：

| 归档章节 | 对应 frontmatter 字段 |
|----------|----------------------|
| 项目概述 → overview | `overview` |
| 技术栈表格 → meta.tech / techStack | `meta.tech`、`techStack` |
| 整体架构 → architecture.blocks | `architecture.blocks` |
| 关键设计决策 → challenges | `challenges` |
| 功能模块流程 → architecture.flow | `architecture.flow`（推荐 Mermaid） |
