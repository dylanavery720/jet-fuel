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

app.get('/:shortUrl', (request, response) => {
  database('urls').where('shah', request.params.shortUrl).increment('clicks', 1)
  .then(function(){
    database('urls').where('url', request.params.shortUrl).select()
        .then(function(url) {
          response.status(200).redirect('http://www.espn.com');
        })
        .catch(function(error) {
          console.error(error)
        });
    })
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
  const newUrl = {url, folder_id: name, shah: shortUrl, shortUrl: `http://localhost:3000/${shortUrl}`, clicks: 1}
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

app.patch('/api/urls/:name', (request, response) => {

})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
