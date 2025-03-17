export const logger = {
    info: (message: string) => {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    },

    error: (message: string, error?: any) => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
        if (error) {
            console.error(error);
        }
    },

    warn: (message: string) => {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
    },

    debug: (message: string) => {
        console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`);
    }
};
