import React, { useState, useEffect } from 'react';
import Organizer_New from './Organizer_New';

const Organizer_Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-10">Organizer_Page</div>
      )}
    </div>
  );
};

export default Organizer_Page;