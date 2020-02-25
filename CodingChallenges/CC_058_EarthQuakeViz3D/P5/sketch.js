// 3D Earthquake Data Visualization
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/058-earthquakeviz3d.html
// https://youtu.be/dbs4IYGfAXc

// Some small but notable changes from the Processing version that is
// due to p5.js having a somewhat different API:
// - PVector.angleBetween(a, b) becomes a.angleBetween(b)
// - rotate(angle, x, y, z) becomes rotate(angle, vector)
// - table.rows() becomes table.rows (not a method call)
// - row.getFloat() becomes row.getNum()

let angle;

let table;
let r = 200;

let earth;
let globe;

function setup() {
  createCanvas(600, 600, WEBGL);
  earth = loadImage('earth.jpg');
  // table = loadTable(
  //   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv',
  //   'header'
  // );
  table = loadTable(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv',
    'header'
  );

  noStroke();
  globe = createShape(SPHERE, r);
  globe.setTexture(earth);
}

function draw() {
  background(51);
  translate(width * 0.5, height * 0.5);
  rotateY(angle);
  angle += 0.05;

  lights();
  fill(200);
  noStroke();
  //sphere(r);
  shape(globe);

  for (let row of table.rows) {
    let lat = row.getNum('latitude');
    let lon = row.getNum('longitude');
    let mag = row.getNum('mag');

    // original version
    // let theta = radians(lat) + PI/2;

    // fix: no + PI/2 needed, since latitude is between -180 and 180 deg
    let theta = radians(lat);

    let phi = radians(lon) + PI;

    // original version
    // let x = r * sin(theta) * cos(phi);
    // let y = -r * sin(theta) * sin(phi);
    // let z = r * cos(theta);

    // fix: in OpenGL, y & z axes are flipped from math notation of spherical coordinates
    let x = r * cos(theta) * cos(phi);
    let y = -r * sin(theta);
    let z = -r * cos(theta) * sin(phi);

    let pos = createVector(x, y, z);

    let h = pow(10, mag);
    let maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    let xaxis = createVector(1, 0, 0);
    let angleb = xaxis.angleBetween(pos);
    let raxis = xaxis.cross(pos);

    push();
    translate(x, y, z);
    // In p5.js, the rotation axis is a vector object instead of x,y,z
    rotate(angleb, raxis);
    fill(255);
    box(h, 5, 5);
    pop();
  }
}
