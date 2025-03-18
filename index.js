const { port, app } = require('./app');
module.exports = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});