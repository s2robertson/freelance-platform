const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error('JWT secret missing!');
}
const expiration = '2h';

module.exports = {
    authMiddleware(context) {
        const { req } = context;
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (token === req.headers.authorization) {
            // ["Bearer", "<token>"]
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return context;
        }

        try {
            const { data } = jwt.verify(token, SECRET, { maxAge: expiration });
            context.user = data;
        } catch (err) {
            console.error('Invalid token');
        }

        return context;
    },
    signToken({ _id, username, email }) {
        const payload = { _id, username, email };
        return jwt.sign({ data: payload }, SECRET, { expiresIn: expiration });
    }
}