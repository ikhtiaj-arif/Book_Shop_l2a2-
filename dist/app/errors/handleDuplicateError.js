"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} already exists!`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: `${extractedMessage} already exists!`,
        errorSources,
    };
};
exports.default = handleDuplicateError;
