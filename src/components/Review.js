import { useState } from "react";

export default function Review({ isOpen, onClose }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl mb-4">Leave a Review</h2>
        <form>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 rounded px-4 py-2"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
