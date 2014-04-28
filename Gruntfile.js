module.exports = function(grunt)	{
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		coffee: {
			options: {
				bare: true
			},
			compile: {
				files: { 
					'dev/socialmedia-coffee.js' : ['dev/coffee/socialmedia.coffee', 'dev/coffee/*.coffee']
				}
			}
		},

		concat: {
			options: {
				banner: "/*! <%= pkg.name %> | v<%= pkg.version %> | <%= pkg.author %> | <%= pkg.license %> */"
			},
			dist: {
				src: [
					'dev/socialmedia.js',
					'dev/*.js'
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
				files: ['dev/*.js', 'dev/coffee/*.coffee'],
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