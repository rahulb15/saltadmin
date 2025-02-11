// EditBlog.jsx
import React, { useState, useEffect } from 'react';
import { useUpdateBlogMutation } from '../../../../services/blogAPI';
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const EditBlog = ({ selectedBlog, onClose }) => {
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    slug: '',
  });
  const [editorState, setEditorState] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedBlog) {
      setFormData({
        title: selectedBlog.title || '',
        description: selectedBlog.description || '',
        category: selectedBlog.category?.title || '',
        slug: selectedBlog.slug || '',
      });
      setImagePreview(selectedBlog.thumbnail || '');

      if (selectedBlog.content) {
        try {
          const sanitizedHtml = DOMPurify.sanitize(selectedBlog.content);
          const blocksFromHTML = convertFromHTML(sanitizedHtml);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        } catch (error) {
          console.error('Error setting up editor state:', error);
          setEditorState(EditorState.createEmpty());
        }
      }
    }
  }, [selectedBlog]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


    const handlePastedText = (text) => {
      try {
        // Create a basic HTML structure from the pasted text
        const html = `<div>${text.replace(/\n/g, '<br/>')}</div>`;
        
        // Convert HTML to ContentBlocks
        const blocksFromHTML = convertFromHTML(html);
        
        // Create new content state
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        
        // Create new editor state
        const newEditorState = EditorState.createWithContent(state);
        setEditorState(newEditorState);
        
        // Prevent default paste behavior
        return true;
      } catch (error) {
        console.error('Error handling pasted content:', error);
        return false;
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('content', stateToHTML(editorState.getCurrentContent()));
      if (image) {
        formDataToSubmit.append('thumbnail', image);
      }
      formDataToSubmit.append('slug', formData.slug);
      formDataToSubmit.append('category', formData.category);

      await updateBlog({ id: selectedBlog._id, formData: formDataToSubmit }).unwrap();
      setSuccess('Blog updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.data?.message || 'Failed to update blog');
    }
  };

  return (
    <div className="modal fade show" 
      id="editBlogModal" 
      tabIndex="-1" 
      role="dialog"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Blog</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger">{error}</div>
            )}
            {success && (
              <div className="alert alert-success">{success}</div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Slug</label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Featured Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2"
                    style={{ maxWidth: '200px' }}
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Content</label>
                  <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        handlePastedText={handlePastedText}
                        editorClassName="form-control"
                        editorStyle={{ minHeight: '300px', padding: '10px' }}
                        toolbar={{
                          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history'],
                          inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                          },
                          blockType: {
                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
                          },
                          list: {
                            options: ['unordered', 'ordered'],
                          },
                          textAlign: {
                            options: ['left', 'center', 'right', 'justify'],
                          },
                        }}
                      />
              </div>

              <div className="modal-footer px-0 pb-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
