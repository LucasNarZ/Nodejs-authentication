const axios = require("axios");

function seeUsers(){
    axios.get("http://localhost:3000/user")
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.error(err);
    })
}

function addUser(name, email, password){
    axios.post("http://localhost:3000/user", {name: name, email:email, password:password})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.error(err);
    })
}

addUser("las", "asdasd", "342");
seeUsers();