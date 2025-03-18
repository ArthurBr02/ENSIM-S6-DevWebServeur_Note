require("./user")
require("./ingredient")

const {db} = require("../src/db/mongo");
afterAll(() => {
    db.disconnect();
});