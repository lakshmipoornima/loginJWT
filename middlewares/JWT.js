const {sign,verify} = require('jsonwebtoken')
const httpStatus = require('http-status')

const createTokens = (user) => {
    const accessToken = sign({ username: user.username },"practicesecret");
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]
    
    if (!accessToken)
        return res.status(httpStatus.UNAUTHORIZED).json({ error: "User not authenticated" })

    try {
        const validToken = verify(accessToken, "practicesecret")
        if (validToken) {
            return next()
        }

    }
    catch (err) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: err })
    }
}

module.exports = { createTokens, validateToken }