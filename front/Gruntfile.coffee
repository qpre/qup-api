LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->
  
  # Project configuration.
  BANNER =  "/* Recipes : " + (Date.now()).toString() + " */"
  GROUPS = {
    "app":"QPRecipes"
  }
  BIN='QPRecipes'
  PROJECT_NAME='QPRecipes'
  BUILDPATH='build/'
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    
    toaster:
      debug:
        minify: false
        packaging: true
        # bare: true
        folders: GROUPS
        release: "#{BUILDPATH}/#{BIN}.js"
      minified:
        minify: true
        packaging: true
        # bare: true
        folders: GROUPS
        release: "#{BUILDPATH}/#{BIN}.min.js"
        
    handlebars:
      all:
        options:
          namespace: "#{BIN}.Templates"
          processName: (filePath) ->
              filePath.replace(/^QPRecipes\/assets\/templates\//, "").replace /\.hbs$/, ""
        files:
          "build/QPRecipes.templates.js": ["app/assets/templates/**/*.hbs"]
          
    sass:
      dist:{
        files:[{
          expand: true,
          cwd: 'app/assets/style',
          src: ['**/*.scss'],
          dest: 'build/assets/style',
          ext: '.css',
          }]
      }
          
    cssmin:
      dist:
        options:
          banner: '/* QPRecipes */'
        files:
          'build/assets/style/QPRecipes.min.css': ['build/assets/style/**/*.css']
      
    copy:
      app:
        files: [
          {
            expand: true
            flatten: true
            src: ["app/assets/img/*"]
            dest: "#{BUILDPATH}/assets/img/"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "app/extern/"
            src: "**/*"
            dest: "#{BUILDPATH}/extern/"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "app/"
            src: "**/*.html"
            dest: "#{BUILDPATH}"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "app/files/"
            src: "**/*.md"
            dest: "#{BUILDPATH}/files/"
            filter: "isFile"
          }
        ]

    clean:
      app:
        src: ["build"]

    
    # this, is orgasmically neat
    watch:
      bower:
        files: ["app/extern/*"]
        tasks: ["copy:app"]

      coffee:
        files: ["app/src/**/*.coffee"]
        tasks: ["build"]

      css:
        files: ["app/assets/style/**/*.scss"]
        tasks: ["style"]

      img:
        files: ["app/assets/img/**/*.{png,jpg,jpeg,gif}"]
        tasks: ["copy:app"]

      md:
        files: ["app/files/**/*.md"]
        tasks: ["copy:app"]

      html:
        files: ["app/**/*.html"]
        tasks: ["copy:app"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: ["build/**/*"]

    connect:
      options:
        port: 9494
        hostname: "0.0.0.0"

      livereload:
        options:
          middleware: (connect) ->
            [
              lrSnippet
              mountFolder(connect, "build")
            ]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"
     
    shell:   
      createBuild:
        command: "mkdir build"
        options:
          stdout: true,
          failOnError: true

      removeBuild:
        command: "rm -rf build"
        options:
          stdout: true,
          failOnError: true
  
  # Load plugins
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-open"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks "grunt-coffee-toaster"
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  
  # Tasks
  grunt.registerTask "build", [
    "clean"
    "shell:createBuild"
    "handlebars"
    "style"
    "toaster"
    "copy"
  ]
  grunt.registerTask "style", [
    "sass"
    "cssmin"
  ]
  grunt.registerTask "server", (target) ->
    if target is "build"
      return grunt.task.run([
        "build"
        "open"
        "connect:dist:keepalive"
      ])
    grunt.task.run [
      "build"
      "connect:livereload"
      "open"
      "watch"
    ]
    return

  grunt.registerTask "default", ["build"]
  return
