import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

function Note({ note, onDelete, onArchive, onRestore, onEdit, onPermanentDelete, onToggleHighlight, onChangeColor, view }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClick = () => {
    onEdit(note);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    onArchive(note.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (view === 'trash') {
      onPermanentDelete(note.id);
    } else {
      onDelete(note.id);
    }
  };

  const handleRestore = (e) => {
    e.stopPropagation();
    onRestore(note.id);
  };

  const handleHighlight = (e) => {
    e.stopPropagation();
    onToggleHighlight(note.id);
  };

  const handleColorClick = (e) => {
    e.stopPropagation();
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    onChangeColor(note.id, color);
  };

  const colorPalette = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475', 
    '#ccff90', '#a7ffeb', '#cbf0f8', '#d7aefb', 
    '#fdcfe8', '#e6c9a8', '#e8eaed'
  ];

  return (
    <div 
      className={`note ${note.isHighlighted ? 'highlighted' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowColorPicker(false);
      }}
      style={{ backgroundColor: note.color || '#ffffff' }}
    >
      {view === 'trash' && (
        <span className="material-symbols-outlined check-circle">delete</span>
      )}
      {note.isHighlighted && (
        <span className="material-symbols-outlined highlight-star">star</span>
      )}
      {note.title && <div className="title">{note.title}</div>}
      <div className="text">{note.text}</div>
      <div className={`note-footer ${isHovered ? 'visible' : ''}`}>
        <div className="tooltip" onClick={handleHighlight}>
          <span className="material-symbols-outlined hover small-icon">
            {note.isHighlighted ? 'star' : 'star_border'}
          </span>
          <span className="tooltip-text">
            {note.isHighlighted ? 'Remove Highlight' : 'Highlight'}
          </span>
        </div>
        <div className="tooltip" onClick={handleArchive}>
          <span className="material-symbols-outlined hover small-icon">
            {view === 'archive' ? 'unarchive' : 'archive'}
          </span>
          <span className="tooltip-text">{view === 'archive' ? 'Unarchive' : 'Archive'}</span>
        </div>
        {view === 'trash' ? (
          <div className="tooltip" onClick={handleRestore}>
            <span className="material-symbols-outlined hover small-icon">restore_from_trash</span>
            <span className="tooltip-text">Restore</span>
          </div>
        ) : (
          <div className="tooltip" onClick={handleDelete}>
            <span className="material-symbols-outlined hover small-icon">delete</span>
            <span className="tooltip-text">Delete</span>
          </div>
        )}
        <div className="tooltip color-picker-container">
          <span className="material-symbols-outlined hover small-icon" onClick={handleColorClick}>
            palette
          </span>
          <span className="tooltip-text">Change Color</span>
          {showColorPicker && (
            <div className="color-picker-popup" onClick={(e) => e.stopPropagation()}>
              <div className="color-palette">
                {colorPalette.map((color) => (
                  <div
                    key={color}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">add_alert</span>
          <span className="tooltip-text">Remind me</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">person_add</span>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">more_vert</span>
          <span className="tooltip-text">More</span>
        </div>
      </div>
    </div>
  );
}

export default Note;