const CategoryCard = ({ category }) => {
  return (
    <div className="category-row">
      <div className="category-left">
        <h3>{category.name}</h3>
      </div>

      <div className="category-right">
        ₹{category.spentAmount.toLocaleString()} / ₹
        {category.allocatedAmount.toLocaleString()}
      </div>
    </div>
  );
};

export default CategoryCard;
