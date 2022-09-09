const http = require("http")
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const mock_apps = require('./mock_apps2.json');
let applications = mock_apps.apps

const mock_users = require('./mock_users2.json');
let users = mock_users.users

const mock_news = require('./mock_news.json');
let news = mock_news.news

let authors = [
  'Montgomery',
  'Gertrude',
  'Ebenezer',
  'Isaiah',
  'Madeleine',
  'Winthrop'
]

var app = express();
app.use(cors());
app.options('*', cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.get('/app', async function(request, response) {
  response.send(applications)
})

app.get('/notices', async function(request, response) {
  let newsItems = []
  for (var i = 0; i < 100; i++) {
    let date = Date.now()
    let created = date - Math.floor(Math.random() * 1000000000)
    let display = created + Math.floor(Math.random() * 1000000000)
    let expired = display + Math.floor(Math.random() * 1000000000)
    let createdDate = new Date(created).toISOString()
    let displayDate = new Date(display).toISOString()
    let expiredDate = new Date(expired).toISOString()
    let item = {
      id: i,
      created_by: authors[Math.floor(Math.random() * authors.length)],
      app_short_name: applications[Math.floor(Math.random() * applications.length)].appShortName,
      insert_date: createdDate,
      start_date: displayDate,
      expire_date: expiredDate,
      notice_title: 'Notice Item ' + (i + 1),
      notice_text: 'This is the content for notice number ' + (i + 1) + '. It contains some text which is noticeable by the users who notice it. Notably, it is a notice. And I should note, it is also a notice.'
    }
    newsItems.push(item)
  }
  response.send(newsItems)
})

app.post('/notices', async function(request, response) {
  response.send({message: 'successfully created notice'})
})

app.put('/notices/:id', async function(request, response) {
  response.send(request.params)
})

app.delete('/notices/:id', async function(request, response) {
  response.send(request.params)
})

app.get('/user', async function(request, response) {
  let user = users[0]
  response.send(user)
})

app.post('/logaccess', async function(request, response) {
  let stuff = 'logged'
  response.send(stuff)
})

// start the server
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('server running on port:' + port);
});
