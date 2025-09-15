### 概述

#### 测试的类型

- 单元测试<font style="color:rgb(31, 35, 40);">（Unit Tests）</font>
- 集成测试<font style="color:rgb(31, 35, 40);">（Integration Tests）</font>
- 端到端测试<font style="color:rgb(31, 35, 40);">（E2E Tests）</font>

> 注：在前端开发中组件测试可以看成是集成测试的一种方式。

#### 是否了解内部结构

- 白盒测试
- 黑盒测试

#### 测试的收益

- <font style="color:rgb(31, 35, 40);">提高代码质量</font>
- <font style="color:rgb(31, 35, 40);">促进重构和修改</font>
- <font style="color:rgb(31, 35, 40);">促进团队协作</font>

> 注：写测试是有成本的，所以要进行合理的测试，比如：产品量级，功能范围等。

<font style="color:rgb(31, 35, 40);"></font>

#### 为什么要端到端测试

单元测试属于白盒测试，而 QA 工程师其实就是黑盒测试。那么端到端测试也是黑盒测试，所以 QA 工程师可以采用自动化端到端测试来完成黑盒测试，需要 QA 工程师写测试脚本。

<font style="color:rgb(31, 35, 40);"></font>

<font style="color:rgb(31, 35, 40);">那么对于一个项目来说，开发环境下是没有太大必要做端到端测试的，而在测试环境下本身 QA 工程师就要进行黑盒测试，所以自动化的端到端测试可以在 QA 测试前来进行，最好在 CI 的过程下自动完成。</font>

### Playwright 框架

[Playwright](https://playwright.dev/) 是微软开源的一个 端到端（E2E）测试工具，专门用于 Web 应用测试和浏览器自动化。

#### 初始化脚手架

```shell
npm init playwright@latest
```

配置：

- <font style="color:rgb(28, 30, 33);">TypeScript 或 JavaScript（默认：TypeScript）</font>
- <font style="color:rgb(28, 30, 33);">测试文件夹名称（默认值：</font>`<font style="color:rgb(28, 30, 33);background-color:rgb(246, 247, 248);">tests</font>`<font style="color:rgb(28, 30, 33);">，如果</font>`<font style="color:rgb(28, 30, 33);background-color:rgb(246, 247, 248);">测试</font>`<font style="color:rgb(28, 30, 33);">已存在，则为 </font>`<font style="color:rgb(28, 30, 33);background-color:rgb(246, 247, 248);">e2e</font>`<font style="color:rgb(28, 30, 33);">）</font>
- <font style="color:rgb(28, 30, 33);">添加 GitHub Actions 工作流（建议用于 CI）</font>
- <font style="color:rgb(28, 30, 33);">安装 Playwright 浏览器（默认：是）</font>

#### 示例代码分析

- 断言（<font style="color:rgb(28, 30, 33);">Assertions）</font>
- <font style="color:rgb(28, 30, 33);">操作（Actions）</font>
- <font style="color:rgb(28, 30, 33);">测试隔离</font>
- <font style="color:rgb(28, 30, 33);">测试钩子</font>
- <font style="color:rgb(28, 30, 33);">配置文件</font>

#### 常见测试命令

```shell
npx playwright test

npx playwright show-report

npx playwright test --ui

npx playwright test --headed

npx playwright test --trace on

npx playwright codegen [url]
```

### VSCode 插件

- 插件名称：Playwright Test for VSCode
- 基本操作：测试、选项等

### 集成到 CI

CI（持续集成）是指开发者频繁将代码合并到主分支，并通过自动化构建和测试快速发现问题、保证代码健康的实践。

常见的 CI：

- GitHub Actions
- GitLab CI
- Jenkins
- ...

配置文件：.github/workflows/playwright.yml

查看报告：下载 playwright-report.zip 并查询结果

### 集成到 Vite 脚手架

- 初始化安装
- 编写简单测试代码
- 配置文件说明
- 运行测试

```typescript
// 计数
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
```

```typescript
test("测试计数功能", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "计数" }).click();
  await page.getByRole("button", { name: "计数" }).click();
  await page.getByRole("link", { name: "About" }).click();
  await expect(page.getByTestId("counter-count")).toHaveText("2");
  await page.goBack();
  await page.getByRole("button", { name: "计数" }).click();
  await page.getByRole("button", { name: "计数" }).click();
  await page.getByRole("link", { name: "About" }).click();
  await expect(page.getByTestId("counter-count")).toHaveText("4");
});
```
