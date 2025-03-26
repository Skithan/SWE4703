import { useState } from 'react'

// Hook used to manage local storage
// Retrieve initial value from localStorage (if available).
// Update the state and keep localStorage in sync.
// Delete item from localStorage.

const useLocalStorage = (key, initialValue = null) => {
  // try to grab item from local storage else return initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading localStorage', error)
      return initialValue
    }
  })

  // function to update local storage
  const setValue = value => {
    try {
      setStoredValue(value)
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error('Error writing to localStorage', error)
    }
  }
  // returns the stored value and a function to update local storage
  return [storedValue, setValue]
}

export default useLocalStorage
