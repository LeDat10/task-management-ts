"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRadomNumber = exports.generateRadomString = void 0;
const generateRadomString = (length) => {
    const characters = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateRadomString = generateRadomString;
const generateRadomNumber = (length) => {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateRadomNumber = generateRadomNumber;
