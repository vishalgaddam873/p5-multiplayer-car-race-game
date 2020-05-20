class SignUpForm {
  constructor() {
    this.email = createInput("").attribute("placeholder", "Email ID");
    this.password = createInput("", "password").attribute(
      "placeholder",
      "Password"
    );
    this.title = createElement("h1");
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
        emailKey = email.split("@").join("").split(".").join("");

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
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }

  display() {
    this.email.class("email");
    this.password.class("email");
    // this.title = createElement("h1");
    this.loginButton.class("loginButton");
    this.signupButton.class("loginButton");

    this.title.html("Forza Horizon 3");
    this.title.position(width / 2.35, 0);

    this.email.position(width / 2.3, height / 2 - 120);
    this.password.position(width / 2.3, height / 2 - 60);
    this.loginButton.position(width / 2.3, height / 2);
    this.signupButton.position(width / 2.3, height / 1.7);

    this.signupButton.mousePressed(() => {
      this.signUp(this.email.value(), this.password.value());
    });

    this.loginButton.mousePressed(() => {
      this.login(this.email.value(), this.password.value());
    });
  }
}
