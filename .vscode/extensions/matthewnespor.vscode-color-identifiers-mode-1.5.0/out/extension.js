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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const editorDebounce_1 = require("./editorDebounce");
const colorize_1 = require("./colorize");
const configuration_1 = require("./configuration");
const configuration_2 = require("./configuration");
const colorizeIfNeeded = editorDebounce_1.debounce((editor) => colorize_1.colorize(editor), 200);
function handleBackgroundConfigurationChange() {
    const editors = vscode.window.visibleTextEditors;
    editors.forEach(editor => {
        colorizeIfNeeded(editor);
    });
}
function handleVisibleEditorsChange(editors) {
    editors.forEach(editor => {
        colorizeIfNeeded(editor);
    });
}
function handleColorThemeChange() {
    configuration_2.generatePalette();
    const editors = vscode.window.visibleTextEditors;
    editors.forEach(editor => {
        colorizeIfNeeded(editor);
    });
}
function handleTextDocumentChange(event) {
    const editor = vscode.window.activeTextEditor;
    if (editor != null && editor.document === event.document) {
        colorizeIfNeeded(editor);
    }
}
function activate(context) {
    configuration_1.updateConfiguration();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(configuration_1.updateConfiguration));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(handleBackgroundConfigurationChange));
    context.subscriptions.push(vscode.window.onDidChangeVisibleTextEditors(handleVisibleEditorsChange));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(handleTextDocumentChange));
    context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(handleColorThemeChange));
    const editors = vscode.window.visibleTextEditors;
    editors.forEach(editor => {
        colorizeIfNeeded(editor);
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map