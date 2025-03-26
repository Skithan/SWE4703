import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import Dashboard from './views/Dashboard'
import Homepage from './views/Homepage'
import Vehicle from './views/Vehicle'
import Simulation from './views/Simulation'
import PostSim from './views/PostSim'
import Rates from './views/Rates'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/postsim" element={<PostSim />} />
          <Route path="/rates" element={<Rates />} />
        </Route>
      </Routes>
    </Router>
  )
}


export default App
