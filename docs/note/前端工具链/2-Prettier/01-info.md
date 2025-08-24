# 介绍

## 记忆

1. Prettier 代码风格的修正工具；[官网](https://prettier.io/)；
2. 最佳实践的理论依据：论文《A Prettier printer》；
3. 工作原理：源代码 -> AST -> Prettier 处理 -> 输出代码；
4. Prettier 为 Opinionated 工具（全部默认配置），已经是最佳实践；
5. Prettier 使用流程整理：

- 新建项目文件夹：`prettier-demo`
- 初始化项目：`pnpm init`
- 安装 Prettier（精确版本，开发依赖）：`pnpm i prettier -D --save-exact`
- 新建代码文件：`index.js`
- 在 `package.json` 的 scripts 添加格式化命令：`"format": "prettier --write ."`
- 新建配置文件：`.prettierrc`

`.prettierrc` 示例配置：

```bash
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 60,
  "trailingComma": "es5"
}
```

6. vscode 插件 Prettier - Code formatter（实时性）
