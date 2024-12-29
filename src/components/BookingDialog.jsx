import PropTypes from "prop-types";

const BookingDialog = ({
  seatCount,
  setSeatCount,
  onSubmit,
  errorMessage,
  loading,
}) => {
  return (
    <div className="bg-white p-6 w-80">
      <h3 className="text-lg font-bold mb-4">Book Tickets</h3>
      <input
        type="number"
        min="1"
        max="7"
        value={seatCount}
        onChange={(e) => setSeatCount(Number(e.target.value))}
        className="w-full p-2 border rounded mb-4"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 flex justify-center items-center"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <div
              className=" h-5 w-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"
              role="status"
            ></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

BookingDialog.propTypes = {
  seatCount: PropTypes.func,
  setSeatCount: PropTypes.func,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
};

export default BookingDialog;
