const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.js('resources/js/app.js', 'public/js')
.sourceMaps()
.sass('resources/sass/app.scss', 'public/css')
.scripts([
    'resources/js/plugins/bootstrap-switch.js',
    'resources/js/plugins/nouislider.min.js',
    'resources/js/plugins/bootstrap-datepicker.js',
    'resources/js/now-ui-kit.js',
], 'public/js/custom.js')
.styles([
    'resources/css/now-ui-kit.css',
], 'public/css/custom.css');
