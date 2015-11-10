var webpack = require('webpack');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var webpackConfig = require('./webpack.config.js');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var fse = require('fs-extra');

gulp.task('default', function(callback) {

    // Setup sourcemapping
    webpackConfig.devtool = 'source-map';

    pluginRequires(function() {
        gutil.log("Plugin Requires", ': Built');
        lessBuild(false, function() {
            gutil.log("Less", ': Built');
        });

        webpackBuild(function() {
            gulp.watch([
                'public/**/*.js',
                'public/**/*.jsx',
                'public/**/*.hbs', 
                '!public/templates/templates.js', 
                '!public/plugins/plugins.js', 
                '!public/build/willbatross.js',
                '!public/courses/**/*'
            ], ["wepback:build"]);
            gulp.watch([
                'public/theme/**/*.less',
                '!public/courses/**/*'
            ], ["less:build"]);
            callback();
        });

    });

});

gulp.task('build', function(callback) {

    webpackConfig.devtool = undefined;

    pluginRequires(function() {
        gutil.log("Plugin Requires", ': Built');
        lessBuild(true, function() {
            gutil.log("Less", ': Built');
        });

        webpackBuild(function() {
            callback();
        });

    });

});

gulp.task('wepback:build', function(callback) {

    webpackBuild(callback);

});

gulp.task('less:build', function(callback) {

    lessBuild(false, callback);

});

function webpackBuild(callback) {
    
    webpack(webpackConfig, function(err, stats) {

        gutil.log("Webpack", stats.toString({colors: true}));

        callback();

    }); 

}

function lessBuild(isProduction, callback) {
    if (isProduction) {
        
        gulp.src(['public/theme/less/main.less', '!public/courses/**/*.less'])
            .pipe(less())
            .pipe(cssmin())
            .pipe(rename("app.css"))
            .pipe(gulp.dest('./public/css'));

    } else {
        gulp.src(['public/theme/less/main.less', '!public/courses/**/*.less'])
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(rename("app.css"))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./public/css'));
    }
    
    callback();
            
}

function pluginRequires(callback) {

    var requirePrefix = "require('./";
    var requireSuffix = "/js/index.js');\n";
    var pluginDirectory = './public/plugins';
    var pluginRequires = '';
    var pluginsFile = './public/plugins/plugins.js';
    fse.readdirSync(pluginDirectory).forEach(function (pluginFolder) {
        if(pluginFolder[0] === '.') return;
        if (pluginFolder.indexOf(".js") >= 0) {
            return;
        }
        // Build a require statement for each one like this require('./vizi/js/index.js');
        pluginRequires += requirePrefix + pluginFolder + requireSuffix;
    });

    fse.outputFile(pluginsFile, pluginRequires, function (err) {
        callback();
    });

}