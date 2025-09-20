import { useState } from "react";
import LogoDzDelice from "../icons/LogoDzDelice.jsx";
import { createReservation } from "../api/reservations.js";

export default function ReservationModal({ isOpen, onClose }) {
  console.log("ReservationModal rendered, isOpen:", isOpen);

  const [formData, setFormData] = useState({
    date: "",
    timeFrom: "", // Changed from arrivalTime
    timeTo: "",   // Changed from departureTime
    guests: 1,
    purpose: "dinner",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare reservation data exactly as backend expects
    const reservationData = {
      tableNumber: 1,
      date: formData.date,
      timeFrom: formData.timeFrom, // Correct field name
      timeTo: formData.timeTo,     // Correct field name
      purpose: formData.purpose,
      numberOfPeople: parseInt(formData.guests),
    };

    try {
      const result = await createReservation(reservationData);
      
      if (result._id) {
        console.log("Reservation submitted successfully:", result);
        alert("Reservation submitted successfully!");
        onClose();
      } else {
        alert(`Reservation failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error placing reservation:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={isSubmitting ? undefined : onClose}
      ></div>

      <div className="relative bg-[#FFF8F0] backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto border border-white/20 scrollbar-hide">
        <div className="relative px-8 py-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="w-16 h-16 bg-[#F67F20]/10 rounded-2xl flex items-center justify-center">
              <LogoDzDelice size={40} />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold leading-none">
                <span className="text-black">Dz</span>
                <span className="text-[#F67F20]">Délice</span>
              </h2>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Reserve Your Table</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-[#F67F20] outline-none transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Arrival Time *
                </label>
                <input
                  type="time"
                  name="timeFrom" // Changed to match backend
                  value={formData.timeFrom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-[#F67F20] outline-none transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Departure Time *
                </label>
                <input
                  type="time"
                  name="timeTo" // Changed to match backend
                  value={formData.timeTo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-[#F67F20] outline-none transition-all duration-200"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Number of Guests *</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-[#F67F20] outline-none transition-all duration-200"
                disabled={isSubmitting}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Purpose *</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white rounded-xl focus:ring-2 focus:ring-[#F67F20] outline-none transition-all duration-200"
                disabled={isSubmitting}
              >
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
                <option value="breakfast">Breakfast</option>
                <option value="special_event">Special Event</option>
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#F67F20]/10 to-[#FF6B35]/10 rounded-2xl p-6 border border-orange-200/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#F67F20] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800" style={{ fontFamily: "Playfair Display" }}>
                Restaurant Information
              </h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#F67F20]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#F67F20]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Bab Ezzouar, Algiers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#F67F20]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#F67F20]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">023 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[#F67F20]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#F67F20]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">08:00 - 20:00</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white border-2 border-[#F67F20] text-gray-700 rounded-xl hover:bg-white hover:border-[#F67F20] transition-all duration-200 font-semibold"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#F67F20] to-[#FF6B35] text-white rounded-xl hover:from-[#E55A2B] hover:to-[#F67F20] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Reserve Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}