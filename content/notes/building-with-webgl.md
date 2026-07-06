# 01 / 从 Three.js 开始

Most WebGL work begins safely inside a framework. Three.js provides scene graphs, materials, and loaders that let you ship visuals without touching raw buffer calls. That safety is a good starting point, but it can also hide the cost of each draw call.

The first lesson: the scene graph is not free. Every object carries matrix updates, frustum checks, and uniform uploads. Large scenes need visibility culling and batching regardless of the framework.

---

# 02 / 着色器初探

Once you write your first fragment shader, the pipeline stops feeling like magic and starts feeling like a contract. Inputs, outputs, and precision all have visible consequences.

- Start with a single full-screen quad before moving to meshes.
- Use `discard` sparingly; it breaks early-z optimizations.
- Prefer `mediump` unless the visual artifact proves otherwise.

---

# 03 / 性能调试

Profiling WebGL is different from profiling JavaScript. The GPU is asynchronous, and frame timing tools vary across browsers. The most reliable signal is still a controlled before-and-after measurement.

1. Establish a baseline frame time.
2. Change one variable at a time.
3. Record on multiple devices and drivers.
4. Document the result next to the change.

---

# 04 / 下一步

The next stretch is compute-style passes: transform feedback, instancing, and eventually raw WebGL2 for experiments that Three.js cannot express cheaply.
