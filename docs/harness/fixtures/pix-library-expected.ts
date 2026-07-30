// Expected `sections` field for the Pix entry in `lib/data/library.ts`.
// Other fields (id, slug, number, title, summary, etc.) are omitted for clarity.

sections: [
  {
    id: "overview",
    number: "01",
    title: "项目概述",
    body: "Pix 是一个通过 NPM 分发的 Windows CLI 工具，用于将 Pi Coding Agent 的运行环境从宿主系统中解耦，并统一编排 Windows、WSL2 与 Docker Desktop 之间的执行链路。开发者只需要在当前项目目录中执行 `pix`，工具便会自动完成 WSL 环境切换、工作目录映射、Runtime 注入、工作区同步以及 Pi Agent 启动。"
  },
  {
    id: "scenario",
    number: "02",
    title: "设计动机",
    body: "Pi Coding Agent 通常需要读取项目文件、执行命令、安装依赖并修改代码。直接在 Windows 宿主环境运行 Agent，会使 Agent 获得较大的本地文件与进程访问范围；直接将 NTFS 项目目录挂载进 Docker，则会引入明显的小文件读写延迟。此外，宿主 Pi、WSL Pi 与容器 Pi 的 Runtime 状态相互独立，导致执行环境切换时配置和会话不连续。"
  },
  {
    id: "solution",
    number: "03",
    title: "解决方案",
    body: "Pix 将执行过程拆分为三个相互独立的部分：保留 Windows 下的低成本调用体验作为宿主入口；将项目投影到 WSL ext4 文件系统以获得高性能工作区；根据项目策略选择 WSL 直接执行或 Docker 容器执行。通过统一的 Canonical Pi Runtime、Mutagen 持续同步、rsync/cp 降级同步以及分层配置模型，实现运行性能、环境一致性与隔离强度的分别配置。"
  },
  {
    id: "architecture",
    number: "04",
    title: "架构",
    body: "Pix 由六个核心模块组成，整体执行流程从 CLI Entry 贯穿到 Sync Cleanup。",
    bullets: [
      "Host Bridge：负责 Windows 与 WSL2 之间的环境检测、路径转换和进程重启。",
      "Workspace Controller：识别 NTFS 工作区，生成稳定的 ext4 投影路径，管理 Mutagen 同步会话。",
      "Runtime Manager：维护 Direct 与 Sandbox 模式共享的 Canonical Pi Runtime。",
      "Execution Router：根据 CLI 参数、用户配置和项目 `.pix.json` 选择执行策略。",
      "Sandbox Adapter：将工作区、Runtime、网络、权限和环境变量转换为 Docker 启动参数。",
      "Diagnostic Layer：提供 `pix status`、`pix doctor`、`pix migrate` 等跨环境诊断命令。"
    ],
    diagram: "CLI Entry → WSL Bootstrap → Workspace Projection → Policy Resolution → Runtime Injection → Controlled Execution → Sync Cleanup"
  },
  {
    id: "challenges",
    number: "05",
    title: "工程挑战",
    body: "跨平台运行环境带来了四类主要工程挑战。",
    bullets: [
      "桥接 Windows、WSL2 与 Docker 文件系统语义，同时不向用户暴露路径复杂性。",
      "Pi Runtime 状态需要在容器销毁和执行模式切换时保持连续。",
      "Mutagen 不可用时需优雅降级到 rsync/cp，避免同步组件故障阻断 Agent 启动。",
      "通过项目级 `.pix.json` 安全地注入 API Key、代理和网络策略。"
    ]
  },
  {
    id: "outcome",
    number: "06",
    title: "项目价值",
    body: "Pix 将 WSL 路径转换、Docker 镜像构建、目录挂载、环境变量注入、Runtime 管理和项目同步封装为单一 CLI 工作流。项目并非单纯“将 Agent 放入容器”，而是围绕 Agent 执行过程建立了一层轻量级 Harness。",
    diagram: "Environment Detection → Workspace Preparation → Policy Resolution → Runtime Injection → Controlled Execution → Sync Cleanup"
  }
]
