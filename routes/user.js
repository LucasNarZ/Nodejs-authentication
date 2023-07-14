const express = require("express");
const router = express.Router();


const { PrismaClient } = require('@prisma/client');
const passport = require("../passport.js");
const prisma = new PrismaClient();


require('./passport.js')(passport);



router.get("/user", passport.authentication('jwt', {session: false}), async (req, res) => {
    try{
        const users = await prisma.User.findMany();
        res.json(users);
    }catch(err){
        console.error(err);
    }
})

router.post("/user", passport.authentication('jwt', {session: false}), async (req, res) => {
    console.log(req.body)
    try{
        const newUser = await prisma.User.create({data: req.body});
        res.json(newUser);
    }catch(err){
        console.error(err);
    }
})

module.exports = router;