import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import CategorySection from "../components/budget/CategorySection";
import { getOverview, addCategory } from "../services/budget.api";

const BudgetPage = () => {
  const [data, setData] = useState(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const fetchOverview = async () => {
    try {
      const res = await getOverview();
      setData(res.data.data);
    } catch (err) {
      console.error("Failed to load overview", err);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    await addCategory(categoryName);
    setCategoryName("");
    setShowCategoryDialog(false);
    fetchOverview();
  };

  if (!data) return <AppLayout>Loading...</AppLayout>;

  return (
    <AppLayout>
      <h1 className="page-title">Budget</h1>

      {data.categories.map((cat) => (
        <CategorySection
          key={cat.id}
          category={cat}
          refreshOverview={fetchOverview}
        />
      ))}

      {/* Add Category Button */}
      <button className="add-category" onClick={() => setShowCategoryDialog(true)}>
        + Add category
      </button>

      {/* Footer */}
      <div className="budget-footer">
        <span>Actual total</span>
        <strong>₹ {data.overallTotal.toLocaleString()}</strong>
      </div>

      <div className="budget-actions">
        <button className="secondary">Download PDF</button>
        <button className="secondary">Download XLS</button>
      </div>

      {/* Add Category Dialog */}
      {showCategoryDialog && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <h3>Add category</h3>
            <input
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="dialog-actions">
              <button onClick={() => setShowCategoryDialog(false)}>Cancel</button>
              <button onClick={handleAddCategory}>Add</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default BudgetPage;
