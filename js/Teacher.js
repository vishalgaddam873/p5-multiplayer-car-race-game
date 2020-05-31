class Teacher {
  constructor() {
    this.generateSecretWord = createButton("Genrate Secret Word");
    this.message = createElement("h3");
    this.secretWord = createElement("h3");

    this.nameInput = createInput("").attribute("placeholder", "Name");
    this.greeting = createElement("h2");
    this.greeting2 = createElement("h3");

    this.playButton = createButton("Play");
  }

  hideElements() {
    this.message.hide();
    this.secretWord.hide();
    this.nameInput.hide();
    this.playButton.hide();
  }

  setElementPosition() {
    this.generateSecretWord.position(width / 2.3, height / 2 - 100);
    this.message.position(width / 3, height / 2 - 300);
    this.secretWord.position(width / 2.3, height / 2 - 250);
  }

  setElementStyle() {
    this.generateSecretWord.class("customButton");
    this.nameInput.class("customInput");
    this.playButton.class("customButton");
  }

  makeId(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getToken(word) {
    var url = `https://us-central1-trail-car-racing-game.cloudfunctions.net/genrateToken?secret_word=${word}`;
    httpGet(url, "json", false, (response) => {
      if (response.success) {
        this.login(response.token, word);
      } else {
        // TODO: Add Swal Pop up
      }
    });
  }

  login(token, secret_word) {
    fireAuth
      .signInWithCustomToken(token)
      .then(() => {
        game.getState(secret_word);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO: Add Swal Pop up
      });
  }

  handleOnpress() {
    this.generateSecretWord.mousePressed(async () => {
      this.generateSecretWord.hide();
      secret_word = this.makeId(5);
      this.getToken(secret_word);
      this.message.html("Send your secret word to student !");
      this.secretWord.html(`Secret Word = ${secret_word}`);

      this.nameInput.position(width / 2.3, height / 2 - 120);
      this.playButton.position(width / 2.3, height / 2 - 60);
    });

    this.playButton.mousePressed(() => {
      this.hideElements();
      player.name = this.nameInput.value();
      playerCount += 1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.position(width / 2 - 70, height / 4);

      this.greeting2.html("Waiting for other players to join ....");
      this.greeting2.position(width / 3, height / 3.2);
    });
  }

  display() {
    this.setElementStyle();
    this.setElementPosition();
    this.handleOnpress();
  }
}
