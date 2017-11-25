export function withTemplateEngine(app, engineName) {
    const engineRendererFactory = app.templateEngineRegistry.getTemplateRenderer(engineName);
    if (engineRendererFactory == null) {
        throw new Error(`Unknown template engine "${engineName}"`);
    }
    return engineRendererFactory;
}
