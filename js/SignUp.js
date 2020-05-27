class SignUpForm {
  constructor() {
    this.email = createInput("").attribute("placeholder", "Email ID");
    this.password = createInput("", "password").attribute(
      "placeholder",
      "Password"
    );
    this.logoImage = createImg("../assets/logo.png");
    this.loginButton = createButton("Log In");
    this.signupButton = createButton("Sign Up");
  }

  hidelogoImage() {
    this.logoImage.hide();
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
        swal({
          title: "SignUp Unsuccessful!",
          text: `${errorMessage}`,
          type: "error",
          confirmButtonText: "Ok",
        });
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
        swal({
          title: "Login Unsuccessful!",
          text: `${errorMessage}`,
          type: "error",
          confirmButtonText: "Ok",
        });
      });
  }

  display() {
    this.email.class("email");
    this.password.class("email");
    // this.logoImage = createElement("h1");
    this.loginButton.class("loginButton");
    this.signupButton.class("loginButton");

    this.logoImage.position(width /3.2,10);

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
