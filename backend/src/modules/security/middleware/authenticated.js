import { activationWrapper } from "../helpers";

function authenticatedMiddleware(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log(`Private route "${req.originalUrl}" is not allowed for not authenticated user`);
        req.session.redirectTo = req.originalUrl;
        res.redirect('/');
        return;
    }
    console.log('Private route is allowed');
    next();
}

export const authenticated = activationWrapper(() => authenticatedMiddleware);
