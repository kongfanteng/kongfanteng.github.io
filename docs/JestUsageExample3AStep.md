# Jest usage example 3A step

3A: act + assertion + afterAll

## 服务+test 集成测试

```js
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

// 当前测试套件里面的所有的测试用例跑完之后关闭数据库连接
afterAll(async () => {
  await mongoose.connection.close();
});

test("测试分页获取问题", async () => {
  // act 行为
  const res = await request(app)
    .get("/api/issue")
    .query({ page: 1, pageSize: 10, issueStatus: true });

  // assertion 断言
  expect(res.statusCode).toBe(200);
  expect(res.body.data.currentPage).toBe(null);
  expect(res.body.data.eachPage).toBe(10);
  expect(res.body.data.count).toBe(0);
  expect(res.body.data.totalPage).toBe(0);
});
```

::: tip

1. 测试完成后在 AfterAll 钩子中关闭服务（数据库连接）。

```js
// 当前测试套件里面的所有的测试用例跑完之后关闭数据库连接
afterAll(async () => {
  await mongoose.connection.close();
});
```

2. 测试完成后，查看是否有无关闭的服务

```js
"test": "jest --detectOpenHandles"
```

3. 测试时会发送真实的请求：使用单独数据库

4. 仅示例，无法执行（需数据库、实际接口）

:::
