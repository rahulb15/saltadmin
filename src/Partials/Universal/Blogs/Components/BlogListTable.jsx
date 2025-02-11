
// BlogListTable.jsx
import React, { useState } from 'react';
import { useGetBlogsQuery,useDeleteBlogMutation } from '../../../../services/blogAPI';
import DataTable from '../../../../Common/DataTable/DataTable';
import DataTableHeader from '../../../../Common/DataTableHeader/DataTableHeader';
import DataTableFooter from '../../../../Common/DataTableFooter/DataTableFooter';
import EditBlog from './EditBlog';
import Preview from './Preview';
import moment from 'moment';

const BlogListTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const { data: blogsData, isLoading, isError } = useGetBlogsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    sortField,
    sortOrder
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
  };

  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setShowPreview(true);
  };

  const handleDelete = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlog(selectedBlog._id).unwrap();
      setShowDeleteConfirm(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const columns = [
    {
      Header: 'Title',
      accessor: 'title',
      sortable: true,
      Cell: ({ row }) => (
        <div className="d-flex align-items-center">
          <img 
            src={row.original.thumbnail} 
            alt={row.original.title}
            className="rounded me-2"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <div>
            <div className="fw-bold">{row.original.title}</div>
            <small className="text-muted">{row.original.description}</small>
          </div>
        </div>
      )
    },
    {
      Header: 'Category',
      accessor: 'category.title',
      sortable: true,
      Cell: ({ value }) => (
        <span className="badge bg-primary">{value}</span>
      )
    },
    {
      Header: 'Source',
      accessor: 'source',
      sortable: true,
    },
    {
      Header: 'Date',
      accessor: 'date',
      sortable: true,
      Cell: ({ value }) => moment(value).format('DD MMM YYYY')
    },
    {
      Header: 'Actions',
      accessor: '_id',
      sortable: false,
      Cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button 
            type="button" 
            className="btn btn-sm btn-outline-primary"
            onClick={() => handlePreview(row.original)}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleEdit(row.original)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(row.original)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-danger">Error loading blogs</div>;
  }

  const tableData = blogsData?.data?.blogs || [];
  const totalItems = blogsData?.data?.pagination?.total || 0;
  const totalPages = blogsData?.data?.pagination?.pages || 0;

  return (
    <>
      <DataTableHeader 
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <DataTable 
        columns={columns}
        data={tableData}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <DataTableFooter 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {selectedBlog && (
        <EditBlog
          selectedBlog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}

      <Preview
        open={showPreview}
        handleClose={() => setShowPreview(false)}
        selectedBlog={selectedBlog}
        blogTitle="Blog Preview"
      />

      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showDeleteConfirm ? 'show' : ''}`} 
        id="deleteConfirmModal" 
        tabIndex="-1" 
        role="dialog"
        style={{ display: showDeleteConfirm ? 'block' : 'none' }}
        aria-hidden={!showDeleteConfirm}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowDeleteConfirm(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the blog "{selectedBlog?.title}"?</p>
              <p className="text-danger">This action cannot be undone.</p>
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
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div 
          className="modal-backdrop fade show" 
          onClick={() => setShowDeleteConfirm(false)}
        ></div>
      )}
    </>
  );
};

export default BlogListTable;