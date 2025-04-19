import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Documentación QRcoats",
  tagline: "Documentación completa para la plataforma QRcoats",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.qrcoats.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "qrcoats", // Usually your GitHub org/user name.
  projectName: "qrcoats-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/qrcoats/qrcoats-docs/tree/main/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/qrcoats/qrcoats-docs/tree/main/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "docusaurus-plugin-dotenv",
      {
        path: "./.env", // The path to your environment variables.
        safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: true, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
        ignoreStub: true,
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },

  themes: [
    [
      "@docusaurus/theme-mermaid",
      {
        mermaid: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/qrcoats-social-card.jpg",
    navbar: {
      title: "QRcoats",
      logo: {
        alt: "Logo de QRcoats",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentación",
        },
        { to: "/blog", label: "Actualizaciones", position: "left" },
        {
          href: "https://github.com/Q-Check/docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introducción",
              to: "/docs/intro",
            },
            {
              label: "Arquitectura",
              to: "/docs/architecture",
            },
          ],
        },
        {
          title: "Aplicaciones",
          items: [
            {
              label: "Panel Admin",
              to: "/docs/admin",
            },
            {
              label: "App Clientes",
              to: "/docs/customers",
            },
            {
              label: "App Empleados",
              to: "/docs/employees",
            },
          ],
        },
        {
          title: "Más",
          items: [
            {
              label: "Actualizaciones",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/qrcoats",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} QRcoats. Construido con Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
