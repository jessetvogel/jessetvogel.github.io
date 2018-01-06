var canvas;
var context;
var images = {};
var time, dt;
var offset = {
  r: { x: 0, y: 0 },
  g: { x: 0, y: 0 },
  b: { x: 0, y: 0 }
}

function main() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
  time = 0;
  dt = 1 / 60;
  setInterval(loop, 1000 * dt);

  // Load images
  loadImage('github');
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function loop() {
  // Clear
  context.fillStyle = '#11171a';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Effect
  if(time % 2.0 < 0.2) {
    var shake = 15.0;
    offset.r.x = (Math.random() - 0.5) * shake;
    // offset.r.y = (Math.random() - 0.5) * shake;
    // offset.g.x = (Math.random() - 0.5) * shake;
    // offset.g.y = (Math.random() - 0.5) * shake;
    offset.b.x = -offset.r.x; //(Math.random() - 0.5) * shake;
    // offset.b.y = (Math.random() - 0.5) * shake;
  }
  else {
    offset.r.x = offset.r.y = offset.g.x = offset.g.y = offset.b.x = offset.b.y = 0.0;
  }

  // Draw image
  var image = images['github'];
  if(image != undefined) {
    var width = 384;
    var height = 384;
    var x = canvas.width / 2 - width / 2;
    var y = canvas.height / 2 - height / 2 - 48;
    context.globalCompositeOperation = 'lighten';
    context.drawImage(image.red,   x + offset.r.x, y + offset.r.y, width, height);
    context.drawImage(image.green, x + offset.g.x, y + offset.g.y, width, height);
    context.drawImage(image.blue,  x + offset.b.x, y + offset.b.y, width, height);
    context.font = '32px museosans';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#ff0000';
    context.fillText('github.com/jessetvogel', x + width / 2 + offset.r.x / 2, y + height + 48 + offset.r.y / 2);
    context.fillStyle = '#00ff00';
    context.fillText('github.com/jessetvogel', x + width / 2 + offset.g.x / 2, y + height + 48 + offset.g.y / 2);
    context.fillStyle = '#0000ff';
    context.fillText('github.com/jessetvogel', x + width / 2 + offset.b.x / 2, y + height + 48 + offset.b.y / 2);
    context.globalCompositeOperation = 'source-over';
  }

  // Update time
  time += dt;
}

function loadImage(name) {
  (function (name) {
    var image = new Image();
    var src = '' + name + '.png';
    image.onload = function () {
      images[name] = {};
      images[name].red =   colorizeImage(image, 1.0, 0.0, 0.0);
      images[name].green = colorizeImage(image, 0.0, 1.0, 0.0);
      images[name].blue =  colorizeImage(image, 0.0, 0.0, 1.0);
    }
    image.src = src;
  })(name);
}

function colorizeImage (image, r, g, b)  {
  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0,);
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  for(var i = 0;i < pixels.data.length;i += 4) {
    pixels.data[i    ] *= r;
    pixels.data[i + 1] *= g;
    pixels.data[i + 2] *= b;
  }
  context.putImageData(pixels, 0, 0);
  return canvas;
}

console.log('Hello world!');
