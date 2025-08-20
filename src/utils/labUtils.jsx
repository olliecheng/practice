/**
 * Utility functions for laboratory result formatting and display
 */

/**
 * Returns a styled arrow component based on the direction of a lab result
 * @param {string} direction - The direction of the lab result ("elevated", "decreased", "normal", or other)
 * @returns {JSX.Element} A styled span element with appropriate arrow and color
 */
export const getArrowForDirection = (direction) => {
  switch (direction) {
    case "elevated":
      return <span className="text-2xl font-bold text-red-600">↑</span>;
    case "decreased":
      return <span className="text-2xl font-bold text-blue-600">↓</span>;
    case "normal":
      return <span className="text-2xl font-bold text-green-600">→</span>;
    default:
      return <span className="text-2xl font-bold text-gray-600">?</span>;
  }
};

export const getPosNeg = (direction) => {
  switch (direction) {
    case "positive":
      return <span className="text-2xl font-bold text-blue-600">+</span>;
    case "negative":
      return <span className="text-2xl font-bold text-gray-600">-</span>;
  }
};
