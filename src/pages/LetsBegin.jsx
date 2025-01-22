import { useNavigate } from 'react-router-dom';
import travelCat from '../assets/travel-cat.png';
import { useState } from 'react';

const LetsBegin = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleBegin = () => {
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {!imageError && (
          <img
            src={travelCat}
            alt="Travel Cat Mascot"
            className="w-48 h-48 mx-auto mb-6 object-contain"
            onError={() => setImageError(true)}
          />
        )}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          AI Travel Agent
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Let me help you plan your perfect trip! I'll find the best flights, hotels, 
          and provide weather information for your destination.
        </p>
        <button
          onClick={handleBegin}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xl font-semibold 
                   py-4 px-8 rounded-full transition-all transform hover:scale-105
                   shadow-lg border-2 border-black"
        >
          Let's Begin!
        </button>
      </div>
    </div>
  );
};

export default LetsBegin;
