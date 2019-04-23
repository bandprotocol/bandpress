module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/assets/favicon.ico' }],
  ],
  themeConfig: {
    sidebar: [
      "/", 
      "docs/architecture", 
      "docs/token-economy",
      "docs/data-query",
      "docs/delegated-curation",
      "docs/tcr",
    ],
    logo: "/assets/logo.svg",
    nav: [
      { text: "Explorer", link: "https://data.bandprotocol.com" },
      { text: "Curation Portal", link: "https://app.bandprotocol.com" },
    ]
  }
};
