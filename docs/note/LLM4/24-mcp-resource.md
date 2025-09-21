## 24 Resource 基本知识

- 步骤: 创建文件->LLM-config 配置->新增 header xx -> 完整阶段视频->重要内容笔记->代码->测试->更新笔记->部署;

- MCP 不强制 URI 规则; 文本资源, uft8 编码; 二进制资源, 必须 base64 编码;
- 固定 method: resources/read;
- 实现; registerResource, resourceName, resourcePath; title, description, mimeType; uri, content, contents;
- utils.js; fs, path; readResource, filepath, filename, isBinary; try, filePath, content; 二进制转 base64, toString;
- `npx @modelcontextprotocol/inspector`
