import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories_Page = () => {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/categories",
        { page, limit, search },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedCategories = response?.data?.data?.categories || [];
      const totalCount = response?.data?.data?.totalCount || 0;
      setCategories(fetchedCategories);
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to page 1 on new search
  };

  const handleDelete = (id) => {
    const updatedCategories = categories.filter((category) => category.id !== id);
    setCategories(updatedCategories);
    // Optional: call API to delete
  };

  const handleToggle = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, isActive: !category.isActive } : category
    );
    setCategories(updatedCategories);
    // Optional: call API to update
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setNewName(category.name);
    setNewImage(null);
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!newName) {
      alert("Category name cannot be empty!");
      return;
    }

    const updatedCategories = categories.map((category) =>
      category.id === currentCategory.id
        ? {
            ...category,
            name: newName,
            image: newImage ? URL.createObjectURL(newImage) : category.image,
          }
        : category
    );

    setCategories(updatedCategories);
    setIsEditing(false);
    // Optional: call API to update
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">Categories List</h2>

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Category Name</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Actions</th>
            <th className="p-3 border">Active</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="p-3 border">{category.id}</td>
              <td className="p-3 border">{category.name}</td>
              <td className="p-3 border">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3 border">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
              <td className="p-3 border">
                <label className="flex items-center justify-center cursor-pointer">
                  <div
                    onClick={() => handleToggle(category.id)}
                    className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition ${
                      category.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                        category.isActive ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Popup Modal */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Category</h2>
            <label className="block mb-2">New Category Name:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <label className="block mb-2">New Category Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories_Page;
