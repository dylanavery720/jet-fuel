var express = require('express');
var app = express();
var md5 = require('md5')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel'
app.locals.folders = []
app.locals.name = []


app.get('/', (request, response) => {
  response.sendFile( __dirname + "/" + "index.html" )
})

app.get('/api/folders', (request, response) => {
  response.send({payload: app.locals.folders})
})

app.get('/api/urls/:url', (request, response) => {
  const { url } = request.params
  console.log(app.locals.name[url])
  response.send(app.locals.name)
})

app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params
  const message = app.locals.folders[id]
  if(message !== undefined) {
  console.log(request.params)
  response.json({id, message})
} else {
  response.send("Not Found")
}
})

app.post('/api/folders/', (request, response) => {
  const message = request.body.body
  const id = md5(message)
  app.locals.folders.push({message: message, id: id})
  response.json({id, message})
})

app.post('/api/urls/:name', (request, response) => {
  const { name } = request.params
  const url = request.body.body
  const id = md5(url)
  app.locals.folders.push({url: url, id: id})
  response.json({id, url})
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
