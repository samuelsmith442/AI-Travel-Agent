import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const YourTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripData, weatherData, flightData, hotelData } = location.state || {};
  const [isResetting, setIsResetting] = useState(false);

  if (!tripData) {
    navigate('/plan');
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    }).replace(',', '');
  };

  const handleReset = () => {
    setIsResetting(true);
    // Add a small delay for the animation
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 transition-opacity duration-500 ${isResetting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-6xl font-bold text-center mb-12">Your Trip</h1>
        
        {/* Date Pills */}
        <div className="flex justify-between px-4">
          <div className="bg-[#B4F7F7] px-6 py-3 rounded-full text-xl font-medium shadow-md">
            → {formatDate(tripData.startDate)}
          </div>
          <div className="bg-[#B4F7F7] px-6 py-3 rounded-full text-xl font-medium shadow-md">
            {formatDate(tripData.endDate)} ←
          </div>
        </div>

        {/* Route */}
        <div className="bg-[#B4F7F7] px-8 py-4 rounded-full shadow-md">
          <p className="text-2xl font-medium text-center">
            {tripData.from} → {tripData.to}
          </p>
        </div>

        {/* Weather */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-center">Weather</h2>
          <div className="bg-[#B4F7F7] p-6 rounded-3xl shadow-md">
            <p className="text-xl">
              {weatherData?.description}
            </p>
          </div>
        </div>

        {/* Flights */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-center">Flights</h2>
          <div className="bg-[#B4F7F7] p-6 rounded-3xl shadow-md">
            <p className="text-xl mb-6">
              {flightData?.description}
            </p>
            <button 
              onClick={() => window.open('https://www.google.com/travel/flights', '_blank')}
              className="w-full bg-emerald-500 text-xl font-semibold py-3 rounded-full hover:bg-emerald-600 
                       transition-colors border-2 border-black"
            >
              Book
            </button>
          </div>
        </div>

        {/* Hotel */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-center">Hotel</h2>
          <div className="bg-[#B4F7F7] p-6 rounded-3xl shadow-md">
            <p className="text-xl mb-6">
              {hotelData?.description}
            </p>
            <button 
              onClick={() => window.open('https://www.booking.com', '_blank')}
              className="w-full bg-emerald-500 text-xl font-semibold py-3 rounded-full hover:bg-emerald-600 
                       transition-colors border-2 border-black"
            >
              Book
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-8">
          <button
            onClick={handleReset}
            className="w-full bg-blue-500 text-white text-xl font-semibold py-4 rounded-full
                     hover:bg-blue-600 transition-all transform hover:scale-105
                     border-2 border-black shadow-lg"
          >
            Plan Another Trip ✈️
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourTrip;
