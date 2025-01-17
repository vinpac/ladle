module.exports = {
  title: "Ladle",
  tagline: "Develop and test your React stories faster.",
  url: "https://www.ladle.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.svg",
  organizationName: "tajo", // Usually your GitHub org/user name.
  projectName: "ladle", // Usually your repo name.
  themeConfig: {
    image: "img/ladle-baseweb.png",
    navbar: {
      title: "Ladle",
      logo: {
        alt: "Ladle Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://discord.gg/H6FSHjyW7e",
          label: "Discord",
          position: "right",
        },
        {
          href: "https://github.com/tajo/ladle",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Ladle`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/tajo/ladle/edit/master/packages/website/",
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          editUrl:
            "https://github.com/tajo/ladle/edit/master/packages/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-222922341-1",
          anonymizeIP: true,
        },
      },
    ],
  ],
};
