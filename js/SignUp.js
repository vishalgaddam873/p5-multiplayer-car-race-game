class SignUpForm {
  constructor() {
    this.email = createInput("Email Id");
    this.password = createInput("Password");
    this.title = createElement("h2");
    this.loginButton = createButton("Log In");
    this.signupButton = createButton("Sign Up");
  }

  hideTitle() {
    this.title.hide();
  }

  hide() {
    this.email.hide();
    this.password.hide();
    this.signupButton.hide();
    this.loginButton.hide();
  }

  signUp(email, password) {
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        var emailKey = email.split("@").join("").split(".").join("");

        db.ref(`users/${emailKey}/`).set({
          email: email,
          game_state: 0,
          cars_at_end: 0,
          player_count: 0,
          player_rank: 0,
          players: {},
        });
        this.login(email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  login(email, password) {
    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        game.getState(email);
        this.hide();
        this.hideTitle();
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  display() {
    this.title.html("Welcome To Car Racing Game");
    this.title.position(displayWidth / 2.4, 0);

    this.email.position(displayWidth / 2 - 40, displayHeight / 2 - 80);
    this.password.position(displayWidth / 2 - 40, displayHeight / 2 - 40);
    this.loginButton.position(displayWidth / 2, displayHeight / 2);
    this.signupButton.position(displayWidth / 2, displayHeight / 2 + 30);

    this.signupButton.mousePressed(() => {
      this.signUp(this.email.value(), this.password.value());
    });

    this.loginButton.mousePressed(() => {
      this.login(this.email.value(), this.password.value());
    });
  }
}
