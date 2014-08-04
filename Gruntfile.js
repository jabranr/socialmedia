module.exports = function(grunt)	{
	
	'use strict';

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		project: {
			path: {
				to: {
					tests: 'tests',
					dist: 'src/',
					dev: {
						basedir: 'dev',
						coffee: {
							core: 'dev/coffee/core',
							platforms: 'dev/coffee/platforms'
						},
						js: {
							core: 'dev/js/core',
							platforms: 'dev/js/platforms'
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
					'<%= project.path.to.dev.js.core %>/core.js',
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
				preserveComments: 'some'
			}
		},

		watch: {
			coffee: {
				files: [
					'<%= project.path.to.dev.coffee.core %>/*.coffee',
					'<%= project.path.to.dev.coffee.platforms %>/*.coffee',
				],
				tasks: [
					'coffee',
					'concat',
					'uglify'
				],
				options: {
					spawn: false
				}
			},

			script: {
				
				files: [
					'<%= project.path.to.dev.js.core %>/*.js',
					'<%= project.path.to.dev.js.platforms %>/*.js',
				],
				tasks: [
					'concat',
					'uglify'
				],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask(
		'default', [
			'coffee',
			'concat',
			'uglify',
			'watch'
		]
	);
};