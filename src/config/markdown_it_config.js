'use strict';

/**
 * node module
 */
const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js").default;

const markdown = new MarkdownIt({
    breaks: true,
    linkify: true,
    highlight: (str, lang) => {
        if (!lang && !hljs.getLanguage(lang)) return "";

        try {
            return hljs.highlight(str, {
                language: lang,
                ignoreIllegals: true
            }).value;
        } catch (error) {
            console.error("Error Highlighting Language: ", error.message);
            throw error;
        };
    }
});

module.exports = markdown;