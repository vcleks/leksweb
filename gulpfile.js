const { src, dest, parallel, watch, series } = require('gulp');
const fileinclude = require('gulp-file-include');
const del = require('del');


function clean() {
    return del('output/');
}

function html() {
    return src('pages/**/*.html')
        .pipe(fileinclude({
            basepath: 'includes/',
        }))
        .pipe(dest('output/'));
}

function staticContent() {
    return src('static/**')
        .pipe(dest('output/'));
}

exports.default = series(clean, function() {
    watch(['pages/**/*.html', 'includes/'], { ignoreInitial: false }, html);
    watch(['static/'], { ignoreInitial: false }, staticContent);
});

exports.build = series(clean, parallel(html, staticContent));

exports.clean = clean;