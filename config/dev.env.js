'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"https://pokeapi.co/api/v2/pokemon?limit=20&offset=200"',
})