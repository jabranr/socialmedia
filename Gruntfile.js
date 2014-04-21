module.exports = function(grunt)	{
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

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
				files: ['dev/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};