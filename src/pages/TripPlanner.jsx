import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentWeather, suggestTravelPlan } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TripPlanner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    travelers: 1,
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Submitting form with data:', formData);
      const weatherResponse = await getCurrentWeather({ location: formData.to });
      const suggestions = await suggestTravelPlan({
        ...formData,
        budget: Number(formData.budget)
      });

      navigate('/your-trip', {
        state: {
          tripData: formData,
          weatherData: {
            description: `Current temperature is ${weatherResponse.main.temp}°C with ${weatherResponse.weather[0].description}`
          },
          flightData: {
            description: suggestions.flight
          },
          hotelData: {
            description: suggestions.hotel
          }
        }
      });
    } catch (error) {
      console.error('Error in TripPlanner:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-md mx-auto space-y-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700">Number of travelers</label>
            <input
              type="range"
              min="1"
              max="10"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="w-full"
            />
            <span className="text-center block">{formData.travelers}</span>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Flying from</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter departure city"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Flying to</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter destination city"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">From Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">To Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-2">$</span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-2 pl-8 border rounded"
                placeholder="Enter your budget"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full 
                     transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Planning...</span>
              </>
            ) : (
              'Plan my Trip!'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
