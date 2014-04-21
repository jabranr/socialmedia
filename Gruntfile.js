module.exports = function(grunt)	{
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'dev/socialmedia.js',
					'dev/*.js'
				],
				dest: 'src/socialmedia.js'
			}
		},

		uglify: {
			build: {
				src: 'src/socialmedia.js',
				dest: 'src/socialmedia.min.js'
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