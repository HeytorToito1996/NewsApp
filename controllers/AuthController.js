const User = require('../models/User');

async function userSignIn(req,userData,res) {
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
            const authenticatedUser = {id:userExists._id, email:userExists.email,name:userExists.name, role:userExists.role};
            req.session.authenticatedUser = authenticatedUser;
            req.session.name = authenticatedUser.name;
            const userSession = req.session.authenticatedUser; 
            return res.status(200).json({token,userSession});

        }
    } 
    catch(error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
    
}

module.exports = {userSignIn};