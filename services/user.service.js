const fs = require('fs');
const jwt = require('jsonwebtoken');

class JSONUserService {

    users = JSON.parse(fs.readFileSync('services/json/users.json').toString());

    getUser = () => {        
        return this.users;
    }
    
    addUser = (user) => {        
        this.users.push(user);
        this.writeUsers(this.users);       
     
    }

    update = (dataToUpdate, id) => {        
        const index = this.users.findIndex( n => n.id === id);
        this.users[index] = {
            ...this.users[index],
            ...dataToUpdate
        }
        this.writeUsers(this.users)
    }

    deleteUser = (id) => {
        const index = this.users.findIndex(n => n.id === id);
        if (index !== -1){
            this.users.splice(index, 1);
        }
        this.writeUsers(this.users)     
    }

    writeUsers = (changeUsers) => {
        fs.writeFile('services/json/users.json', JSON.stringify(changeUsers, null, 3), (err) => {
            if(err) throw err;
        });
    }

    login = (login) => {
        const access = jwt.sign({login, type: 'access'}, 'secret', {expiresIn: 60 * 60});
        return access;
    }
}

module.exports = new JSONUserService();