require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.config");


const User=require("./models/User");
const Wedding=require("./models/Wedding");


const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();

console.log("Models loaded",User.modelName,Wedding.modelName);
