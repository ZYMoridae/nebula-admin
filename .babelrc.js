let presets = [];
let plugins = [];

if (process.env["ENV"] === "dev") {
  presets = ["es2017", "react"]
}else {
  presets = ["@babel/env", "@babel/react"]
}

module.exports = { presets, plugins };