const rhumService = require('../services/rhum');
const utils = require('../core/utils');

const getList = async (params) => {
    return rhumService.getList(params);
}

module.exports = {
    getList
}