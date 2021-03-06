const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) { return res.status(401).json({error: "unauthorized"}); }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({error: "unauthorized"})
    }
}

module.exports = auth;