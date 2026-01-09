import { useState } from "react";
import EditableRow from "./EditableRow";
import { addItem } from "../../services/budget.api";

const CategorySection = ({ category, refreshOverview }) => {
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [itemTitle, setItemTitle] = useState("");

  const handleAddItem = async () => {
    if (!itemTitle.trim()) return;
    await addItem(category.id, itemTitle);
    setItemTitle("");
    setShowItemDialog(false);
    refreshOverview();
  };

  return (
    <section className="category-section">
      {/* Header */}
      <div className="category-header">
        <h3>{category.name}</h3>
        <span className="category-total">
          ₹ {(category.categoryTotal ?? 0).toLocaleString()}
        </span>
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
