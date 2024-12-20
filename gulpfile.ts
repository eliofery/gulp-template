import { type TaskFunctionCallback } from 'gulp'
import { config } from './gulp/config.ts'

const watch = (done: TaskFunctionCallback): void => {
  console.log(config)

  done()
}

export const build = (done: TaskFunctionCallback): void => {
  console.log('This build')

  done()
}

export const dev = (done: TaskFunctionCallback): void => {
  console.log('This dev')

  done()
}

export default watch
