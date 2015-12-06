module.exports = function (grunt) {
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

  /**********
    Config
  **********/
  grunt.initConfig({
    // Facebook Flow (TypeChecking)
    shell: {
      flow: {
        command: 'cd ./src; flow check',
        failOnError: true,
        stdout: true,
      },
    },

    // Browserify ( babel -> browserify )
    browserify: {
      options: {
        transform: [
          [
            'babelify',
            {
              presets: ['es2015', 'react', 'stage-0', 'stage-1'],
            },
          ],
        ],
      },

      app: {
        files: {
          './dist/qup.js': ['./src/**/*.js'],
        },
      },
    },

    // copying static files
    copy: {
      dist: {
        files: [
          { expand: true, cwd: './public/', src: ['**'], dest: 'dist/' },
        ],
      },
    },

    // Removing old assets
    clean: {
      artifacts: ['dist'],
    },

    // watch (actions triggered on files change)
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build'],
      },
      public: {
        files: ['public/**/*'],
        tasks: ['copy'],
      },
      targets: {
        files: ['dist/**/*'],
        tasks: [],
        options: {
          livereload: true,
        },
      },
    },

    // connect (dev server + livereload event handling)
    connect: {
      server: {
        options: {
          port: 9494,
          base: {
            path: 'dist',
            options: {
              index: 'index.html',
              maxAge: 300000,
            },
          },
        },
      },
    },
  });

  /**********
    TASKS
  **********/

  // default task watches for change
  grunt.registerTask('default', ['build', 'connect', 'watch']);

  // build task checks code then builds artifacts
  grunt.registerTask('build', ['shell:flow', 'clean', 'browserify', 'copy']);
};
