import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Trash Can",
  description: "Code records at work",
  base: "/", // 设置为根路径，支持用户站点部署
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Note", link: "/note/Cursor/01-info" },
      { text: "Guide", link: "/guide/introduction/what-is-vitepress" },
      { text: "Reference", link: "/reference/api/runtime-api" },
    ],

    sidebar: {
      "/note/": [
        {
          text: "Cursor",
          collapsed: true,
          items: [
            { text: "01-info", link: "/note/Cursor/01-info" },
            { text: "02-cursor 使用", link: "/note/Cursor/02-CursorUse" },
            {
              text: "03-cursor 规则",
              link: "/note/Cursor/03-cursor-rules-guide",
            },
            { text: "04-notepads", link: "/note/Cursor/04-notepads" },
          ],
        },
        {
          text: "LLM",
          collapsed: true,
          items: [
            { text: "01-info", link: "/note/LLM/01-info" },
            { text: "02-N-Gram 模型", link: "/note/LLM/02-N-Gram-model" },
            { text: "03-词袋模型", link: "/note/LLM/03-词袋模型" },
            { text: "04-词元", link: "/note/LLM/04-词元" },
            { text: "05-嵌入", link: "/note/LLM/05-嵌入" },
          ],
        },
        {
          text: "前端工具链",
          collapsed: true,
          items: [
            {
              text: "1-概念与抽象语法树",
              collapsed: true,
              items: [
                {
                  text: "01-概念",
                  collapsed: true,
                  link: "/note/前端工具链/1-概念与抽象语法树/01-概念",
                },
                {
                  text: "02-抽象语法树",
                  collapsed: true,
                  link: "/note/前端工具链/1-概念与抽象语法树/02-抽象语法树",
                },
              ],
            },
            {
              text: "2-Prettier",
              collapsed: true,
              items: [
                {
                  text: "01-Prettier",
                  collapsed: true,
                  link: "/note/前端工具链/2-Prettier/01-info",
                },
              ],
            },
          ],
        },
      ],
      // 为 "/guide/" 路径配置专属的侧边栏
      "/guide/": [
        {
          text: "Introduction",
          collapsed: true,
          items: [
            {
              text: "What is VitePress?",
              link: "/guide/introduction/what-is-vitepress",
            },
            {
              text: "Getting Started",
              link: "/guide/introduction/getting-started",
            },
          ],
        },
        {
          text: "Writing",
          collapsed: true,
          items: [
            {
              text: "Markdown Features",
              link: "/guide/writing/markdown-features",
            },
            {
              text: "Using Vue in Markdown",
              link: "/guide/writing/using-vue-in-markdown",
            },
          ],
        },
        {
          text: "Customization",
          collapsed: true,
          items: [
            {
              text: "Config Reference",
              link: "/guide/customization/config-reference",
            },
            {
              text: "Theme Development",
              link: "/guide/customization/theme-development",
            },
          ],
        },
      ],
      // 为 "/reference/" 路径配置专属的侧边栏
      "/reference/": [
        {
          text: "API Reference",
          collapsed: true,
          items: [
            { text: "Runtime API", link: "/reference/api/runtime-api" },
            {
              text: "Configuration API",
              link: "/reference/api/configuration-api",
            },
          ],
        },
        {
          text: "Plugin Reference",
          collapsed: true,
          items: [
            {
              text: "Creating Plugins",
              link: "/reference/plugins/creating-plugins",
            },
            { text: "Using Plugins", link: "/reference/plugins/using-plugins" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/kongfanteng" }],
  },
});
