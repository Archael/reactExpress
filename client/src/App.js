import React, { useState } from 'react';
import MessageForm from './components/MessageForm';
import SuccessPage from './components/SuccessPage';
import ErrorPage from './components/ErrorPage';

function App() {
  const [status, setStatus] = useState('form');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {status === 'form' && (
          <MessageForm
            setStatus={setStatus}
            setErrorMessage={setErrorMessage}
          />
        )}
        {status === 'success' && <SuccessPage />}
        {status === 'error' && <ErrorPage message={errorMessage} />}
      </div>
    </div>
  );
}

export default App;
