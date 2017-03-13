var express = require('express');
var app = express();
var md5 = require('md5')

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel'

app.get('/index.html', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/', (request, response) => {
  response.send('It\'s a secret to everyone.');
});

app.get('/api/new_folder/', (request, response) => {
  console.log(request.query)
  response.json({id: request.query.folder_name});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
