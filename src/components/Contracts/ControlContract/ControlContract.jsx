import Slider from '@mui/material/Slider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useState } from 'react'

import '../Contract.css'

const ControlContract = ({ isSelected, onSelect, capacity, sendControlData}) => {

  const [fuelLevel, setFuelLevel] = useState(30)
  const [guaranteedFuel, setGuarenteedFuel] = useState((capacity * (fuelLevel / 100)).toFixed(1))


  const handleFuelChange = (event, fuelLevel) => {
    setFuelLevel(fuelLevel);
    setGuarenteedFuel((capacity * (fuelLevel / 100)).toFixed(1));
    sendControlData(guaranteedFuel); // Send the calculated value to parent
  };


  return (
    <div className={`contract-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <h2>Control-Based Contract</h2>
      <p>Set the percentage of fuel you would like left in your Battery.</p>
      <br/>
      <br/>
      <label>
        Guaranteed Fuel Level: {fuelLevel}% of {capacity}Kwh = {guaranteedFuel}KWH
        <Slider defaultValue={30} onChange={handleFuelChange} value={fuelLevel} />
      </label>
    </div>
  )
}

export default ControlContract
