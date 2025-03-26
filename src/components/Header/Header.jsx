// import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { getTitle } from '../AppLayout/routes'

const Header = () => {
  const location = useLocation()

  return (
    <header className="h-header w-full bg-white drop-shadow-md flex justify-between items-center px-7 sticky z-40">
      <h2 className="text-xl">{getTitle(location.pathname)}</h2>
      <div className="flex w-full justify-end gap-6"></div>
    </header>
  )
}

export default Header
