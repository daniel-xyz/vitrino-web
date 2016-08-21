module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JSHINT
    jshint: {
      files: ['Gruntfile.js', 'app.js', 'routes.js', '.jshintrc', 'server/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // MOCHA
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*.js']
      }
    },

    // LESS
    less: {
      build: {
        options: {
          paths: ['client/stylesheets/core', 'client/stylesheets/custom'],
          plugins: [
              new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
          ]
        },
        files: {
            'public/css/vitrino.css': 'client/stylesheets/vitrino.less'
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

    // WATCH
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['build']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('build', ['jshint', 'less', 'cssmin']);
  grunt.registerTask('build-and-test', ['build', 'test']);
  grunt.registerTask('default', ['build', 'watch']);
};