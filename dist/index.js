"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const BENTO_BASE_URL = "https://bento.me";
const BENTO_USERNAME = process.env.BENTO_USERNAME || "punithbm";
// Proxy middleware options
const options = {
    target: BENTO_BASE_URL,
    changeOrigin: true,
    pathRewrite: (path, req) => {
        return path === "/" ? BENTO_USERNAME : path;
    },
};
// Use the proxy middleware for all requests
app.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)(options));
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
