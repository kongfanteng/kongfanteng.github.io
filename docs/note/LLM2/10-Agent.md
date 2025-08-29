# 10-Agent

## 记忆

1. 11434 端口；/api/tags;

```bash
curl http://localhost:11434/api/tags # 查看本地模型
```

2. 11434 端口；/api/generate;

```bash
curl http://localhost:11434/api/generate -d '{
    "model": "gpt-3.5-turbo",
    "prompt": "你是谁？"
}'
```

3. [压缩包-/public/zip/client_server.zip](/public/zip/client_server.zip)
