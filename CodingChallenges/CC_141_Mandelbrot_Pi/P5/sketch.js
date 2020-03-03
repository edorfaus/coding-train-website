// Mandelbrot Pi
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/141-mandelbrot-pi.html
// https://youtu.be/pn2vlselv_g

const digits = 11;

// This must be set before using the BigDecimal class, and must be const.
const precision = BigInt(digits * digits + 1);

let c = new BigDecimal(25, 2);
// let hundred = new BigDecimal(100);
// let e = BigDecimal.ONE.divide(hundred.pow(digits - 1), mc);
let e = new BigDecimal(1, 2 * (digits - 1));
let z = new BigDecimal(0);
let iterations = BigInt(0);
let two = new BigDecimal(2);

let mandel;

function preload() {
  mandel = loadImage('mandelbrot.jpg');
}

function setup() {
  createCanvas(1440, 1080);
  frameRate(60);
  c = c.add(e);
}

function draw() {
  for (let i = 0; i < 25691; i++) {
    if (z.compareTo(two) == -1) {
      z = z.multiply(z);
      z = z.add(c);
      //if (iterations % 10000 == 0 || z.compareTo(two) == 1) {
      //println(z.toString());
      iterations = iterations + BigInt(1);
    } else {
      noLoop();
      break;
    }
  }

  background(mandel);
  fill(255);
  textSize(48);
  textAlign(CENTER);
  let s = iterations.toString();
  let diff = digits - s.length;
  for (let i = 0; i < diff; i++) {
    s = '0' + s;
  }
  s = s.substring(0, 1) + '.' + s.substring(1, s.length);
  text(s, width / 2 + 250, height / 2 + textDescent());
}
