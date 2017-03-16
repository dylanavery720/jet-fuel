var express = require('express');
var app = express();
var md5 = require('md5')
var bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Jet Fuel'


app.get('/', (request, response) => {
  response.sendFile( __dirname + "/" + "index.html" )
})

app.get('/api/folders', (request, response) => {
  database('folders').select()
  .then(function(folders){
    response.status(200).send(folders)
  })
  .catch(function(error) {
    console.error('somethings wrong with db')
  });
})

app.get('/api/urls/:url', (request, response) => {
  database('urls').where('folder_id', request.params.url).select()
        .then(function(urls) {
          response.status(200).json(urls);
        })
        .catch(function(error) {
          console.error('somethings wrong with redirect')
        });
})

app.get('/api/folders/:id', (request, response) => {
  database('folders').where('id', request.params.id).select()
        .then(function(folders) {
          response.status(200).json(folders);
        })
        .catch(function(error) {
          console.error('somethings wrong with redirect')
        });
})

app.post('/api/folders/', (request, response) => {
  const name = request.body.body
  const folder = { name, created_at: new Date }
  database('folders').insert(folder)
  .then(function(){
    database('folders').select()
    .then(function(folders){
      response.status(200).json(folders);
    })
    .catch(function(error) {
      console.error('somethings wrong with db')
    });
  })
})

app.post('/api/urls/:name', (request, response) => {
  const { name } = request.params
  const url = request.body.body
  const id = md5(url)
  const shortUrl = id.substring(2,5)
  const newUrl = {url, folder_id: name, shortUrl: `http://localhost:3000/${shortUrl}`}
  database('urls').insert(newUrl)
  .then(function(){
    database('urls').select()
    .then(function(urls){
      response.status(200).json(urls);
    })
    .catch(function(error) {
      console.error('somethings wrong with db')
    });
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
