## 22-[mcp] 官方 sdk

### 官方 sdk 实现 MCP 服务期

1. `@modelcontextprotocol/sdk@1.16.0 zod@3.25.76`, `"type": "module",`, `"start": "node ./src/server.js"`;
2. McpServer; StdioServerTransport; server, name, version, transport, connect;
3. 测试; `npx @modelcontextprotocol/inspector`;
4. 注册工具; registerTool, sum, title, description; inputSchema; a; b; zod; 注册, 函数名, 参数, 具体实现;

### MCP Host

1. MCP Host: AI 应用; MCP Client 与 Server 交互;

#### package.json

1. `@modelcontextprotocol/sdk@1.16.0 zod@3.25.76`
2. `"type": "module",`
3. `"start": "node ./src/server.js"`

#### server.js

```js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";

const server = new McpServer({
  name: "my mcp server",
  version: "0.1.0",
});

// 注册一个工具
server.registerTool(
  "sum", // 工具名称
  {
    title: "两数求和",
    description: "得到两个数的和",
    inputSchema: {
      a: z.number().describe("第一个数"),
      b: z.number().describe("第二个数"),
    },
  },
  ({ a, b }) => {
    // 正常的工具（函数）的逻辑
    return {
      content: [
        {
          type: "text",
          text: `两个数的和为${a + b}`,
        },
      ],
    };
  }
);

server.registerTool(
  "createFile",
  {
    title: "创建文件",
    description: "在指定目录下创建一个文件",
    inputSchema: {
      filename: z.string().describe("文件名"),
      content: z.string().describe("文件内容"),
    },
  },
  ({ filename, content }) => {
    try {
      fs.writeFileSync(filename, content);
      return {
        content: [
          {
            type: "text",
            text: `文件创建成功！`,
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: err.message || "文件创建失败！",
          },
        ],
      };
    }
  }
);

const transport = new StdioServerTransport(); // 创建一个 stdio 的传输通道
server.connect(transport); // 进行连接
```
