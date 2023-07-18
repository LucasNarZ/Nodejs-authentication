const axios = require("axios");




function seeUsers(){
    return axios.get("http://localhost:3000/user")
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

function addUser(name, email, password){
    return axios.post("http://localhost:3000/user", {name: name, email:email, password:password})
    .then(res => {
        return res;
    })
    .catch(err => {
        return err.response
    })
}



module.exports = { seeUsers, addUser };