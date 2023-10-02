// import library expressjs
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

// create logger middleware function
function LoggerMiddleware(req, res, next) {
  console.log(`Request received at: ${new Date()}`);
  next(); // continue process next function
}

// app.use(LoggerMiddleware);

// create handling http GET all customer
app.get("/api/customers", (req, res) => {
  const { keyword, category, limit } = req.query; // request query string by keyword. category, limit

  res.status(201).json({
    message: "get success data all customer",
    data: [
      {
        name: "Rafaell Victor Christian",
        email: "rafaell@gmail.com",
        role: "jungler",
      },
      {
        name: "Nanan",
        email: "nanan@gmail.com",
        role: "roam",
      },
    ],
    pagination: {
      total_record: 100,
      current_page: 1,
      total_pages: limit,
    },
    search: {
      category: category,
      keyword: keyword,
    },
  });
});

// create handling http POST add customer
app.post("/api/customers", LoggerMiddleware, (req, res) => {
  const { name, email, role } = req.body;

  //   res.send(
  //     `Thank you, ${name} and role: ${role} we have recieved your submission`
  //   );
  res.status(201).json({
    message: "create data customer successful",
    data: {
      name: name,
      email: email,
      role: role,
    },
  });
});

// create handling http GET detail customer
app.get("/api/customers/:id", (req, res) => {
  const customerId = req.params.id; // request params by id customer
  res.status(200).json({
    message: "get success",
    data: {
      customerId: customerId,
      name: "Rafaell Victor Christian",
      email: "rafaell@gmail.com",
      role: "jungler",
    },
  });
});

// define listener port using 3000
const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
