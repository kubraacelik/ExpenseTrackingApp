const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs"); //belirtilen dizindeki dosyaların adlarını senkron bir şekilde okumak için kullanılır.
require("dotenv").config(); //.env dosyası

const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes
// belirli bir dizindeki (./routes dizini) rotaları uygulamaya eklemeye yarar
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port: ", PORT);
  });
};

server();
