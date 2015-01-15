LIVERELOAD_PORT = 35732
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->
  
  # Project configuration.
  BANNER =  "/* Recipes : " + (Date.now()).toString() + " */"
  GROUPS = {
    "front/app":"QPRecipes"
  }
  BIN='QPRecipes'
  PROJECT_NAME='QPRecipes'
  BUILDPATH='back/public'
  APPPATH='front/app'
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    
    toaster:
      debug:
        minify: false
        packaging: true
        # bare: true
        folders: GROUPS
        release: "#{BUILDPATH}/assets/js/#{BIN}.js"
      minified:
        minify: true
        packaging: true
        # bare: true
        folders: GROUPS
        release: "#{BUILDPATH}/assets/js/#{BIN}.min.js"
        
    handlebars:
      all:
        options:
          namespace: "#{BIN}.Templates"
          processName: (filePath) ->
              filePath.replace(/^QPRecipes\/assets\/templates\//, "").replace /\.hbs$/, ""
        files:
          "back/public/assets/js/QPRecipes.templates.js": ["#{APPPATH}/assets/templates/**/*.hbs"]
          
    sass:
      dist:{
        files:[{
          expand: true,
          cwd: 'front/app/assets/style',
          src: ['**/*.scss'],
          dest: 'back/public/assets/style',
          ext: '.css',
          }]
      }
          
    cssmin:
      dist:
        options:
          banner: '/* QPRecipes */'
        files:
          'back/public/assets/style/QPRecipes.min.css': ['back/public/assets/style/**/*.css']
      
    copy:
      app:
        files: [
          {
            expand: true
            flatten: true
            src: ["#{APPPATH}/assets/img/*"]
            dest: "#{BUILDPATH}/assets/img/"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "#{APPPATH}/extern/"
            src: "**/*"
            dest: "#{BUILDPATH}/assets/extern/"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "#{APPPATH}/"
            src: "**/*.html"
            dest: "#{BUILDPATH}"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "#{APPPATH}/files/"
            src: "**/*.md"
            dest: "#{BUILDPATH}/files/"
            filter: "isFile"
          }
        ]

    clean: ["back/public"]

    
    # this, is orgasmically neat
    watch:
      bower:
        files: ["#{APPPATH}/extern/*"]
        tasks: ["copy:app"]

      coffee:
        files: ["#{APPPATH}/src/**/*.coffee"]
        tasks: ["build"]

      css:
        files: ["#{APPPATH}/assets/style/**/*.scss"]
        tasks: ["style"]

      img:
        files: ["#{APPPATH}/assets/img/**/*.{png,jpg,jpeg,gif}"]
        tasks: ["copy:app"]

      md:
        files: ["#{APPPATH}/files/**/*.md"]
        tasks: ["copy:app"]

      html:
        files: ["#{APPPATH}/**/*.html"]
        tasks: ["copy:app"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: ["back/public/**/*"]

    connect:
      options:
        port: 9494
        hostname: "0.0.0.0"

      livereload:
        options:
          middleware: (connect) ->
            [
              lrSnippet
              mountFolder(connect, "back/public")
            ]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"
     
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
