import React, { useState } from 'react';

function Modal({ note, onClose, onSave, onChangeColor, onToggleHighlight }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorPalette = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475', 
    '#ccff90', '#a7ffeb', '#cbf0f8', '#d7aefb', 
    '#fdcfe8', '#e6c9a8', '#e8eaed'
  ];

  const handleSave = () => {
    onSave({ ...note, title, text });
  };

  const handleColorChange = (color) => {
    onChangeColor(note.id, color);
  };

  const handleHighlight = () => {
    onToggleHighlight(note.id);
    onSave({ ...note, title, text, isHighlighted: !note.isHighlighted });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-container active-form">
          <form>
            <input 
              type="text" 
              className="note-title" 
              placeholder="Title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
              className="note-textarea" 
              placeholder="Take a note..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="5"
            />
            <div className="form-actions">
              <div className="icons">
                <div className="tooltip" onClick={handleHighlight}>
                  <span className="material-symbols-outlined hover small-icon">
                    {note.isHighlighted ? 'star' : 'star_border'}
                  </span>
                  <span className="tooltip-text">Highlight</span>
                </div>
                <div className="tooltip color-picker-container">
                  <span 
                    className="material-symbols-outlined hover small-icon"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    palette
                  </span>
                  <span className="tooltip-text">Change Color</span>
                  {showColorPicker && (
                    <div className="color-picker-popup modal-color-picker">
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
                  <span className="material-symbols-outlined hover small-icon">archive</span>
                  <span className="tooltip-text">Archive</span>
                </div>
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon">more_vert</span>
                  <span className="tooltip-text">More</span>
                </div>
              </div>
              <div>
                <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
                <button type="button" className="close-btn" onClick={handleSave}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;