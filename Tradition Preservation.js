import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TraditionPreservation() {
  const [events, setEvents] = useState([]);
  const [traditionalEvents, setTraditionalEvents] = useState([]);

  // Fetch events and filter for traditional/cultural events
  useEffect(() => {
    // Simulate fetching events from an API or backend
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
        filterTraditionalEvents(response.data); // Filter for traditional/cultural events
      })
      .catch((error) => console.error(error));
  }, []);

  // Filter events that focus on tradition and culture
  const filterTraditionalEvents = (events) => {
    const traditional = events.filter((event) =>
      event.category.toLowerCase().includes('traditional') ||
      event.category.toLowerCase().includes('heritage') ||
      event.category.toLowerCase().includes('cultural') // Match cultural or traditional keywords
    );
    setTraditionalEvents(traditional);
  };

  return (
    <div>
      <h3>Tradition Preservation: Local Customs and Traditions</h3>
      {traditionalEvents.length === 0 ? (
        <p>No events promoting local traditions at the moment. Check back soon!</p>
      ) : (
        <ul>
          {traditionalEvents.map((event) => (
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

export default TraditionPreservation;
