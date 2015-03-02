module.exports = function(grunt) {
  grunt.initConfig({
    'mocha-chai-sinon': {
      build: {
        src: ['./specs/**/*.spec.js'],
        options: {
          ui: 'bdd',
          reporter: 'spec'
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-mocha-chai-sinon");
  grunt.registerTask('test', [
    'mocha-chai-sinon'
  ]);
};
