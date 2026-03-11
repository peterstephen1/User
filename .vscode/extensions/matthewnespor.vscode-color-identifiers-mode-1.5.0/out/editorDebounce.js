"use strict";
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
exports.debounce = void 0;
function debounce(func, delay) {
    const executionState = new Map();
    return function debounced(editor) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            const key = editor.document.uri.toString();
            const state = (_a = executionState.get(key)) !== null && _a !== void 0 ? _a : { lastCall: 0, retries: 0 };
            if (now - state.lastCall < delay) {
                return;
            } // Throttle: wait until delay has passed before calling again
            if (yield func(editor)) { // Exit if actual call succeeded
                executionState.set(key, { lastCall: now, retries: 0 });
                return;
            }
            if (state.retries >= 3) { // Cancel infinite loops on unsupported 'file://' types returning 'false', e.g. JSON
                executionState.delete(key);
                return;
            }
            // Retry on failure after delay
            executionState.set(key, Object.assign(Object.assign({}, state), { retries: state.retries + 1 }));
            setTimeout(() => debounced(editor), delay);
        });
    };
}
exports.debounce = debounce;
//# sourceMappingURL=editorDebounce.js.map