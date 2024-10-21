const jwt = require('jsonwebtoken');

const secret_key = 'mysecretkey';

const payload = {
  "id": 123,
  "username": "lrodrigues"
};

const token = jwt.sign(payload, secret_key, {expiresIn: "60s" });

console.log(token);