const User = require('../models/User');

async function userSignIn(userData,res) {
    try {
        const userExists = await User.findOne({email:userData.email});
        
        if(!userExists){
            return res.status(400).json({message: 'Usuário não encontrado', userData});
        }
    
        else if(!(await userExists.comparePassword(userData.password))){
            return res.status(401).json({message:'Credenciais Inválidas'});
        }
    
        else {
            const token = userExists.generateWebToken();
            console.log("Login realizado com sucesso, seu token de sessão é : " + token);
            return res.status(200).json({token});
        }
    } 
    catch(error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
    
}

module.exports = {userSignIn};