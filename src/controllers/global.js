const globalService = require('../services/global');

const search = async (name) => {
    return globalService.search(name);
}

module.exports = {
    search
}