
module.exports = {
    asyncError: async (message) => {
        return {
            status: 'error',
            message: message
        }
    },
    syncError: (message) => {
        return {
            status: 'error',
            message: message
        }
    }
}