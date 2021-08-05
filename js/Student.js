class Student {
  constructor() {
    this.secretWordInput = createInput("").attribute(
      "placeholder",
      "Enter your secret word"
    );

    this.nameInput = createInput("").attribute("placeholder", "Name");
    this.greeting = createElement("h2");
    this.greeting2 = createElement("h3");
    this.submitButton = createButton("Submit");
    this.playButton = createButton("Play");
  }

  hideElements() {
    this.secretWordInput.hide();
    this.submitButton.hide();
  }

  setElementPosition() {
    this.secretWordInput.position(width / 2.3, height / 2 - 120);
    this.submitButton.position(width / 2 - 86, height / 2 - 60);
  }

  setElementStyle() {
    this.nameInput.class("customInput");
    this.secretWordInput.class("customInput");
    this.submitButton.class("customButton");
    this.playButton.class("customButton");
  }

  getToken(word) {
    var url = `https://us-central1-trail-car-racing-game.cloudfunctions.net/genrateToken?secret_word=${word}`;
    httpGet(url, "json", false, response => {
      if (response.success) {
        this.login(response.token, word);
      } else {
        swal({
          title: `Unsuccessfull Login`,
          text: `${response.error_message}`,
          type: "error",
          confirmButtonText: "Ok"
        });
      }
    });
  }

  login(token, secret_word) {
    fireAuth.signInWithCustomToken(token).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // TODO: Add Swal Pop up
    });
  }

  handleOnpress() {
    this.submitButton.mousePressed(async () => {
      if (this.secretWordInput.value() !== "") {
        this.hideElements();
        secret_word = this.secretWordInput.value();
        game.getState(secret_word);
        this.getToken(secret_word);
        this.nameInput.position(width / 2.3, height / 2 - 120);
        this.playButton.position(width / 2 - 86, height / 2 - 60);
      }
    });

    this.playButton.mousePressed(() => {
      if (this.nameInput.value() !== "") {
        this.nameInput.hide();
        this.playButton.hide();
        player.name = this.nameInput.value();
        playerCount += 1;
        player.index = playerCount;
        player.addPlayer();
        player.updateCount(playerCount);
        this.greeting.html("Hello " + player.name);
        this.greeting.position(width / 2 - 70, height / 4);

        this.greeting2.html("Waiting for other players to join ....");
        this.greeting2.position(width / 3, height / 3.2);
        player.getDistance();
      }
    });
  }

  display() {
    this.setElementStyle();
    this.setElementPosition();
    this.handleOnpress();
  }
}
