const CustomNotification = ({ message, type, onClose }) => {
  const baseClasses =
    "fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white text-sm font-medium z-50 transition-opacity duration-300";

  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || "bg-gray-700"}`}>
      <div className="flex items-center justify-between gap-3">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-white text-lg leading-none hover:text-gray-300"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomNotification;
