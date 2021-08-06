class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount() {
    var playerCountRef = db.ref(`users/${secret_word}/player_count/`);
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    db.ref(`users/${secret_word}/`).update({
      player_count: count,
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    db.ref(`users/${secret_word}/${playerIndex}`).set({
      name: this.name,
      distance: this.distance,
    });
  }

  static getPlayerInfo() {
    var playerInfoRef = db.ref(`users/${secret_word}/players/`);
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd() {
    db.ref(`users/${secret_word}/cars_at_end/`).on("value", (data) => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    db.ref(`users/${secret_word}/`).update({
      cars_at_end: rank,
    });
  }
}
