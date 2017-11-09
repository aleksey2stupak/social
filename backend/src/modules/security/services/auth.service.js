import { UserStore } from '../../../db';
import { createUser } from '../../../models/user';
import { createError } from '../../../models/error';
import { Errors } from '../models/Errors';

function registerUser(registerRequest) {
    const {username, password} = registerRequest;
    return validateNewUserRequest(registerRequest)
        .then(() => {
            return UserStore.saveUser(createUser(username, password));
        })
        .then(user => {
            //TODO save user data
            return user;
        })
        .then(user => {
            console.log(`Register user with name "${username}" and password "${password}"`);
            return user;
        })
        .catch(error => {
            console.log(`Register user with name "${username}" failed with error`);
            console.log(error);
            return Promise.reject(error);
        });
}

function validateNewUserRequest(registerRequest) {
    const {username, password, confirmPassword} = registerRequest;
    if (password !== confirmPassword) {
        return Promise.reject(createError(Errors.PASSWORD_CONFIRMATION_ERROR, 'Password and password confirmation do not match'));
    }
    return UserStore.findUserByName(username)
        .then(user => {
            if (user != null) {
                return Promise.reject(createUser(Errors.USER_EXISTS, `User with name ${username} already exists`));
            }
        });
}

function findUserById(id) {
    return UserStore.findUserById(id);
}

function findUserByName(name) {
    return UserStore.findUserByName(name);
}

function isPasswordValid(user, password) {
    return user.password === password;
}

export const authService = {
    findUserById,
    findUserByName,
    isPasswordValid,
    registerUser,
};