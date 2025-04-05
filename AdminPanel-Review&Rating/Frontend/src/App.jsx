import { Routes, Route } from 'react-router-dom';
import Review from './components/review';
import Admin from './components/admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Review />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
