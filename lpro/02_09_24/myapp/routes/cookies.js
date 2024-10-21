const express = require('express');
const router = express.Router();

router.get('/set', (req, res) => {
  res.cookie('token', 'xyz', { maxAge: 10000, httpOnly: true });
  res.send('Cookies has been set');
});

router.get('/get', (req, res) => {
  const token = req.cookies.token;
  res.send(`Cookies value: ${token}`)
});

module.exports = router;