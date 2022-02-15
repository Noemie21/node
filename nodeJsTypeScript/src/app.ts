import express from "express";
import RandomUser from "./services/randomuser";
import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import { User } from "./Models/User";
import * as bodyParser from 'body-parser';
import * as sha512 from 'js-sha512';
import * as jwt from 'jsonwebtoken';
import UsersRouter from './Routes/user';
import MessagesRouters from './Routes/message';
import { createServer, http } from "http";
import { Server } from "socket.io";

var jwtExpress = require('express-jwt');

//RandomUser.getOne();

const app = express();
const httpServer = createServer();
const io = new Server(server);

app.use(bodyParser.json());
app.use(jwtExpress({ secret: 'ThisIsMySecretSentenceBlaBlaBla', algorithms: ['HS256']}).unless({path: ['/auth']}));
app.use(UsersRouter);
app.use(MessagesRouters);

createConnection({
  type: "mysql",
  host: "localhost",
  port: 8889,
  username: "root",
  password: "root",
  database: "node",
  entities: [
    __dirname + "/Models/*.ts"
  ],
  synchronize: true,
  logging: false
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));

app.get("/", async (req, res) => {
  let result = await User.find()
  res.json({status: 200, data: result})
});

app.post('/auth', async (req, res) => {

  console.log('okk')
  let user = await User.findOne({where: {  
      email: req.body.email,
      password: sha512.sha512(req.body.password)
  }})

  let token = jwt.sign({ id: user.id }, 'ThisIsMySecretSentenceBlaBlaBla');

  res.json({status: 200, data: token})

})

app.post('/message/new', async (req, res) => {

  let user = await User.findOne({where: {  
      email: req.body.email,
      password: sha512.sha512(req.body.password)
  }})

  let token = jwt.sign({ id: user.id }, 'ThisIsMySecretSentenceBlaBlaBla');

  res.json({status: 200, data: token})

})

app.get('/test', (req, res) => {
  res.json({status: 200, data : 'URL de TEST'})
})

server.listen(6565);