var express = require('express');
var app = express();
var md5 = require('md5')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel'
app.locals.folders = {}

app.get('/index.html', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" )
})

app.get('/', (request, response) => {
  response.send('It\'s a secret to everyone.')
})

app.get('/api/new_folder/:id', (request, response) => {
  const { id } = request.params
  const message = app.locals.folders[id]
  if(message !== undefined) {
  console.log(request.params)
  response.json({id, message})
} else {
  response.send("holy fuck Rick")
}
})

app.post('/api/new_folder/', (request, response) => {
  const message = request.body.folder_name
  const id = md5(message)
  app.locals.folders[id] = message
  response.json({id, message})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
