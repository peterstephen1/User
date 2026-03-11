"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushValue = void 0;
function pushValue(dictionary, key, value) {
    // use Object.prototype.hasOwnProperty.call instead of dictionary.hasOwnProperty incase dictionary["hasOwnProperty"] was replaced
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        dictionary[key].push(value);
    }
    else {
        dictionary[key] = [value];
    }
}
exports.pushValue = pushValue;
//# sourceMappingURL=pushValue.js.map