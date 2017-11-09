import { Router } from 'express';
import { Permissions } from '../models/permissions';
import { allowSomePermissions } from '../middleware/allow-some-permissions';
import { authService } from '../services/auth.service';

function getUsers(req, res, next) {
    authService.getUsers()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            next(error);
        });
}

function findUser(id) {
    if (/^\d+$/.test(id)) {
        return authService.findUserById(parseInt(id, 10));
    } else {
        return authService.findUserByName(id);
    }
}

function getUser(req, res, next) {
    findUser(req.params.id)
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            next(error);
        });
}

export default ({ config, db }) => {
    let api = Router();

    api.get('/users', allowSomePermissions(Permissions.SHOW_USER), getUsers);
    api.get('/users/:id', allowSomePermissions(Permissions.SHOW_USER), getUser);

    return api;
}
