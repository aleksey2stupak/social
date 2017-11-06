import passport from 'passport';
import { STRATEGY } from '../configs/passport.config';
import { authService } from '../services/auth.service';

const loginHandler = (next, res) => err => {
    if (err) {
        next(err);
    } else {
        res.redirect('/feed');
    }
}

class AuthController {

    // Здесь мы проверяем, передаем данные о пользователе в функцию верификации, котоую мы определили выше.
    // Вообще, passport.authenticate() вызывает метод req.logIn автоматически, здесь же я указал это явно.
    // Это добавляет удобство в отладке. Например, можно вставить сюда console.log(), чтобы посмотреть, что происходит...
    // При удачной авторизации данные пользователя будут храниться в req.user
    login(req, res, next) {
        console.log(`login`);
        passport.authenticate(STRATEGY,
            function(err, user, info) {
                if (err) {
                    next(err);
                    return;
                }
                if (!user) {
                    res.redirect('/');
                    return;
                }
                console.log(`authenticated user:`);
                console.log(user);
                req.logIn(user, loginHandler(err, res));
            }
        )(req, res, next);
    };

    // Здесь все просто =)
    logout(req, res) {
        req.logout();
        res.redirect('/');
    };

    // Регистрация пользователя. Создаем его в базе данных, и тут же, после сохранения, вызываем метод `req.logIn`, авторизуя пользователя
    register(req, res, next) {
        authService.registerUser(req.body.email, req.body.password)
            .then(user => {
                req.logIn(user, function(err) {
                    return err
                        ? next(err)
                        : res.redirect('/feed');
                });
            })
            .catch(err => {
                next(err);
            });
    };
}

export default new AuthController();