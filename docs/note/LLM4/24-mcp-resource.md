## 24 Resource 基本知识

- MCP 不强制 URI 规则; 文本资源, uft8 编码; 二进制资源, 必须 base64 编码;
- 固定 method: resources/read;
- 实现; registerResource, resourceName, resourcePath; title, description, mimeType; uri, content, contents;
- utils.js; fs, path; readResource, filepath, filename, isBinary; try, filePath, content; 二进制转 base64, toString;
- `npx @modelcontextprotocol/inspector`

## 25 Schema

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

## 26. 注册资源模板

- 资源模板, 根据参数动态构建 URI; 三种 Schema, ReadResourceRequestSchema, ListResourcesRequestSchema, ListResourceTemplatesRequestSchema;
- 代码; src/assets, src/code; Server; StdioServerTransport; server, name, version, capabilities, resources; transport; connect;
- setRequestHandler, ListResourcesRequestSchema, resourceTemplates, uri, name, description, mimeType;
- setRequestHandler, ListResourceTemplatesRequestSchema, resources, name, description, uriTemplate, mimeType;
- 测试; `npx @modelcontextprotocol/inspector`;
- `import { Server } from "@modelcontextprotocol/sdk/server/index.js";import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";import { ListResourcesRequestSchema, ListResourceTemplatesRequestSchema } from "@modelcontextprotocol/sdk/types.js";const server = new Server({ name: "resources", version: "1.0.0", description: "提供资源的MCP服务器" }, { capabilities: { resources: {} } });server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: [{ uri: "bananaphone://info", name: "香蕉手机信息", description: "香蕉手机信息", mimeType: "text/plain" }, { uri: "image://books", name: "书籍图片", description: "书籍图片", mimeType: "image/jpeg" }] }));server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({ resourceTemplates: [{ uriTemplate: "code://file/{filename}", name: "js文件", description: "js文件", mimeType: "text/javascript" }] }));const transport = new StdioServerTransport();await server.connect(transport);`
- 读取资源模板; ListResourceTemplatesRequestSchema, request, params, uri; 根据 uri 判断三种类型数据; bananaphone://info, image://books, 以 code://file/ 开头; 返回, contents, uri, mimeType, text;
- `import { Server } from "@modelcontextprotocol/sdk/server/index.js";import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";import { ListResourcesRequestSchema, ListResourceTemplatesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";import { readBananaPhoneInfo, readCodeFile, readBinaryFile } from "./utils.js";const server = new Server({ name: "resources", version: "1.0.0", description: "提供资源的MCP服务器" }, { capabilities: { resources: {} } });server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources: [{ uri: "bananaphone://info", name: "香蕉手机信息", description: "香蕉手机信息", mimeType: "text/plain" }, { uri: "image://books", name: "书籍图片", description: "书籍图片", mimeType: "image/jpeg" }] }));server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({ resourceTemplates: [{ uriTemplate: "code://file/{filename}", name: "js文件", description: "js文件", mimeType: "text/javascript" }] }));server.setRequestHandler(ReadResourceRequestSchema, async (requests) => { const { uri } = requests.params; if (uri === "bananaphone://info") { const content = await readBananaPhoneInfo("src/assets", "bananaphone.txt"); return { contents: [{ uri: uri, text: content, mimeType: "text/plain" }] }; } if (uri === "image://books") { const content = await readBinaryFile("src/assets", "books.jpeg"); return { contents: [{ uri: uri, blob: content, mimeType: "image/jpeg" }] }; } if (uri.startsWith("code://file/")) { const content = await readCodeFile(uri.split("/").pop()); return { contents: [{ uri: uri, text: content, mimeType: "text/javascript" }] }; } throw new Error("资源不存在"); });const transport = new StdioServerTransport();await server.connect(transport);`
