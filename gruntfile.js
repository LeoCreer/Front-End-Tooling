module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        files: {
            js: {
                vendor: [
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/js/*.js'
                ],
                src: ['development_html/app/**/*.js']
            },
            css: {
                vendor: [
                    'bower_components/bootstrap/dist/css/bootstrap.css'
                ],
                src: ['development_html/**/*.less', 'development_html/**/*.css']
            },
            html: {
                vendor: [],
                src: ['development_html/*.html']
            },
            images: {
                vendor: [],
                src: []
            },
            fonts: {
                vendor: [],
                src: []
            }
        },
        folders: {
            js: {
                dest: 'public_html/assets/js/app.min.js'
            },
            images: {
                dest: [
                    'public_html/assets/images/',
                ]
            },
            fonts: {
                dest: 'public_html/assets/fonts/'
            },
            html: {
                dest: 'public_html/index.html'
            },
            css: {
                dest: 'public_html/assets/css/main.min.css'
            }
        },
        concat: {
            js: {
                dest: '<%= folders.js.dest %>',
                src: ['<%= files.js.vendor %>', '<%= files.js.src %>']
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['<%= files.html.src %>'],
                tasks: ['copy']
            },
            js: {
                files: ['<%= files.js.src %>'],
                tasks: ['concat', 'uglify']
            },
            less: {
                files: ['<%= files.css.src %>'],
                tasks: ['less:dev', 'cssmin']
            }

        },
        less: {
            dev: {
                dest: '<%= folders.css.dest %>',
                src: ['<%= files.css.vendor %>', '<%= files.css.src %>']
            }
        },
        uglify: {
            js: {
                dest: '<%= folders.js.dest %>',
                src: '<%= concat.js.dest %>'
            }
        },
        cssmin: {
            css: {
                dest: '<%= less.dev.dest %>',
                src: ['<%= less.dev.src %>']
            }
        },
        copy: {
            html: {
                src: '<%= files.html.src %>',
                dest: '<%= folders.html.dest %>'
            }
        },
        server: {
            webRoot: 'public_html',
            web: {
                port: 8000
            }
        },
        open: {
            dev: {
                path: 'http://www.localhost:<%= server.web.port %>'
            }
        }
    });
    grunt.loadTasks('grunt-task');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.registerTask('default', ['less', 'cssmin', 'concat', 'uglify', 'copy', 'server', 'open', 'watch']);
};