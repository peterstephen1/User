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
exports.colors = exports.bigFileSize = exports.method = exports.ignoredLanguages = exports.tokenKinds = exports.generatePalette = exports.updateConfiguration = exports.Method = void 0;
const vscode = __importStar(require("vscode"));
const vscode_1 = require("vscode");
const colorConvert = __importStar(require("color-convert"));
exports.Method = {
    sequential: 'sequential',
    hash: 'hash'
};
const PaletteMode = {
    automatic: 'automatic',
    manual: 'manual'
};
function updateConfiguration() {
    var _a, _b, _c, _d, _e;
    const configuration = vscode.workspace.getConfiguration('colorIdentifiersMode');
    exports.tokenKinds = new Set((_a = configuration.get('tokenKinds')) !== null && _a !== void 0 ? _a : []);
    exports.ignoredLanguages = new Set((_b = configuration.get('ignoredLanguages')) !== null && _b !== void 0 ? _b : []);
    exports.method = (_c = configuration.get('method')) !== null && _c !== void 0 ? _c : exports.Method.sequential;
    paletteMode = (_d = configuration.get('paletteMode')) !== null && _d !== void 0 ? _d : PaletteMode.automatic;
    exports.bigFileSize = (_e = configuration.get('ignoredFileSize')) !== null && _e !== void 0 ? _e : 102400;
    generatePalette();
}
exports.updateConfiguration = updateConfiguration;
function generatePalette() {
    var _a;
    exports.colors.forEach(color => color.dispose());
    switch (paletteMode) {
        case PaletteMode.manual:
            const configuration = vscode.workspace.getConfiguration('colorIdentifiersMode');
            const colorNames = (_a = configuration.get('manualColors')) !== null && _a !== void 0 ? _a : [];
            exports.colors = colorNames.map(color => vscode.window.createTextEditorDecorationType({ color }));
            break;
        case PaletteMode.automatic:
        default:
            const saturation = 90;
            const luminance = vscode.window.activeColorTheme.kind === vscode_1.ColorThemeKind.Light ? 30 : 80;
            exports.colors = [0.0, 0.5, 0.1, 0.6, 0.2, 0.7, 0.3, 0.8, 0.4, 0.9].map(hue => {
                const hex = colorConvert.hsl.hex([360.0 * hue, saturation, luminance]);
                return vscode.window.createTextEditorDecorationType({ color: `#${hex}` });
            });
    }
}
exports.generatePalette = generatePalette;
let paletteMode = PaletteMode.automatic;
exports.tokenKinds = new Set(['variable', 'parameter', 'property']);
exports.ignoredLanguages = new Set();
exports.method = exports.Method.sequential;
exports.bigFileSize = 102400;
exports.colors = [
    '#FF00FF'
].map(color => vscode.window.createTextEditorDecorationType({ color }));
vscode.workspace.getConfiguration('myExtension');
//# sourceMappingURL=configuration.js.map