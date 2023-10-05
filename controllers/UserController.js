const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async function(userData,res){
    let userExists = await User.findOne({where:{user:userData.name , email:userData.email}});

    if (userExists){
        return res.status(400).send({message:'Usuário ou E-Mail já existe'});
    }

    else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await User.create({
            name:userData.name,
            email:userData.email,
            password:hashedPassword
        });
        return res.status(201).send({message:'Usuário criado com sucesso', user});
    }
}

module.exports = {createUser};