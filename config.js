let productionSourceFolder = '/ii/';

let media = 'media/',
    productionMedia = productionSourceFolder + media,
    css = 'css/',
    productionCss = productionSourceFolder + css,
    js = 'js/',
    productionJs = productionSourceFolder + js;

module.exports = {
  production: {
    mode: 'production',
    pugData: {
      mode: 'production',
      mediaFolder: productionMedia,
      cssFolder: productionCss,
      jsFolder: productionJs
    },
    scssData: `
      $mediaFolder: "${productionMedia}";
      $cssFolder: "${productionCss}";
      $jsFolder: "${productionJs}";
    `,
    outputFolder: "./production/",
    mediaName: 'media/'
  },
  development: {
    mode: 'development',
    pugData: {
      mode: 'development',
      mediaFolder: media,
      cssFolder: css,
      jsFolder: js
    },
    scssData: `
      $mediaFolder: "../${media}";
      $cssFolder:" ${css}";
      $jsFolder: "${js}";
    `,
    outputFolder: './dist/',
    mediaName: 'media'
  }
};