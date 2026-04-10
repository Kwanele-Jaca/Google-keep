import React from 'react';
import Note from './Note';

function NotesList({ notes, onDeleteNote, onArchiveNote, onRestoreNote, onPermanentDelete, onEditNote, onToggleHighlight, onChangeColor, view }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <span className="material-symbols-outlined">note_stack</span>
        <p>No notes found</p>
        <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Click "Take a note..." to create your first note</p>
      </div>
    );
  }

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={onDeleteNote}
          onArchive={onArchiveNote}
          onRestore={onRestoreNote}
          onEdit={onEditNote}
          onPermanentDelete={onPermanentDelete}
          onToggleHighlight={onToggleHighlight}
          onChangeColor={onChangeColor}
          view={view}
        />
      ))}
    </div>
  );
}

export default NotesList;