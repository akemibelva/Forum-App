import React from 'react';

function CategoryList({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="category-section">
      <p className="category-section__title">Kategori Populer</p>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;