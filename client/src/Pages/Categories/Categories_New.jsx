import React, { useState, useRef } from "react";

const Categories_New = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

    setCategoryName("");
    setCategoryImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    alert("Category added successfully!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 max-w-lg w-full bg-white shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-500">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category Image:</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Category Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categories_New;
