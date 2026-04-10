import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import Modal from './components/Modal';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [view, setView] = useState('notes');
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Load notes and theme from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('google-keep-notes');
    const savedTheme = localStorage.getItem('google-keep-theme');
    
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Add some sample notes with different colors
      const sampleNotes = [
        {
          id: uuidv4(),
          title: 'Welcome to Google Keep!',
          text: '✨ Click on "Take a note..." to create your first note. Try the dark mode toggle in the navbar!',
          isArchived: false,
          isTrashed: false,
          createdAt: new Date().toISOString(),
          color: '#fff475',
          isHighlighted: false
        },
        {
          id: uuidv4(),
          title: 'Shopping List 🛒',
          text: '• Milk\n• Eggs\n• Bread\n• Butter\n• Coffee',
          isArchived: false,
          isTrashed: false,
          createdAt: new Date().toISOString(),
          color: '#ccff90',
          isHighlighted: true
        },
        {
          id: uuidv4(),
          title: 'Important Meeting',
          text: 'Team sync at 3 PM tomorrow. Don\'t forget to bring the project report!',
          isArchived: false,
          isTrashed: false,
          createdAt: new Date().toISOString(),
          color: '#f28b82',
          isHighlighted: true
        }
      ];
      setNotes(sampleNotes);
      localStorage.setItem('google-keep-notes', JSON.stringify(sampleNotes));
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save notes and theme to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('google-keep-notes', JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('google-keep-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addNote = (title, text, color = '#ffffff') => {
    if (title.trim() || text.trim()) {
      const newNote = {
        id: uuidv4(),
        title: title.trim(),
        text: text.trim(),
        isArchived: false,
        isTrashed: false,
        createdAt: new Date().toISOString(),
        color: color,
        isHighlighted: false
      };
      setNotes([newNote, ...notes]);
      return true;
    }
    return false;
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const deleteNote = (noteId) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, isTrashed: true, isArchived: false } : note
    ));
  };

  const archiveNote = (noteId) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, isArchived: !note.isArchived, isTrashed: false } : note
    ));
  };

  const restoreNote = (noteId) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, isTrashed: false, isArchived: false } : note
    ));
  };

  const permanentlyDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const toggleHighlight = (noteId) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, isHighlighted: !note.isHighlighted } : note
    ));
  };

  const changeNoteColor = (noteId, color) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, color: color } : note
    ));
  };

  const openModal = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingNote(null);
    setIsModalOpen(false);
  };

  const saveEditedNote = (updatedNote) => {
    updateNote(updatedNote);
    closeModal();
  };

  const getFilteredNotes = () => {
    let filteredNotes = notes;
    
    if (view === 'archive') {
      filteredNotes = filteredNotes.filter(note => note.isArchived && !note.isTrashed);
    } else if (view === 'trash') {
      filteredNotes = filteredNotes.filter(note => note.isTrashed);
    } else {
      filteredNotes = filteredNotes.filter(note => !note.isArchived && !note.isTrashed);
    }
    
    if (searchTerm) {
      filteredNotes = filteredNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredNotes;
  };

  const refreshNotes = () => {
    setNotes([...notes]);
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={refreshNotes}
        setView={setView}
        view={view}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Sidebar setView={setView} view={view} />
      <main className="main-content">
        <NoteForm 
          onAddNote={addNote}
          isExpanded={isFormExpanded}
          setIsExpanded={setIsFormExpanded}
        />
        <NotesList 
          notes={getFilteredNotes()}
          onDeleteNote={deleteNote}
          onArchiveNote={archiveNote}
          onRestoreNote={restoreNote}
          onPermanentDelete={permanentlyDeleteNote}
          onEditNote={openModal}
          onToggleHighlight={toggleHighlight}
          onChangeColor={changeNoteColor}
          view={view}
        />
      </main>
      {isModalOpen && (
        <Modal 
          note={editingNote}
          onClose={closeModal}
          onSave={saveEditedNote}
          onChangeColor={changeNoteColor}
          onToggleHighlight={toggleHighlight}
        />
      )}
    </div>
  );
}

export default App;