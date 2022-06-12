const db = require("../config/connection");
const { userM } = require("../models");
const userData = require("./userData.json");



db.once("open", async () => {
  await userM.deleteMany({});
  await userM.create(userData);

  const users = await userM.insertMany(userData);

  console.log("Users seeded!");
  process.exit(0);
});
