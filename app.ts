// const http = require('http')
// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     res.writeHead(200);
//     res.end("Hello world")
// })

// server.listen(PORT, () => {
//     console.log("Server listening at port", PORT);
// })

const express = require("express");
import { Request, Response } from "express";
const app = express();

const PORT = 3000;

interface Profile {
  name: string;
  age: number;
}
interface Data {
  profile: Profile;
}

app.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hello world");
});

app.get("/employee", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("I am Navaneeth");
});
app.get("/getData", (req: Request, res: Response) => {
  console.log(req.url);
  let data1: Data = {
    profile: {
      name: "Navaneeth",
      age: 24,
    },
  };
  //   data1 = "dasadasdad";

  console.log(data1.profile.name);
  res
    .status(200)
    .send(
      `<h1>Data<h1><p>${data1.profile.name}</p><p>${data1.profile.age}</p>`
    );
});
app.listen(PORT, (req: Request, res: Response) => {
  console.log(`Server running at  http://localhost:${PORT}`);
});
