module.exports = function (grunt) {
    grunt.initConfig ({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], // "**" -> qualquer pasta ||| "*"-> qualquer arquivo/
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html',],
                tasks:['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js',
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten: true,
                        src: ['src/index.html'], //origem
                        dest: 'dev/' //destino
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './dist/scripts/main.min.js',
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten: true,
                        src: ['prebuild/index.html'], //origem
                        dest: 'dist/' //destino
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html':'src/index.html' //destino/origem (minificacao)
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/script/main.min.js':'src/script/main.js' //arquivo final//origem
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); //to transferindo a produção para o vercel
}