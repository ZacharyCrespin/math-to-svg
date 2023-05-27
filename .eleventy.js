const filesMinifier = require("@sherby/eleventy-plugin-files-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(filesMinifier);
  
  eleventyConfig.addWatchTarget("./src/style.css");
  eleventyConfig.addWatchTarget("./src/script.js");

  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
};