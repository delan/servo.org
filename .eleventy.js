const MarkdownIt = require("markdown-it");
const MarkdownItAnchor = require("markdown-it-anchor");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats(["md", "njk", "html", "css", "pdf"]);

  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({"assets/img": "img"});
  eleventyConfig.addPassthroughCopy({"assets/svg": "svg"});

  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  eleventyConfig.setLibrary("md", MarkdownIt({
    html: true,
    typographer: true,
    linkify: true
  }).use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.linkInsideHeader({
      symbol: `
        <span class="icon hashlink"><i class="fas fa-link"></i></span>
      `,
    })
  }));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addCollection("recentBlogPosts", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("blog").reverse().filter((item) => {
      return i++ < 10;
    });
  })
}
