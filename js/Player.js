class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount() {
    var playerCountRef = db
      .collection("users")
      .doc(user_document_id)
      .onSnapshot((doc) => {
        playerCount = doc.data().player_count;
      });
  }

  updateCount(count) {
    db.collection("users").doc(user_document_id).update({
      player_count: count,
    });
  }

  update() {
    var playerIndex = "player" + this.index;

    allPlayers[playerIndex] = {
      name: this.name,
      distance: this.distance,
    };

    db.collection("users").doc(user_document_id).update({
      players: allPlayers,
    });

    console.log(allPlayers[playerIndex]);
  }

  static getPlayerInfo() {
    var playerInfoRef = db
      .collection("users")
      .doc(user_document_id)
      .get()
      .then((doc) => {
        allPlayers = doc.data().players;
      });
  }

  getCarsAtEnd() {
    db.collection("users")
      .doc(user_document_id)
      .get()
      .then((doc) => {
        this.rank = doc.data().cars_at_end;
      });
  }

  static updateCarsAtEnd(rank) {
    db.collection("users").doc(user_document_id).update({
      cars_at_end: rank,
    });
  }
}
