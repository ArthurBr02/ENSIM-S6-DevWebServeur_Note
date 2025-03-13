module.exports = {
    asyncError: async (message) => {
        return {
            status: 'error',
            message: message,
            code: 500
        }
    },
    syncError: (message) => {
        return {
            status: 'error',
            message: message,
            code: 500
        }
    },
    asyncBadRequest: async () => {
        return {
            status: 'error',
            message: 'Bad request',
            code: 400
        }
    },
    asyncNotFound: async () => {
        return {
            status: 'error',
            message: 'Not found',
            code: 404
        }
    },
    asyncForbidden: async () => {
        return {
            status: 'error',
            message: 'Forbidden',
            code: 403
        }
    },
}