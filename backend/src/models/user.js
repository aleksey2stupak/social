export class User {

    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
    
}

let usersCounter = 0;

function generateId() {
    usersCounter += 1;
    return usersCounter;
}

/**
 * Create user with specified login and password
 * @param name {string}
 * @param password {string}
 * @returns {User}
 */
export function createUser(name, password) {
    const id = generateId();
    return new User(id, name, password);
}
