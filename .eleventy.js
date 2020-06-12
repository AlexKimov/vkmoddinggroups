const glob = require('fast-glob');
const path = require('path');

const toml = require("toml");

module.exports = eleventyConfig => {
    const paths = {
        filters: joinPath("src/filters/*.js"),
        transforms: joinPath("src/transforms/*.js"),
    };

    const transforms = glob.sync(paths.transforms);
    transforms.forEach(transform => {
        eleventyConfig.addTransform(resolveNameFromPath(transform), require(transform));
    });

    const filters = glob.sync(paths.filters);
    filters.forEach(filter => {
        eleventyConfig.addFilter(resolveNameFromPath(filter), require(filter));
    });

    eleventyConfig.addDataExtension("toml", contents => toml.parse(contents));

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

function resolveNameFromPath(filePath) {
    return path.parse(filePath).name;
}

function joinPath(filePath) {
    return path.join(process.cwd(), filePath).replace(/\\/g, '/')
}