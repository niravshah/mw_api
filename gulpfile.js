var gulp = require('gulp'),
    server = require('gulp-express');


gulp.task('connect', function() {
    server.run('app.js');
});

gulp.task('watch', function () {
    gulp.watch(['views/**/*.html','routes/**/*.js','models/**/*.js','*.js'],server.notify);
});


gulp.task('default', ['connect', 'watch']);