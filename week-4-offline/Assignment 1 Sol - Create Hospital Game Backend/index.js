// create a hospital game backend

const express = require("express");
const app = express();

app.use(express.json());
const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

// app.get("/", (req, res) => {
//   const johnKidneys = users[0].kidneys;
//   const numberOfKidneys = johnKidneys.length;

//   /* one of the ways
//   let noOfHealthyKidneys = 0;

//   for (let i = 0; i < johnKidneys.length; i++) {
//     if (johnKidneys[i].healthy) {
//       noOfHealthyKidneys += 1;
//     }
//   }

//   const noOfUnhealthyKidneys = numberOfKidneys - noOfHealthyKidneys;
//   */

//   const noOfHealthyKidneys = johnKidneys.filter((k) => k.healthy).length;
//   const noOfUnhealthyKidneys = johnKidneys.filter((k) => !k.healthy).length;

//   res.json({
//     numberOfKidneys,
//     noOfHealthyKidneys,
//     noOfUnhealthyKidneys,
//   });
// });

app.get("/", (req, res) => {
  const johnKidneys = users[0]?.kidneys || [];

  res.json({
    numberOfKidneys: johnKidneys.length,
    noOfHealthyKidneys: johnKidneys.filter((k) => k.healthy).length,
    noOfUnhealthyKidneys: johnKidneys.filter((k) => !k.healthy).length,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done",
  });
});

app.put("/", (req, res) => {
  // const getAllKidneys = users[0].kidneys.length;
  // for (let i = 0; i < getAllKidneys; i++) {
  //   users[0].kidneys[i].healthy = true;
  // }

  users[0].kidneys.forEach((kidney) => {
    kidney.healthy = true;
  });

  res.json({ message: "All kidneys set to healthy" });
});

app.delete("/", (req, res) => {
  const unhealthyKidneys = users[0].kidneys.filter((k) => !k.healthy);

  if (unhealthyKidneys.length === 0) {
    return res.status(400).json({
      message: "No more unhealthy kidneys to remove",
    });
  }

  users[0].kidneys = users[0].kidneys.filter((k) => k.healthy);

  res.json({
    message: `${unhealthyKidneys.length} unhealthy kidneys are removed`,
    remainingKidneys: users[0].kidneys.length,
  });
});

app.listen(3000);
