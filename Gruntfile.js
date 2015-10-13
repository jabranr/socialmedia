module.exports = function(grunt)	{

	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		project: {
			path: {
				to: {
					tests: 'test/',
					dist: 'dist/',
					dev: {
						basedir: 'src',
						coffee: {
							core: 'src/coffee',
							platforms: 'src/coffee/platforms'
						},
						js: {
							core: 'src/js',
							platforms: 'src/js/platforms'
						}
					}
				}
			}
		},

		coffee: {
			options: {
				bare: true
			},
			core: {
				expand: true,
				flatten: true,
				cwd: '<%= project.path.to.dev.coffee.core %>',
				src: ['*.coffee'],
				dest: '<%= project.path.to.dev.js.core %>',
				ext: '.js'
			},
			platforms: {
				expand: true,
				flatten: true,
				cwd: '<%= project.path.to.dev.coffee.platforms %>',
				src: ['*.coffee'],
				dest: '<%= project.path.to.dev.js.platforms %>',
				ext: '.js'
			}
		},

		concat: {
			options: {
				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */\n'
			},
			dist: {
				src: [
					'<%= project.path.to.dev.js.core %>/main.js',
					'<%= project.path.to.dev.js.platforms %>/*.js'
				],
				dest: '<%= project.path.to.dist %><%= pkg.name %>.js'
			}
		},

        jshint: {
            options: {
                jshintrc: '.jshintrc'
                // reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= project.path.to.dist %>/*.js',
                '!<%= project.path.to.dist %>/*.min.js'
            ]
        },

		uglify: {
			build: {
				src: '<%= project.path.to.dist %><%= pkg.name %>.js',
				dest: '<%= project.path.to.dist %><%= pkg.name %>.min.js'
			},
			options: {
				preserveComments: 'some',
				sourceMap: true
			}
		},

		watch: {
			coffee: {
				files: [
					'<%= project.path.to.dev.coffee.core %>/*.coffee',
					'<%= project.path.to.dev.coffee.platforms %>/*.coffee',
				],
				tasks: ['coffee', 'concat'],
				options: {
					spawn: false
				}
			},

			script: {

				files: [
					'<%= project.path.to.dev.js.core %>/*.js',
					'<%= project.path.to.dev.js.platforms %>/*.js',
				],
				tasks: ['concat'],
				options: {
					spawn: false
				}
			},

			config: {
				files: ['./Gruntfile.js', './package.json', './bower.json'],
				options: {
					spawn: false
				}
			}
		}
	});

	// Default watch task
	grunt.registerTask('default', ['watch']);

	// Build task
	grunt.registerTask('build', ['coffee', 'concat', 'uglify']);
};
