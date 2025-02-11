// src/pages/EventCategories/Components/CategoryTable.jsx
import React from 'react';
import moment from 'moment';
import EventTypeList from './EventTypeList';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
  const [expandedCategory, setExpandedCategory] = React.useState(null);

  return (
    <div>
      {categories.map((category) => (
        <div key={category._id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-center">
                {category.banner && (
                  <img
                    src={category.banner}
                    alt={category.name}
                    className="rounded me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                )}
                <div>
                  <h5 className="mb-1">{category.name}</h5>
                  <p className="text-muted mb-1">{category.description}</p>
                  <small className="text-muted">
                    Created: {moment(category.createdAt).format('DD MMM YYYY')} | 
                    Event Types: {category.eventTypes?.length || 0}
                  </small>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setExpandedCategory(expandedCategory === category._id ? null : category._id)}
                >
                  <i className={`bi bi-${expandedCategory === category._id ? 'dash' : 'plus'}-lg me-1`}></i>
                  {expandedCategory === category._id ? 'Hide Events' : 'Show Events'}
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onEdit(category)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(category)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>

            {/* Event Types List */}
            {expandedCategory === category._id && (
              <div className="mt-4">
                <EventTypeList category={category} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryTable;