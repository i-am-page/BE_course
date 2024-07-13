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

class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, reason = ReasonStatusCode.OK, metadata ={}}) {
        this.message = !message ?reason : message,
        this.status = statusCode,
        this.metadata = metadata
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor({options ={},message, statusCode = StatusCode.CREATED, reason = ReasonStatusCode.CREATED, metadata}) {
        super({message, statusCode, reason, metadata})  
        this.options = options
    }
}

module.exports = {OK, CREATED}