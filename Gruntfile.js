module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        nunjucks: {
            precompile: {
                baseDir: 'views/',
                src: 'views/*',
                dest: 'static/js/templates.js',
                options: {
                    name: function(filename) {
                        return 'foo/' + filename;
                    }
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', 'views/*'],
            tasks: ['jshint', 'nunjucks']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nunjucks');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'nunjucks', 'watch']);
};