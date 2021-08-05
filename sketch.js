var canvas;
var backgroundImage, track, car1_img, car2_img;
var fuelImage, backgroundImage, lifeImage, powerCoinImage;
var blastImage, fuels, powerCoins, obstacles;
var obstacle1Image, obstacle2Image;
var fireAuth, db;
var game, welcome, teacher, student;
var secret_word;
var player, allPlayers;
var gameState = null;
var playerCount;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  track = loadImage("./assets/track.jpg");
  car1_img = loadImage("./assets/car1.png");
  car2_img = loadImage("./assets/car2.png");
  blastImage = loadImage("./assets/blast.png");
  fuelImage = loadImage("./assets/fuel.png");
  lifeImage = loadImage("./assets/life.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  fireAuth = firebase.auth();
  db = firebase.database();
  game = new Game();
  welcome = new Welcome();
  teacher = new Teacher();
  student = new Student();
  player = new Player();

  car1 = createSprite(width / 2, 200);
  car1.addImage("car1", car1_img);
  car1.addAnimation("blast", blastImage, blastImage);

  car2 = createSprite(width - 300, 200);
  car2.addImage("car2", car2_img);
  car2.addAnimation("blast", blastImage, blastImage);

  cars = [car1, car2];

  fuels = new Group();
  powerCoins = new Group();
  obstacles = new Group();

  // Adding fuel sprite in the game
  addSpirtes(fuels, 4, fuelImage, 0.02);

  // Adding coin sprite in the game
  addSpirtes(powerCoins, 18, powerCoinImage, 0.09);

  var obstaclesPositions = [
    { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
    { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
    { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
    { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
    { x: width / 2, y: height - 2800, image: obstacle2Image },
    { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
    { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
    { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
    { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
    { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
    { x: width / 2, y: height - 5300, image: obstacle1Image },
    { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
  ];

  //Adding obstacle sprite in the game
  addSpirtes(
    obstacles,
    obstaclesPositions.length,
    obstacle1Image,
    0.04,
    obstaclesPositions
  );
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
    student.greeting.hide();
    student.greeting2.hide();
    student.playButton.hide();

    teacher.greeting.hide();
    teacher.greeting2.hide();
    teacher.playButton.hide();
    teacher.secretWord.hide();

    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
}

function addSpirtes(
  spriteGroup,
  numberOfSprites,
  spirteImage,
  scale,
  positions = []
) {
  for (var i = 0; i < numberOfSprites; i++) {
    var x, y;

    if (positions.length > 0) {
      x = positions[i].x;
      y = positions[i].y;
      spirteImage = positions[i].image;
    } else {
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);
    }
    var spirte = createSprite(x, y);
    spirte.addImage("spirte", spirteImage);

    spirte.scale = scale;
    spriteGroup.add(spirte);
  }
}

function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
}
