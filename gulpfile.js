var gulp    = require('gulp'),
sass        = require('gulp-sass'),
browserSync = require('browser-sync'),
autoprefixer = require('gulp-autoprefixer'),
concat = require('gulp-concat'),
uglify = require('gulp-uglifyjs'),
cssnano = require('cssnano');

gulp.task('sass', function() {
    return gulp.src('app/sass/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/js/script.js',
        'app/js/script2.js'
    ])
    .pipe(concat('alls.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))

})

gulp.task('csslib', function() {
    return gulp.src('app/css/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('prefixer', function() {
   gulp.src('app/css/main.css')
   .pipe(autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
   }))
   .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});