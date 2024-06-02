const authMiddleware = (req, res, next) => {
    // Aqui você deve implementar a lógica de verificação de autenticação
    const isAuthenticated = true; // Exemplo: verificar se existe um token válido
  
    if (!isAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
  
    next();
};
  
module.exports = {
    authMiddleware
};
