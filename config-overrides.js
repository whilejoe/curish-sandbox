const rewireStyledComponents = require('react-app-rewire-styled-components');
const rewireLodash = require('react-app-rewire-lodash');
const rewireGraphQLTag = require('./src/utils/rewireGraphQLTag');

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireLodash(config, env);
  config = rewireGraphQLTag(config, env);

  return config;
};
