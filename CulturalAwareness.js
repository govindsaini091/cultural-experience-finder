import React, { useState, useEffect } from 'react';

function CulturalAwareness() {
    const [region, setRegion] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch heritage-related events for the given region
    const fetchHeritageEvents = () => {
        if (!region.trim()) {
            alert('Please enter a region to search.');
            return;
        }
        setLoading(true);
        fetch(`/api/events/heritage?region=${region}`)
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching heritage events:', err);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Cultural Awareness - Regional Heritage</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a region (e.g., Kyoto)"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
                <button onClick={fetchHeritageEvents}>Discover Heritage</button>
            </div>
            {loading && <p>Loading heritage details...</p>}
            {!loading && events.length > 0 && (
                <div>
                    <h2>Heritage Events in {region}</h2>
                    {events.map((event) => (
                        <div key={event._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Heritage Details:</strong> {event.heritageDetails}</p>
                        </div>
                    ))}
                </div>
            )}
            {!loading && events.length === 0 && region && <p>No heritage details found for this region.</p>}
        </div>
    );
}

export default CulturalAwareness;
