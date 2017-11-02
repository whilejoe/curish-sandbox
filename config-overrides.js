const rewireStyledComponents = require('react-app-rewire-styled-components');
const rewireLodash = require('react-app-rewire-lodash');

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireLodash(config, env);
  return config;
};
