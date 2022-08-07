# imgmin-webpack-plugin
imgmin-webpack-plugin

image compress webpack plugin

support jepg/jpg png

## usage
````javascript
import ImginWebpackPlugin from 'imgmin-webpack-plugin';

export default {
  // ... webpack options
  plugins: [
    new ImginWebpackPlugin({
      // ... options
    })
  ]
}

````

## options


### file extension must be a regex, glob string
  
````javascript  
  // output directory: dist / img / *.{jpg,png}
  
  new ImgminWebpackPlugin({
    extension: 'img/*.{jpg,png}'
  })
````
  
### png compress setting
````javascript  
  new ImgminWebpackPlugin({
    quality: [0.6, 0.8] // must array
  })
````  
  
### jepg compress setting
````javascript  
  new ImgminWebpackPlugin({
    quality: 75,
    progressive: false
  })
````
