//importing express
const express = require("express");
const cors = require("cors");
//creating our server by calling express
const app = express();
// Above 1024 as everything below that is reserved
const port = 3000;

const fruits = require("./fruits.json");

//middleware - code that is executed between the request coming in adn ht e response being sent
//AUTHENTICATION Middleware so will be called on any request that comes in.
// app.use is the syntact to set up the middleware
// app.use(starting path, middleware_code)
//next() lets you move on ot the next middleware
app.use(cors());
app.use(express.json());

// Create a route - GET route
// [server].[method]('<path>',callback)
app.get("/", (req, resp) => {
  resp.send(`Hello, Fruity!`);
});

//route to return all the fruits
app.get("/fruits", (req, resp) => {
  resp.send(fruits);
});
// :<property> -> dynamic parameter
app.get(`/fruits/:name`, (req, resp) => {
  fruitName = req.params.name.toLowerCase();
  let found = false;
  fruits.forEach((el) => {
    if (el.name.toLowerCase() == fruitName) {
      //   console.log(el);
      resp.send(`Return a specific fruit with name: ${el.name}`);
      found = true;
    }
  });
  if (!found) {
    resp.status(404).send(`fruit not found`);
  }
  //console.log(found);
  //   let fruitObj = fruits.find((fruit) => fruit.name.toLowerCase() == fruitName);
  //   console.log(fruitObj);
});

// Add a new piece of fruit to the data
app.post("/fruits", (req, resp) => {
  const fruitBody = req.body;
  let fruitObj = fruits.find(
    (fruit) => fruit.name.toLowerCase() == fruitBody.name.toLowerCase()
  );

  //console.log(fruitBody, fruitObj);
  if (typeof fruitObj !== "undefined") {
    resp.status(409).send("Fruit already exists!");
  } else {
    let duplicate = false;
    while (duplicate == false) {
      fruitBody.id = Math.floor(Math.random() * 100);
      let fruitObjId = fruits.find((fruit) => fruit.id == fruitBody.id);
      if (typeof fruitObjId == "undefined") {
        duplicate = true;
      } else {
        console.log("LOOP!");
      }
    }

    fruits.push(fruitBody);
    resp.status(201).send("New fruit created");
    console.log(fruits[fruits.length - 1], fruits.length);
  }
  //express.json() will parse the req.body
  // console.log(req.body.name);
  // let lastItem = fruits.pop();
  // console.log(lastItem);
});

// Bind the server to a port
// app.listen(<port>, () = >())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
