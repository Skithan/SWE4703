import Checkbox from '@mui/material/Checkbox'
import Slider from '@mui/material/Slider'
import { useState } from 'react'
import '../Contract.css'
import FormControlLabel from "@mui/material/FormControlLabel";

const PriceContract = ({ isSelected, onSelect, sendPriceData, sendPriceAlert }) => {
  
  const [price, setPrice] = useState(1)   
  const [alert, setAlert] = useState(0)

  
  const handlePriceChange = (event, price) => {
    setPrice(price);
    sendPriceData(price, alert);
 
  };

  const handleCheckboxChange = (event, alert) => {
    setAlert(event.target.checked ? 1 : 0); // Set alert to 1 if checked, 0 if unchecked
    sendPriceAlert(alert);
  };

  return (
    <div className={`contract-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <h2>Price-Based Contract</h2>
      <p>Set a minimum selling price and sell energy back when the price is exceeded.</p>
      {/* <br/>
      <p> Note if you are only interested in selling during demand response events you must make the price greater than the peak rate: 34.634¢/kWh  </p> */}
      <br/>
      <div className="price-selection">
        <label htmlFor="price-slider">Min. Price per kWh: {price}¢</label>
        <Slider
          defaultValue={1}
          min={1}
          max={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={handlePriceChange}
        />
      </div>
      <div>
        
        <FormControlLabel
        control={<Checkbox checked={alert === 1} onChange={handleCheckboxChange} />}
        label = "Alert when Price Exceeded"
      />
       
      </div>
    </div>
  )
}

export default PriceContract
