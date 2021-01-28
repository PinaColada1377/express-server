const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MethodsDB = require('../db/connect');

class JSONUserService {

    

    getUser = () => {    
        return MethodsDB.get();
    }
    
    addUser = async (user) => { 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt);
        const candidate = await MethodsDB.findOnDB(user.login);
        if(!candidate){  
            MethodsDB.add({...user, password: hashPassword});
        }
        else { return false } 
    }

    update = async (dataToUpdate, id) => {
        if (dataToUpdate.password !== undefined){   
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(dataToUpdate.password, salt);  
            MethodsDB.updateOnDB({...dataToUpdate, password: hashPassword}, filePath, id);
        } else { 
            MethodsDB.updateOnDB(dataToUpdate, id);
        }
    }

    deleteUser = (id) => {
        MethodsDB.deleteUser(id);  
    }

    login = async (user) => {
        const result = jwt.verify(user[0][1], 'secret');
        if (result.role === user[1]){
            const candidate = await MethodsDB.findOnDB(result.login);
            if (candidate) {
                const passwordUser = await MethodsDB.findPassword(result.login);
                const comparePassword = await bcrypt.compare(result.password, passwordUser);
                if (!comparePassword) {return false}; 
            } else {return false}
        } else {return false}
        const login = result.login 
        const access = jwt.sign({login, type: 'access'}, 'secret', {expiresIn: 60 * 60});
        return access;
    }
}

module.exports = new JSONUserService();