import passport from 'passport';
import { Strategy } from 'passport-local';
import { authService } from '../services/auth.service';

export const STRATEGY = 'local';

const USER_NOT_FOUND = 'USER_NOT_FOUND';
const INVALID_PASSWORD = 'INVALID_PASSWORD';

function auth(username, password, done) {
    console.log(`auth: username="${username}" password="${password}"`);
    authService.findUserByLogin(username)
        .then(user => {
            if (user == null) {
                return Promise.reject(USER_NOT_FOUND);
            }
            if (!authService.validPassword(user, password)) {
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

passport.use(new Strategy(auth));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
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
});