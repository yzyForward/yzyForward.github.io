# A2A 和 MCP 到底什么区别：一个管 Agent 协作，一个管工具调用

> 元境智能座舱大模型落地实战系列第 7 篇。多智能体开发里，A2A 和 MCP 是两个最容易搞混的协议——名字都带"A"，很多人分不清。这篇一次性说清楚。

---

## 一、先给结论

一句话记住：

- **MCP（Model Context Protocol）管"Agent 调工具"**——模型怎么去调用外部的 API、数据源。
- **A2A（Agent-to-Agent）管"Agent 之间协作"**——一个 Agent 怎么把任务委派给另一个 Agent。

一个是"连工具"，一个是"Agent 间通信"。两个解决的是完全不同的两件事。

## 二、MCP：模型怎么连工具

MCP 解决的是"大模型和外部工具/数据源之间接口不统一"的老问题。

以前每接一个工具（车控 API、天气接口、知识库），都要写一套专门的对接代码，模型侧也要适配。工具一多，维护成本爆炸。

MCP 定了一套**标准协议**：工具以 **MCP Server** 的形式暴露，Server 定义好有哪些工具（tool）、什么参数（schema）、怎么调用；模型侧通过 **MCP Client** 按协议发现工具、发起调用。

好处：**工具可插拔**。新增一个数据源，加一个 MCP Server 就行，不用改模型侧代码。

架构上它是 **Client-Server 模式**：MCP Client（Agent）→ MCP Server（工具/数据源）。

## 三、A2A：Agent 之间怎么协作

A2A 解决的是"多个 Agent 之间怎么互相派活、回传结果"的问题。

多智能体协作里，中枢 Agent 要把任务委派给领域 Agent，领域 Agent 做完要把产物回传给中枢。如果没有统一协议，每个 Agent 的接口、产物格式、任务生命周期都不一样，中枢要逐个适配。

A2A 统一了**任务生命周期和产物格式**（task / message / artifact）：

- task：一个任务的定义和状态；
- message：Agent 之间的通信；
- artifact：任务的产物（结果、中间文件等）。

好处：**编排层和 Agent 实现解耦**。换 Agent、加 Agent，不用改编排逻辑。

## 四、一个具体例子把两者串起来

用户说"帮我查一下这个功能的说明书"：

1. 中枢 Agent 判断这是"知识问答"任务，通过 **A2A** 委派给"知识检索 Agent"；
2. 知识检索 Agent 内部，通过 **MCP** 去调向量库的检索工具，拿到结果；
3. 知识检索 Agent 把整理好的证据通过 **A2A** 回传给中枢；
4. 中枢再调大模型生成答案。

看到了吗？**A2A 负责 Agent 之间（中枢 ↔ 知识检索 Agent），MCP 负责 Agent 到工具（知识检索 Agent → 向量库）。**

## 五、常见误区

1. **以为 A2A 和 MCP 是竞争关系**：不是，它们是不同层的东西，经常一起用。
2. **把工具调用当成 Agent 协作**：Agent 调一个工具 ≠ 两个 Agent 协作。前者是 MCP，后者是 A2A。
3. **用裸 RPC 代替 A2A**：裸 RPC 也能传数据，但没有统一任务生命周期和产物格式，扩展时到处改。

## 六、总结

可复用的一句话：**MCP 管工具调用，A2A 管 Agent 间委派，前者连工具、后者连 Agent。**

选型上：

- 一个 Agent 要调外部 API/数据源 → **MCP**。
- 多个 Agent 要分工协作、派活回传 → **A2A**。

---

## 附：核心代码

```python
"""MCP vs A2A（脱敏示意）"""

# ── MCP：Agent 调工具（连外部能力）──
from mcp.server import Server

server = Server("cockpit-tools")

@server.tool()
def set_temperature(celsius: int) -> str:
    """设置空调温度。参数 celsius：16~30"""
    if not 16 <= celsius <= 30:
        return "参数越界：celsius 需在 16~30"
    return car_control.set_ac(celsius)

@server.tool()
def navigate_to(destination: str) -> str:
    """设置导航目的地"""
    return navigation.start_route(destination)

# ── A2A：Agent 间委派（中枢 -> 领域 Agent）──
from a2a import A2AClient

client = A2AClient()

# 派活：统一 task / message / artifact 结构
task = client.send_task(
    agent="car_control",
    task={"type": "set_temperature", "payload": {"celsius": 22}},
    timeout=2.0,
)
# 领域 Agent 做完，通过 A2A 回传产物（artifact）
result = client.get_result(task.id)
```

一眼看懂：`@mcp.tool` 是"给模型接一个函数"；`a2a_client.send_task` 是"把活派给另一个 Agent"。前者连工具，后者连 Agent。

---

*下一篇：《多智能体冲突仲裁：置信度 + 优先级 + DAG 确定性调度》。*
