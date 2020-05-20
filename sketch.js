var cnavas, game;
var db, fireAuth, user_document_id;
var signUp, player, playerRegistration;
var allPlayers;
var form;
var cars, car1, car2;
var track, car1_img, car2_img;
var playerCount;

var gameState = null;

function preload() {
  track = loadImage("./images/track.jpg");
  car1_img = loadImage("./images/car1.png");
  car2_img = loadImage("./images/car2.png");
  ground = loadImage("./images/ground.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  fireAuth = firebase.auth();
  db = firebase.database();

  game = new Game();
  signUp = new SignUpForm();
  player = new Player();
  form = new Form();
}

function draw() {
  background(255);
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
