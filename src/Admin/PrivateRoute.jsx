import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/authentication/currentuser", { withCredentials: true })
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 font-urbanist">
        ...
      </h1>
    </div>
  }

  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
