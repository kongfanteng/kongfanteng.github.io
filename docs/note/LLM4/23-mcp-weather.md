## 23 mcp 天气应用实战

1. `@modelcontextprotocol/sdk@1.16.0 zod@3.25.76`;
2. McpServer; StdioServerTransport; server, name, version, description; transport, connect;
3. registerTool, getWeather; title, description, inputSchema; 执行逻辑, 引入 weatherHandler; zod; `npx @modelcontextprotocol/inspector`;

### weatherHandler.js

```js
// 提供天气服务的，同样是直接对接第三方服务平台
const HEFENG_API_KEY = "e8484fc8d1654bcc8bf01dac6344f91b";

/**
 * 格式化天气
 * @param {*} text "今天"、"明天"...
 * @requires YYYY-MM-DD
 */
function formatDate(text) {
  const today = new Date();

  if (text.includes("今天")) return today.toISOString().split("T")[0]; // 2025-07-16
  if (text.includes("明天")) {
    const tomorrow = new Date(today.getTime() + 86400000);
    return tomorrow.toISOString().split("T")[0];
  }
  if (text.includes("后天")) {
    const dayAfter = new Date(today.getTime() + 2 * 86400000);
    return dayAfter.toISOString().split("T")[0];
  }

  // 英文日期格式（兼容性支持）
  if (text.toLowerCase().includes("today"))
    return today.toISOString().split("T")[0];
  if (text.toLowerCase().includes("tomorrow")) {
    const tomorrow = new Date(today.getTime() + 86400000);
    return tomorrow.toISOString().split("T")[0];
  }

  // 直接传入 yyyy-mm-dd 则不处理
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  return null; // 暂不识别
}

/**
 *
 * @param {*} city 城市的名称
 * @returns 城市的位置
 */
async function getCityLocation(city) {
  try {
    // 参照第三方服务商文档
    const url = `https://nm2pg6tw9v.re.qweatherapi.com/geo/v2/city/lookup?location=${encodeURIComponent(
      city
    )}&key=${HEFENG_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error("城市查询API请求失败:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    if (data.code === "200" && data.location?.length > 0) {
      return data.location[0].id;
    }

    return null;
  } catch (error) {
    console.error("城市查询异常:", error);
    return null;
  }
}

/**
 *
 * @param {*} city 城市
 * @param {*} date 日期
 */
async function getWeather({ city, date }) {
  // 检查 API 密钥
  if (!HEFENG_API_KEY) {
    console.error("缺少 HEFENG_API_KEY 环境变量");
    return "天气服务配置错误，请联系管理员";
  }

  // 参考第三方服务商文档
  const formattedDate = formatDate(date);
  if (!formattedDate) {
    console.error("无法识别日期格式:", date);
    return `无法识别日期格式："${date}"，请使用"今天"、"明天"或"后天"`;
  }

  const locationId = await getCityLocation(city);
  if (!locationId) {
    console.error("无法识别城市:", city);
    return `无法识别城市："${city}"`;
  }

  try {
    const url = `https://nm2pg6tw9v.re.qweatherapi.com/v7/weather/7d?location=${locationId}&key=${HEFENG_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error("天气API请求失败:", res.status, res.statusText);
      return "天气服务暂时不可用";
    }

    const data = await res.json(); // 拿到的是一周的天气
    console.log("data:", data);
    if (data.code !== "200") {
      console.error("天气API返回错误:", data.code, data);
      return "获取天气数据失败";
    }

    const match = data.daily.find((d) => d.fxDate === formattedDate); // 过滤出需要的那一天的天气数据
    if (!match) {
      console.error("没有找到对应日期的天气数据:", formattedDate);
      return `暂无 ${formattedDate} 的天气数据`;
    }

    const result = `📍 ${city}（${formattedDate}）天气：${match.textDay}，气温 ${match.tempMin}°C ~ ${match.tempMax}°C`;
    console.log("天气查询成功:", result);
    return result;
  } catch (error) {
    console.error("天气查询异常:", error);
    return "天气查询服务暂时不可用";
  }
}

export { getWeather };
```
