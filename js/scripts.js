var URL_EXCUSES = 'data/desculpas_do_dmz.json';
// var URL_EXCUSES = 'https://gist.githubusercontent.com/ricardogpsf/1843675aa6ca742dfad6ceef6922b81a/raw';
// var URL_EXCUSES = 'https://codepen.io/ricardogpsf/pen/eBPgXv.js';
var URL_BASE_AUDIOS = 'https://raw.githubusercontent.com/ricardogpsf/dmz_generator/master/data/audios/';

var CSS_LOADING = ' loading';
var loadingElement = document.getElementById('loading');
var excuseElement = document.getElementById('excuse-text');
var audioElement = document.getElementById('excuse-audio');

// Turns the app a PWA with installation lika a native app
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./main-service-worker.js');
};

document.getElementById('excuse-btn').onclick = function() {
  generateExcuse();
}

function findExcuses(callback) {
  var xmlhttp = new XMLHttpRequest();
  var url = URL_EXCUSES + '?timestamp=' + new Date().getTime();
  xmlhttp.open('GET', url, true);
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.send(null);
}

function generateExcuse() {
  excuseElement.textContent = "";
  loading('start');

  findExcuses(function(excuses) {
    loading('stop');
    var keys = Object.keys(excuses);
    var values = Object.values(excuses);
    var randomIndex = Math.ceil(Math.random() * values.length) - 1;
    var excuse = values[randomIndex];
    var audioName = keys[randomIndex];
    excuseElement.textContent = "\"Caaaara, " + excuse + ", não dá oh!\"";
    // excuseElement.textContent = "\"" + excuse + "\"";
    audioElement.src = URL_BASE_AUDIOS + audioName;
    audioElement.classList.remove('hide');
  });
}

function loading(action) {
  loadingElement.style.display = (action === "start") ? "inline-block" : "none";
}
