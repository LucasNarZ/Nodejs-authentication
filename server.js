const express = require('express');
const app = express();


const routes = require("./routes/user.js");
const passport = require('passport');
const port = 3000;

app.use(express.json());
app.use(passport.initialize());

app.use("/", routes)






app.listen(port, () => {
    console.log(`server running at port ${port}`);
})

process.on("SIGINT", () => {
    prisma.$disconnect();
    process.exit();
})