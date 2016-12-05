// var URL_EXCUSES = '/data/desculpas_do_dmz.json';
var URL_EXCUSES = 'https://gist.githubusercontent.com/ricardogpsf/1843675aa6ca742dfad6ceef6922b81a/raw/da6699488e275a8b963fd5a6f638200d7938c0b4/desculpas_do_dmz.js';

var CSS_LOADING = ' loading';
var loadingElement = document.getElementById('loading');
var excuseElement = document.getElementById('excuse-text');

document.getElementById('excuse-btn').onclick = function() {
  generateExcuse();
}

function findExcuses(callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', URL_EXCUSES, true);
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
    var randomIndex = Math.ceil(Math.random() * excuses.length) - 1;
    var excuse = excuses[randomIndex];
    excuseElement.textContent = "\"Caaaara, " + excuse + ", não dá oh!\"";
  });
}

function loading(action) {
  loadingElement.style.display = (action === "start") ? "inline-block" : "none";
}
