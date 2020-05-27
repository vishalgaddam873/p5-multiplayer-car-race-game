// const Swal = require("sweetalert2");

class Game {
  constructor() {
    this.reset = createImg("../assets/settings.png");
  }

  getState(email) {
    emailKey = email.split("@").join("").split(".").join("");

    var gameStateRef = db.ref(`users/${emailKey}/game_state/`);
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    db.ref(`users/${emailKey}/`).update({
      game_state: state,
    });
  }

  async start() {
    // When user visit the page
    if (gameState === null) {
      signUp.display();
    }

    // //When user loged in successfully
    if (gameState === 0) {
      var playerCountRef = await db
        .ref(`users/${emailKey}/player_count/`)
        .once("value");

      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form.display();
    }
  }

  play() {
    form.hide();
    this.reset.class("volumeButton");
    this.reset.position(width - 150, 200);

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      background("#464646");
      image(track, 0, -height * 4, width, height * 5);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = width / 2 - 680;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 455;
        //use data form the database to display the cars in y direction
        y = height - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        // console.log(index, player.index);

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = width / 2;
          camera.position.y = cars[index - 1].y;
        }
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (player.distance > height * 5 - 100) {
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      swal({
        title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
        text: "You reached the finish line successfully",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Ok",
      });
    }

    this.reset.mousePressed(() => {
      player.updateCount(0);
      game.update(0);
      Player.updateCarsAtEnd(0);
      window.location.reload();
    });

    drawSprites();
  }

  end() {
    // console.log("Game Ended");
    // console.log(player.rank);
  }
}
