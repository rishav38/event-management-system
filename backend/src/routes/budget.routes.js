const express = require("express");
const router = express.Router();

const {
  getOverview,
  addCategory,
  addItem,
  updateItem,
  updateCategoryBudget
} = require("../controllers/budget.controller");

const auth = require("../middlewares/auth.middleware");

router.get("/overview", auth, getOverview);
router.post("/categories", auth, addCategory);
router.post("/items", auth, addItem);
router.patch("/items/:id", auth, updateItem);
router.patch("/categories/:id/budget", auth, updateCategoryBudget);


module.exports = router;
