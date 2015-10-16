# gulp-npmignore

Desperate attempt to remove unnecessary things through gulp task.

## Install

```
$ npm install --save-dev gulp-npmignore

```

## Usage (as gulp task)

```js

var npmignore = require('gulp-npmignore');

gulp.task('npmignore', function () {
  return gulp.src('node_modules/**', {read: false})
    .pipe(npmignore())
    .pipe(vinylPaths(del))
});

```

## License

MIT © [Lauris Vavere](https://github.com/vavere)
