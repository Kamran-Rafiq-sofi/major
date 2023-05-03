const gulp=require('gulp');
const sass=require('gulp-sass')(require('sass'));
// const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
// import gulp from 'gulp'
// import sass from 'gulp-sass'
// import cssnano from 'gulp-cssnano'

// const cssnano=require(' cssnano');

const rev= require('gulp-rev');
const uglify=require('gulp-uglify-es').default;
const imagemin=require('gulp-imagemin');
const del=require('del');
// gulp.task('css',function(){
//     console.log("minifying css....");
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//     // renaming
//     return gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge: true,
//     }))
//     .pipe(gulp.dest('./public/assets'))
// })
gulp.task('css',function(done){
    console.log("minifying css....");
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    // renaming
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge: true,
        base:'public/assets'
    }))
    .pipe(gulp.dest('./public/assets'));
     done();
});


// js
gulp.task('js',function(done){
    console.log("uglfying js....");
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    // .pipe(cssnano())
    // .pipe(gulp.dest('./assets.css'));

    // renaming
    // return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge: true,
        base:'public/assets'
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

// images
gulp.task('images',function(done){
    console.log("compressing images....");
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    // .pipe(cssnano())
    // .pipe(gulp.dest('./assets.css'));

    // renaming
    // return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge: true,
        base:'public/assets'
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})
// empty public/assets folder
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
})
gulp.task('build',gulp.series('clean:assets','css','js','images',function(done){
    console.log("building assets");
    done();

}));