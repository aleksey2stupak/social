export class ModuleLoader {

    constructor(app, config, db) {
        this.app = app;
        this.config = config;
        this.db = db;
    }

    loadModules(...modules) {
        console.log(`Starting loading of modules`);
        const modulesCount = modules.length;
        return new Promise((resolve, reject) => {
            let loadedModules = 0;

            const done = module => error => {
                if (error) {
                    console.error(`Loading module ${module.name} failed with error:`);
                    console.error(error);
                    reject();
                    return;
                }

                loadedModules += 1;
                console.log(`Module ${module.name} loaded`);

                if (loadedModules === modulesCount) {
                    console.log(`Modules loading finished. Loaded ${loadedModules} module(s).`);
                    resolve();
                }
            };

            const { app, config, db } = this;
            const context = { app, config, db };

            modules.forEach(module => module.handler(context, done(module)));
        });
    }
}

