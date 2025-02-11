// Updated EventCategoryList.jsx
import React, { useState } from 'react';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../../../services/eventAPI';
import AddCategory from './Components/AddCategory';
import EditCategory from './Components/EditCategory';
import CategoryTable from './Components/CategoryTable';

const EventCategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // New state for add modal
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleEdit = (category) => {
    setSelectedCategory(category);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategory(selectedCategory._id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger">Error loading categories</div>;
  }

  return (
    <div className="px-xl-5 px-lg-4 px-3 py-3 page-body">
      <div className="row g-3">
        <div className="col-sm-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h3 className="fw-bold mb-0">Event Categories</h3>
            <div className="col-auto d-flex w-sm-100">
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setShowAddModal(true)} // Changed to use state
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <CategoryTable
                categories={categories?.data || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategory onClose={() => setShowAddModal(false)} />
      )}
      
      {selectedCategory && (
        <EditCategory
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <div
        className={`modal fade ${showDeleteConfirm ? 'show' : ''}`}
        style={{ display: showDeleteConfirm ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteConfirm(false)}
              />
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete "{selectedCategory?.name}"?</p>
              <p className="text-danger">
                This will also delete all event types in this category.
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirm && <div className="modal-backdrop fade show" />}
    </div>
  );
};

export default EventCategoryList;