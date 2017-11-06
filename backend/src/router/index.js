import { Router } from 'express';
import { mustAuthenticated } from '../middleware/must-authenticated';

function redirectAuthenticatedUser(path) {
    return (req, res, next) => {
        console.log('try access to root page');
        if (req.isAuthenticated()) {
            res.redirect(path);
        } else {
            next();
        }
    };
}

export default ({ config, db }) => {
    let router = Router();

    // pages router
    router.get('/', redirectAuthenticatedUser('/feed'));
    router.get('/feed', mustAuthenticated);

    return router;
}
