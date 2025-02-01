import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tabs from './components/Tabs'
import Shifts from './components/Shifts'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Cairo's Kitchen Management</h1>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Tabs />
          <Routes>
            <Route path="/" element={<Navigate to="/shifts" replace />} />
            <Route path="/shifts" element={<Shifts />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}