class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.life = 185;
    this.score = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;
    var positionX;
    if (this.index === 1) {
      positionX = width / 2 - 100;
    } else {
      positionX = width / 2 + 100;
    }

    db.ref(`users/${secret_word}/${playerIndex}`).set({
      name: this.name,
      positionX: positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life
    });
  }

  getDistance() {
    var playerIndex = "players/player" + this.index;
    var playerDistanceRef = db.ref(`users/${secret_word}/${playerIndex}`);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  getCount() {
    var playerCountRef = db.ref(`users/${secret_word}/player_count/`);
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    db.ref(`users/${secret_word}/`).update({
      player_count: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    db.ref(`users/${secret_word}/${playerIndex}`).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      life: this.life
    });
  }

  static getPlayerInfo() {
    var playerInfoRef = db.ref(`users/${secret_word}/players/`);
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd() {
    db.ref(`users/${secret_word}/cars_at_end/`).on("value", data => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    db.ref(`users/${secret_word}/`).update({
      cars_at_end: rank
    });
  }
}
