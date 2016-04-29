var gulp = require('gulp');
var spawn = require('child_process').spawn, node;
var eslint = require('gulp-eslint');
var files = ['api/**/*.js', '!node_modules/**', '!api/responses/*.js'];
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var jasmine = require('gulp-jasmine');
var jasmines = require('gulp-jasmine-phantom');

gulp.task('server', function () {
    if (node) node.kill()
    node = spawn('node', ['app.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('default', function () {
    gulp.run('server')
    gulp.watch(['api/controllers/*.js', '*.html', '*.js'], function () {
        gulp.run('server')
    });

});

gulp.task('lint', function () {
    return gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('pre-test', function () {
  return gulp.src(files)
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/bootstrap.test.js','test/integration/**/*.test.js', ])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});


gulp.task('unitest', ['pre-test'], function () {
    return gulp.src('specs/unit-spec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it 
        .pipe(jasmines())
         // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});


