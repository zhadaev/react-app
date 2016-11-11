var express =   require('express'),
      app =   express();

app.set('port', (process.env.PORT   ||  3333));
app.use('/',    express.static(__dirname));
app.listen(app.get('port'), function()  {
        console.log('Server started:    http://localhost:'  +   app.get('port') +   '/');
});