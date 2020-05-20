class Game {
  constructor() {}

  getState(email) {
    console.log(" I ma ");
    var gameStateRef = db
      .collection("users")
      .where("email", "==", email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          user_document_id = doc.id;
          gameState = doc.data().game_state;
        });
      });
  }

  update(state) {
    db.collection("users").doc(user_document_id).update({
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
        .collection("users")
        .doc(user_document_id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            playerCount = doc.data().player_count;
            allPlayers = doc.data().players;
            player.getCount();
          }

          form.display();
        });
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1", car1_img);
    car2 = createSprite(300, 200);
    car2.addImage("car2", car2_img);

    cars = [car1, car2];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        // console.log(index, player.index);

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        }
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (player.distance > 3860) {
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    console.log(player.rank);
  }
}
