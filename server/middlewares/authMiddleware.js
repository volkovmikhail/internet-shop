const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_KEY;

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'User is not login!' });
        }
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'User is not login' });
    }
};
