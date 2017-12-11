const request = require('supertest')
const express = require('express')
const app = express()

app.get('/stats_db', function(req, res) {
  res.status(200).json({name: 'g'});
});
request(app)
.get('/stats_db')
.expect('Content-Type', /json/)
.expect('Content-Length', '15')
.expect(200)
.end(function(err, res) {
  if (err) throw err;
});