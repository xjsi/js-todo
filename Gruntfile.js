module.exports = function(grunt) {
  'use strict';
  // Equivalent to grunt.loadNpmTasks for each thing starting with grunt- in package.json
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      files: ['./src/**/*.*', '*.html'],
      tasks: ['build'],
      options: {
        livereload: true
      },
    },

    clean: {
        assets: {
            src: ['build/**'],
            options: {
              force: true
            }
        }
    },
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src/less',
          src: '*.less',
          dest: 'build/stylesheets/less/'
        },
        {
          expand: true,
          cwd: 'src/images',
          src: '*.*',
          dest: 'build/images/'
        },
        {
          expand: true,
          cwd: 'src/fonts',
          src: '*.*',
          dest: 'build/fonts/'
        }
        ]
      }
    },

    less: {
      all: {
        options: {
            sourceMap: true,
            sourceMapFilename: 'build/stylesheets/main.css.map',
            sourceMapURL: 'main.css.map',
            sourceMapBasepath: 'src/less',
            sourceMapRootpath: '/build/stylesheets/less',
        },
        files: {
          "build/stylesheets/main.css": "src/less/main.less"
        }
      }
    },
    uglify: {
      my_target: {
          options: {
            sourceMap: true,
          },
          files: {
            'build/javascripts/main.min.js': ['bower_components/underscore/underscore-min.js', 'bower_components/jquery/dist/jquery.min.js', 'src/**/*.js']
          }
      }
    },
    webdriver: {
      options: {
          host: 'localhost',
          port: 4444,
          desiredCapabilities: {
              browserName: 'firefox'
          }
      },
      homepage: {
          tests: ['./uitest/*.js']
      }

    },

    mocha: {
      test: {
        src: ['spec/test-runner.html'],
        options: {
          run: true,
          log: true
        },
      }
    },
    jasmine: {
      pivotal: {
        src: 'src/javascripts/todo.js',
        options: {
          specs: 'spec/javascripts/todo-spec.js',
          vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
          ]
        }
  }
}
  });

  grunt.registerTask('build', [
    'clean',
    'uglify',
    'copy',
    'less'
  ]);

  grunt.registerTask('default', [
    'clean',
    'uglify',
    'copy',
    'less'
  ]);
};
