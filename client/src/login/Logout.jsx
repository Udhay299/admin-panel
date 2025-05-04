import React, { useEffect } from 'react';

const LogoutPage = ({ setIsLoggedIn }) => {
  useEffect(() => {
    // 🔥 Remove token from localStorage
    localStorage.removeItem('authToken');
    console.log('🔒 Token removed from localStorage');

    // 🔥 Set isLoggedIn to false (go back to LoginPage)
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Logging out...</h2>
        <p className="text-gray-600">Redirecting to login page.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
