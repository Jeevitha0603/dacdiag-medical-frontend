"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginApi = void 0;
const api_1 = __importDefault(require("../../services/api"));
const loginApi = (data) => api_1.default.post("/login", data);
exports.loginApi = loginApi;
