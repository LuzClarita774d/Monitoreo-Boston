function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

function requireRole(role) {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/');
        }
        if (req.session.user.rol !== role) {
            return res.redirect('/');
        }
        next();
    };
}

module.exports = {
    requireAuth,
    requireRole
};