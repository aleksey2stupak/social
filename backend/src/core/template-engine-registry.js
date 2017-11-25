export class TemplateEngineRegistry {

    engines = {};

    registerTemplateEngine(engineName, renderer) {
        this.engines[engineName] = { name: engineName, renderer };
    }

    getTemplateRenderer(engineName) {
        const engine = this.engines[engineName];
        if (engine == null) {
            return null;
        }
        return engine.renderer;
    }
}