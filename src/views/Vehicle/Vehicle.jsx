import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Vehicle.css'
import TextField from '@mui/material/TextField'

import InputAdornment from '@mui/material/InputAdornment';

const Vehicle = () => {
  
  const [vehicleName, setVehicleName] = useState(null)
  const handleSetVehicleName = vehicleName => {
    setVehicleName(vehicleName)
  }

  const [capacity, setCapacity] = useState(null)
  const handleSetCapacity = capacity => {
    setCapacity(capacity)
  }


  const navigate = useNavigate()


  const handleNavigate = () => {
      if (vehicleName && !capacity) {      
        alert('Please enter your vehicles capacity before proceeding.');
      
      } else if (!vehicleName && capacity) {      
        alert('Please enter your vehicles name before proceeding.');
      
      } else if (!vehicleName && !capacity) {      
        alert('Please enter your vehicles name and capacity before proceeding.');
      } else {
        navigate('/rates',{state: {vehicleName, capacity}});
    }
};

  return (<div className="contracts-page">
              <div className="contracts-header">
                <h1>Enter your Vehicle Information</h1>
                <p>
                  Please enter the Name of your Electric Vehicle as well as it's Battery Capacity below
                </p>
              </div>    
              <label>Vehicle Name</label>  
              <div style={{ display:"flex", flexWrap:"wrap",textAlign:"center" ,margin:"25px auto", justifyContent:"center"}}>
                <TextField id="outlined-basic" label="Vehicle Name" variant="outlined" size="small"
                    onChange={(event) => {
                      handleSetVehicleName(event.target.value);
                    }}/>
              </div>
              <label>Battery Capacity</label>
              <div style={{ display:"flex", flexWrap:"wrap", textAlign:"center", margin:'25px auto',justifyContent:"center"}}>
                <TextField id="outlined-basic" variant="outlined" size="small"  label="Battery Capacity"
                            onChange={(event) => {
                              handleSetCapacity(parseInt(event.target.value));
                            }}
                           slotProps={{
                              input: {
                                endAdornment: <InputAdornment position="end">kwh</InputAdornment>,
                              },
                              }}/>

              </div>
              
        
            <button className="confirm-button" onClick={handleNavigate}>
                Confirm Vehicle Selection 
            </button>

          </div>
  )
}

export default Vehicle
