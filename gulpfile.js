var gulp = require('gulp');
var inject = require('gulp-inject');


gulp.src('./src/**/*.html')
    .pipe(inject(gulp.src('./src/**/*.js', {
        read: false
    }), {
        relative: true
    }))
    .pipe(gulp.dest('./src'));

gulp.task('index', function () {
    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./bower_components/**/*.js', './bower_components/**/*.css'], {
        read: false
    });

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
});
