// Import winston with ES module syntax
import winston from 'winston';
import 'winston-daily-rotate-file';

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create a daily rotating transport
const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d' // Keep logs for 14 days
});

// Create the logger
const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(), // Colorize console output
        logFormat
    ),
    transports: [
        new transports.Console()
        ,
        dailyRotateFileTransport
    ],
    exitOnError: false, // Prevent the logger from exiting on handled exceptions
});

// Export the logger as the default export
export default logger;
