import React from 'react';

function SuccessPage() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Message Received!
      </h2>
      <p className="text-gray-600">
        Your message has been sent to Santa successfully.
      </p>
    </div>
  );
}

export default SuccessPage;
