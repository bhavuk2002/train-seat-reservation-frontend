import { useEffect, useState } from "react";
import SeatMap from "../components/SeatMap";
import Login from "../components/Login";
import BookingDialog from "../components/BookingDialog";
import axios from "axios";
import Signup from "../components/Signup";
import baseURL from "../utils/config";

const User = () => {
  const [seats, setSeats] = useState([]); // Seat data
  const [userLoading, setUserLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [userId, setUserId] = useState(""); // User ID after login
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [seatCount, setSeatCount] = useState(); // Number of tickets to book
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(""); // State to track error messages
  const [availableSeat, setAvailableSeat] = useState();

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/seat/all`);
      setSeats(response.data.seats);
      setAvailableSeat(response.data.unreservedSeatsCount);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleSignup = async (formData) => {
    try {
      console.log("Signup Data:", formData);
      await axios.post(`${baseURL}/api/user/signup`, formData);
    } catch (error) {
      console.log(error);
    }
    // Perform signup logic
    setIsSignup(false);
  };

  const handleLogin = async (email, password) => {
    try {
      setUserLoading(true);
      const response = await axios.post(`${baseURL}/api/user/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUserId(response.data.user.username);
      setIsLoggedIn(true);
      setError("");
      setUserLoading(false);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "An unknown error occurred.");
      } else {
        setError("Unable to connect to the server. Please try again later.");
      }
      setUserLoading(false);
    }
  };

  const handleBookSeats = async () => {
    const seatingArea = document.getElementById("seating-area");

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/api/seat/reserve`,
        { seatCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      seatingArea.innerHTML = ""; // Clear previous content

      // Display all seats with their reservation status
      response.data.forEach((seat) => {
        const seatElement = document.createElement("div");
        seatElement.className =
          "border p-2 rounded bg-red-500 text-white font-semibold";
        seatElement.textContent = `${seat.row}-${seat.seat_number}`;
        // seatElement.style.color = seat.reserved_by ? "red" : "green"; // Booked = red, available = green
        seatingArea.appendChild(seatElement);
      });

      fetchSeats(); // Refresh seat data
      setSeatCount("");
      setErrorMessage("");

      setBookingLoading(false);
    } catch (error) {
      setSeatCount("");
      seatingArea.innerHTML = ""; // Clear previous content
      setBookingLoading(false);
      setErrorMessage(error.response?.data?.error || "Error booking seats.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      {/* Left: Seat Map */}
      <div className="flex flex-col flex-2 w-2/3 p-4  justify-center items-center">
        <h2 className=" text-xl font-bold mb-4">Train Seat Map</h2>
        <SeatMap seats={seats} availableSeat={availableSeat} />
      </div>
      <div className="border h-2/3 rounded mx-auto"></div>

      {/* Right: Login and Booking */}
      <div className="flex-1 w-1/3 p-4 flex flex-col justify-center items-center space-y-2">
        {!isLoggedIn ? (
          <div className="flex justify-center flex-col items-center space-y-2">
            {isSignup ? (
              <Signup onSignup={handleSignup} />
            ) : (
              <Login
                onLogin={handleLogin}
                error={error}
                loading={userLoading}
              />
            )}
            {/* <div>New here? Signup here</div> */}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 hover:underline mt-4"
            >
              {!isSignup ? (
                <div>New here? Signup here</div>
              ) : (
                <div>Back to Login</div>
              )}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg text-gray-400 font-semibold justify-center flex">
              Welcome {userId}
            </h2>

            <BookingDialog
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              onSubmit={handleBookSeats}
              // onClose={() => setShowDialog(false)}
              errorMessage={errorMessage}
              loading={bookingLoading}
            />
            <div
              id="seating-area"
              className="flex flex-row space-x-2 justify-center items-center pb-2"
            ></div>

            <div className="font-semibold text-gray-300 items-center flex justify-center">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                }}
              >
                Switch User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
