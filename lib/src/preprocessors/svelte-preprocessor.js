"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sveltePreprocessor = void 0;
var preprocessor_1 = require("./preprocessor");
var parsers = require('prettier-plugin-svelte').parsers;
var scriptRegex = /<!--[^]*?-->|<script((?:\s+[^=>'"\/\s]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"\/\s]+)*\s*)>([^]*?)<\/script>/g;
function sveltePreprocessor(code, options) {
    code = code.replace(scriptRegex, function (match, attributes, content, index) {
        if (match.startsWith('<!--')) {
            return match;
        }
        content = (0, preprocessor_1.preprocessor)(content, options);
        return "<script".concat(attributes, ">").concat(content, "</script>");
    });
    return parsers.svelte.preprocess(code, options);
}
exports.sveltePreprocessor = sveltePreprocessor;
