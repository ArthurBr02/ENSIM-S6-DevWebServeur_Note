const { port, app } = require('./app');
const debug = require("debug");
module.exports = app.listen(port, () => {
    debug.log(`Server started on port ${port}`)
});