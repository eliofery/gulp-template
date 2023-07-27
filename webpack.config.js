const path = require('path') // определение абсолютного пути

// Рабочее окружение
const isProd = process.argv.includes('--prod')

module.exports = {
  mode: isProd ? 'production' : 'development', // минификация файла
  devtool: isProd ? false : 'inline-source-map', // если gulp сборка запущена в режиме разработки создаст sourcemap файл
  output: {
    filename: '[name].js', // имя файла после сборки
  },
  // разбиение исходного файла на чанки
  optimization: {
    splitChunks: {
      chunks: 'async', // all
      minSize: 30000, // 10000
      maxSize: 0, // 200000
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/, // файл заканчивается на .js
        exclude: /(node_modules|bower_components)/, // исключаем каталоги node_modules и bower_components
        use: {
          loader: 'babel-loader', // используем в качестве обработчика babel-loader
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      // короткий путь до js файлов через символ @, например @/components/ButtonComponent
      '@': path.resolve(__dirname, 'src/js'),
    },
  },
}
