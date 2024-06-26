socket.on('newAudio', function (data) {
  console.log('Audio reçu');
  console.log(data.audio);

  let audioDOM = document.createElement('audio');
  audioDOM.src = './sound_files/'+data.audio;
  audioDOM.controls = true;
  audioDOM.autoplay = true;
  document.body.appendChild(audioDOM);
});