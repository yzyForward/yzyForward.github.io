import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '智能座舱大模型落地实战',
  description: 'RAG / Multi-Agent / 多模态的工程落地笔记',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'RAG', link: '/01-座舱知识库父子分块' },
      { text: '多智能体', link: '/06-座舱多智能体架构' },
      { text: '多模态', link: '/11-座舱视觉接入Qwen3-VL' },
    ],
    sidebar: [
      {
        text: 'RAG 知识底座',
        collapsed: false,
        items: [
          { text: '父子分块', link: '/01-座舱知识库父子分块' },
          { text: '混合检索与精排', link: '/02-座舱知识库混合检索与精排' },
          { text: '查询改写与同义词表', link: '/03-座舱查询改写与同义词表' },
          { text: '缺证不作答', link: '/04-座舱RAG缺证不作答' },
          { text: '版本管理与权限缓存', link: '/05-座舱知识库版本与权限缓存' },
        ]
      },
      {
        text: '多智能体',
        collapsed: false,
        items: [
          { text: '1 中枢 + N 领域架构', link: '/06-座舱多智能体架构' },
          { text: 'A2A vs MCP', link: '/07-A2A与MCP的区别' },
          { text: '冲突仲裁', link: '/08-座舱多智能体冲突仲裁' },
          { text: 'RAG 封装为知识检索 Agent', link: '/09-座舱RAG封装为知识检索Agent' },
          { text: '端云协同与数据飞轮', link: '/10-座舱端云协同与数据飞轮' },
        ]
      },
      {
        text: '多模态',
        collapsed: false,
        items: [
          { text: 'Qwen3-VL 视觉接入', link: '/11-座舱视觉接入Qwen3-VL' },
          { text: '跨模态消解', link: '/12-座舱跨模态消解' },
          { text: '端侧 7B 量化蒸馏', link: '/13-座舱端侧7B量化蒸馏' },
          { text: '生物信息不出车', link: '/14-生物信息不出车' },
          { text: '误报率优化', link: '/15-座舱疲劳检测误报率优化' },
        ]
      },
    ],
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
  }
})
