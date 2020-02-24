// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: [coming soon]

let angle;

let table;
let r = 200;

let earth;
let globe;

function setup() {
  size(600, 600, P3D);
  earth = loadImage("earth.jpg");
  // table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv", "header");
  table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "header");

  noStroke();
  globe = createShape(SPHERE, r);
  globe.setTexture(earth);
}

function draw() {
  background(51);
  translate(width*0.5, height*0.5);
  rotateY(angle);
  angle += 0.05;

  lights();
  fill(200);
  noStroke();
  //sphere(r);
  shape(globe);

  for (let row of table.rows()) {
    let lat = row.getFloat("latitude");
    let lon = row.getFloat("longitude");
    let mag = row.getFloat("mag");

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

    let pos = new PVector(x, y, z);

    let h = pow(10, mag);
    let maxh = pow(10, 7);
    h = map(h, 0, maxh, 10, 100);
    let xaxis = new PVector(1, 0, 0);
    let angleb = PVector.angleBetween(xaxis, pos);
    let raxis = xaxis.cross(pos);



    pushMatrix();
    translate(x, y, z);
    rotate(angleb, raxis.x, raxis.y, raxis.z);
    fill(255);
    box(h, 5, 5);
    popMatrix();
  }
}
