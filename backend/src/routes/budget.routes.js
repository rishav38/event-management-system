const express = require("express");
const router = express.Router();

const {
  getOverview,
  addCategory,
  addItem,
  updateItem
} = require("../controllers/budget.controller");

const auth = require("../middlewares/auth.middleware");

router.get("/overview", auth, getOverview);
router.post("/categories", auth, addCategory);
router.post("/items", auth, addItem);
router.patch("/items/:id", auth, updateItem);

module.exports = router;
