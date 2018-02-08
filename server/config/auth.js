const auth = {
    ensureToken: function (req, res, next) {
        const header = req.headers["authorization"];
        if (typeof header === 'undefined') {
            return res.sendStatus(403);
        }
        const bearer = header.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
}

module.exports = auth;