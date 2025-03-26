import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Dashboard.css'
import ControlContract from '../../components/Contracts/ControlContract'
import PriceContract from '../../components/Contracts/PriceContract'
import VolumeContract from '../../components/Contracts/VolumeContract'

const Dashboard = () => {

  const location = useLocation();
  const {vehicleName, capacity} = location.state || {};
 



  const [selectedContract, setSelectedContract] = useState(null);
  const handleSelectContract = selectedContract => {
    setSelectedContract(selectedContract)
  }


  //get the data from the control elements
  const [minPrice, setMinPrice] = useState(null);
  const [alertPrice, setAlertPrice] = useState(null);
  const [maxVolume, setMaxVolume] = useState(null);
  const [minFuelLevel, setMinFuelLevel] = useState(null);


  const control = (minFuelLevel) => {
    setMinFuelLevel(minFuelLevel);
  };

  const volume = (maxVolume) => {
    setMaxVolume(maxVolume);
  };

  const price = (minPrice, alertPrice) => {
    setMinPrice(minPrice);
    setAlertPrice(alertPrice);
  };
  
  const alert = (alertPrice) => {
    setAlertPrice(alertPrice);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/simulation', {state: {vehicleName, capacity, selectedContract, minPrice, alertPrice, maxVolume, minFuelLevel}})
  }

  return (
    <div className="contracts-page">
      <div className="contracts-header">
        <h1>Choose Your V2G Contract</h1>
        <p>
          Select a contract type that best matches your preferences for participating in
          vehicle-to-grid (V2G) services. Each option allows you to tailor your commitment,
          availability, and earnings based on your individual requirements.
        </p>
      </div>

    

      

      {/* Contract Cards */}
      <div className="contracts-container">
        <PriceContract
          isSelected={selectedContract === 'Price-Based'}
          onSelect={() => handleSelectContract('Price-Based')}
          sendPriceData={price}
          sendPriceAlert={alert}
        />
        <VolumeContract
          isSelected={selectedContract === 'Volume-Based'}
          onSelect={() => handleSelectContract('Volume-Based')}
          capacity={capacity}
          sendVolumeData={volume}
        />
        <ControlContract
          isSelected={selectedContract === 'Control-Based'}
          onSelect={() => handleSelectContract('Control-Based')}
          capacity={capacity}
          sendControlData={control}
        />
      </div>

      {/* Confirm Button */}
      <button  className="confirm-button" onClick={handleNavigate}  disabled={!selectedContract} >
        Confirm Selection
      </button>

    </div>
  )
}

export default Dashboard
