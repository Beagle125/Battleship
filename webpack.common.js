// webpack.common.js
import path from "node:path";
import { fileURLToPath } from "node:url";


export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  /*Insert plugins */

  /*Insert modules*/
};
