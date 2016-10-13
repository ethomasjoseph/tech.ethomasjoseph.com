var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('gulp-bower'),
    mainBowerFiles = require('main-bower-files'),
    path = require('path'),
    filter = require('gulp-filter'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    config = require('./config.json'),
    child = require('child_process'),
    browserSync = require('browser-sync'),
    bootlint  = require('gulp-bootlint');

// ******* Util functions **************
var log = function(msg) {
    if (config.debug) {
        gutil.log("[" + gutil.colors.blue('DEBUG') + "]" + msg);
    }
}

// ******* Update Tasks **********
// Clean
gulp.task('cleanlibs', function() {
    var $_files = [config.bowerDir,
                   config.vendorFiles.js.destDir,
                   config.vendorFiles.fonts.destDir,
                   config.vendorFiles.sass.destDir];
    log("Cleaning " + gutil.colors.blue($_files));
    return del($_files);
});

// Bower
gulp.task('bower', function() {
  return  bower(config.bowerDir);
});

gulp.task('clean-bower', ['cleanlibs'], function(){
    gulp.start('bower');
});

// Copy over vendor files to assets
gulp.task('vendorjs', function() {
    var jsfilter = filter(config.vendorFiles.js.filterExpr);
    log("Copying to " + config.vendorFiles.js.destDir);
    return gulp.src(mainBowerFiles({
            debugging: config.debug,
            paths: {
                bowerDirectory: config.bowerDir,
            },
            overrides: config.vendorFiles.js.overrides
        }), {base: config.bowerDir} )
        .pipe(jsfilter)
        .pipe(concat(config.vendorFiles.js.dest))
        .pipe(gulp.dest(config.vendorFiles.js.destDir))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.app.jsDir));
});

gulp.task('vendorfonts', function(){
    var fontsFilter = filter(config.vendorFiles.fonts.filterExpr);
    log("Copying to " + config.vendorFiles.fonts.destDir);
    return gulp.src(mainBowerFiles({
            debugging: config.debug,
            paths: {
                bowerDirectory: config.bowerDir,
            },
            overrides: config.vendorFiles.fonts.overrides
        }))
        .pipe(gulp.dest(config.vendorFiles.fonts.destDir));
});

gulp.task('vendorstyles', function(){
    var sassFilter = filter(config.vendorFiles.sass.filterExpr);
    var bootstrapfilter = filter('**/bootstrap-sass/**/*', { restore: true });
    var fontAwesomefilter = filter('**/font-awesome/**/*', { restore: true });
    return gulp.src(mainBowerFiles({
            debugging: config.debug,
            paths: {
                bowerDirectory: config.bowerDir,
            },
            overrides: config.vendorFiles.sass.overrides
        }),{base: config.bowerDir})
        .pipe(bootstrapfilter)
        .pipe(
            rename(function(fp) {
                var old = fp.dirname;
                var rep = path.join('bootstrap-sass','assets','stylesheets');
                fp.dirname = fp.dirname.replace(rep, '');
                log("Replacing '" + gutil.colors.magenta(old) + "' with '" + gutil.colors.magenta(fp.dirname) + "'");
                return fp;
            })
        )
        .pipe(gulp.dest(path.join(config.vendorFiles.sass.destDir, 'bootstrap')))
        .pipe(bootstrapfilter.restore)
        .pipe(fontAwesomefilter)
        .pipe(
            rename(function(fp) {
                var old = fp.dirname;
                var rep = path.join('font-awesome','scss');
                fp.dirname = fp.dirname.replace(rep, '');
                log("Replacing '" + gutil.colors.magenta(old) + "' with '" + gutil.colors.magenta(fp.dirname) + "'");
                return fp;
            })
        )
        .pipe(gulp.dest(path.join(config.vendorFiles.sass.destDir, 'font-awesome')));
});

gulp.task('copyVendorAssets', ['bower'], function() {
    return gulp.start('vendorjs', 'vendorfonts', 'vendorstyles')
});


//******** Chores **************
// Clean
gulp.task('clean', function() {
    var $_files = [config.app.siteRoot, config.app.jsDir + "/*.js"]
    log("Cleaning " + gutil.colors.blue($_files));
    return del($_files);
});

gulp.task('jshint', function() {
    return gulp.src(path.join(config.app.jsDir ,'src/**/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('processjs', ['jshint', 'vendorjs'], function() {
    return gulp.src(path.join(config.app.jsDir ,'src/**/*.js'))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.app.jsDir));
});

gulp.task('bootlint', function() {
    return gulp.src(config.app.siteRoot + '/**/*.html')
        .pipe(bootlint({
            loglevel : "warning"
        }));
});

gulp.task('watch', function() {
    gulp.watch(path.join(config.app.jsDir ,'src/**/*.js'), ['jshint', 'processjs']);
});


// Jekyll
gulp.task('jekyll', function() {
    var jekyllLogger = function(color){
        return function(buffer) {
            // bootlint when Jekyll is done initial generation
            if ((buffer.indexOf('Server running...') !== -1) || (buffer.indexOf('...done in') !== -1) ) {
                gulp.start('bootlint');
            }
            browserSync.notify(buffer);
            gutil.log(gutil.colors[color]('Jekyll: ') + buffer);
        };
    };

    var jekyllProc = child.exec("bundle exec jekyll serve --baseurl '' --incremental --watch --force_polling");
    
    jekyllProc.stdout.on('data', jekyllLogger('blue'));
    jekyllProc.stderr.on('data', jekyllLogger('red'));
    
    return gulp.start('watch');
});

// Browser Sync
gulp.task('browser-sync', function() {
    browserSync.init({
        files: [config.app.siteRoot + '/**'],
        port: 4000,
        server: {
            baseDir: config.app.siteRoot
        }
    });
    
    return gulp.watch([config.app.siteRoot + '/**/*.*'])
        .on('change', browserSync.reload);
});

gulp.task('serve', ['clean', 'processjs'], function() {
    gulp.start(['jekyll', 'browser-sync']);
    // TODO: do bootlint when on files that change
});


// ********* Public Tasks ***********
// Watch and lint files
gulp.task('lintwatch', ['bootlint', 'processjs'], function() {
    gulp.watch(config.app.siteRoot + '/**/*.html', ['bootlint']);

});


// Default task - before committing to Git for publishing
gulp.task('default', ['clean'], function() {
    return gulp.start('processjs', 'bootlint');
});

// Update the vendor libraries
gulp.task('updatelibs', ['clean-bower'], function() {
    return gulp.start('copyVendorAssets');
});