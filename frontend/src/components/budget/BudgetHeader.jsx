const BudgetHeader = ({ totalBudget, totalSpent, remaining }) => {
  return (
    <div className="budget-header">
      <h1 className="budget-title">Budget</h1>
      <p className="budget-subtitle">
        Keep track of every penny you spend
      </p>

      <div className="budget-summary">
        <div className="summary-item">
          <span>Total Budget</span>
          <strong>₹{totalBudget.toLocaleString()}</strong>
        </div>

        <div className="summary-item">
          <span>Spent</span>
          <strong>₹{totalSpent.toLocaleString()}</strong>
        </div>

        <div className={`summary-item ${remaining < 0 ? "danger" : "success"}`}>
          <span>Remaining</span>
          <strong>₹{remaining.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
};

export default BudgetHeader;
