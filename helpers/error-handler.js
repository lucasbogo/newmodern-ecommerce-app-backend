/**
 * 
 * ERROS REFERENTES À UTILIZAÇÃO DOS TOKEN (JWT)
 */

// erro autenticação jwt
function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {

        return res.status(401).json({ message: "Usuário não autorizado" })
    }
    //  erro de validação
    if (err.name === 'ValidationError') {

        return res.status(401).json({ message: err })
    }

    // erro de servidor padrão
    return res.status(500).json(err);
}

module.exports = errorHandler;