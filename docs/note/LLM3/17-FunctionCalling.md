## 17-FunctionCalling 理论

### 记忆

1. JSON Schema 标准化；Function Calling;
2. 大模型微调；

## 18-FunctionCalling 实践

1. utils/tools.js; 工具描述 Json;

```js deepseek
// 工具箱
// 导出工具描述
// 通过 JSON 来描述工具，不同的大模型对应的JSON结构不一样
module.exports = [
  {
    type: "function",
    function: {
      name: "getWeather",
      description: "获取指定城市和日期的天气信息",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "城市名称，如：北京、上海、广州",
          },
          date: {
            type: "string",
            description: "日期，只能是：今天、明天、后天",
          },
        },
        required: ["city", "date"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "translate",
      description: "将指定的文本从中文翻译到英文",
      parameters: {
        type: "object",
        properties: {
          input: {
            type: "string",
            description: "需要翻译的文本",
          },
        },
        required: ["input"],
      },
    },
  },
];
```

2. 重构 LLM; 统一使用流式; requestBody; toolCalls, 要调用的工具数组, {index, id, type, function}; return {content, tool_calls}; delta; delta.content; delta.tool_calls; 不同分支逻辑; existingCall; push; 流式返回，参数不完整; 导出改变; messages; callLLM 以枚举传入; args 字符串转换为对象;

3. 重构 routes/index.js; toolList; messages; response.tool_calls; {role, content}; toolResults; functionName; args; tool_call_id, role, content; 未知工具; 工具调用失败; 结果放入 messages; callLLM; conversations, user, assistant; 限制会话长度; await 等待工具调用结果;

4. [压缩包](/public/zip/18-FunctionCalling.zip), 使用 FunctionCalling 重构聊天应用
