const Sequilize= require('sequelize');

const sequelize = new Sequilize ('users', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});


const user = sequelize.define('user', {
    id : {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequilize.STRING
    },
    email: {
        type: Sequilize.STRING
    },
    role: {
        type: Sequilize.ENUM('user', 'admin')
    },
    password: {
        type: Sequilize.STRING
    },
    avatar: {
        type: Sequilize.STRING
    }
}, {
    freezeTableName: true
});

class MethodsDB {
    get = async () => {
        const allUsers = await user.findAll();
        return allUsers;
    }

    add = async (receivedUser) => {
        const preparedUser = await user.create(receivedUser);
        await preparedUser.save()
    }; 

    findOnDB = async (arg) => {
        const find =  await user.findOne({where: {login: arg}});
        if (find === null) {
            return false
        } else {
            return true
        }
    } 
   
    updateOnDB = async (dataToUpdate, id) => {
        console.log(dataToUpdate)
        await user.update(dataToUpdate,{where:{id: id}})
    }

    deleteUser = async (id) => {
        await user.destroy({where: {id: id}})
    }

    findPassword = async (arg) => {
        const find =  await user.findOne({where: {login: arg}});
        return find.password;        
    }
}
module.exports = new MethodsDB();
