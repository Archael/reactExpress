import React, { useState } from 'react';
import axios from 'axios';

function MessageForm({ setStatus, setErrorMessage }) {
  const [childId, setChildId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/submit-message', {
        childId,
        message,
      });
      setStatus('success');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="childId"
          className="block text-sm font-medium text-gray-700"
        >
          Child ID
        </label>
        <input
          type="text"
          id="childId"
          value={childId}
          onChange={(e) => setChildId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message to Santa
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="4"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Message
      </button>
    </form>
  );
}

export default MessageForm;
