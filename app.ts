require("dotenv").config();
require("./config/database.ts").connect()
import express from 'express';
const app = express();
import bodyParser from 'body-parser'
app.use(bodyParser.json())

export default app