import { useState, useEffect } from "react";
import { fetchEventsApi } from "../../services/eventApi";

const AddGuestModal = ({ onClose, onAdd }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchEventsApi();
        const data = res.data?.events || res.data?.data || res.data || [];
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const selectedEvent = form.event.value;

    console.log("Selected event:", selectedEvent); // Debug log

    const newGuest = {
      name: form.name.value,
      phone: form.phone.value,
      side: form.side.value,
      events: selectedEvent ? [selectedEvent] : [], // Ensure it's an array
      rsvp: "PENDING",
    };

    console.log("New guest data:", newGuest); // Debug log
    onAdd(newGuest);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Guest</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Guest Name" required />
          <input name="phone" placeholder="Phone Number" required />

          <select name="side">
            <option value="BRIDE">Bride Side</option>
            <option value="GROOM">Groom Side</option>
          </select>

          <select name="event" required>
            <option value="">Select Event</option>
            {loading ? (
              <option disabled>Loading events...</option>
            ) : events.length > 0 ? (
              events.map((event) => (
                <option key={event._id} value={event.title}>
                  {event.title} - {new Date(event.startTime).toLocaleDateString()}
                </option>
              ))
            ) : (
              <option disabled>No events available</option>
            )}
          </select>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuestModal;
