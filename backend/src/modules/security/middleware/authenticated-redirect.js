import { activationWrapper } from '../helpers';

function authenticatedRedirectMiddlewareFactory(path) {
    return function authenticatedRedirectMiddleware(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect(path);
        } else {
            next();
        }
    };
}

export const authenticatedRedirect = activationWrapper(authenticatedRedirectMiddlewareFactory);
