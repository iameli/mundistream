const fs = require("fs");
const path = require("path");
const pkgPath = path.resolve(__dirname, "..", "package.json");
let pkgStr = fs.readFileSync(pkgPath, "utf8");
const pkg = JSON.parse(pkgStr);
pkg.devDependencies = {};
pkgStr = JSON.stringify(pkg, null, 2);
fs.writeFileSync(pkgPath, pkgStr, "utf8");
