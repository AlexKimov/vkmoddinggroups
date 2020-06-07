const toml = require("toml");
const htmlmin = require("html-minifier");
const cleanCSS = require("clean-css");

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

    eleventyConfig.addNunjucksFilter("groupByGameName",
        require("./src/filters/group.js")
    );

    eleventyConfig.addNunjucksFilter("sortByGroupName",
        require("./src/filters/sort.js")
    );

    eleventyConfig.addFilter("cssmin", function(code) {
        return new cleanCSS({}).minify(code).styles;
    });

    return {
        templateFormats: ["md",  "njk",  "html", "liquid"],
            markdownTemplateEngine: "liquid",
            htmlTemplateEngine: "njk",
            dataTemplateEngine: "njk",
            dir: {
            input: ".",
                includes: "includes",
                data: "data",
                input: "src",
                output: "_site",
                layouts: "layouts"
        }
    };
};