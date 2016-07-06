module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JSHINT
    jshint: {
      files: ['Gruntfile.js', 'app.js', '.jshintrc', 'src/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // LESS
    less: {
      build: {
        options: {
          paths: ['app/assets/less'],
          plugins: [
              new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
          ]
        },
        files: {
            'public/css/vitrino.css': 'app/assets/less/vitrino.less'
        }
      }
    },

    // CSSMIN
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
    },
    build: {
      files: {
        'public/css/vitrino.min.css': 'public/css/vitrino.css'
      }
      }
    },

    // NUNJUCKS
    nunjucks: {
      precompile: {
        baseDir: 'app/views/',
        src: 'app/views/*',
        dest: 'public/js/templates.js'
      }
    },

    // WATCH
    watch: {
      files: ['<%= jshint.files %>', 'views/*', 'assets/**'],
      tasks: ['jshint', 'less', 'cssmin', 'nunjucks']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nunjucks');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'less', 'cssmin', 'nunjucks', 'watch']);
};