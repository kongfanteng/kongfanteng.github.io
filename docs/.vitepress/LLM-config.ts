export const LLMConfig = {
  text: "LLM",
  collapsed: true,
  items: [
    {
      text: "LLM1",
      collapsed: true,
      items: [
        { text: "01-info", link: "/note/LLM/01-info" },
        { text: "02-N-Gram 模型", link: "/note/LLM/02-N-Gram-model" },
        { text: "03-词袋模型", link: "/note/LLM/03-词袋模型" },
        { text: "04-词元", link: "/note/LLM/04-词元" },
        { text: "05-嵌入", link: "/note/LLM/05-嵌入" },
      ],
    },
    {
      text: "LLM2",
      collapsed: true,
      items: [
        {
          text: "06-transformer内部结构",
          link: "/note/LLM2/06-transformer内部结构",
        },
        {
          text: "07-Transformer解码策略",
          link: "/note/LLM2/07-Transformer解码策略",
        },
        {
          text: "08-transformer块",
          link: "/note/LLM2/08-transformer块",
        },
        {
          text: "09-本地部署大模型",
          link: "/note/LLM2/09-本地部署大模型",
        },
        {
          text: "10-Agent",
          link: "/note/LLM2/10-Agent",
        },
      ],
    },
    {
      text: "LLM3",
      collapsed: true,
      items: [
        { text: "11-流式返回信息", link: "/note/LLM3/11-流式返回信息" },
        { text: "12-支持上下文", link: "/note/LLM3/12-支持上下文" },
        { text: "13-获取实时消息", link: "/note/LLM3/13-获取实时消息" },
        { text: "16-外接 deepseek", link: "/note/LLM3/16-外接_deepseek" },
        { text: "17-FunctionCalling", link: "/note/LLM3/17-FunctionCalling" },
      ],
    },
  ],
};
