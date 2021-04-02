const path = require('path');

module.exports = {
/*     resolve: {
      alias: {
        "newtwork": path.resolve(__dirname, "src/network"),
        "components": path.resolve(__dirname, "src/components"),
        "assets": path.resolve(__dirname, "src/assets"),
        "common": path.resolve(__dirname, "src/common")
      }
    }, */
    devServer: {
        proxy: {
            '/apis': {
                target: 'http://121.31.6.255',
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    }
}