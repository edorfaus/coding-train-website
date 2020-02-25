// 3D Earthquake Data Visualization
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/058-earthquakeviz3d.html
// https://youtu.be/dbs4IYGfAXc

// Some small but notable changes from the Processing version that is
// due to p5.js having a somewhat different API:
// - PVector.angleBetween(a, b) becomes abs(a.angleBetween(b))
//       The abs() is because they have a different output range.
// - rotate(angle, x, y, z) becomes rotate(angle, vector)
// - table.rows() becomes table.rows (not a method call)
// - row.getFloat() becomes row.getNum()
// - no translate() call is needed to center the view
// - we have to initialize the angle variable to 0 explicitly

// Additionally, p5.js does not have the PShape object, but instead
// uses the approach the video shows as not working in Processing, that
// is, calling texture() right before the sphere() function works here.
// This allows us to remove the globe variable and code to set it up.

// Also, since JS cannot load files synchronously, we here use the
// preload() function of p5.js to load the texture and earthquake data.

let angle = 0;

let table;
let r = 200;

let earth;

function preload() {
  earth = loadImage('earth.jpg');
  // table = loadTable(
  //   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv',
  //   'header'
  // );
  // table = loadTable(
  //   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv',
  //   'header'
  // );
  // This dataset is more medium sized, giving a decent number of
  // earthquakes to look at without slowing the sketch down as much.
  table = loadTable(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv',
    'header'
  );
}

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(51);
  rotateY(angle);
  angle += 0.05;

  lights();
  fill(200);
  noStroke();
  texture(earth);
  sphere(r);

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
    let angleb = abs(xaxis.angleBetween(pos));
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
