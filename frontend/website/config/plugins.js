module.exports = [
  "gatsby-plugin-root-import",
  "gatsby-theme-material-ui",
  "gatsby-plugin-use-query-params",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "assets",
      path: `${__dirname}/../src/assets`,
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      start_url: "/",
      icon: "src/assets/logo.png",
      cache_busting_mode: "none",
    },
  },
];
