require("dotenv").config();
const app = require("./app");
const { PORT } = require("./environments")

const main = async () => {
  (await app()).listen(PORT, () =>
    console.info(
      `> 🎈listening at ${PORT} | environment: ${process.env.NODE_ENV}`
    )
  );
};
main();
