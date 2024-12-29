import { useState } from "react";
import axios from "axios";
import Login from "../components/Login";
import baseURL from "../utils/config";

const Admin = () => {
  const [error, setError] = useState(""); // State to track error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [userLogin, setUserLogin] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleLogin = async (email, password) => {
    try {
      setUserLogin(true);
      const response = await axios.post(`${baseURL}/api/users/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setError("");
      setUserLogin(false);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "An unknown error occurred.");
      } else {
        setError("Unable to connect to the server. Please try again later.");
      }
      setUserLogin(false);
    }
  };

  const handleReset = async () => {
    try {
      setResetLoading(true);
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) Error("No token provided.");
      await axios.post(
        `${baseURL}/api/seat/initialisation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResetLoading(false);
      setResetError("Successfully Initialized / Reset.");
    } catch (err) {
      setResetLoading(false);
      if (err.response && err.response.data) {
        setResetError(err.response.data.error || "An unknown error occurred.");
      } else {
        setResetError(
          "Unable to connect to the server. Please try again later."
        );
        setResetLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-1 w-full h-screen justify-center items-center">
      <div className="flex">
        {!isLoggedIn ? (
          <div className="flex">
            <Login onLogin={handleLogin} error={error} loading={userLogin} />
          </div>
        ) : (
          <div className="flex">
            <div className=" text-gray-600">
              {resetError && <p className="mb-4">{resetError}</p>}{" "}
              <button
                type="submit"
                onClick={handleReset}
                className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50 flex justify-center items-center"
                disabled={resetLoading} // Disable button while loading
              >
                {resetLoading ? (
                  <div
                    className="h-5 w-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"
                    role="status"
                  ></div>
                ) : (
                  "Initialize / Reset System"
                )}
              </button>
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setResetError("");
              }}
              className="absolute right-4 top-2 text-gray-400 font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
