import { series, parallel } from 'gulp'

import clear from './gulp/tasks/clear.mjs'
import server from './gulp/tasks/server.mjs'
import { pugBuild, pugWatch } from './gulp/tasks/pug.mjs'
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack.mjs'

import config from './gulp/config.mjs'

config.setEnv()

export const proxy = server

export const build = series(clear, pugBuild, webpackBuild)

export const watch = series(
  build,
  server,

  parallel(pugWatch, webpackWatch),
)

export default watch
