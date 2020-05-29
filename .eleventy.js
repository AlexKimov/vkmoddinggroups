const toml = require("toml");
const htmlmin = require("html-minifier");

module.exports = eleventyConfig => {
    eleventyConfig.addDataExtension("toml", contents => toml.parse(contents));

    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if( outputPath.endsWith(".html") ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    return {
        templateFormats: ["md",  "njk",  "html", "liquid"],
            markdownTemplateEngine: "liquid",
            htmlTemplateEngine: "njk",
            dataTemplateEngine: "njk",
            dir: {
            input: ".",
                includes: "_includes",
                data: "data",
                input: "src",
                output: "_site",
                layouts: "layouts"
        }
    };
};