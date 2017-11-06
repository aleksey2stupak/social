import { db } from '../db';
import { User } from '../models/user';

let usersCounter = 0;

function generateId() {
    usersCounter += 1;
    return usersCounter;
}

function createUser(login, password) {
    const id = generateId();
    return new User(id, login, password);
}

const users = [
    createUser('user1', '1'),
    createUser('user2', '2'),
];

function findUser(prop, value) {
    const result = users.filter(user => user[prop] === value);
    return result.length === 0 ? null : result[0];
}

function registerUser(login, password) {
    if (findUser('login', login) == null) {
        const user = createUser(login, password);
        users.push(user);
        return Promise.resolve(user);
    } else {
        return Promise.reject(`User with name ${login} already exists`);
    }
}

function findUserById(id) {
    return Promise.resolve(findUser('id', id));
}

function findUserByLogin(login) {
    return Promise.resolve(findUser('login', login));
}

function validPassword(user, password) {
    return user.password === password;
}

export const authService = {
    findUserById,
    findUserByLogin,
    validPassword,
    registerUser,
};