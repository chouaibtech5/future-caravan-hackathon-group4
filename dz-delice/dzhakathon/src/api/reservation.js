// src/api/reservation.js
export const createReservation = async (reservationData) => {
    try {
      // inject hardcoded userId
      const payload = {
        ...reservationData,
        userId: "68cdbc8b19ab2023d3c0a363",
      };
  
      console.log("📤 Sending reservation data:", payload);
  
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log("✅ Reservation response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to create reservation");
      }
  
      return data;
    } catch (error) {
      console.error("❌ Error in createReservation:", error);
      return { success: false, message: error.message };
    }
  };