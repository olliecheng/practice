import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import DexamethasoneTest from './components/DexamethasoneTest'

function App() {
  return (
    <div className="min-h-screen bg-beige-500 text-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dexamethasone" element={<DexamethasoneTest />} />
      </Routes>
    </div>
  )
}

export default App