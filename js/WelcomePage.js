class Welcome {
  constructor() {
    this.teacherButton = createButton("Teacher");
    this.studentButton = createButton("Student");
    this.volumeButton = createImg("../assets/volume.png");

    this.image = volume;
  }

  display() {
    this.volumeButton.class("volumeButton");

    this.volumeButton.mousePressed(() => {
      if (volumeIsMuted) {
        volumeIsMuted = false;
        this.volumeButton.remove();
        this.volumeButton = createImg("../assets/volume.png");
        song.play();
      } else {
        volumeIsMuted = true;
        this.volumeButton.remove();
        this.volumeButton = createImg("../assets/mute.png");
        song.pause();
      }
    });
    this.volumeButton.position(width - 150, 30);

    if (mouseIsPressed) {
      this.image = mute;
    }
  }
}
