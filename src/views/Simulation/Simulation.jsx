import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import './Simulation.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from '@mui/material/InputAdornment';
import { max } from 'date-fns'





const Simulation = () => {
 


  const location = useLocation();
  const {vehicleName, capacity, selectedContract, minPrice, alertPrice, maxVolume, minFuelLevel} = location.state || {}; 

  const[speedOfSim, setSpeed] = useState(null)
  const[totalIncome, setTotInc] = useState(0)
  const[hourlyIncome, setHourInc] = useState(0)
  const[currentCharge, setCurCharge] = useState(capacity)
  const[curRate, setCurRate] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isParticpating, setIsParticipating] = useState(true); 
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [startDate] = useState(new Date());
  const[batteryRatio, setBat] = useState(0)
  const[isCharging, setIsCharging] = useState(0)
  const [alert, setAlert] = useState(alertPrice)
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const navigate = useNavigate() 
  const handleNavigate = () => {
    navigate('/postsim')
  }

  const handleSetSimSpeed = speedOfSim => {
    setSpeed(speedOfSim)
  }

  const handleIsCharging = isCharging =>{
    setIsCharging(isCharging)
  }


  const handleSetBat = batteryRatio => {
    setBat(batteryRatio)
  }

  const handleSetCurCharge = currentCharge =>{
    setCurCharge(currentCharge)
  }

  const handleHourlyIncome = hourlyIncome => {
    setHourInc(hourlyIncome)
    setTotInc(totalIncome => totalIncome + hourlyIncome)
  }

  const handleCurRate = curRate => {
    setCurRate(curRate)
  }


  const toggleParticipating = () => {
    setIsParticipating(!isParticpating);
  }

  const togglePlayPause = () => {
    if (!speedOfSim) {      
      alert('Please enter the speed of Simulation before starting the sim');
    
    } else{
      setIsPlaying(!isPlaying);
    }
  };

  const handleCheckboxChange = (event) => {
    setAlert(event.target.checked ? 1 : 0);

  };

  const resetDate = () => {
    setHourInc(0);
    setTotInc(0);
    setCurrentDate(startDate); 
    setIsPlaying(false);        
    setCurCharge(capacity);
    setCurRate(0);
    setIsCharging(0);

  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentDate((prevDate) => {
          const nextDate = new Date(prevDate.getTime() + 60 * 60 * 1000); 
          const oneYearLater = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000); 

          if (nextDate >= oneYearLater) {
            setIsPlaying(false); 
            clearInterval(interval);
          }else{
            if(isParticpating){ //adjust income if participating
                  
          
                var month = nextDate.getMonth();
                var dayOfWeek = nextDate.getDay();
                var hour = nextDate.getHours();
                handleIsCharging(0);//set not charging

                if(month === 11 || month === 12 || month === 0  || month === 1){ //if month is from December - February

                  if(dayNames[dayOfWeek] == "Monday" || dayNames[dayOfWeek] == "Tuesday" || dayNames[dayOfWeek] == "Wednesday" || dayNames[dayOfWeek] == "Thursday" || dayNames[dayOfWeek] == "Friday"){

                   
                    if(hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11 || hour == 12){
                      handleCurRate(0.23337);
                    }else if(hour == 13 || hour == 14 || hour == 15 || hour == 16){
                      handleCurRate(0.18759);
                    }else if(hour == 17 || hour == 18 || hour == 19 || hour == 20 || hour == 21 || hour == 22 || hour == 23){
                      handleCurRate(0.23337);
                    }else if(hour == 24 || hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5 || hour == 6){
                     
                      handleCurRate(0.11482);
        
                      if(currentCharge < capacity){

                        handleSetBat(capacity/7);
                        handleSetCurCharge((prevCharge) => Math.min(prevCharge +batteryRatio, capacity));                                
                        handleHourlyIncome(-curRate * batteryRatio);
                        handleIsCharging(1);
                      }       
                    }
                  
                  if(selectedContract == "Price-Based" && isCharging == 0){

                    if(curRate >= (minPrice/10) && currentCharge > (capacity/7) && isCharging == 0){ 
                      if(alert == 1){
                        alert(`ATTENTION the current rate is: ${curRate}cents/Kwh your min price was: ${minPrice}cents/Kwh`)                        
                      }
                      handleSetBat(capacity/7);
                      handleSetCurCharge(currentCharge - batteryRatio);  
                      handleHourlyIncome(curRate * batteryRatio);
                      handleIsCharging(0);
                    }
 
                  }else if(selectedContract == "Volume-Based" && currentCharge > (capacity/7) &&  isCharging == 0){
                   
                    if(maxVolume < (currentCharge - ((capacity - maxVolume)/7))){
                  
                      handleSetBat((capacity - maxVolume)/7) ;
                      handleSetCurCharge(currentCharge - batteryRatio);
                      handleHourlyIncome(curRate * batteryRatio);
                      handleIsCharging(0);

                    }else {          
                      if(maxVolume != null){
                        handleSetCurCharge((prevCharge) => Math.min(prevCharge, maxVolume)); 
                      }
                    }

                  }else  if(minFuelLevel < (currentCharge - ((capacity - minFuelLevel)/7))&& currentCharge > (capacity/7)  &&  isCharging == 0){
                  
                    handleSetBat((capacity - minFuelLevel)/7) ;
                    handleSetCurCharge(currentCharge - batteryRatio);
                    handleHourlyIncome(curRate * batteryRatio);
                    handleIsCharging(0);

                  }else {    
                    if(minFuelLevel != null){
                      handleSetCurCharge((prevCharge) => Math.min(prevCharge, minFuelLevel)); 
                    }   
                  }

                  }else{ //weekend

                    handleCurRate(0.11482);
                    handleHourlyIncome(0);
                    //no arbitrage on weeekends
                  }
                }  

  
                }else{ //is month from November- March

                  if(dayNames[dayOfWeek] == "Monday" || dayNames[dayOfWeek] == "Tuesday" || dayNames[dayOfWeek] == "Wednesday" || dayNames[dayOfWeek] == "Thursday" || dayNames[dayOfWeek] == "Friday"){

                    if(hour == 7 || hour == 8 || hour == 9 || hour == 10 || hour == 11 ){
                      handleCurRate(0.18759);       
                    }else{
                      handleCurRate(0.11482);

                      if(currentCharge > 0){

                        //charge a 19th of my battery capacity
                        handleSetBat(capacity/19) ;
                        handleSetCurCharge((prevCharge) => Math.min(prevCharge + batteryRatio, capacity));         
                        handleHourlyIncome(-curRate * batteryRatio);
                        handleIsCharging(1);
                      }
                    }                    
                    if(selectedContract == "Price-Based" && isCharging == 0){

                      if(curRate >= (minPrice/10)  && currentCharge > (capacity/10) && isCharging == 0){ //save the last 10% of battery
                        if(alertPrice == 1){
                          alert(`ATTENTION the current rate is: ${curRate}cents/Kwh your min price was: ${minPrice}cents/Kwh`)
                        }
              
                          handleSetBat(capacity/7);
                          handleSetCurCharge(currentCharge - batteryRatio);
                          handleHourlyIncome(curRate * batteryRatio);
                          handleIsCharging(0);
                        }
                    }else if(selectedContract == "Volume-Based" && isCharging == 0 && currentCharge > (capacity/7) ){
                  
                        if(maxVolume < (currentCharge - ((capacity - maxVolume)/7))){
                          
                          handleSetBat((capacity - maxVolume)/7) ;
                          handleSetCurCharge(currentCharge - batteryRatio);
                          handleHourlyIncome(curRate * batteryRatio);
                          handleIsCharging(0);

                        }else {     
                          if(maxVolume != null){
                            handleSetCurCharge((prevCharge) => Math.min(prevCharge, maxVolume)); 
                          }
                        }        

                    }else{ //control-based
                      if( minFuelLevel < (currentCharge - ((capacity - minFuelLevel)/7)) && isCharging == 0 && currentCharge > (capacity/7) ){
                      
                        handleSetBat((capacity - minFuelLevel)/7) ;
                        handleSetCurCharge(currentCharge - batteryRatio);
                        handleHourlyIncome(curRate * batteryRatio);
                        handleIsCharging(0);
                      }else {   
                        if(minFuelLevel != null){
                          handleSetCurCharge((prevCharge) => Math.min(prevCharge, minFuelLevel)); 
                        }     
                      }
                    } 
                  }else{ //weekend

                    handleCurRate(0.11482);
                    handleHourlyIncome(0);
                    //no arbitrage on weekends
                  }
                }              
             }

          return nextDate;
        });
      }, speedOfSim); 

    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
    
  }, [isPlaying, isParticpating, startDate, hourlyIncome, currentCharge, curRate, batteryRatio, isCharging, maxVolume, minPrice, alertPrice,minFuelLevel ]);



  return (<div>
          <div className="contracts-page">
            <div className="contracts-header">
              <h1>Simulation</h1>
            </div>  
            <div className="contracts-container">
              <div className="contract-card">

              <p>To begin the simulation, please enter the speed in milliseconds that you would like each day to take</p>
              <p>Then Press Play!</p>
              <p className="date">{currentDate.toDateString()}</p>
              <p className="date">{currentDate.toLocaleTimeString()}</p>
           
              <div style={{ display:"flex", flexWrap:"wrap",textAlign:"center" ,margin:"25px auto", justifyContent:"center"}}>
                <TextField id="outlined-basic" label="Simulation Speed" variant="outlined" size="small"
                    onChange={(event) => {
                    handleSetSimSpeed(parseInt(event.target.value));}}
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                      },
                      }}/>

                  <button onClick={togglePlayPause} className="button">
                      {isPlaying ? 'Pause' : 'Play'}
                  </button>                  
                </div>
                  <div>                    
                  <button onClick={toggleParticipating} className="button">
                      {isParticpating ? 'Stop' : 'Start'} Participating
                  </button>    
                  {" "}
                    <button onClick={resetDate} className="button reset">
                      Reset
                    </button>
                    {" "}
                    <button className="button reset" onClick={handleNavigate}> 
                      Exit 
                    </button>  
                    {selectedContract === "Price-Based"  ? (<FormControlLabel
                    control={<Checkbox checked={alert === 1} onChange={handleCheckboxChange} />}
                    label = "Alert Me"
                  />) : ( "" )}
                  </div> 
              </div>
              <div className="contract-card">            
                  <div className="pretty-text-big"> {vehicleName}  -  {capacity}kwh</div>  
                  <div className="pretty-text-big"> contract: {selectedContract}</div>   
                  <div>-----------------------------------------------------------------</div>     
                  <div className="pretty-text-big"> Current Charge: {currentCharge.toFixed(2)}Kw</div> 
                  <div className="pretty-text-big"> Current Rate: {curRate}</div>                     
                  <div className="pretty-text-big"> Hourly Income: {hourlyIncome.toFixed(2)}$</div>         
                  <div className="pretty-text-big">Total Income:  {totalIncome.toFixed(2)}$</div>        
              </div>
            </div>     
            <div className='battery-container'>  
              {isCharging === 0 ? (<><img src="/images/red-square.png" alt="Off" className="status" /> <span className="status-text">Discharging</span></>) :
               (<><img src="/images/green-square.png" alt="On" className="status" /> <span className="status-text">Charging</span></>)}
            </div>            
            </div>            
            </div>
  )
}

export default Simulation


