import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import InvestmentPage from './pages/InvestmentPage/InvestmentPage';
import StrategiesPage from './pages/StrategiesPage/StrategiesPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import { BrowserRouter } from 'react-router-dom'
import Navbar from "./components/Header/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<InvestmentPage />} />
          <Route path="/strategies" element={<StrategiesPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
