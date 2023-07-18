const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const {seeUsers, addUser} = require('../requisition');

const mock = new MockAdapter(axios);

describe("reqTest", () => {
    it("addUser", async () => {
        const user = {name:"lucas", email:"asdasd@asdasd.com", password:"123"};
        const repeatedUser = {name:"las", email:"asdasd", password:"342"}

        mock.onPost('http://localhost:3000/user').reply(200, user);
        const newUser = await addUser();
        mock.onPost('http://localhost:3000/user').reply(409, repeatedUser);

        
        const repeatedUserRes = await addUser();
        expect(newUser.status).toBe(200);
        expect(repeatedUserRes.status).toBe(409);
        expect(newUser.data).toMatchObject(expect.objectContaining(user));

    }) 


    it("getUsersConcrete", async () => {
        const user = [{name:"tas", email:"asdasd", password:"342"}, {name:"asd", email:"ghj", password:"098"}];

        mock.onGet('http://localhost:3000/user').reply(200, user);

        const users = await seeUsers();

        expect(users.status).toBe(200);
        expect(users.data).toMatchObject(expect.arrayContaining(user))
    })
})