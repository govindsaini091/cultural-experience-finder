import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IncreasedEngagement() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);

  // Fetch events and display them
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Save an event to the user's list of saved events
  const handleSaveEvent = (event) => {
    setSavedEvents((prevSaved) => {
      if (!prevSaved.some((savedEvent) => savedEvent._id === event._id)) {
        return [...prevSaved, event]; // Add the event to the saved list
      }
      return prevSaved; // Event already saved, do nothing
    });
  };

  return (
    <div>
      <h3>Boost Your Cultural Engagement</h3>
      <p>Discover and RSVP to the events that interest you the most!</p>

      <h4>Upcoming Cultural Events</h4>
      {events.length === 0 ? (
        <p>No events found. Check back later!</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <strong>{event.name}</strong>
              <br />
              {event.description}
              <br />
              Date: {new Date(event.date).toLocaleDateString()}
              <br />
              <button onClick={() => handleSaveEvent(event)}>
                Save to My Events
              </button>
            </li>
          ))}
        </ul>
      )}

      <h4>Your Saved Events</h4>
      {savedEvents.length === 0 ? (
        <p>You haven't saved any events yet.</p>
      ) : (
        <ul>
          {savedEvents.map((event) => (
            <li key={event._id}>
              <strong>{event.name}</strong>
              <br />
              {event.description}
              <br />
              Date: {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncreasedEngagement;
