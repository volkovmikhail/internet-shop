const jwt = require('jsonwebtoken');
const key = process.env.TOKEN_KEY;

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({ message: 'User is not login!' });
            }
            const { roles: userRoles } = jwt.verify(token, key);
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: 'You have not access' });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: 'User is not login' });
        }
    };
};
