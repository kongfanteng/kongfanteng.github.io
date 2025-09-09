# 16 外接 deepseek

## 记忆

1. 切换在线模型；deepseek 开放平台；``;

```
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-bf1bad7b4d9b4f319c682b3ea791f060" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "user", "content": "你是谁？"}
        ],
        "stream": false
      }'
```

2. 流式

```
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-bf1bad7b4d9b4f319c682b3ea791f060" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "user", "content": "你是谁？"}
        ],
        "stream": true
      }'
```

3. 重构聊天机器人；非 data 开头跳出，data 开头过滤 data 前缀；data?.choices[0]?.delta?.content;

4. [压缩包](/public/zip/16-外接-deepseek.zip), 解决了天气获取不到的问题
