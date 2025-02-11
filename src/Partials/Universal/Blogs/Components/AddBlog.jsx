// AddBlog.jsx
import React, { useState } from 'react';
import { useCreateBlogMutation } from '../../../../services/blogAPI';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const AddBlog = () => {
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    slug: '',
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      if (!formData.title || !editorState.getCurrentContent().hasText()) {
        setError('Title and content are required');
        return;
      }

      if (!image) {
        setError('Featured image is required');
        return;
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('content', stateToHTML(editorState.getCurrentContent()));
      formDataToSubmit.append('thumbnail', image);
      formDataToSubmit.append('slug', formData.slug);
      formDataToSubmit.append('category', formData.category);

      await createBlog(formDataToSubmit).unwrap();
      setSuccess('Blog created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        slug: '',
      });
      setEditorState(EditorState.createEmpty());
      setImage(null);
      setImagePreview(null);

      // Close modal after success
      setTimeout(() => {
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
        if (closeButton) {
          closeButton.click();
        }
      }, 1500);

    } catch (err) {
      setError(err.data?.message || 'Failed to create blog');
    }
  };

  return (
    <div className="modal fade" id="add-blog" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Blog</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Slug <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Featured Image <span className="text-danger">*</span></label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageUpload}
                  accept="image/*"
                  required
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
                <label className="form-label">Content <span className="text-danger">*</span></label>
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
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;