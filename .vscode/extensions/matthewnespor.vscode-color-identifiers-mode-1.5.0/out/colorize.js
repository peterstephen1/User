"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorize = void 0;
const vscode = __importStar(require("vscode"));
const murmurhash = __importStar(require("murmurhash"));
const rangesByName_1 = require("./rangesByName");
const configuration_1 = require("./configuration");
let rangeLists = configuration_1.colors.map(_ => []);
function colorIndexOfSymbol(symbolName, symbolIndex) {
    switch (configuration_1.method) {
        case configuration_1.Method.hash:
            return murmurhash.v3(symbolName) % rangeLists.length;
        case configuration_1.Method.sequential:
        default:
            return symbolIndex % rangeLists.length;
    }
}
function colorize(editor) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = editor.document.uri;
        if (uri == null || uri.scheme !== 'file' || configuration_1.ignoredLanguages.has(editor.document.languageId)) {
            return true;
        }
        const stat = yield vscode.workspace.fs.stat(uri);
        if (stat.size > configuration_1.bigFileSize) {
            return true;
        }
        const legend = yield vscode.commands.executeCommand('vscode.provideDocumentSemanticTokensLegend', uri);
        const tokensData = yield vscode.commands.executeCommand('vscode.provideDocumentSemanticTokens', uri);
        if (tokensData == null || legend == null) {
            return false;
        }
        rangeLists = configuration_1.colors.map(_ => []);
        const rangesBySymbolName = rangesByName_1.rangesByName(tokensData, legend, editor);
        Object.keys(rangesBySymbolName).forEach((name, index) => {
            const ranges = rangesBySymbolName[name];
            const colorIndex = colorIndexOfSymbol(name, index);
            rangeLists[colorIndex] = rangeLists[colorIndex].concat(ranges);
        });
        configuration_1.colors.forEach((color, index) => {
            editor.setDecorations(color, rangeLists[index]);
        });
        return true;
    });
}
exports.colorize = colorize;
//# sourceMappingURL=colorize.js.map