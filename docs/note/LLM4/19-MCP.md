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
