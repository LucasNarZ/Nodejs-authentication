const express = require('express');
const app = express();

const cors = require('cors');

const routes = require("./routes/user.js");
const port = 3002;

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());

app.use("/", routes)






app.listen(port, () => {
    console.log(`server running at port ${port}`);
})

