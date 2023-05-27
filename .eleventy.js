const filesMinifier = require("@sherby/eleventy-plugin-files-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(filesMinifier);
  
  return {
    dir: {
      input: "src",
      output: "public"
    }
  }
};