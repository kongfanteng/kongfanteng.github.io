# 简易 jest

## 依赖

```bash
glob jest-haste-map@29.5.0 jest-worker chalk expect jest-mock jest-circus
```

## 获取所有测试文件

```mjs
import JestHasteMap from "jest-haste-map";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { cpus } from "os";

// 拿到根目录
const root = dirname(fileURLToPath(import.meta.url));

// 这是一个配置选项，里面配置了要处理的文件扩展名，工作进程的数量
const options = {
  extensions: ["js"], // 只遍历 .js 文件
  maxWorkers: cpus().length, // 并行处理所有可用的 CPU
  name: "best", // 缓存文件名
  platforms: [], // 只针对 React Native 生成的文件, 这里不使用
  rootDir: root, // 根目录
  roots: [root], // 搜索目录
};

const hasteMap = await new JestHasteMap.default(options);
await hasteMap.setupCachePath(options);

const { hasteFS } = await hasteMap.build();

const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

console.log(testFiles);
```

## 并行读取测试用例（Worker）

```js
import JestHasteMap from "jest-haste-map";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { cpus } from "os";
import { Worker } from "jest-worker";
// 拿到根目录
const root = dirname(fileURLToPath(import.meta.url));

// 这是一个配置选项，里面配置了要处理的文件扩展名，工作进程的数量
const options = {
  extensions: ["js"], // 只遍历 .js 文件
  maxWorkers: cpus().length, // 并行处理所有可用的 CPU
  name: "best", // 缓存文件名
  platforms: [], // 只针对 React Native 生成的文件, 这里不使用
  rootDir: root, // 根目录
  roots: [root], // 搜索目录
};

const hasteMap = await new JestHasteMap.default(options);
await hasteMap.setupCachePath(options);

const { hasteFS } = await hasteMap.build();

const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

const worker = new Worker(join(root, "worker.js"), {
  enableWorkerThreads: true,
});

await Promise.all(
  Array.from(testFiles).map(async (file) => {
    console.log(await worker.runTest(file));
  })
);
worker.end();
```

## 运行测试用例

```mjs
// index.mjs
import JestHasteMap from "jest-haste-map";
import { fileURLToPath } from "url";
import { dirname, join, relative } from "path";
import { cpus } from "os";
import { Worker } from "jest-worker";
import chalk from "chalk";
// 拿到根目录
const root = dirname(fileURLToPath(import.meta.url));

// 这是一个配置选项，里面配置了要处理的文件扩展名，工作进程的数量
const options = {
  extensions: ["js"], // 只遍历 .js 文件
  maxWorkers: cpus().length, // 并行处理所有可用的 CPU
  name: "best", // 缓存文件名
  platforms: [], // 只针对 React Native 生成的文件, 这里不使用
  rootDir: root, // 根目录
  roots: [root], // 搜索目录
};

const hasteMap = await new JestHasteMap.default(options);
await hasteMap.setupCachePath(options);

const { hasteFS } = await hasteMap.build();

const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

const worker = new Worker(join(root, "worker.js"), {
  enableWorkerThreads: true,
});
await Promise.all(
  Array.from(testFiles).map(async (file) => {
    const { success, errorMessage } = await worker.runTest(file);
    const status = success
      ? chalk.green.inverse.bold(" 成功 ")
      : chalk.red.inverse.bold(" 失败 ");
    console.log(`${status} ${chalk.dim(relative(root, file))}`);

    if (!success) {
      console.log(` ${errorMessage}`);
    }
  })
);
worker.end();
```

```js
// worker.js
const fs = require("fs");

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");

  const testResult = {
    success: false,
    errorMessage: null,
  };

  const expect = (received) => ({
    toBe: (expected) => {
      if (received !== expected) {
        throw new Error(`Expected ${expected} but received ${received}.`);
      }
      return true;
    },
  });

  try {
    eval(code);
    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
};
```

## 增加 describe 和 it

```js
// worker.js
const fs = require("fs");
const { expect } = require("expect");

const mock = require("jest-mock");

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");

  const testResult = {
    success: false,
    errorMessage: null,
  };

  try {
    const describeFns = [];
    let currentDescribeFn = null;
    const describe = (name, fn) => {
      describeFns.push([name, fn]);
    };
    const it = (name, fn) => {
      currentDescribeFn.push([name, fn]);
    };

    eval(code);

    for (const [name, fn] of describeFns) {
      currentDescribeFn = [];
      testName = name;
      fn();
      currentDescribeFn.forEach(([name, fn]) => {
        testName += "" + name;
        fn();
      });
    }

    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
};
```

## 使用 jest-circus

```js
// index.mjs
import JestHasteMap from "jest-haste-map";
import { fileURLToPath } from "url";
import { dirname, join, relative } from "path";
import { cpus } from "os";
import { Worker } from "jest-worker";
import chalk from "chalk";
// 拿到根目录
const root = dirname(fileURLToPath(import.meta.url));

// 这是一个配置选项，里面配置了要处理的文件扩展名，工作进程的数量
const options = {
  extensions: ["js"], // 只遍历 .js 文件
  maxWorkers: cpus().length, // 并行处理所有可用的 CPU
  name: "best", // 缓存文件名
  platforms: [], // 只针对 React Native 生成的文件, 这里不使用
  rootDir: root, // 根目录
  roots: [root], // 搜索目录
};

const hasteMap = await new JestHasteMap.default(options);
await hasteMap.setupCachePath(options);

const { hasteFS } = await hasteMap.build();

// const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

const testFiles = hasteFS.matchFilesWithGlob([
  process.argv[2] ? `**/${process.argv[2]}*` : "**/*.test.js",
]);

const worker = new Worker(join(root, "worker.js"), {
  enableWorkerThreads: true,
});

let hasFailed = false;
await Promise.all(
  Array.from(testFiles).map(async (file) => {
    const { success, errorMessage, testResults } = await worker.runTest(file);
    const status = success
      ? chalk.green.inverse.bold(" 成功 ")
      : chalk.red.inverse.bold(" 失败 ");
    console.log(`${status} ${chalk.dim(relative(root, file))}`);

    if (!success) {
      hasFailed = true;
      // Make use of the rich `testResults` and error messages.
      // 失败了，如果 testResults 里面有值，则根据 testResults 显示更完整的信息
      if (testResults) {
        testResults
          .filter((result) => result.errors.length)
          .forEach((result) =>
            console.log(
              // Skip the first part of the path which is an internal token.
              result.testPath.slice(1).join(" ") + "\n" + result.errors[0]
            )
          );
        // If the test crashed before `jest-circus` ran, report it here.
      } else if (errorMessage) {
        console.log("  " + errorMessage);
      }
    }
  })
);
worker.end();

if (hasFailed) {
  console.log(
    "\n" + chalk.red.bold("Test run failed, please fix all the failing tests.")
  );
  // Set an exit code to indicate failure.
  process.exitCode = 1;
}
```

```js
// worker.js
const fs = require("fs");
const { expect } = require("expect");

const mock = require("jest-mock");

const { describe, it, run, resetState } = require("jest-circus");

exports.runTest = async function (testFile) {
  const code = await fs.promises.readFile(testFile, "utf8");

  const testResult = {
    success: false,
    errorMessage: null,
  };

  try {
    resetState();
    eval(code);
    const { testResults } = await run();
    testResult.testResults = testResults;
    testResult.success = testResults.every((result) => !result.errors.length);

    testResult.success = true;
  } catch (error) {
    testResult.errorMessage = error.message;
  }

  return testResult;
};
```
