function requireAuth(req,res,next) {
    console.log('Middleware requireAuth chamado.');
    console.log('Dados do usuário:', req.session.authenticatedUser);

    if (!req.session.authenticatedUser) {
        return res.status(401).json({message: 'Usuário não autenticado'});
    }

    else{
        next();
    }    
}

function requireAdmin(req,res,next) {
    console.log('Middleware requireAdmin chamado.');
    console.log('Dados do usuário:', req.session.authenticatedUser);
    if (!req.session.authenticatedUser) {
        return res.status(401).json({message: 'Usuário não autenticado'});
    }
     if(req.session.authenticatedUser.role !== 'Admin'){
        return res.status(401).json({message: 'Usuário não autorizado'});
    }
    next();
    
}
module.exports = {requireAuth,requireAdmin};