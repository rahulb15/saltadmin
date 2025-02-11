// Preview.jsx
import React from 'react';
import moment from 'moment';

const Preview = ({ open, handleClose, selectedBlog, blogTitle }) => {
  if (!open || !selectedBlog) return null;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      handleClose();
    }
  };

  return (
    <>
      <div 
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: 'block' }}
        onClick={handleBackdropClick}  // Add click handler here
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{blogTitle || 'Blog Preview'}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container py-4">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <h1 className="display-4 text-center mb-4">
                      {selectedBlog.title}
                    </h1>

                    <div className="d-flex justify-content-center text-muted mb-4">
                      <span>{moment(selectedBlog.date).format('MMMM D, YYYY')}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedBlog.category?.title}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedBlog.source}</span>
                    </div>

                    {selectedBlog.thumbnail && (
                      <div className="text-center mb-4">
                        <img
                          src={selectedBlog.thumbnail}
                          alt={selectedBlog.title}
                          className="img-fluid rounded shadow"
                          style={{ maxHeight: '400px', width: 'auto' }}
                        />
                      </div>
                    )}

                    <div className="lead text-muted mb-4">
                      {selectedBlog.description}
                    </div>

                    <div className="blog-content">
                      <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                    </div>

                    <div className="border-top mt-5 pt-4">
                      <div className="text-muted">
                        <small>Posted by: {selectedBlog.user?.name || 'Anonymous'}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add pointer-events-auto to the backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ pointerEvents: 'auto' }}
        onClick={handleClose}  // Add click handler to backdrop
      ></div>
    </>
  );
};

export default Preview;