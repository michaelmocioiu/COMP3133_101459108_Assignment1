const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./graphql/schema");
const connectDB = require("./config/db");
require("dotenv").config();

const app = require("./app");

const PORT = 5000;

connectDB();

app.use("/graphql", createHandler({ schema: schema }));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
