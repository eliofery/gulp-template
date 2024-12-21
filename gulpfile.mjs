import { series, parallel } from 'gulp'

import { webpackBuild, webpackWatch } from './gulp/tasks/webpack.mjs'

import config from './gulp/config.mjs'

config.setEnv()

export const build = series(webpackBuild)

export const watch = series(
  build,

  parallel(webpackWatch),
)

export const dev = done => {
  console.log(config)

  done()
}

export default watch
