import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      console.log("token", token)
      const headers = {
        "Content-Type": "application/json",
      }
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      try {
        setLoading(true)
        const response = await fetch(url, {
          headers
        })
        console.log("response of useFetch", response);
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error?.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { data, loading, error }
}

export default useFetch