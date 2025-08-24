---
outline: deep
---

# Notepads

## `user接口文档`

```md
📌 模块：用户管理模块

✅ 接口：GET /api/users

- 返回活跃用户列表（isActive = true）
- 支持通过 query 参数筛选 role
- 默认分页大小为 20，最大为 100

📦 响应字段说明：

- id: string，用户唯一标识
- name: string，用户名
- roles: string[]，可包含 "admin" | "editor" | "viewer"
- createdAt: ISO8601 字符串
- isActive: boolean，是否处于激活状态

⚠️ 注意事项：

- 部分老用户的 `roles` 字段可能为 null，请使用空数组兜底处理
- 若无数据，返回空数组 `[]`，不会返回 null

📍 示例请求：
GET /api/users?role=editor&page=2
```

- 使用 @Notepads 选择 `user接口文档`，输入 解释一下 或 `为什么我的 `users.length` 总是比预期少？`
- Rules 行为规范，应该怎么办；Notepads 背景信息（上下文），自行判断应该怎么办；
