const socket = io();

var i = 0;
function loadBar() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("loading");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        setTimeout(() => {
            elem.style.width = "0%";
        }, 200);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function page(name) {
  location.replace(`/${name}`)
}

function onSignIn(res) {
  socket.emit('GOOGLE_LOG_IN', res);
}