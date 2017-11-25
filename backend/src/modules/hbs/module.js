import expressHandlebars from 'express-handlebars';
import { module } from '../../core/module';
import { isActive, activate } from './activation';
import { hsbPage } from './hbsPage';

const ENGINE_NAME = 'hbs';

function hbsModule({app, config, db}, done) {
    if (isActive()) {
        return;
    }
    activate();

    app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.templateEngineRegistry.registerTemplateEngine(ENGINE_NAME, hsbPage);

    done();
}

export default module('hbs', hbsModule);
