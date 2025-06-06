// const express = require("express");

// const app = express();

// function isOldEnough(req, res, next) {
//   const age = req.query.age;
//   if (age >= 14) {
//     next();
//   } else {
//     res.send("You are not of age yet");
//   }
// }

// app.use(isOldEnough);

// app.get("/ride1", (req, res) => {
//   res.send("You have successfully riden the ride1");
// });
// app.get("/ride2", (req, res) => {
//   res.send("You have successfully riden the ride2");
// });

// app.listen(3000);

// const express = require("express");
// const app = express();

// app.use(express.json());

// app.get("/add", (req, res) => {
//   const a = req.query.a;
//   const b = req.query.b;

//   res.json({
//     ans: parseInt(a) + parseInt(b),
//   });
// });

// app.get("/multiply", (req, res) => {
//   const a = req.query.a;
//   const b = req.query.b;

//   res.json({
//     ans: a * b,
//   });
// });

// app.get("/divide", (req, res) => {
//   const a = req.query.a;
//   const b = req.query.b;

//   res.json({
//     ans: a / b,
//   });
// });

// app.get("/subtract", (req, res) => {
//   const a = req.query.a;
//   const b = req.query.b;

//   res.json({
//     ans: a - b,
//   });
// });

// app.listen(3000);

// const express = require("express");
// const app = express();

// let countRequest = 0;

// function cntRequestHandler(req, res, next) {
//   countRequest += 1;
//   console.log(`Total number of requests = ${countRequest}`);
//   next();
// }

// function addInputHandler(req, res) {
//   const a = parseInt(req.query.a);
//   const b = parseInt(req.query.b);

//   res.json({
//     ans: a + b,
//   });
// }

// app.use(cntRequestHandler);

// app.get("/add", addInputHandler);

// app.listen(3000);

// const express = require("express");
// const app = express();

// app.use(express.json());

// app.post("/sum", (req, res) => {
//   console.log(req.body);
//   const a = parseInt(req.body.a);
//   const b = parseInt(req.body.b);
//   const ans = a + b;

//   res.send(ans);
// });

// app.listen(3000);

const express = require("express");
const app = express();

app.use(express.json());

app.post("/sum", (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);
  const ans = a + b;

  res.send(ans);
});

app.listen(3000);
