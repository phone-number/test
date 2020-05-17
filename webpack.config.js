const baseConfig = require('./config/config.base.js');
const developmentConfig = require('./config/config.dev.js');
const productionConfig = require('./config/config.pro.js')
const merge = require("webpack-merge");
module.exports = merge(baseConfig, process.env.NODE_ENV === "production" ? productionConfig : developmentConfig)