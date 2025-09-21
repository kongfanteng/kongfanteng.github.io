## 19-【MCP】stdio

1. 进程; 监听输入，对外输出; 监听 process.stdin.on('data', ()=> {}); 父子进程模型，终端启动 node 进程;
2. stdio, 标准输入输出; 通信; server.js; client.js; S, stdin.on, stdout.write; setEncoding;
3. client.js

```
const { spawn } = require("child_process");

// 启动 server.js 子进程
const serverProcess = spawn("node", ["server.js"]); // node server.js

// 监听服务端的响应
// 数据从哪里来？哪个进程给我的
// 数据会输出到哪儿？我给哪个进程
serverProcess.stdout.on("data", (data) => {
    process.stdin.write(data.toString()); // 🙋 往哪里输出？
});

// 发送几条测试消息
const messages = ["生命有意义吗？", "宇宙有尽头吗？", "再见！"];

messages.forEach((msg, index) => {
  setTimeout(() => {
    console.log(`-->${msg}`);
    serverProcess.stdin.write(msg);
  }, index * 1000); // 每秒发一条
});
```

4. 来自于 server.js, 发给终端;
5. stdio 仅限于本地通信
6. [19-stdio 压缩包](/public/zip/19-stdio.zip)

### 理解

1. 父子进程模型; stdio 仅限于本地通信;

## 20-【MCP】JSON-RPC2.0

1. 通信格式; RPC2.0 基于 json; 远程函数调用;
2. jsonrpc, method, params, id;
3. demo; server.js; stdin.on; utils.js, 导出 sum; req, funcName, params, result;
4. createFile; filename, content; fs 写入;

```
const utils = require("./utils");
process.stdin.on("data", (data) => {
  const req = JSON.parse(data);
  const { method, params } = req;
  const result = utils[method](params);
  const res = JSON.stringify({ id: req.id, result });
  process.stdout.write(res);
});

/** { "jsonrpc": "2.0", "method": "sum", "params": { "a": 11, "b": 22 }, "id": 1 }

{ "jsonrpc": "2.0", "method": "createFile", "params": {  "filename": "/Users/workplace/LEARN/ai-practice/mcp/MCP_JSON/test.txt", "content": "Hello, MCP!" }, "id": 2 } */
```

## 21-【MCP】Server

整理逻辑，抽离主要逻辑;

1. mcp，规定程序如何通信;
2. server.js; stdin.on; req, result;

```
const tools = require("./tools.js");
const protocal = require("./protocal.js");
process.stdin.on("data", (data) => {
  const req = JSON.parse(data);
  let result; // 存储执行工具的结果
  if (req.method === "tools/call") {
    // 说明是要调用工具
    result = tools[req.params.name](req.params.arguments);
  } else if (req.method in protocal) {
    result = protocal[req.method](req.params);
  } else {
    return;
  }

  const res = {
    jsonrpc: "2.0",
    result,
    id: req.id,
  };

  process.stdout.write(JSON.stringify(res) + "\n");
});


```

3. 调用，方法，传参; res; write; tools.js;

```
const fs = require("fs");
module.exports = {
  sum({ a, b }) {
    return {
      content: [
        {
          type: "text",
          text: `两个数求和结果为${a + b}`,
        },
      ],
    };
  },
  createFile({ filename, content }) {
    try {
      fs.writeFileSync(filename, content);
      return {
        content: [
          {
            type: "text",
            text: "文件创建成功",
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: err.message || "文件创建失败",
          },
        ],
      };
    }
  },
};

```

3. protocal.js; initialize, toos/list;

```
module.exports = {
  initialize() {
    return {
      protocolVersion: "2024-11-05",
      capabilities: {
        logging: {},
        prompts: {
          listChanged: true,
        },
        resources: {
          subscribe: true,
          listChanged: true,
        },
        tools: {
          listChanged: true,
        },
      },
      serverInfo: {
        // 服务端信息
        name: "ExampleServer",
        title: "Example Server Display Name",
        version: "1.0.0",
      },
      instructions: "Optional instructions for the client",
    };
  },
  "tools/list"() {
    return {
      tools: [
        {
          name: "sum",
          title: "两数求和",
          description: "得到两个数的和",
          inputSchema: {
            type: "object",
            properties: {
              a: {
                type: "number",
                description: "第一个数",
              },
              b: {
                type: "number",
                description: "第二个数",
              },
            },
            required: ["a", "b"],
          },
        },
        {
          name: "createFile",
          title: "创建文件",
          description: "在指定目录下创建一个文件",
          inputSchema: {
            type: "object",
            properties: {
              filename: {
                type: "string",
                description: "文件名",
              },
              content: {
                type: "string",
                description: "文件内容",
              },
            },
            required: ["filename", "content"],
          },
        },
      ],
    };
  },
};
```

4. 测试文件.txt

```
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"roots":{"listChanged":true},"sampling":{},"elicitation":{}},"clientInfo":{"name":"ExampleClient","title":"Example Client Display Name","version":"1.0.0"}}}

{"jsonrpc":"2.0","id":1,"method":"tools/list"}

{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"sum","arguments":{"a":1, "b":2}}}

{ "jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": { "name" :"createFile",  "arguments":{"filename": "/Users/workplace/LEARN/ai-practice/mcp/21.mcp_server/output.txt", "content": "Hello, AI!"}}}

```

4. tools.js; 创建文件; createFile;
5. 安装测试 mcpserver 的安装包; `npx @modelcontextprotocol/inspector`
