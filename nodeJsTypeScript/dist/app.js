"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./Models/User");
const bodyParser = __importStar(require("body-parser"));
const sha512 = __importStar(require("js-sha512"));
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("./Routes/user"));
const message_1 = __importDefault(require("./Routes/message"));
var jwtExpress = require('express-jwt');
//RandomUser.getOne();
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(jwtExpress({ secret: 'ThisIsMySecretSentenceBlaBlaBla', algorithms: ['HS256'] }).unless({ path: ['/auth'] }));
app.use(user_1.default);
app.use(message_1.default);
(0, typeorm_1.createConnection)({
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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield User_1.User.find();
    res.json({ status: 200, data: result });
}));
app.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('okk');
    let user = yield User_1.User.findOne({ where: {
            email: req.body.email,
            password: sha512.sha512(req.body.password)
        } });
    let token = jwt.sign({ id: user.id }, 'ThisIsMySecretSentenceBlaBlaBla');
    res.json({ status: 200, data: token });
}));
app.get('/test', (req, res) => {
    res.json({ status: 200, data: 'URL de TEST' });
});
app.listen(6565);
//# sourceMappingURL=app.js.map