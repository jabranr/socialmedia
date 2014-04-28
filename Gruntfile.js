module.exports = function(grunt)	{
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		coffee: {
			options: {
				bare: true
			},
			glob_to_multiple: {
				expand: true,
				flatten: true,
				cwd: 'dev/coffee',
				src: ['*.coffee'],
				dest: 'dev/js',
				ext: '.js'
			}
		},

		concat: {
			options: {
				banner: "/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> | <%= pkg.repo %> */"
			},
			dist: {
				src: [
					'dev/js/socialmedia.js',
					'dev/js/*.js'
				],
				dest: 'src/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},

		uglify: {
			build: {
				src: 'src/<%= pkg.name %>-<%= pkg.version %>.js',
				dest: 'src/<%= pkg.name %>-<%= pkg.version %>.min.js'
			},
			options: {
				preserveComments: 'some'
			}
		},

		watch: {
			scripts: {
				files: ['dev/coffee/*.coffee', 'dev/js/*.js'],
				tasks: ['coffee', 'concat', 'uglify'],
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

	grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'watch']);
};