const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");

const budgetRoutes = require("./routes/budget.routes");




const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});



app.use("/api/auth", authRoutes);

app.use("/api/budget", budgetRoutes);




module.exports = app;
