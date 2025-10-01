"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

function SubmitButton() {
  return (
    <Button type="submit">
      <Search className='w-4 h-4'/>
    </Button>
  );
}

const Home = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")

  const searchhandler = async (e) => {
    e.preventDefault()

    if (!city) return

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY  
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )

      if (!res.ok) throw new Error("City not found")

      const data = await res.json()
      setWeather(data)
      setError("")
    } catch (err) {
      setError(err.message)
      setWeather(null)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex justify-center items-center'>
      <div className='w-full max-w-md space-y-4'>
        <form onSubmit={searchhandler} className='flex gap-2'>
          <Input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter your city name'
            className='bg-white/90' 
            required
          />
          <SubmitButton/>
        </form>

        {error && <p className='text-red-600 font-semibold'>{error}</p>}

        {weather && (
          <div className='bg-white/90 p-4 rounded-lg shadow space-y-2 text-center'>
            <h2 className='text-xl font-bold'>{weather.name}, {weather.sys.country}</h2>
            <p className='text-2xl font-semibold'>{weather.main.temp}°C</p>
            <p className='capitalize'>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
