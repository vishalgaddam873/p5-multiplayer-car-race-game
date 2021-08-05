class Game {
  constructor() {
    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

    this.playerMoving = false;
    this.blast = false;
    this.leftKeyActive = false;
  }

  getState(secret_word) {
    var gameStateRef = db.ref(`users/${secret_word}/game_state/`);
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    db.ref(`users/${secret_word}/`).update({
      game_state: state
    });
  }

  async start() {
    // When user visit the page
    if (gameState === null) {
      welcome.display();
    }

    // //When user loged in successfully
    if (gameState === 0) {
      var playerCountRef = await db
        .ref(`users/${secret_word}/player_count/`)
        .once("value");

      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
    }
  }

  handleElements() {
    welcome.logo.position(40, 50);
    welcome.logo.class("gameTitleAfterEffect");

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 480, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 480, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 480, player.life, 20);
    noStroke();
    pop();
  }

  showFuel() {
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 420, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 420, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 420, player.fuel, 20);
    noStroke();
    pop();
  }

  play() {
    this.handleElements();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      background(backgroundImage);
      image(track, 0, -height * 5, width, height * 6);

      this.showLife();
      this.showFuel();
      this.showLeaderboard();

      //index of the array
      var index = 0;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        var life = allPlayers[plr].life;
        if (life <= 0) {
          cars[index - 1].changeAnimation("blast");
          cars[index - 1].scale = 0.3;
        }

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleCarACollisionWithCarB(index);
          this.handleObstacleCollision(index);

          if (player.life <= 0) {
            this.blast = true;
            this.playerMoving = false;
          }

          // Changing camera position in y direction
          camera.position.y = cars[index - 1].position.y;
        }
      }
    }

    if (this.playerMoving) {
      player.positionY += 5;
      player.update();
    }

    // handling keyboard events
    this.handlePlayerControls();

    // Finshing Line
    const finshLine = height * 6 - 100;

    if (player.positionY > finshLine) {
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      player.update();
      this.showRank();
    }

    drawSprites();
  }

  handlePlayerControls() {
    if (!this.blast) {
      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true;

        player.positionY += 10;
        player.update();
      }

      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
        this.leftKeyActive = true;

        player.positionX -= 5;
        player.update();
      }

      if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        this.leftKeyActive = false;

        player.positionX += 5;
        player.update();
      }
    }
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel -= 0.3;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      player.update();
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 21;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handleCarACollisionWithCarB(index) {
    if (index === 1) {
      if (cars[index - 1].collide(cars[1])) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }

        //Reducing Player Life
        if (player.life > 0) {
          player.life -= 46.25;
        }

        player.update();
      }
    }

    if (index === 2) {
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          player.positionX += 100;
        } else {
          player.positionX -= 100;
        }

        //Reducing Player Life
        if (player.life > 0) {
          player.life -= 185 / 4;
        }

        player.update();
      }
    }
  }

  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      } else {
        player.positionX -= 100;
      }

      //Reducing Player Life
      if (player.life > 0) {
        player.life -= 185 / 4;
      }

      player.update();
    }
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  end() {
    console.log("Game End!!!");
  }
}
