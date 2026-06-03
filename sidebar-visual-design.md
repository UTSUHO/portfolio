左侧导航栏背景色随 Section 动态变化的布局设计
1. 需求概述
左侧导航栏与主内容区各 Section 的 边框互不覆盖（垂直 border-right 与水平 border-top 完整显示）。

左侧导航栏 背景颜色 不固定，而是取决于当前右侧主内容区的某个 Section 的背景颜色。

实现方式不应依赖 background: transparent 与绝对定位叠加，避免事件穿透、滚动错位等问题。

左侧导航栏自身高度 100% 视口，与主内容区独立滚动。

2. 核心设计思路
分离布局与视觉联动：

使用 Grid 独立列 保证边框互不覆盖。

左侧导航栏 不透明，其背景颜色由 当前活跃 Section 的背景色决定（通过状态管理动态改变）。

通过 滚动监听 + IntersectionObserver 或类似机制，检测哪个 Section 处于视口主要区域，左侧导航栏整体背景色随之变化（或高亮对应菜单项的背景色）。

每个 Section 的颜色可自定义（如通过 sectionColor prop 传入），左侧导航栏背景色与之保持一致或半透明变体。

这样既保留独立列布局的所有优点，又实现了背景色的动态耦合。

3. 布局结构（独立列，边框不覆盖）
沿用先前的最佳方案：

text
┌────────────────────────────────────────────┐
│  Header (可选)                              │
├─────────┬──────────────────────────────────┤
│ Sidebar │  Section A (背景色 #f0f0f0)       │
│ 固定宽  │  ──────────── border-top          │
│ border- │  Content...                       │
│ right   │                                   │
│ 背景色  ├──────────────────────────────────┤
│ 动态变化 │  Section B (背景色 #e8f0fe)       │
│         │  ──────────── border-top          │
│         │  Content...                       │
└─────────┴──────────────────────────────────┘
Grid 定义：grid-template-columns: 240px 1fr;

左侧导航栏：border-right: 1px solid #ccc; background-color: <动态值>;

每个 Section：border-top: 1px solid #ccc; background-color: <自身颜色>;

边框自然相交，完整显示，互不覆盖。

4. 背景色联动机制
4.1 数据设计
每个 Section 在生成时携带一个 color 属性（或通过 CSS 变量定义）。例如：

ts
interface SectionData {
  id: string;
  title: string;
  content: React.ReactNode;
  backgroundColor: string;   // 该区块的主题背景色
}
4.2 滚动监听确定当前 Section
使用 IntersectionObserver 监听每个 Section 与视口的交叉比例，将交叉比例最高的 Section 标记为 activeSection。当 activeSection 变化时，更新左侧导航栏的背景色（或某个菜单项的背景色）。

优势：性能好，无需计算滚动位置，天然支持动态内容高度变化。

4.3 状态传递（React Context 或状态提升）
在 PageLayout 组件中创建 activeSectionColor 状态。

通过 Context 将当前活跃颜色提供给 SideNav 组件。

SideNav 的 style.backgroundColor 绑定该状态值。

5. React 组件设计
5.1 组件树
text
<PageLayout>
  <SideNavProvider>        // 提供活跃 Section 颜色
    <SideNav />            // 背景色随 activeColor 变化
    <MainContent>
      <ObservedSection     // 每个 Section 注册观察
        id="..."
        backgroundColor="#f0f0f0"
      >
        ...
      </ObservedSection>
    </MainContent>
  </SideNavProvider>
</PageLayout>
5.2 组件职责
组件	职责
PageLayout	Grid 布局容器，定义列宽、高度、滚动等。
SideNavProvider	管理当前活跃 Section 的颜色状态，提供 activeColor 给子组件。
SideNav	渲染左侧导航菜单，背景色绑定 activeColor，保留 border-right。
ObservedSection	包装每个内容区块，接受 backgroundColor 和 id，使用 IntersectionObserver 报告自身可见性。
MainContent	滚动容器，内部渲染所有 ObservedSection。
5.3 关键代码逻辑（伪代码描述）
IntersectionObserver 核心逻辑：

ts
// 在 PageLayout 中
const observer = new IntersectionObserver(
  (entries) => {
    let maxRatio = 0;
    let bestId = null;
    entries.forEach(entry => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        bestId = entry.target.getAttribute('data-section-id');
      }
    });
    if (bestId) {
      const color = sectionColorMap[bestId];
      setActiveColor(color);
    }
  },
  { threshold: [0, 0.25, 0.5, 0.75, 1] }
);
每个 ObservedSection 在 useEffect 中注册/注销自身 DOM 元素。

SideNav 组件样式：

tsx
const SideNav = styled.aside<{ $bgColor: string }>`
  width: 240px;
  border-right: 1px solid #e2e8f0;
  background-color: ${props => props.$bgColor};
  transition: background-color 0.2s ease;   // 平滑切换
  /* 其他样式 */
`;
6. 与“透明叠加方案”的对比
维度	透明叠加方案	独立列 + 联动方案
边框覆盖	需精细控制，易遮挡	天然不覆盖
背景颜色联动	物理穿透，无需代码	通过滚动监听 + 状态更新实现
事件处理	复杂（需 pointer-events）	无额外问题
滚动行为	需额外同步	独立滚动，标准行为
性能	无额外监听开销	轻微监听开销（可优化）
背景灵活性	只能透明或半透明	任何颜色、渐变、图像均可
维护性	较低	高，逻辑集中
结论：独立列 + 联动方案稍复杂，但提供了更好的可控性和扩展性，尤其适合需要主题跟随、动态高亮的场景。

7. 进一步优化与变体
7.1 无需全背景跟随，只需高亮菜单项
如果要求不是左侧导航栏整体变色，而是对应菜单项的背景色跟随 Section 颜色变化：

每个 ObservedSection 携带 menuItemId。

活跃的 Section 触发高亮对应菜单项的背景色，而导航栏整体背景仍为统一颜色。

7.2 使用 CSS 自定义属性（CSS Variables）简化颜色传递
每个 Section 可以在其 style 中设置 --section-color，然后通过 JS 读取该变量值传给 SideNav，无需额外 map。

7.3 支持平滑滚动与锚点导航
当点击左侧导航菜单时，滚动到对应 Section，同时更新活跃颜色。这可以通过 scrollIntoView 配合手动更新 activeColor 实现，避免与 IntersectionObserver 冲突。

8. 实现要点总结
布局：CSS Grid 两列，无 gap，边框各自独立。

边框：左侧导航栏 border-right，Section border-top（第一个可选）。

背景联动：滚动监听 → 确定活跃 Section → 将它的背景色传递给 SideNav。

性能：使用 IntersectionObserver 代替 scroll 事件，合理设置 threshold。

组件封装：ObservedSection 自动注册/注销，降低使用复杂度。

此方案既满足“左侧导航栏背景颜色取决于 section 的背景颜色”，又避免了透明叠加的种种问题，适合生产环境使用。