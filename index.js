/**
 * ImgminPlugin
 * @author me-hotel
 */
const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')
const Minimatch = require("minimatch")
const RawSource = require('webpack-sources/lib/RawSource')

 class ImgminPlugin {
   constructor(options = {}) {
    this.extension = options.extension
    this.png = options.png || {
      quality: [0.6, 0.8]
    }
    this.jepg = options.jepg || {
      quality: 75,
      progressive: false
    }
   }
   async compress(file){
    const imageBuffer = (Buffer.isBuffer(file) ? file : Buffer.from(file, 'utf8'))
    return await imagemin.buffer(imageBuffer, {glob: false, plugins: [
      imageminPngquant(this.png),
      imageminMozjpeg(this.jepg)
    ]})
   }
  task(compilation){
    const { assets = {} } = compilation
    return Object.keys(assets).map(key => {
      const assetSource = assets[key].source()
      if(this.extension instanceof RegExp){
        if(this.extension.test(key)){
         return this.compress(assetSource).then(res => {
            compilation.assets[key] = new RawSource(res)
          })
        }
      }else if(typeof this.extension === 'string'){
        const regex = Minimatch.makeRe(this.extension)
        if(regex && regex.test(key)){
          return this.compress(assetSource).then(res => {
            compilation.assets[key] = new RawSource(res)
          })
        }
      }else{
        throw new Error('file extension must be a regex, glob string !!!')
      }
    })
   }
   apply(compiler) {
     // Access the assets once they have been assembled
     const onEmit = async (compilation, callback) => {
      await Promise.all(this.task(compilation)) .then(res => {
        callback()
      })
     }
    // Check if the webpack 4 plugin API is available
    if (compiler.hooks) {
      // Register emit event listener for webpack 4
      compiler.hooks.emit.tapAsync(this.constructor.name, onEmit)
    } else {
      // Register emit event listener for older webpack versions
      compiler.plugin('emit', onEmit)
    }
   }
 }

module.exports = ImgminPlugin;
