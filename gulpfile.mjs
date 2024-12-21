import { series, parallel } from 'gulp'

import clear from './gulp/tasks/clear.mjs'
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack.mjs'

import config from './gulp/config.mjs'

config.setEnv()

export const build = series(clear, webpackBuild)

export const watch = series(
  build,

  parallel(webpackWatch),
)

export default watch
