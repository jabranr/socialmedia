module.exports = function(grunt)	{

	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		project: {
			src: 'src/',
			dist: 'dist/',
			tests: 'test/'
		},

		clean: {
			build: {
				src: ['<%= project.dist %>']
			}
		},

		concat: {
			options: {
				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */\n'
			},
			dist: {
				src: [
					'<%= project.src %>/core.js',
					'<%= project.src %>/*.js'
				],
				dest: '<%= project.dist %><%= pkg.name %>.js'
			}
		},

	  jshint: {
	      options: {
	          jshintrc: '.jshintrc'
	          // reporter: require('jshint-stylish')
	      },
	      all: [
	          'Gruntfile.js',
	          '<%= project.src %>/*.js'
	          // '<%= project.dist %>/*.js',
	          // '<%= project.tests %>/*.js',
	          // '!<%= project.dist %>/*.min.js'
	      ]
	  },

		uglify: {
			build: {
				src: '<%= project.dist %><%= pkg.name %>.js',
				dest: '<%= project.dist %><%= pkg.name %>.min.js'
			},
			options: {
				preserveComments: 'some',
				sourceMap: true
			}
		},

		watch: {
			script: {
				files: ['<%= project.src %>/*.js'],
				tasks: ['concat'],
				options: {
					livereload: true,
					spawn: false
				}
			},

			config: {
				files: ['./Gruntfile.js', './package.json', './bower.json'],
				options: {
					livereload: true,
					spawn: false
				}
			},

			tests: {
				files: ['<%= project.tests %>/*.{js,html}'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		}
	});

	// Default watch task
	grunt.registerTask('default', ['watch']);

	// Build task
	grunt.registerTask('build', ['clean', 'concat', 'uglify', 'jshint']);

};
