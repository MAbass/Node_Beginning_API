const winston = require("winston");


const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'warn'
        }),
        new winston.transports.File({
            level: 'error',
            // Create the log directory if it does not exist
            filename: '/Users/macbook/WebstormProjects/node_auth/logs/app.log'
        }),
        new winston.transports.MongoDB({
            level: 'error',
            //mongo database connection link
            db: 'mongodb://localhost:27017/vidly',
            options: {
                useUnifiedTopology: true
            },
            // A collection to save json formatted logs
            collection: 'server_logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                // Convert logs to a json format
                winston.format.json())
        })
    ]
};
const logger = winston.createLogger(logConfiguration);

module.exports = logger;