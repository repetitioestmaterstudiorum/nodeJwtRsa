// credits: https://github.com/BlitzkriegSoftware/NodeJwtRsa

const fs = require("fs");
const jwt = require("jsonwebtoken"); // https://github.com/auth0/node-jsonwebtoken

// Keys generated by http://travistidwell.com/jsencrypt/demo/ and saved to disk.
const privateKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");

// Sample claims payload with user defined fields (this can be anything, but briefer is better):
const payload = {};

// Populate with fields and data
payload.field1 = "Data 1";
payload.field2 = "Data 2";
payload.field3 = "Data 3";

console.log("Payload: " + JSON.stringify(payload));

// Sign it:
// Values for the rfc7519 fields
const issuer = "that would be me";
const subject = "some@email.com";
const audience = "http://notsurethisisneeded.com";

// Expiration timespan: https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim
const expiry = "1h";

// JWT Token Options, see: https://tools.ietf.org/html/rfc7519#section-4.1 for the meaning of these
// Notice the `algorithm: "RS256"` which goes with public/private keys
const signOptions = {
  issuer,
  subject,
  audience,
  expiresIn: expiry,
  algorithm: "RS256",
};
console.log("Options: " + JSON.stringify(signOptions));

const token = jwt.sign(payload, privateKey, signOptions);
console.log("Token: " + token);

// Verify
const verifyOptions = {
  issuer,
  subject,
  audience,
  maxAge: expiry,
  algorithms: ["RS256"],
};

jwt.verify(token, publicKey, verifyOptions, function (err, decoded) {
  if (err) {
    console.error(err);
  }
  console.log("decoded token:", decoded);
});

// const verified = jwt.verify(token, publicKey, verifyOptions);
// console.log("Verified: " + JSON.stringify(verified));

// // Decode
// const decoded = jwt.decode(token, { complete: true });
// console.log("Docoded Header: " + JSON.stringify(decoded.header));
// console.log("Docoded Payload: " + JSON.stringify(decoded.payload));
