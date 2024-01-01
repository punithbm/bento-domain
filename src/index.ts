import "dotenv/config";
import express, { Request } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

const app = express();
const PORT = process.env.PORT || 3000;
const BENTO_BASE_URL = "https://bento.me";
const BENTO_USERNAME = process.env.BENTO_USERNAME || "punithbm";

// Proxy middleware options
const options: Options = {
  target: BENTO_BASE_URL,
  changeOrigin: true,
  pathRewrite: (path: string, req: Request) => {
    return path === "/" ? BENTO_USERNAME : path;
  },
};

// Use the proxy middleware for all requests
app.use("/", createProxyMiddleware(options));

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
