import React, { useState, useEffect } from 'react';

function LocalEventDiscovery() {
    const [location, setLocation] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get user's location
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    alert('Unable to fetch your location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    // Fetch nearby events
    useEffect(() => {
        if (location) {
            setLoading(true);
            fetch(`/api/events/discover?lat=${location.lat}&lng=${location.lng}`)
                .then((res) => res.json())
                .then((data) => {
                    setEvents(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching events:', err);
                    setLoading(false);
                });
        }
    }, [location]);

    return (
        <div>
            <h1>Local Event Discovery</h1>
            <button onClick={fetchLocation}>Find Events Nearby</button>
            {loading && <p>Loading events...</p>}
            {!loading && events.length > 0 && (
                <div>
                    <h2>Nearby Cultural Activities</h2>
                    {events.map((event) => (
                        <div key={event._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
            {!loading && events.length === 0 && location && <p>No events found nearby.</p>}
        </div>
    );
}

export default LocalEventDiscovery;
