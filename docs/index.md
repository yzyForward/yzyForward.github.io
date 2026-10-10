---
layout: home
hero:
  name: 元境智能座舱大模型落地实战
  text: RAG / Multi-Agent / 多模态
  tagline: 从知识底座到多智能体、再到多模态，17 篇工程笔记讲透智能座舱大模型落地的完整链路
  actions:
    - theme: brand
      text: 从项目总览开始
      link: /00-项目总览
    - theme: alt
      text: 关于作者
      link: /about
features:
  - title: 项目总览
    details: 项目背景、技术选型、整体架构、端云协同、关键指标
  - title: RAG 知识底座
    details: 父子分块、混合检索、精排、缺证不作答、版本权限缓存
  - title: 多智能体
    details: 1 中枢 + N 领域、A2A/MCP、冲突仲裁、端云协同、数据飞轮
  - title: 多模态
    details: 端侧 Qwen2.5-Omni-7B、云端 Qwen3-VL、跨模态消解、生物信息不出车、误报率优化
  - title: 工程落地
    details: LoRA 微调、INT8 量化、Langfuse 评测、灰度回滚、数据飞轮
  - title: 安全合规
    details: 生物信息不出车、人脸脱敏、权限隔离、版本管理
---

<div class="motto">
  <div class="motto-text">欲知，且试</div>
  <div class="motto-sub">—— 想知道答案，就亲手去试出来</div>
</div>

<style>
.motto {
  text-align: center;
  padding: 48px 0 24px;
  border-top: 1px solid var(--vp-c-divider);
}
.motto-text {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 6px;
  background: linear-gradient(120deg, var(--vp-c-brand), var(--vp-c-brand-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.motto-sub {
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
