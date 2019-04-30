module.exports = {
  head: [["link", { rel: "icon", href: "/assets/favicon.ico" }]],
  themeConfig: {
    sidebar: [
      "/",
      "docs/prerequisite",
      // "docs/architecture",
      "docs/community",
      "docs/bonding-curve",
      "docs/parameters",
      "docs/tcd",
      "docs/tcr",
      "docs/data-query"
    ],
    logo: "/assets/logo.svg",
    nav: [
      { text: "Explorer", link: "https://data.bandprotocol.com" },
      {
        text: "Curation Portal",
        link: "https://app-wip.rinkeby.bandprotocol.com"
      }
    ]
  }
};
