// const { compose } = require('react-app-rewired');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const rewireAppcachePlugin = require('react-app-rewire-appcache-plugin');
const rewireLodash = require('react-app-rewire-lodash');

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env);
  config = rewireAppcachePlugin(config, env, {
    cache: ['https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Merriweather:400,700'],
    settings: ['prefer-online'],
    output: 'manifest.appcache'
  });
  config = rewireLodash(config, env);
  return config;
};
