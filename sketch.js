var cnavas, game;
var db, fireAuth, user_document_id;
var signUp, player, playerRegistration, emailKey;
var allPlayers;
var form;
var cars, car1, car2;
var track, car1_img, car2_img;
var playerCount;

var gameState = null;
var backgroundImage;

function preload() {
  backgroundImage = loadImage("./images/bg.jpg");
  track = loadImage("./images/track.jpg");
  car1_img = loadImage("./images/car1.png");
  car2_img = loadImage("./images/car2.png");
  ground = loadImage("./images/ground.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  fireAuth = firebase.auth();
  db = firebase.database();

  game = new Game();
  signUp = new SignUpForm();
  player = new Player();
  form = new Form();

  car1 = createSprite(width/2, 200);
  car1.addImage("car1", car1_img);
  car2 = createSprite(width - 300, 200);
  car2.addImage("car2", car2_img);

  cars = [car1, car2];
}

function draw() {
  background(backgroundImage);

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
