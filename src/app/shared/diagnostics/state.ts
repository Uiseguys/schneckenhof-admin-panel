import { createLogger } from './redux-logger';

const logger = createLogger({
    collapsed: true,
    duration: true,
});

export const diagnosticsMiddleware = logger;
