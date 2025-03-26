import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'

const Homepage = () => {
  const navigate = useNavigate()
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setFadeIn(true)
  }, [])

  const handleNavigate = () => {
    navigate('/vehicle')
  }

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">EV Bidirectional Contract Simulator</h1>
      <img
        src="/images/car-charger-removed.png"
        alt="EV Bidirectional Contracts"
        className={fadeIn ? 'fade-in' : ''}
      />
      <div className="homepage-card">
        <p>
          Welcome to the EV Bidirectional Contract Simulator. This app helps you explore the pros
          and cons of various contract options for selling power back to the grid using your
          electric vehicle. Customize your contract preferences, run a simulation, and discover how
          each option impacts performance, cost, and benefits.
        </p>
      </div>
      <button onClick={handleNavigate} className="explore-button">
        Explore Contracts
      </button>
    </div>
  )
}

export default Homepage
