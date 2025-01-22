import { Routes, Route } from 'react-router-dom';
import LetsBegin from './pages/LetsBegin';
import TripPlanner from './pages/TripPlanner';
import YourTrip from './pages/YourTrip';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LetsBegin />} />
      <Route path="/plan" element={<TripPlanner />} />
      <Route path="/your-trip" element={<YourTrip />} />
    </Routes>
  );
}

export default App;
