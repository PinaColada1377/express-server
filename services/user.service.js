

class JSONUserService {
    users = [
        {
            id: '1',
            name: 'Vlad',
            password: '1234'
        },
        {
            id: '2',
            name: 'Vlad2',
            password: '12345'
        },
        {
            id: '3',
            name: 'Vlad4',
            password: '1234567'
        }
    ]

    getUser = () => {
        return this.users
    }

    addUser = (user) => {
        this.users.push(user);
        return this.users
    }

    update = (dataToUpdate, id) => {
        const index = this.users.findIndex( n => n.id === id);
        this.users[index] = {
            ...this.users[index],
            ...dataToUpdate
        }
        return this.users;
    }

    deleteUser = (id) => {
        const index = this.users.findIndex(n => n.id === id);
        if (index !== -1){
            this.users.splice(index, 1)
        }
        return this.users;
    }
}

module.exports = new JSONUserService();