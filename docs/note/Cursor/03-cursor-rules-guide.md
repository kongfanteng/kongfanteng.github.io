# Cursor Rules 开发规范指南

## 概述

本文档记录了项目中 `.cursor` 目录下的开发规范规则，这些规则帮助 AI 助手更好地理解代码库结构和开发标准，确保代码质量和一致性。

## 项目目录结构

```
├── .cursor/
│ └── rules/
│ ├── base.mdc      # 基础规则
│ ├── react.mdc     # React 相关规则
│ ├── typescript.mdc # TypeScript 规则
│ ├── test.mdc      # 测试规则
│ ├── doc.mdc       # 文档规则
│ └── markdown.mdc  # Markdown 规则
└── src/
├── components/
├── features/
└── tests/
```

## 基础开发规范 (base.mdc)

```md
---
description:
globs:
alwaysApply: false
---

# 项目基础开发规范

## 基础开发规则

- 使用 ESLint 和 Prettier 进行代码格式化
- 文件命名采用 kebab-case
- 导入语句按类型分组并排序
- 避免魔法数字，使用常量定义
- 函数长度不超过 50 行

## 项目目录结构

├── .cursor/
│ └── rules/
│ ├── base.mdc # 基础规则
│ ├── react.mdc # React 相关规则
│ ├── typescript.mdc # TypeScript 规则
│ ├── testing.mdc # 测试规则
│ └── docs.mdc # 文档规则
└── src/
├── components/
├── features/
└── tests/
```

### 适用范围

所有项目文件

### 核心规则

#### 1. 代码格式化

- 使用 ESLint 和 Prettier 进行代码格式化
- 保持代码风格一致性

#### 2. 文件命名规范

- 采用 kebab-case 命名方式
- 文件名应具有描述性

```bash
# ✅ 推荐
user-profile-card.tsx
api-service.ts
button-component.module.css

# ❌ 避免
UserProfileCard.tsx
apiService.ts
button.module.css
```

#### 3. 导入语句规范

- 按类型分组并排序
- 使用绝对路径导入

```tsx
// 1. 第三方库导入
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// 2. 内部模块导入
import { Button } from "@/components";
import { useAuth } from "@/hooks";

// 3. 相对路径导入
import "./styles.module.css";
```

#### 4. 代码质量要求

- 避免魔法数字，使用常量定义
- 函数长度不超过 50 行
- 保持代码简洁和可读性

```tsx
// ✅ 推荐：使用常量
const ANIMATION_DURATION = 300;
const MAX_RETRY_COUNT = 3;

// ❌ 避免：魔法数字
setTimeout(() => {}, 300);
for (let i = 0; i < 3; i++) {}
```

## TypeScript 开发规范 (typescript.mdc)

```md
---
description:
globs:
alwaysApply: false
---

Description:
TypeScript 开发规范，确保类型安全和代码质量

Globs:
**/\*.ts, **/\*.tsx

# TypeScript 规则

- 禁用 any 类型，使用 unknown 替代
- 启用 strict 模式
- 使用类型推导减少冗余类型声明
- 公共函数必须包含 JSDoc 注释
- 使用 type 而不是 interface（除了 Props）
```

### 适用范围

- `**/*.ts`
- `**/*.tsx`

### 核心规则

#### 1. 类型安全

- 禁用 `any` 类型，使用 `unknown` 替代
- 启用 strict 模式
- 使用类型推导减少冗余类型声明

```tsx
// ✅ 推荐：使用 unknown
function processData(data: unknown) {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  return String(data);
}

// ❌ 避免：使用 any
function processData(data: any) {
  return data.toUpperCase();
}
```

#### 2. 类型定义规范

- 使用 `type` 而不是 `interface`（除了 Props）
- 公共函数必须包含 JSDoc 注释

```tsx
// ✅ 推荐：Props 使用 interface
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

// ✅ 推荐：其他类型使用 type
type ButtonVariant = "primary" | "secondary" | "outline";
type ApiResponse<T> = {
  data: T;
  status: number;
};

// ✅ 推荐：JSDoc 注释
/**
 * 处理用户登录
 * @param credentials 用户凭据
 * @returns 登录结果
 */
function handleLogin(credentials: LoginCredentials): Promise<LoginResult> {
  // 实现逻辑
}
```

## React 组件开发规范 (react.mdc)

```md
---
description:
globs:
alwaysApply: false
---

Description:
React 组件开发规范，确保组件的可维护性和性能

Globs:
src/components/**/\*.tsx, src/features/**/\*.tsx

# React 组件开发规范

- 优先使用函数组件和 Hooks
- 组件文件结构：
  1. 类型定义
  2. 常量声明
  3. 组件实现
  4. 样式定义
- Props 必须使用 interface 定义类型
- 使用 React.memo() 优化渲染性能
- 样式使用 CSS Modules 或 styled-components
- @base.mdc
```

### 规则名称

`react`

### 适用范围

- `src/components/**/*.tsx`
- `src/features/**/*.tsx`

### 核心原则

#### 1. 优先使用函数组件和 Hooks

```tsx
// ✅ 推荐：函数组件
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  return <div>{prop1}</div>;
};

// ❌ 避免：类组件
class MyComponent extends React.Component {
  // ...
}
```

#### 2. 组件文件结构规范

按照以下顺序组织代码：

```tsx
// 1. 类型定义
interface ComponentProps {
  /** 属性描述 */
  prop1: string;
  prop2?: number;
}

// 2. 常量声明
const CONSTANTS = {
  DEFAULT_VALUE: "default",
  ANIMATION_DURATION: 300,
} as const;

// 3. 组件实现
const Component: React.FC<ComponentProps> = React.memo(
  ({ prop1, prop2 = CONSTANTS.DEFAULT_VALUE, ...props }) => {
    // 组件逻辑
    return <div>{prop1}</div>;
  }
);

// 4. 样式定义 (在单独的 CSS 文件中)
```

#### 3. Props 类型定义规范

- 必须使用 `interface` 定义类型
- 添加详细的 JSDoc 注释
- 使用可选属性标记非必需属性

```tsx
interface ButtonProps {
  /** 按钮文本内容 */
  children: React.ReactNode;
  /** 按钮类型 */
  variant?: "primary" | "secondary" | "outline";
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件处理函数 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

#### 4. 性能优化

- 使用 `React.memo()` 优化渲染性能
- 合理使用 `useCallback` 和 `useMemo`
- 避免在渲染函数中创建新对象

```tsx
// ✅ 推荐：使用 React.memo
const OptimizedComponent = React.memo<ComponentProps>(({ prop1 }) => {
  return <div>{prop1}</div>;
});

// ✅ 推荐：使用 useCallback
const handleClick = useCallback(
  (event) => {
    // 处理逻辑
  },
  [dependencies]
);
```

#### 5. 样式管理

- 使用 CSS Modules 或 styled-components
- 避免内联样式
- 保持样式的一致性和可维护性

```tsx
// ✅ 推荐：CSS Modules
import styles from "./Component.module.css";

const Component = () => {
  return <div className={styles.container}>内容</div>;
};

// ✅ 推荐：styled-components
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) =>
    props.variant === "primary" ? "blue" : "gray"};
  padding: 0.5rem 1rem;
`;
```

## 使用说明

### 1. 创建新组件时

当创建新的 React 组件时，请遵循以下步骤：

1. **确定组件位置**

   - 通用组件放在 `src/components/`
   - 功能特定组件放在 `src/features/`

2. **创建文件结构**

   ```bash
   src/components/MyComponent/
   ├── MyComponent.tsx
   ├── MyComponent.module.css
   ├── MyComponent.test.tsx
   └── index.ts
   ```

3. **编写组件代码**
   - 按照规范的文件结构组织代码
   - 使用 TypeScript 定义完整的类型
   - 添加必要的注释和文档

### 2. 代码审查要点

在代码审查时，请检查以下要点：

- [ ] 是否使用了函数组件和 Hooks
- [ ] 是否按照规范的文件结构组织代码
- [ ] Props 是否使用 interface 定义类型
- [ ] 是否使用了 React.memo() 进行性能优化
- [ ] 样式是否使用了 CSS Modules 或 styled-components
- [ ] 是否添加了必要的注释和文档

### 3. 常见问题解决

#### 问题：组件重新渲染过多

**解决方案**：

```tsx
// 使用 React.memo
const Component = React.memo<Props>(({ prop1 }) => {
  return <div>{prop1}</div>;
});

// 使用 useCallback 优化事件处理函数
const handleClick = useCallback(() => {
  // 处理逻辑
}, []);
```

#### 问题：类型定义不完整

**解决方案**：

```tsx
// 使用 interface 定义完整类型
interface ComponentProps {
  /** 必需属性 */
  requiredProp: string;
  /** 可选属性 */
  optionalProp?: number;
  /** 事件处理函数 */
  onEvent?: (data: EventData) => void;
}
```

#### 问题：样式管理混乱

**解决方案**：

```tsx
// 使用 CSS Modules
import styles from "./Component.module.css";

const Component = () => {
  return <div className={`${styles.container} ${styles.variant}`}>内容</div>;
};
```

## 最佳实践

### 1. 组件命名

- 使用 PascalCase 命名组件
- 文件名与组件名保持一致
- 使用描述性的名称

```tsx
// ✅ 推荐
UserProfileCard.tsx;
ProductList.tsx;
NavigationMenu.tsx;

// ❌ 避免
userCard.tsx;
prodList.tsx;
nav.tsx;
```

### 2. 文件组织

- 每个组件一个文件夹
- 包含组件、样式、测试和导出文件
- 使用 index.ts 统一导出

### 3. 类型安全

- 使用 TypeScript 严格模式
- 避免使用 `any` 类型
- 为所有 props 定义类型

### 4. 性能考虑

- 合理使用 React.memo()
- 避免不必要的重新渲染
- 优化事件处理函数

## 总结

遵循这些开发规范可以确保：

1. **代码一致性** - 所有组件遵循相同的结构和风格
2. **可维护性** - 清晰的代码组织便于维护和扩展
3. **性能优化** - 合理的优化策略提升应用性能
4. **类型安全** - 完整的 TypeScript 类型定义减少运行时错误
5. **团队协作** - 统一的规范便于团队协作和代码审查

通过遵循这些规范，我们可以构建高质量、可维护的 React 应用程序。

## 测试开发规范 (test.mdc)

```md
---
description:
globs:
alwaysApply: false
---

Description:
单元测试和集成测试规范

Globs:
src/**/\*.test.ts, src/**/\*.test.tsx

# 测试规则

- 使用 React Testing Library
- 测试文件与源文件同目录
- 测试用例结构：
  1. 准备测试数据
  2. 执行被测试代码
  3. 断言结果
- Mock 外部依赖使用 MSW
- 测试覆盖率要求：
  - 语句覆盖率 > 80%
  - 分支覆盖率 > 70%
  - 函数覆盖率 > 90%
```

### 适用范围

- `src/**/*.test.ts`
- `src/**/*.test.tsx`

### 核心规则

#### 1. 测试框架选择

- 使用 React Testing Library
- 测试文件与源文件同目录
- 使用 Jest 作为测试运行器

#### 2. 测试用例结构

按照 AAA 模式组织测试：

```tsx
describe("Button Component", () => {
  it("should render correctly", () => {
    // 1. 准备测试数据 (Arrange)
    const mockOnClick = jest.fn();

    // 2. 执行被测试代码 (Act)
    render(<Button onClick={mockOnClick}>Click me</Button>);

    // 3. 断言结果 (Assert)
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

#### 3. Mock 策略

- Mock 外部依赖使用 MSW (Mock Service Worker)
- 避免过度 Mock，优先测试真实行为

#### 4. 测试覆盖率要求

- 语句覆盖率 > 80%
- 分支覆盖率 > 70%
- 函数覆盖率 > 90%

```tsx
// ✅ 推荐：完整的测试覆盖
describe("UserProfile", () => {
  it("should display user information", () => {
    const user = { name: "John", email: "john@example.com" };
    render(<UserProfile user={user} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("should handle loading state", () => {
    render(<UserProfile user={null} loading={true} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
```

## 文档编写规范 (doc.mdc)

```md
---
description:
globs:
alwaysApply: false
---

Description:
单元测试和集成测试规范

Globs:
src/**/\*.test.ts, src/**/\*.test.tsx

# 测试规则

- 使用 React Testing Library
- 测试文件与源文件同目录
- 测试用例结构：
  1. 准备测试数据
  2. 执行被测试代码
  3. 断言结果
- Mock 外部依赖使用 MSW
- 测试覆盖率要求：
  - 语句覆盖率 > 80%
  - 分支覆盖率 > 70%
  - 函数覆盖率 > 90%
```

### 适用范围

- `*/*.md`

### 核心规则

#### 1. 语言要求

- 使用中文编写文档
- 保持语言风格一致性

#### 2. 文档结构

每个文档应包含以下部分：

```markdown
# 功能名称

## 功能说明

详细描述功能的作用和用途

## 使用示例

提供具体的使用代码示例

## API 文档

详细说明 API 接口和参数

## 注意事项

重要提醒和限制说明
```

#### 3. 代码块规范

- 代码块必须标注语言类型
- 使用语法高亮提升可读性

````markdown
```tsx
// TypeScript React 代码
const Component = () => {
  return <div>Hello World</div>;
};
```
````

```css
/* CSS 样式 */
.container {
  padding: 1rem;
}
```

````

#### 4. 配置说明格式
使用表格格式展示配置选项：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enabled` | boolean | `true` | 是否启用功能 |
| `timeout` | number | `5000` | 超时时间(ms) |

#### 5. 重要信息标注
使用引用块标注重要信息：

> **注意**：这是一个重要的提醒信息，需要特别注意。

> **警告**：这是一个警告信息，可能导致问题。

## 使用指南

### 1. 新项目设置

当开始新项目时，请按照以下步骤设置开发规范：

1. **复制规则文件**
   ```bash
   cp -r .cursor/rules/ your-project/.cursor/rules/
````

2. **配置编辑器**

   - 安装 ESLint 和 Prettier 插件
   - 配置 TypeScript 严格模式
   - 设置文件命名规范

3. **设置 Git Hooks**

   ```bash
   # 安装 husky
   npm install --save-dev husky lint-staged

   # 配置 pre-commit hook
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

### 2. 团队协作

#### 代码审查清单

- [ ] 是否符合基础开发规范
- [ ] TypeScript 类型是否完整
- [ ] React 组件是否遵循规范
- [ ] 测试覆盖率是否达标
- [ ] 文档是否完整

#### 提交信息规范

```
feat: 添加用户登录功能
fix: 修复按钮点击事件问题
docs: 更新 API 文档
test: 添加用户组件测试
refactor: 重构认证逻辑
```

### 3. 持续改进

定期检查和更新开发规范：

1. **收集反馈** - 从团队成员收集使用反馈
2. **分析问题** - 识别常见问题和痛点
3. **更新规范** - 根据实际情况调整规则
4. **培训团队** - 确保所有成员了解最新规范

## 总结

通过遵循这些完整的开发规范，我们可以确保：

1. **代码质量** - 统一的代码风格和质量标准
2. **开发效率** - 清晰的规范和最佳实践
3. **团队协作** - 一致的开发流程和标准
4. **项目维护** - 良好的文档和测试覆盖
5. **技术债务** - 减少技术债务的积累

这些规范不仅适用于当前项目，也可以作为其他项目的参考标准，帮助团队建立可持续的开发流程。
