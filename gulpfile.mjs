import { config } from './gulp/config.mjs'

export const watch = done => {
  console.log(config)

  done()
}

export const build = done => {
  console.log('This build')

  done()
}

export const dev = done => {
  console.log('This dev')

  done()
}

export default watch
