const MobileControls = ({ onDirectionChange }) => {
  return (
    <div className="mt-4 flex flex-col items-center gap-2 flex sm:hidden">
      {/* Up Button */}
      <button
        className="w-16 h-16 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        onClick={() => onDirectionChange("UP")}
      >
        ↑
      </button>
      {/* Left, Right, and Down Buttons */}
      <div className="flex gap-2">
        <button
          className="w-16 h-16 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          onClick={() => onDirectionChange("LEFT")}
        >
          ←
        </button>
        <button
          className="w-16 h-16 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          onClick={() => onDirectionChange("DOWN")}
        >
          ↓
        </button>
        <button
          className="w-16 h-16 bg-gray-800 text-white rounded-full hover:bg-gray-700"
          onClick={() => onDirectionChange("RIGHT")}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
