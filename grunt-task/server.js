module.exports = function (grunt) {
    var errorhandler = require('errorhandler');
    var compression = require('compression');
    var express = require('express');
    grunt.registerTask('server', 'static file dev server', function () {
        var app, webPort, webRoot;
        webPort = grunt.config.get('server.web.port') || 8000;
        webRoot = grunt.config.get('server.webRoot') || 'public_html';
        app = express();
        app.use(compression());
        app.use(express.static(''+ (process.cwd()) + '/' + webRoot));
        app.use(errorhandler());
        app.listen(webPort);
        grunt.log.writeln('Starting Express Web Server in \''+ webRoot + ' ' +webPort);
    });
};

