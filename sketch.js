var cnavas, game;
var db, fireAuth, user_document_id;
var signUp, player, playerRegistration, emailKey;
var allPlayers;
var form;
var cars, car1, car2;
var track, car1_img, car2_img;
var playerCount, gauge;

var gameState = null;
var backgroundImage;
var song;
var volume, mute, welcome;
var volumeIsMuted = false;

function preload() {
  backgroundImage = loadImage("./assets/bg.jpg");
  volume = loadImage("./assets/volume.png");
  mute = loadImage("./assets/mute.png");
  track = loadImage("./assets/track.jpg");
  car1_img = loadImage("./assets/car1.png");
  car2_img = loadImage("./assets/car2.png");
  song = loadSound("assets/music/bg.mp3");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  fireAuth = firebase.auth();
  db = firebase.database();

  game = new Game();
  welcome = new Welcome();
  signUp = new SignUpForm();
  player = new Player();
  form = new Form();
  // gauge = new Gauge(200, 200, "Speedometer");

  car1 = createSprite(width / 2, 200);
  car1.addImage("car1", car1_img);
  car2 = createSprite(width - 300, 200);
  car2.addImage("car2", car2_img);

  cars = [car1, car2];
  song.loop();
  song.setVolume(0.1);
}

function draw() {
  background(backgroundImage);
  welcome.display();
  if (gameState === null || gameState === 0) {
    game.start();
  }

  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    clear();
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
}

function mouseClicked() {
  if (!volumeIsMuted) {
    if (!song.isPlaying()) {
      song.play();
    }
  }
}

function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
}
