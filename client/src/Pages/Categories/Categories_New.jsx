import React, { useState, useRef } from "react";

const Categories_New = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      alert("Please enter category name and select an image!");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      image: URL.createObjectURL(categoryImage),
      isActive: true,
    };

    const existingCategories = JSON.parse(localStorage.getItem("categories")) || [];
    existingCategories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(existingCategories));

    // Clear form fields
    setCategoryName("");
    setCategoryImage(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input

    alert("Category added successfully!");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Category Image:</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setCategoryImage(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default Categories_New;
