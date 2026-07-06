---
title: "On Consistency in Distributed Systems"
titleZh: "关于分布式系统中一致性的一些思考"
date: "2025.05.28"
category: "Tech"
readingTime: "8 min read"
tags: ["Distributed Systems", "Architecture", "Consistency"]
coverImage: "/images/contents/aquaElement.png"
excerpt: "一致性不是二元的。它是一组保证的连续谱，每种保证都有不同的成本与故障模式。这里记录对 CAP、一致性模型与工程权衡的理解。"
language: "mixed"
---

# 01 / CAP 权衡

Consistency in distributed systems is not a binary property. It is a spectrum of guarantees, each with different costs and failure modes.

CAP theorem states that a distributed data store cannot simultaneously guarantee consistency, availability, and partition tolerance. Since partitions are unavoidable, the real choice is between consistency and availability.

```
C -- A -- P
|         |
+---------+
```

But this framing is too coarse. Modern systems rarely choose at the system level. They choose per operation.

---

# 02 / 一致性模型

### 强一致性

Every read sees the most recent write. Simple to reason about, expensive to implement across regions.

### 最终一致性

Reads may return stale data, but all replicas converge. This is the default for many large-scale systems.

### 因果一致性

Operations that are causally related are seen in order. Independent operations may be reordered. This offers a middle ground that matches human intuition about cause and effect.

---

# 03 / 实际影响

When designing a system, ask:

- What is the cost of stale data?
- Can the user tolerate temporary inconsistency?
- Is there a single source of truth, or many reconciled views?

> The best consistency model is the weakest one your product can tolerate.

---

# 04 / 延伸阅读

- Designing Data-Intensive Applications by Martin Kleppmann
- Spanner: Google's Globally-Distributed Database
- Dynamo: Amazon's Highly Available Key-value Store
