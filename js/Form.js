class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Name");
    this.button = createButton("Play");
    this.greeting = createElement("h2");
    this.greeting2 = createElement("h3");
  }
  hide() {
    this.greeting.hide();
    this.greeting2.hide();
    this.button.hide();
    this.input.hide();
  }

  display() {
    this.input.class("email");
    this.button.class("loginButton");

    this.input.position(width / 2.3, height / 2 - 120);
    this.button.position(width / 2.3, height / 2 - 60);

    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
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
}
