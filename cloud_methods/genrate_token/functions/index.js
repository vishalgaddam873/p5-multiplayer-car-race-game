const functions = require("firebase-functions");

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pixelmath-eda75.firebaseio.com",
});

const genrateToken = async (secret_word) => {
  var token = null;
  await admin
    .auth()
    .createCustomToken(secret_word)
    .then((customToken) => {
      token = customToken;
      return token;
    })
    .catch((error) => {
      return { success: false, token: null, error_message: error.message };
    });

  return { success: true, token: token };
};

exports.genrateToken = functions.https.onRequest(async (request, response) => {
  try {
    var secret_word = request.query.secret_word;
    var token_details = await genrateToken(secret_word);
    return response.send(token_details);
  } catch (error) {
    return response.send({ success: false, error_message: error.message });
  }
});
