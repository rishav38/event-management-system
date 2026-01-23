import { useState } from "react";
import { guests as mockGuests } from "../data/guest.mock";

import GuestSummary from "../components/guests/GuestSummary";
import GuestFilters from "../components/guests/GuestFilters";
import GuestTable from "../components/guests/GuestTable";
import "../styles/guests.css";
import AddGuestModal from "../components/guests/AddGuestModal";
import { fetchGuestsApi, addGuestApi } from "../services/guest.api";
import { useEffect } from "react";

const Guests = () => {
  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [side, setSide] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const res = await fetchGuestsApi();
        const guestData = res.data?.data || [];
        // Ensure each guest has an events array
        const guestsWithEvents = guestData.map(guest => ({
          ...guest,
          events: guest.events || []
        }));
        setGuests(guestsWithEvents);
      } catch (err) {
        console.error("Failed to load guests:", err);
        // Fallback to mock data if API fails
        setGuests(mockGuests);
      } finally {
        setLoading(false);
      }
    };
    loadGuests();
  }, []);

  const addGuest = async (guest) => {
    try {
      console.log("Adding guest:", guest); // Debug log
      const res = await addGuestApi(guest);
      console.log("API response:", res.data); // Debug log
      const newGuest = res.data?.data || guest;
      // Ensure the new guest has an events array
      newGuest.events = newGuest.events || [];
      console.log("Final guest data:", newGuest); // Debug log
      setGuests(prev => [...prev, newGuest]);
    } catch (err) {
      console.error("Failed to add guest:", err);
      alert("Failed to add guest. Please try again.");
    }
  };


  return (
    <div className="guest-page">
      <h1>Guest List</h1>

      {loading ? (
        <div className="loading-state">
          <p>Loading guests...</p>
        </div>
      ) : (
        <>
          <GuestSummary guests={guests} />

          <GuestFilters
            filter={filter}
            setFilter={setFilter}
            side={side}
            setSide={setSide}
          />

          <GuestTable
            guests={guests}
            filter={filter}
            side={side}
            setGuests={setGuests}
          />
        </>
      )}

      <button
        className="add-guest-btn"
        onClick={() => setShowModal(true)}
      >
        + Add Guest
      </button>

      {showModal && (
        <AddGuestModal
          onClose={() => setShowModal(false)}
          onAdd={addGuest}
        />
      )}
    </div>
  );
};

export default Guests;
