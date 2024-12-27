import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonalizedSuggestions() {
  const [events, setEvents] = useState([]);
  const [interests, setInterests] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Define event categories (user interests)
  const eventCategories = [
    'Music',
    'Dance',
    'Food',
    'Art',
    'Theater',
    'Festival',
  ];

  // Fetch events and filter based on selected interests
  useEffect(() => {
    // Simulate fetching events from an API or backend
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
        filterEventsByInterests(response.data); // Filter events based on selected interests
      })
      .catch((error) => console.error(error));
  }, []);

  // Filter events based on selected interests
  const filterEventsByInterests = (events) => {
    if (interests.length === 0) {
      setFilteredEvents(events); // No filter, show all events
    } else {
      const filtered = events.filter((event) =>
        interests.some((interest) => event.category.includes(interest)) // Match event category with selected interest
      );
      setFilteredEvents(filtered);
    }
  };

  // Handle changes in selected interests (checkboxes)
  const handleInterestChange = (interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter((item) => item !== interest); // Remove interest if already selected
      } else {
        return [...prevInterests, interest]; // Add interest to selection
      }
    });
  };

  return (
    <div>
      <h3>Select your interests</h3>
      {eventCategories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            checked={interests.includes(category)}
            onChange={() => handleInterestChange(category)}
          />
          {category}
        </label>
      ))}

      <h3>Suggested Events</h3>
      {filteredEvents.length === 0 ? (
        <p>No events match your interests. Try selecting different categories!</p>
      ) : (
        <ul>
          {filteredEvents.map((event) => (
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

export default PersonalizedSuggestions;
