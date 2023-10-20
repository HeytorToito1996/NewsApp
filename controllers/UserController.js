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

const getUser = async function (req, res,userID) {
    let userData = await User.findById(userID);
    return response.status(201).send(userData);
}

const updateUser = async function (req, res,userID) {
    let user = await User.findById(userID);
    if (!user) {
        return res.status(404).send({message:'Usuário não encontrado'});
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    await user.save();
    return res.status(200).send({message:'Usuário atualizado com sucesso', user});
}

module.exports = {createUser,updateUser,getUser};