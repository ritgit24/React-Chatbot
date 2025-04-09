


// const Sessions = () => {
//     return(
//         <div><h1>Hi</h1></div>
//     )
// }
// export default Sessions;
import React, { useState, useEffect } from 'react';
import './SessionHistory.css';

const Sessions = ({ sessions, onSelectSession }) => {
  // State for search/filter functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter sessions based on search term
  const filteredSessions = sessions.filter(session =>
    session.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div><h1>Hi</h1>
    <div className="session-history-container">
      <div className="session-history-header">
        <h2>Chat History</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>
      </div>

      <div className="sessions-grid">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="session-card"
              onClick={() => onSelectSession(session.id)}
            >
              <div className="session-preview">
                {session.preview.length > 50
                  ? `${session.preview.substring(0, 50)}...`
                  : session.preview}
              </div>
              <div className="session-meta">
                <span className="session-date">
                  {new Date(session.createdAt).toLocaleDateString()}
                </span>
                <span className="session-messages">
                  {session.messageCount} messages
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-sessions">
            {searchTerm ? 'No matching sessions found' : 'No chat history yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;