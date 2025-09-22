## 24 Resource 基本知识

- MCP 不强制 URI 规则; 文本资源, uft8 编码; 二进制资源, 必须 base64 编码;
- 固定 method: resources/read;
- 实现; registerResource, resourceName, resourcePath; title, description, mimeType; uri, content, contents;
- utils.js; fs, path; readResource, filepath, filename, isBinary; try, filePath, content; 二进制转 base64, toString;
- `npx @modelcontextprotocol/inspector`

## 25 Schema

- 步骤: 创建文件->LLM-config 配置->新增 header xx -> 完整阶段视频->重要内容笔记->代码->测试->更新笔记->部署;
- Schema, mcp 核心要素, 模式验证库;
- zodTest.js; z, userSchema, object, name, age, input, result, safeParse, success, error, format;
- `import { z } from "zod";console.log(z.object({name:z.string(),age:z.number()}).safeParse({name:"John",age:"20"}).success?"通过":"不通过");`
- 可选, partial; pick, omit, merge;
- Schema, 验证协议消息结构;
- Schematest.js; ReadResourceRequestSchema, requestParams, method, params, resource, safeParse, success, error, format;
- `import { ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";console.log(ReadResourceRequestSchema.safeParse({method:"resources/read",params:{uri:"http://example.com/resource"}}).success?"通过":"不通过");`
- setRequestHandler, sdk 提供的底层方法;
- server.js; Server, StdioServerTransport, server, name, version, capabilities, tools, connect;
- setRequestHandler, ListToolsRequestSchema, tools, sum;
- CallToolRequestSchema, requests, name, arguments, result, content, type, text;
- npx @modelcontextprotocol/inspector;
- `import { Server } from "@modelcontextprotocol/sdk/server/index.js";import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";const server = new Server({ name: "Schema", version: "1.0.0", }, { capabilities: { tools: {}, }, });server.setRequestHandler(ListToolsRequestSchema, async () => { return { tools: [ { name: "sum", description: "得到两个数的和", inputSchema: { type: "object", properties: { a: { type: "number", description: "第一个数" }, b: { type: "number", description: "第二个数" }, }, required: ["a", "b"], }, }, ], }; });server.setRequestHandler(CallToolRequestSchema, async (requests) => { const { name, arguments: args } = requests.params; if (name === "sum") { const { a, b } = args; const result = a + b; return { content: [{ type: "text", text: `两个数的和为${result}` }], }; } });server.connect(new StdioServerTransport());`
