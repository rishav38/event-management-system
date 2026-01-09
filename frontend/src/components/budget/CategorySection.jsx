import { useState, useEffect } from "react";
import EditableRow from "./EditableRow";
import { addItem, updateCategoryBudget } from "../../services/budget.api";

const CategorySection = ({ category, refreshOverview }) => {
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [itemTitle, setItemTitle] = useState("");

  const [plannedBudget, setPlannedBudget] = useState(
    category.plannedBudget || 0
  );

  /* Keep local state in sync when overview refreshes */
  useEffect(() => {
    setPlannedBudget(category.plannedBudget || 0);
  }, [category.id, category.plannedBudget]);

  const handleAddItem = async () => {
    if (!itemTitle.trim()) return;
    await addItem(category.id, itemTitle);
    setItemTitle("");
    setShowItemDialog(false);
    refreshOverview();
  };

  const handleBudgetBlur = async () => {
    if (plannedBudget !== category.plannedBudget) {
      await updateCategoryBudget(category.id, plannedBudget);
      refreshOverview();
    }
  };

  /* Status logic */
  const ratio =
    plannedBudget > 0 ? category.categoryTotal / plannedBudget : 0;

  const status =
    ratio > 1 ? "over" : ratio > 0.8 ? "warning" : "ok";

  return (
    <section className={`category-section ${status}`}>
      {/* Header */}
      <div className="category-header">
        <h3>{category.name}</h3>

        <div className="category-budget">
          <span className="actual">
            ₹ {(category.categoryTotal ?? 0).toLocaleString()}
          </span>

          <span className="sep">/</span>

          <input
            className="planned"
            type="number"
            value={plannedBudget}
            onChange={(e) => setPlannedBudget(Number(e.target.value))}
            onBlur={handleBudgetBlur}
          />
        </div>
      </div>

      {/* Items */}
      {category.items.length > 0 && (
        <div className="category-items">
          {category.items.map((item) => (
            <EditableRow key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Add item */}
      <button className="add-item" onClick={() => setShowItemDialog(true)}>
        + Add item
      </button>

      {/* Add Item Dialog */}
      {showItemDialog && (
        <div className="dialog-backdrop">
          <div className="dialog">
            <h3>Add item</h3>
            <input
              placeholder="Item title"
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
            />
            <div className="dialog-actions">
              <button onClick={() => setShowItemDialog(false)}>Cancel</button>
              <button onClick={handleAddItem}>Add</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
