import { series, parallel } from 'gulp'

import clear from './gulp/tasks/clear.mjs'
import server from './gulp/tasks/server.mjs'
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites.mjs'
import { pugBuild, pugWatch } from './gulp/tasks/pug.mjs'
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack.mjs'

import config from './gulp/config.mjs'

config.setEnv()

export const proxy = server

export const build = series(clear, spritesBuild, pugBuild, webpackBuild)

export const watch = series(
  build,
  server,

  parallel(spritesWatch, pugWatch, webpackWatch),
)

export default watch
