# imgmin-webpack-plugin
imgmin-webpack-plugin

image compress webpack plugin

support jepg/jpg png

## options
extension
  file extension must be a regex, glob string
  example-> extension: 'img/*.{jpg,png}'
png
  png compress setting
  example-> {
    quality: [0.6, 0.8] // must array
  }
jepg
  jepg compress setting
  example-> {
    quality: 75,
    progressive: false
  }