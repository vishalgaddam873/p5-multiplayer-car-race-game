class Welcome {
  constructor() {
    this.volumeUrl = "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/volume.png"
    this.muteUrl ="https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/mute.png"
    this.teacherButton = createButton("Teacher");
    this.studentButton = createButton("Student");
    this.volumeButton = createImg(this.volumeUrl);
  }

  display() {
    this.volumeButton.class("volumeButton");

    this.volumeButton.mousePressed(() => {
      if (volumeIsMuted) {
        volumeIsMuted = false;
        this.volumeButton.remove();
        this.volumeButton = createImg(this.volumeUrl);
        song.play();
      } else {
        volumeIsMuted = true;
        this.volumeButton.remove();
        this.volumeButton = createImg(this.muteUrl);
        song.pause();
      }
    });
    this.volumeButton.position(width - 150, 30);
  }
}
