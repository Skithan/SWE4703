import { useState } from 'react'
import './PostSim.css'
import { useNavigate } from 'react-router-dom'
import ControlContract from '../../components/Contracts/ControlContract'
import PriceContract from '../../components/Contracts/PriceContract'
import VolumeContract from '../../components/Contracts/VolumeContract'

const PostSim = () => {

  const [selectedContract, setSelectedContract] = useState(null)
  const [isPriceSelected, setIsPriceSelected] = useState(false);
  const [isVolumeSelected, setIsVolumeSelected] = useState(false);
  const [isControlSelected, setIsControlSelected] = useState(false);
  const navigate = useNavigate()

  const handleSelectedContract = (selectedContract) => {

    if(selectedContract == "Price-Based"){
      setIsPriceSelected(true)
      setIsVolumeSelected(false)
      setIsControlSelected(false)

    }else if(selectedContract == "Volume-Based"){
      setIsPriceSelected(false)
      setIsVolumeSelected(true)
      setIsControlSelected(false)

    }else{ //control based

      setIsPriceSelected(false)
      setIsVolumeSelected(false)
      setIsControlSelected(true)

    }
    setSelectedContract(selectedContract)
  }



  const handleNavigate = () => {

    if(!selectedContract){
      alert("Please reselect the contract you would like to sign next time :)")
    }else{
      alert("We are glad you selected the " + selectedContract + " Thank you for participating!")
      navigate('/homepage')
    }

  }

  


  return (
        <div className="contracts-page">
            <div className="contracts-header">
              <h1>Post Simulation</h1>
              <h1>Which Contract Would you like to try now?</h1>
                <p>
                  Now that you've seen the benefits and of the contract 
                  you initially selected which contract would you select for next year? 
                </p>
            </div>
    
      {/* Contract Cards */}
      <div className="contracts-container">
        <button className={`contract-card ${isPriceSelected ? 'selected' : ''}`} onClick={() => handleSelectedContract('Price-Based')}>
          <h2>Price-Based Contract</h2>
          <p>Set a minimum selling price and sell energy back when the price is exceeded.</p>
        </button>
        
        <button className={`contract-card ${isVolumeSelected ? 'selected' : ''}`}  onClick={() => handleSelectedContract('Volume-Based')}>
          <h2>Volume-Based Contract</h2>
          <p>Commit a specific amount of energy for a defined time interval.</p>
        </button>

        <button className={`contract-card ${isControlSelected ? 'selected' : ''}`}  onClick={() => handleSelectedContract('Control-Based')}>
        <h2>Control-Based Contract</h2>
        <p>Set a guaranteed fuel level and plug in as you go.</p>
        </button>
      </div>

    <button className="confirm-button" onClick={handleNavigate}>
      Confirm Reselection 
    </button>
    </div>
  )
}

export default PostSim
