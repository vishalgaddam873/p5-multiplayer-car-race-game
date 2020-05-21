class Gauge {
  constructor(x, y, title) {
    this.x = x;
    this.y = y;
    this.title = title;
  }

  display(value) {
    this.value = value;

    fill("#D6DBDF");
    arc(this.x, this.y, 250, 250, 230 * QUARTER_PI, -QUARTER_PI, PIE);

    fill("#17202A");
    arc(this.x, this.y, 250, 250, 230 * QUARTER_PI, -QUARTER_PI, PIE);

    fill("#5D6D7E");
    arc(this.x, this.y, 250, 180, -PI, 0);

    textAlign(CENTER);

    textSize(15);
    fill("red");
    text(this.value + "%", this.x, this.y - 15);
    textSize(25);
    text(this.title, this.x, this.y + 25);

    fill("#C0392B");

    let angle = -QUARTER_PI + (HALF_PI * this.value) / 100;

    let x = this.x + 90 * sin(angle);
    let y = this.y - 90 * cos(angle);

    let y1 = this.y - 60 * cos(angle) + 5 * sin(angle);
    let x1 = this.x + 60 * sin(angle) + 5 * cos(angle);

    let y2 = this.y - 60 * cos(angle) - 5 * sin(angle);
    let x2 = this.x + 60 * sin(angle) - 5 * cos(angle);

    triangle(x, y, x1, y1, x2, y2);
  }
}
