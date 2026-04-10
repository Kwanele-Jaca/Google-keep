import React from 'react';

function Sidebar({ setView, view }) {
  const sidebarItems = [
    { icon: 'lightbulb', label: 'Notes', view: 'notes' },
    { icon: 'notifications', label: 'Reminders', view: 'reminders' },
    { icon: 'edit', label: 'Edit Labels', view: 'edit-labels' },
    { icon: 'archive', label: 'Archive', view: 'archive' },
    { icon: 'delete', label: 'Trash', view: 'trash' }
  ];

  return (
    <div className="sidebar">
      {sidebarItems.map((item) => (
        <div 
          key={item.view}
          className={`sidebar-item ${view === item.view ? 'active' : ''}`}
          onClick={() => setView(item.view)}
        >
          <span className="material-symbols-outlined hover">
            {item.icon}
          </span>
          <span className="sidebar-text">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;