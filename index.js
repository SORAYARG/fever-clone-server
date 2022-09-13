require("dotenv").config();
const app = require("./app");
// const options = require("./configs/cors");


const main = async () => {
  (await app()).listen(process.env.PORT, () =>
  console.info(`🎈listening at: ${process.env.PORT}`
  )
  );
};

main();