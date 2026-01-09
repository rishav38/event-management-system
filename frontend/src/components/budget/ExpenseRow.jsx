const ExpenseRow = ({ expense }) => {
  return (
    <div className="expense-row">
      <span>{expense.description}</span>
      <strong>₹{expense.amount.toLocaleString()}</strong>
    </div>
  );
};

export default ExpenseRow;
