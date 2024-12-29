import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ onLogin, error, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className=" text-center">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Display error */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div
              className="h-5 w-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"
              role="status"
            ></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onLogin: PropTypes.func,
};

export default Login;
