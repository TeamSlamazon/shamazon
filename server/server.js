const http = require("http")
const chalk = require("chalk")
const app = require("./app")
const { rebuildDB } = require('./db/seedData');

const PORT = process.env["PORT"] ?? 3000
const server = http.createServer(app)

server.listen(PORT, async() => {
  console.log(
    chalk.blueBright("Server is listening on PORT:"),
    chalk.yellow(PORT),
    chalk.blueBright("Shamazon!")
  );
  await rebuildDB();
})
