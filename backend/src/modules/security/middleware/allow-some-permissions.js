import { activationWrapper, getPermissions, hasSomePermission } from '../helpers';

function allowSomePermissionsMiddlewareFactory(allowedPermissions) {
    return function allowSomePermissionsMiddleware(req, res, next) {
        //TODO load user by req.session.userid if req.user not exists
        if (!req.user) {
            console.log(`Route denied for unauthorized users`);
            res.send(400, 'access denied');
            return;
        }
        if (!hasSomePermission(allowedPermissions, getPermissions(req.user))) {
            console.log(`User has not permissions for route`);
            res.send(400, 'access denied');
            return;
        }
        console.log('Access to route granted');
        next();
    };
}

export const allowSomePermissions = activationWrapper(allowSomePermissionsMiddlewareFactory);
