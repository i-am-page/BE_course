'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}

const ReasonStatusCode = {
    [StatusCode.OK]: 'OK',
    [StatusCode.CREATED]: 'Created',
    [StatusCode.NO_CONTENT]: 'No Content',
    [StatusCode.BAD_REQUEST]: 'Bad Request',
    [StatusCode.UNAUTHORIZED]: 'Unauthorized',
    [StatusCode.FORBIDDEN]: 'Forbidden',
    [StatusCode.NOT_FOUND]: 'Not Found',
    [StatusCode.CONFLICT]: 'Conflict',
    [StatusCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode)
    }
}

module.exports = { ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError }

