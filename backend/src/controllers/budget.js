const BudgetCategory = require("../models/BudgetCategory");
const Expense = require("../models/Expense");

const Wedding = require("../models/Wedding");

/**
 * Create a new budget category
 */
const createCategory = async (req, res) => {
  try {
    const { name, allocatedAmount } = req.body;
    const { weddingId } = req.user;

    if (!name || !allocatedAmount) {
      return res.status(400).json({
        success: false,
        message: "Category name and amount required"
      });
    }

    const category = await BudgetCategory.create({
      weddingId,
      name,
      allocatedAmount
    });

    res.status(201).json({
      success: true,
      data: category,
      message: "Budget category created"
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



const addExpense = async (req, res) => {
  try {
    const { categoryId, amount, description } = req.body;
    const { weddingId } = req.user;

    if (!categoryId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Category and amount are required"
      });
    }

    const category = await BudgetCategory.findOne({
      _id: categoryId,
      weddingId
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // 🚨 Overspend check
    if (category.spentAmount + amount > category.allocatedAmount) {
      return res.status(400).json({
        success: false,
        message: "Budget exceeded for this category"
      });
    }

    // Create expense
    const expense = await Expense.create({
      weddingId,
      categoryId,
      amount,
      description
    });

    // Update spent amount
    category.spentAmount += amount;
    await category.save();

    res.status(201).json({
      success: true,
      data: expense,
      message: "Expense added"
    });

  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



const getBudgetOverview = async (req, res) => {
  try {
    const { weddingId } = req.user;

    // 1️⃣ Fetch wedding (for total budget)
    const wedding = await Wedding.findById(weddingId);
    const totalBudget = wedding?.totalBudget || 0;

    // 2️⃣ Fetch categories
    const categories = await BudgetCategory.find({ weddingId });

    // 3️⃣ Fetch expenses
    const expenses = await Expense.find({ weddingId });

    // 4️⃣ Group expenses by category
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat._id] = {
        id: cat._id,
        name: cat.name,
        allocatedAmount: cat.allocatedAmount,
        spentAmount: cat.spentAmount,
        expenses: []
      };
    });

    let totalSpent = 0;

    expenses.forEach(exp => {
      if (categoryMap[exp.categoryId]) {
        categoryMap[exp.categoryId].expenses.push({
          description: exp.description,
          amount: exp.amount,
          expenseDate: exp.expenseDate
        });
        totalSpent += exp.amount;
      }
    });

    res.json({
      success: true,
      data: {
        totalBudget,
        totalSpent,
        remaining: totalBudget - totalSpent,
        categories: Object.values(categoryMap)
      }
    });

  } catch (error) {
    console.error("Overview error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const setTotalBudget = async (req, res) => {
  try {
    const { weddingId } = req.user;
    const { totalBudget } = req.body;

    if (totalBudget == null || totalBudget < 0) {
      return res.status(400).json({
        success: false,
        message: "Valid total budget required"
      });
    }

    const wedding = await Wedding.findByIdAndUpdate(
      weddingId,
      { totalBudget },
      { new: true }
    );

    res.json({
      success: true,
      data: { totalBudget: wedding.totalBudget },
      message: "Total budget updated"
    });
  } catch (error) {
    console.error("Set budget error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};





module.exports = { createCategory, addExpense ,getBudgetOverview,setTotalBudget};
