const express = require("express");

const router = express.Router();

const argon2 = require('argon2');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const { body, validationResult } = require('express-validator');

async function searchUserInDB(users, userEmail, userPassword){
    const promises = users.map(async user => {
        return user.email === userEmail && await comparePassword(user.password, userPassword);
    })

    const results = await Promise.all(promises);
    return results.some(result => result === true)
}


async function comparePassword(hashedPassword, password){
    try{
        const isMatch = await argon2.verify(hashedPassword, password);
        return isMatch;
    }catch(err){
        console.error(err);
    }
}

router.get("/user", async (req, res) => {
    try{
        const users = await prisma.User.findMany();
        res.json(users);
    }catch(err){
        console.error(err);
    }
})

router.post("/user", [
    body("name").trim().matches(/^[A-Za-z]+$/).escape(),
    body("email").trim().isEmail().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).escape(),
    body("password").trim().matches(/^.{8,}$/s).matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).*$/).escape()
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({message: "An error occured"});
    }
    const { name, email, password }= req.body;
    try{
        const existingUser = await prisma.User.findFirst({
            where: {
              email: email,
            },
          });
      
          if (existingUser) {
            return res.status(409).json({ message: "User already Registered" });
          }
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 2,
            hashLength: 128,
            saltLength: 20,

        });
        const newUser = await prisma.User.create({data: {name:name, email:email, password:hashedPassword}});
        res.json(newUser);
    }catch(err){
        console.error(err);
    }
})

router.post("/user/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const users = await prisma.User.findMany();
        const isUserRegistered = await searchUserInDB(users, email, password);
        res.json(isUserRegistered);
    }catch(err){
        console.error(err);
    }
})


module.exports = router;