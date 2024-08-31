import React from 'react';

function ErrorPage({ message }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

export default ErrorPage;
