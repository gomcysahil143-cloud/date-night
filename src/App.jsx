import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function App() {
  const [date, setDate] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [customActivity, setCustomActivity] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dateInputRef = useRef(null);

  const options = [
    "Coffee date",
    "Dinner",
    "Movie night",
    "Long drive",
    "Walk in the park",
    "Dessert",
    "Something spontaneous",
    "Other",
  ];

  const toggleOption = (option) => {
    setSelectedPlans([option]);
    if (option !== "Other") setCustomActivity("");
    setDropdownOpen(false);
  };

  const selectedActivity =
    selectedPlans[0] === "Other"
      ? customActivity.trim()
      : selectedPlans[0] || "";

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    try {
      if (typeof input.showPicker === "function") input.showPicker();
      else {
        input.focus();
        input.click();
      }
    } catch {
      input.focus();
      input.click();
    }
  };

  const handleSubmit = async () => {
    if (!date) {
      alert("Please choose a date first 💕");
      return;
    }
    if (!selectedPlans.length) {
      alert("Please choose what you’d like to do 💕");
      return;
    }
    if (selectedPlans[0] === "Other" && !customActivity.trim()) {
      alert("Please enter the activity you’d like to do 💕");
      return;
    }

    try {
      await emailjs.send(
        "service_o3mksn9",
        "template_8k4zq0w",
        { date, plans: selectedActivity },
        "X1ZuAutjtNdG2QsdW"
      );
      setShowPopup(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong while sending your choice 💔");
    }
  };

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const displayDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="page">
      <div className="floating-heart heart1">💖</div>
      <div className="floating-heart heart2">💕</div>
      <div className="floating-heart heart3">💘</div>

      <div className="card">
        <div className="heart-icon">💗</div>
        <h1>Will You Go Out With Me?</h1>
        <p>
          Pick a day and choose what you’d like to do.
          <br />
          I’ll make it cute, special, and all about you.
        </p>

        <div className="section">
          <h3>Choose a date</h3>

          <div className="date-input-wrapper">
            <div
              className={`date-display ${!date ? "date-placeholder" : ""}`}
              aria-hidden="true"
            >
              {displayDate || "dd-mm-yyyy"}
            </div>

            <input
              ref={dateInputRef}
              id="date-picker"
              className="hidden-date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Choose a date"
            />

            <button
              type="button"
              className="calendar-button"
              aria-label="Open calendar"
              onClick={openDatePicker}
            >
              <svg
                className="calendar-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="3" y="4.5" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M7 2.5V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M17 2.5V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M3 9H21" stroke="currentColor" strokeWidth="1.8" />
                <path d="M7 13H7.01M12 13H12.01M17 13H17.01M7 17H7.01M12 17H12.01M17 17H17.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="section">
          <h3>What would you like to do?</h3>

          <div className="custom-dropdown">
            <button
              type="button"
              className={`dropdown-button ${dropdownOpen ? "dropdown-active" : ""}`}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <span className={selectedPlans.length === 0 ? "placeholder" : "selected-count"}>
                {selectedPlans.length > 0
                  ? selectedPlans[0] === "Other"
                    ? customActivity.trim() || "Other"
                    : selectedPlans[0]
                  : "Choose an activity"}
              </span>
              <span className={`arrow ${dropdownOpen ? "open" : ""}`}>▾</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                {options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`dropdown-option ${
                      selectedPlans.includes(option) ? "selected" : ""
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    <span>{option}</span>
                    {selectedPlans.includes(option) && <span className="checkmark">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedPlans[0] === "Other" && (
            <input
              type="text"
              className="custom-activity-input"
              placeholder="Enter what you'd like to do"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              autoFocus
            />
          )}
        </div>

        <button className="btn" type="button" onClick={handleSubmit}>
          Submit My Choice
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="popup-heart">💞</div>
            <h2>It's a date!</h2>
            <p className="confirmation-date">{formattedDate}</p>
            <p className="confirmation-plans">{selectedActivity}</p>
            <p className="confirmation-message">
              <em>I've got your choices. See you soon ❤️</em>
            </p>
            <button type="button" className="close-btn" onClick={() => setShowPopup(false)}>
              Aww, cute!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
