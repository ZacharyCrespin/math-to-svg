const express = require('express')
const mj = require("mathjax-node");
const querystring = require('querystring');
const app = express()
mj.start();

app.use(express.static('public'));

app.get('/api', (req, res) => {
  let math = req.query.math
  if (math) {
    math = querystring.unescape(math)
    mj.typeset({
      math,
      format: "AsciiMath",
      svg: true,
    }, function (data) {
      if (data.errors) {
        res.status(500).send(data.errors)
      } else {
        res.send(data.svg)
      }
    });
  } else {
    res.status(500).send("Math is not defined");
  }
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
