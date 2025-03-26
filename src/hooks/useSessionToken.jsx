import { useState, useEffect } from 'react'
// hook to manage user session token
const useSessionToken = (key = 'session_token') => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(key) || ''
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem(key, token)
    } else {
      localStorage.removeItem(key) // Clean up if token is cleared
    }
  }, [key, token])

  return [token, setToken]
}

export default useSessionToken
