import express from "express";
import cors from "cors";
import pkg from "body-parser";
import bcrypt from "bcrypt"
import knex from "knex";
import handleRegister from "./controllers/register.js";
import {handleApiCall, imageRequest} from "./controllers/image.js"
import signIn from "./controllers/signin.js"
import profile from "./controllers/profile.js";

const saltRounds = 10;
const db = knex({
    client: 'pg',
    connection: {
      host: 'dpg-cr3klaaj1k6c73dp6gd0-a',
      port: 5432,
      user: 'if_users_database_user',
      password: 'nIijWf7KRCn0F59pjjVtD0onfzVgV2L6',
      database: 'if_users_database',
    },
  })
  
const app = express();

app.use(cors())

const { json } = pkg;

app.use(json())
app.get("/", (req, res) => { res.send("success") })
app.post("/signin", (req, res) => signIn(req, res, db, bcrypt) );
app.post("/register", (req, res) => {handleRegister(req, res, db, bcrypt, saltRounds) } )
app.get("/profile/:id", (req, res) => profile(req, res, db))
app.put("/image", (req, res) => imageRequest(req, res, db))
app.post("/imageurl", (req, res) => handleApiCall(req, res))
app.listen(3000, () => { console.log("server is running on port 3000"); })