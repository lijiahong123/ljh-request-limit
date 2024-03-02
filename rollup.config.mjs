import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import commonjs from "@rollup/plugin-commonjs";
import rollupTypescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
// 当前运行环境，可通过 cross-env 命令行设置
const env = process.env.NODE_ENV;
const name = "asyncpool";

const config = {
  input: path.resolve(__dirname, "src/main.ts"),
  output: [
    {
      file: pkg.main, // commonjs
      format: "cjs",
    },
    {
      file: pkg.module, // es module
      format: "es",
    },
    {
      name,
      file: pkg.umd, // umd
      format: "umd",
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: /node_modules/,
    }),
    // 解析第三方依赖
    resolve(),
    // 识别 commonjs 模式第三方依赖
    commonjs(),
    // rollup 编译 typescript
    rollupTypescript(),
    // babel 配置
    babel({
      // 编译库使用 runtime
      babelHelpers: "runtime",
      // 只转换源代码，不转换外部依赖
      exclude: "node_modules/**",
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, ".ts"],
    }),
  ],
};

// 若打包正式环境，压缩代码
if (env === "production") {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        // warnings: false,
      },
    })
  );
}

export default config;
