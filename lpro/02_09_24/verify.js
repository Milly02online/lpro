const jwt = require("jsonwebtoken");

const secret_key = 'mysecretkey';

const token = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJ1c2VybmFtZSI6Imxyb2RyaWd1ZXMiLCJpYXQiOjE3MjUyNzkzMTgsImV4cCI6MTcyNTI3OTM3OH0.uAEmAxCiY_mdnrYdVq4OhAEs5CAwmV4LItrs6-ek5xY';


try {
  const decoded = jwt.verify(token, secret_key);
  console.log(decoded);
} catch (err) {
  console.log("Invalid token: ", err.message);
}