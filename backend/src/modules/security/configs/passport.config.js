import passport from 'passport';
import { Strategy } from 'passport-local';
import { authService } from '../services/auth.service';

const USER_NOT_FOUND = 'USER_NOT_FOUND';
const INVALID_PASSWORD = 'INVALID_PASSWORD';

function auth(username, password, done) {
    console.log(`auth: username="${username}" password="${password}"`);
    authService.findUserByName(username)
        .then(user => {
            if (user == null) {
                return Promise.reject(USER_NOT_FOUND);
            }
            if (!authService.isPasswordValid(user, password)) {
                return Promise.reject(INVALID_PASSWORD);
            }
            console.log(`user authenticated:`);
            console.log(user);
            return done(null, user);
        })
        .catch(error => {
            if (error === USER_NOT_FOUND) {
                console.log(`User with name ${username} not founded`);
                return done(null, false, { message: 'Incorrect username.' });
            } else if (error === INVALID_PASSWORD) {
                console.log(`Incorrect password`);
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                console.log(`Authentication failed:`);
                console.log(error);
                return done(error);
            }
        });
}

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(id, done) {
    authService.findUserById(id)
        .then(user => {
            if (user == null) {
                return Promise.reject(USER_NOT_FOUND);
            }
            done(null,user);
        })
        .catch(function(error) {
            done(error);
        });
}

function createStrategy(strategy) {
    switch (strategy) {
        case 'local': return new Strategy(auth);
        default: {
            throw new Error(`Unknown auth strategy "${strategy}"`);
        }
    }
}

export default function configurePassport(strategy) {
    passport.use(createStrategy(strategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
}
