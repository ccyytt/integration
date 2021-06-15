
const autoLoader = require.resolve("./autoRouteAndSaga.js");
const addRoute = () => ({
  webpack: (config) => {
    const rules = config.module.rules.concat([{
        test: /\.(js|jsx)$/,
        loader: autoLoader,
        options: {
            pageDir: 'src/pages',
            modelDir: 'src/module',
            exact: ['a']
        }
    }])
    config.module.rules = rules
    return config;
  },
});

module.exports = [["use-babel-config", ".babelrc"], addRoute()];
