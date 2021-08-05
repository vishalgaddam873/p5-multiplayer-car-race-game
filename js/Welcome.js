class Welcome {
  constructor() {
    this.logoImage = "./assets/title.png";
    this.logo = createImg(this.logoImage, "gameTitle");

    this.teacherButton = createButton("Teacher");
    this.studentButton = createButton("Student");
  }

  hideElements() {
    this.teacherButton.hide();
    this.studentButton.hide();
  }

  setElementPosition() {
    this.logo.position(120, 160);
    this.teacherButton.position(width / 2.3, height / 2 - 100);
    this.studentButton.position(width / 2.3, height / 2);
  }

  setElementStyle() {
    this.logo.class("gameTitle");
    this.teacherButton.class("customButton");
    this.studentButton.class("customButton");
  }

  handleOnpress() {
    this.teacherButton.mousePressed(() => {
      this.hideElements();
      teacher.display();
    });

    this.studentButton.mousePressed(() => {
      this.hideElements();
      student.display();
    });
  }

  display() {
    this.setElementStyle();
    this.setElementPosition();
    this.handleOnpress();
  }
}
