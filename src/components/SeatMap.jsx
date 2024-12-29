import PropTypes from "prop-types";

const SeatMap = ({ seats }) => {
  console.log(seats);
  return (
    <div className="space-y-4">
      {Array.from({ length: 12 }).map((_, row) => (
        <div key={row} className="flex gap-2">
          {Array.from({
            length: row === 11 ? 3 : 7, // Last row has 3 seats
          }).map((_, seat) => {
            const seatData = seats.find(
              (s) => s.row === row + 1 && s.seat_number === seat + 1
            );
            return (
              <div
                key={seat}
                className={`w-10 h-10 text-white font-semibold flex items-center justify-center rounded border ${
                  seatData?.reserved_by ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {row + 1}-{seat + 1}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

SeatMap.propTypes = {
  seats: PropTypes.array.isRequired,
};

export default SeatMap;