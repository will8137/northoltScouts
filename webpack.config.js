var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        flight: 'core/js/app.js'
    },
    output: {
        path: './public/',
        filename: "build/mediaPlayer.js"
    },
    module: {
        loaders: [{
            test: /\.hbs$/, 
            loader: 'handlebars-loader', 
            query: {
                helperDirs: [
                    path.resolve('public/core/js/helpers')
                ]
            }
        }, {
            //tell webpack to use jsx-loader for all *.jsx files
            test: /\.jsx$/,
            loader: 'jsx-loader?insertPragma=React.DOM&harmony'
        }]
    },
    resolveLoader: {                                                                                
        root: path.join(__dirname, 'node_modules')                                                  
    }, 
    resolve: {
        root: './public',
        alias: {
            _: 'core/js/libraries/underscore',
            jquery: 'core/js/libraries/jquery',
            jQueryUI: 'core/js/libraries/jquery-ui',
            underscore: 'core/js/libraries/underscore',
            backbone: 'core/js/libraries/backbone',
            blossom: 'core/js/blossom.js',
            helpers: 'core/js/helpers',
            router: 'core/js/router',
            sockets: 'core/js/sockets',
            scrollTo:'core/js/libraries/scrollTo',
            velocity:'core/js/libraries/velocity',
            moment: 'core/js/libraries/moment',
            dateFormat: 'core/js/libraries/dateFormat',
            fileUpload: 'core/js/libraries/jquery.fileupload',
            fileUploadFrame: 'core/js/libraries/jquery.iframe-transport',
            templates: 'templates/templates'
        },
        extensions: ['', '.js', '.jsx']
    },
    plugins: [ 
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'underscore',
                Backbone: 'backbone'
        }) 
    ]
};