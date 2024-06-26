var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const multer = require('multer');

const storage = multer.diskStorage(
  {
    destination: './public/sound_files/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }
);

const upload = multer({ storage: storage });


server.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/ear', function (req, res) {
  res.render('ear');
});


io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });

  // io.sockets.emit('setColor', {
  //   color: data.color
  // })

});



app.post("/notes", upload.single("audio_data"), function (req, res) {
  console.log('New audio file uploaded: ' + req.file.originalname);

  io.sockets.emit('newAudio', {
    audio: req.file.originalname
  })

  res.status(200).send("ok");
});
