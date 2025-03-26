
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MultiInputTimeRangeField, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { useState } from 'react'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';

import '../Contract.css'

const VolumeContract = ({ isSelected, onSelect, capacity, sendVolumeData}) => {
  
  const [maxVol, setMaxVol] = useState(0);
  const [error, setError] = useState("");
  

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Allow empty input or validate number
    if  (inputValue === "" || (Number(inputValue) < capacity && !isNaN(inputValue))){
      setMaxVol(inputValue);
      setError("");
      sendVolumeData(inputValue);
    } else {
      setError(`Please enter a number less than your battery's capacity: ${capacity}Kwh`);
    }
  };


  return (
    <div className={`contract-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <h2>Volume-Based Contract</h2>
      <p>Specify how many kwh you would like left in your EV</p>
      
      <br/>

      <div>
        <label>Maximum Volume</label>
        <TextField id="outlined-basic"         
        label="Max. Volume"
        variant="outlined"
        size="small"
        value={maxVol}
        onChange={handleInputChange}
        error={!!error}
        helperText={error} />
      </div>
    </div>
  )
}

export default VolumeContract
