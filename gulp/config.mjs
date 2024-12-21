const srcPath = 'src'
const buildPath = 'build'

const config = {
  src: {
    root: srcPath,

    script: {
      root: `${srcPath}/scripts`,
      components: `${srcPath}/scripts/components`,
    },
  },

  build: {
    root: buildPath,

    script: `${buildPath}/js`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--production')
    this.isDev = !this.isProd
  },
}

export default config
