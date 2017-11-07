export const authenticatedRedirect = path => (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect(path);
    } else {
        next();
    }
};
