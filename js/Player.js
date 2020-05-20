class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount() {
    var playerCountRef = db.ref(`users/${emailKey}/player_count/`);
    playerCountRef.on("value", (data) => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    db.ref(`users/${emailKey}/`).update({
      player_count: count,
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    db.ref(`users/${emailKey}/${playerIndex}`).set({
      name: this.name,
      distance: this.distance,
    });
  }

  static getPlayerInfo() {
    var playerInfoRef = db.ref(`users/${emailKey}/players/`);
    playerInfoRef.on("value", (data) => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd() {
    db.ref(`users/${emailKey}/cars_at_end/`).on("value", (data) => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    db.ref(`users/${emailKey}/`).update({
      cars_at_end: rank,
    });
  }
}
