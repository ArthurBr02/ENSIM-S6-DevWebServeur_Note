require("./user")
require("./ingredient")
require("./rhum")

const {db} = require("../src/db/mongo");
afterAll(() => {
    db.disconnect();
});