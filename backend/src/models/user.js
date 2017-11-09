export class User {

    constructor(id, name, password, permissions, roles) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.permissions = permissions;
        this.roles = roles;
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
 * @param permissions {Array<string>}
 * @param roles {Array<string>}
 * @returns {User}
 */
export function createUser(name, password, permissions = [], roles = []) {
    const id = generateId();
    return new User(id, name, password, permissions, roles);
}
