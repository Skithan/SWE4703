
import './Rates.css'

import { useLocation, useNavigate } from 'react-router-dom'

const Rates = () => {


  const navigate = useNavigate()

  const location = useLocation();
  const {vehicleName, capacity} = location.state || {};
  
  const handleNavigate = () => {
    navigate('/dashboard', {state: {vehicleName, capacity}})
  }

  return (
    <>
      
    <div className="contracts-page">
      <div className="contracts-header">
        <h1>Time of Day Rates </h1>

        <p>
        <a href="https://www.nspower.ca/your-home/residential-rates/time-of-day"> As of December 4th 2024 the current energy prices on Nova Scotia Power's website are as follows </a>
        </p>


      </div>

      <div className="contract-container"> 
        <button className="contract-card">
          <img src="/images/rates1.png" />
        </button>
        <button className="contract-card">
          <img src="/images/rates2.png" />
        </button>
        <button className="contract-card">
          <img src="/images/rates3.png" />
        </button>
      </div>


    
      {/* Confirm Button */}
      <button  className="confirm-button" onClick={handleNavigate} >
        Select a Contract
      </button>


    </div>

    </>


  )
}

export default Rates
