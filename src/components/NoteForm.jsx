import React, { useState, useRef, useEffect } from 'react';

function NoteForm({ onAddNote, isExpanded, setIsExpanded }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target) && isExpanded) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, title, text]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    if (title.trim() || text.trim()) {
      const success = onAddNote(title, text);
      if (success) {
        setTitle('');
        setText('');
        setIsExpanded(false);
      }
    } else {
      setIsExpanded(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || text.trim()) {
      const success = onAddNote(title, text);
      if (success) {
        setTitle('');
        setText('');
        // Keep form expanded to add more notes
      }
    }
  };

  if (!isExpanded) {
    return (
      <div className="form-container" ref={formRef}>
        <div className="collapsed-form" onClick={handleExpand}>
          <span className="placeholder-text">Take a note...</span>
          <div className="form-icons">
            <div className="tooltip">
              <span className="material-symbols-outlined hover">check_box</span>
              <span className="tooltip-text">New List</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">brush</span>
              <span className="tooltip-text">New Drawing</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">image</span>
              <span className="tooltip-text">New Image</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container active-form" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="note-title" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea 
          className="note-textarea" 
          placeholder="Take a note..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
        />
        <div className="form-actions">
          <div className="icons">
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">add_alert</span>
              <span className="tooltip-text">Remind me</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">person_add</span>
              <span className="tooltip-text">Collaborator</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">palette</span>
              <span className="tooltip-text">Change Color</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">image</span>
              <span className="tooltip-text">Add Image</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">archive</span>
              <span className="tooltip-text">Archive</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">more_vert</span>
              <span className="tooltip-text">More</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">undo</span>
              <span className="tooltip-text">Undo</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">redo</span>
              <span className="tooltip-text">Redo</span>
            </div>
          </div>
          <button type="button" className="close-btn" onClick={handleClose}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;