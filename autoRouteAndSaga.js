const utils = require("loader-utils");
const process = require("process");
const path = require("path");
const fs = require("fs");
const defaultOptions = {
  routeReplace: /__ROUTE_INIT__TARGET/,
  storeReplace: /__REDUX_INIT__TARGET/,
  exact: [],
};
module.exports = function (content) {
  const callback = this.async();
  const options = { ...defaultOptions, ...utils.getOptions(this) };
  this.cacheable(false);
  let routeReplace = options.routeReplace;
  let storeReplace = options.storeReplace;
  if (storeReplace.test(content)) {
    this.addContextDependency(path.join(process.cwd(), options.modelDir));
    const url = path.join(process.cwd(), options.modelDir);
    let addStr = "";
    const sagaDir = fs.readdirSync(path.join(process.cwd(), options.modelDir));
    let sages = "[",
      comUrl = "",
      importUrl = "",
      name = "";
    sagaDir.forEach((v) => {
      comUrl = path.relative(this.context, path.join(url, v));
      importUrl =
        comUrl[0] !== "." || comUrl[0] !== "/" ? `./${comUrl}` : comUrl;
      name = v.toLocaleUpperCase().split(".")[0];
      addStr += `import ${name} from "${importUrl}"\n`;
      sages += `${name},`;
      v;
    });
    sages += `]`;
    addStr += content;
    addStr = addStr.replace(storeReplace, sages);
    return callback(null, addStr);
  }
  if (routeReplace.test(content)) {
    this.addContextDependency(path.join(process.cwd(), options.pageDir));
    const url = path.join(process.cwd(), options.pageDir);
    const dir = fs.readdirSync(url);
    let addStr = "",
      routerStr = "";
    dir.forEach((v) => {
      const comUrl = path.relative(this.context, path.join(url, v));
      let importUrl =
        comUrl[0] !== "." || comUrl[0] !== "/" ? `./${comUrl}` : comUrl;
      addStr += `import ${v.toLocaleUpperCase()} from "${importUrl}"\n`;
      if (options.exact.includes(v)) {
        routerStr += `<Route path="/${v}" exact component={${v.toLocaleUpperCase()}}/>\n`;
      } else {
        routerStr += `<Route path="/${v}" component={${v.toLocaleUpperCase()}}/>\n`;
      }
    });

    addStr += content;
    addStr = addStr.replace(routeReplace, routerStr);
    return callback(null, addStr);
  }
  return callback(null, content);
};
